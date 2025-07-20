
import { useEffect, useRef, useContext } from "react";
import mapboxgl from 'mapbox-gl';
import PlacesProvider from "../contexts/places/PlacesProvider";
import PlacesContext from "../contexts/places/PlacesContext";


mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FicmllbDI5LXMiLCJhIjoiY20yMnZvYnExMDJwNzJqcTV3d3J3cmUxdSJ9.fA3z9inzGxKvS2GC_rH20g';

const NewPostMap = () => {
  const { userLocation, isLoading } = useContext(PlacesContext);
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!userLocation || isLoading) return;

    if (!mapRef.current) {

      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: userLocation,
        zoom: 14,
      });

      new mapboxgl.Marker()
      .setLngLat(userLocation)
      .setPopup(new mapboxgl.Popup().setText("Tu ubicación actual"))
      .addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) mapRef.current.remove();
    };
  }, [userLocation, isLoading]);


  return (
    <div>
      <div ref={mapContainer} className="w-full h-screen"/>
    </div>
  );
};

const NewPostMapWithProvider = () => (
  <PlacesProvider>
    <NewPostMap />
  </PlacesProvider>
);

export default NewPostMapWithProvider;
