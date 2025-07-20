import { useState } from 'react';
import { Modal } from 'flowbite-react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const PetInfo = ({ name, size, age, location, dateLost, gender, imageUrl }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
    {/* Botón con el ícono de "info" para abrir el modal */}
    <button onClick={handleModalToggle} className="bg-transparent text-pink-500">
        <img src="/src/assets/img/Icons/info.svg" alt="info" className="w-8 h-8" />
    </button>

    <Modal show={isModalOpen} onClose={handleModalToggle}>
      <Modal.Header className="bg-[#ff797d]">
       <p className='text-white'> {t("petInfoTitle")} </p>

      </Modal.Header>

      <Modal.Body className="bg-[#ff797d] text-white">
    <div className="p-1">
      <h2 className="text-xl font-bold mb-2">{name}</h2>

      <div className="flex items-center mb-2">
        <img src="/src/assets/img/Icons/calendar.svg" alt="calendario" className="w-10 h-10 mr-2"></img>
        <p>{t("agePet")}: {age} {t("longTime")}</p>
      </div>


      <div className="flex items-center mb-2">
        <img src="/src/assets/img/Icons/rule.svg" alt="tamano" className="w-10 h-10 mr-2"></img>
        <p>{t("sizePet")}: {size}</p>
      </div>


      <div className="flex items-center mb-2">
      <img src="/src/assets/img/Icons/location.svg" alt="location" className="w-10 h-10 mr-2"></img>
        <p>{t("locatePet")}: {location}</p>
      </div>
      <div className="w-full h-auto flex items-center justify-center">
        <img
          src={imageUrl}
          alt="Dog"
          className="max-w-full h-auto rounded-lg mx-4"
        />
      </div>

      <div className="flex items-center mb-2 mt-4">
        <img src="/src/assets/img/Icons/calendar_number.svg" alt="calendar_number" className="w-10 h-10 mr-2"></img>
        <p>{t("datePet")}: {dateLost}</p>
      </div>

      <div className="flex items-center mb-2">
        <img src="/src/assets/img/Icons/gender.svg" alt="gender" className="w-10 h-10 mr-2"></img>
        <p> {t("genderPet")}: {gender}</p>
      </div>
    </div>
    </Modal.Body>
    </Modal>
    </>
  );
};

PetInfo.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  dateLost: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
};

export default PetInfo;
