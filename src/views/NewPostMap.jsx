import { useEffect, useRef, useContext, useState } from "react";
import mapboxgl from 'mapbox-gl';
import PlacesProvider from "../contexts/places/PlacesProvider";
import PlacesContext from "../contexts/places/PlacesContext";
import { usePetData } from '../hooks/usePetData';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";



const mapToken = import.meta.env.VITE_MAPBOXGL_TOKEN;
mapboxgl.accessToken = mapToken;

const NewPostMap = () => {
  const { t } = useTranslation();
  const { userLocation, isLoading } = useContext(PlacesContext);
  const { petData, setPetData } = usePetData();
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const [markerLocation, setMarkerLocation] = useState(userLocation);
  // Almacena la ubicación actual del marcador

  useEffect(() => {

    if (!userLocation || isLoading || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: petData.sightingData.latitude != 0 ? [petData.sightingData.longitude, petData.sightingData.latitude] : [userLocation[0],userLocation[1]],
      zoom: 14,
    });

    const marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat(petData.sightingData.latitude != 0  ? [petData.sightingData.longitude, petData.sightingData.latitude] : userLocation)
      .setPopup(new mapboxgl.Popup().setText("Ubicación de la mascota"))
      .addTo(mapRef.current);

    // Actualiza la ubicación del marcador cuando se arrastra
    marker.on('dragend', () => {
      const { lng, lat } = marker.getLngLat();
      setMarkerLocation([lng, lat]);
    });
  }, [userLocation, isLoading, petData.sightingData]);

  // Función para confirmar y guardar la ubicación en petData
  const handleSaveLocation = async () => {
    try {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${markerLocation[0]},${markerLocation[1]}.json?access_token=${mapToken}`);
      const data = await response.json();
      if (data && data.features && data.features.length > 0) {
        // Extraer la información deseada del JSON
        const feature = data.features.find(f => f.place_type.includes("address"));
        if (feature) {
          /*const street = feature.text;
          const district = feature.context.find(c => c.id.includes("place")).text; //
          const region = feature.context.find(c => c.id.includes("region")).text; //
          */
          //console.log(feature.place_name);
          setPetData({
            ...petData,
            location: feature.place_name, // Formato personalizado
            sightingData: {
              ...petData.sightingData,
              longitude: markerLocation[0],
              latitude: markerLocation[1],
            },
          });
          alert(t("saveLocation"));
          navigate('/post');
        } else {
          console.log("No se encontró una dirección exacta para estas coordenadas.");
        }
      } else {
        console.log("No se encontró información para estas coordenadas.");
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div>
      {isLoading ? (
      <p>{t("loadingText")}</p>
    ) : (
      <div ref={mapContainer} className="w-full h-screen" />
    )}
      {markerLocation && (
        <div className="absolute bottom-20 left-10 bg-white p-2 rounded">
          <p>{t("registeLocation")}</p>

          <button
            onClick={handleSaveLocation}
            className="mt-2 bg-custom-250 text-white p-2 rounded"
          >
            {t("saveLocation")}
          </button>
        </div>
      )}
    </div>
  );
};

const NewPostMapWithProvider = () => (
  <PlacesProvider>
    <NewPostMap />
  </PlacesProvider>
);

export default NewPostMapWithProvider;
