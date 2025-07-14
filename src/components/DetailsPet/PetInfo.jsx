
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const PetInfo = ({ name, size, age, location, dateLost, gender, imageUrl }) => {
  const { t } = useTranslation();
  return (
    <div className="p-4 bg-[#f5e1dc] rounded-lg">
      <h2 className="text-xl font-bold mb-4">{name}</h2>

      <div className="flex items-center mb-2">
        <img src="/src/assets/img/Icons/calendar.svg" alt="calendario" className="w-5 h-5 mr-2"></img>
        <p>{t("nameLabel")}: {age} {t("longTime")}</p>
      </div>


      <div className="flex items-center mb-2">
        <img src="/src/assets/img/Icons/rule.svg" alt="tamano" className="w-5 h-5 mr-2"></img>
        <p>{t("sizePet")}: {size}</p>
      </div>


      <div className="flex items-center mb-2">
      <img src="/src/assets/img/Icons/location.svg" alt="location" className="w-5 h-5 mr-2"></img>
        <p>{t("locatePet")}: {location}</p>
      </div>
      <div className="w-full h-48 flex items-center justify-center bg-[#ffaca4]">
        <img
          src={imageUrl}
          alt="Dog"
          className="w-24 h-24"
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

      <div className="flex justify-between mt-4">
        <button className="bg-pink-500 text-white px-4 py-2 rounded-lg">
          <img src="/src/assets/img/Icons/share2.svg" className="w-5 h-5 mr-2"/>
          {t("sharePet")}
        </button>

        <button className="bg-pink-500 text-white px-4 py-2 rounded-lg">
        <img src="/src/assets/img/Icons/message.svg" alt="compartir" className="w-5 h-5 mr-2"/>
        {t("commentPet")}
        </button>
      </div>
    </div>
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
