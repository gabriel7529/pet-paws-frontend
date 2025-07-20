import { useState } from "react";
import { Modal } from "flowbite-react";
import PropTypes from "prop-types";
import Map, { Marker } from "react-map-gl";

const mapToken = import.meta.env.VITE_MAPBOXGL_TOKEN;

const PetMap = ({ latitude, longitude }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <button onClick={handleModalToggle} className="bg-transparent text-pink-500">
        <img
          src="/src/assets/img/Icons/location_pink.svg"
          alt="location icon"
          className="w-10 h-10"
        />
      </button>

      <Modal show={isModalOpen} onClose={handleModalToggle}>
        <Modal.Header className="bg-[#ff797d]">
          <p className="text-white">Ubicación del perrito</p>
        </Modal.Header>
        <Modal.Body className="bg-[#ff797d] text-white">
          <div className="w-full h-[400px] rounded-lg overflow-hidden">
            <Map
              initialViewState={{
                latitude: latitude,
                longitude: longitude,
                zoom: 14,
              }}
              style={{ width: "100%", height: "100%" }}
              mapStyle="mapbox://styles/mapbox/streets-v12"
              mapboxAccessToken={mapToken}
            >
              <Marker latitude={latitude} longitude={longitude} color="red" />
            </Map>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

PetMap.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
};

export default PetMap;
