import { useEffect, useRef, useContext, useState } from "react";
import mapboxgl from 'mapbox-gl';
import PlacesProvider from "../contexts/places/PlacesProvider";
import PlacesContext from "../contexts/places/PlacesContext";
import { usePetData } from '../hooks/usePetData';
import { useNavigate } from 'react-router-dom';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FicmllbDI5LXMiLCJhIjoiY20yMnZvYnExMDJwNzJqcTV3d3J3cmUxdSJ9.fA3z9inzGxKvS2GC_rH20g';

const NewPostMap = () => {
  const { userLocation, isLoading } = useContext(PlacesContext);
  const { petData, setPetData } = usePetData();
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const [markerLocation, setMarkerLocation] = useState(userLocation); // Almacena la ubicación actual del marcador

  useEffect(() => {

    if (!userLocation || isLoading || mapRef.current) return;

    console.log(petData.sightingData);

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
  const handleSaveLocation = () => {
    setPetData({
      ...petData,
      sightingData: {
        ...petData.sightingData,
        longitude: markerLocation[0],
        latitude: markerLocation[1],
      },
    });
    alert("Ubicación guardada correctamente");
    navigate('/post');
  };

  return (
    <div>
      {isLoading ? (
      <p>Cargando mapa...</p> 
    ) : (
      <div ref={mapContainer} className="w-full h-screen" />
    )}
      {markerLocation && (
        <div className="absolute bottom-20 left-10 bg-white p-2 rounded">
          <p>Latitud: {markerLocation[1]}</p>
          <p>Longitud: {markerLocation[0]}</p>
          <button
            onClick={handleSaveLocation}
            className="mt-2 bg-blue-500 text-white p-2 rounded"
          >
            Guardar Ubicación
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
