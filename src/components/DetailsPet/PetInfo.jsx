
import { useTranslation } from 'react-i18next';

const PetInfo = () => {
  const { t } = useTranslation();
  return (
    <div className="p-4 bg-[#f5e1dc] rounded-lg">
      <h2 className="text-xl font-bold mb-4">Miguel</h2>

      <div className="flex items-center mb-2">
        <img src="/src/assets/img/Icons/calendar.svg" alt="calendario" className="w-5 h-5 mr-2"></img>
        <p>{t("nameLabel")}: 2 {t("longTime")}</p>
      </div>


      <div className="flex items-center mb-2">
        <img src="/src/assets/img/Icons/rule.svg" alt="tamano" className="w-5 h-5 mr-2"></img>
        <p>{t("sizePet")}: Mediano</p>
      </div>


      <div className="flex items-center mb-2">
      <img src="/src/assets/img/Icons/location.svg" alt="location" className="w-5 h-5 mr-2"></img>
        <p>{t("locatePet")}: Pueblo Joven</p>
      </div>
      <div className="w-full h-48 flex items-center justify-center bg-[#ffaca4]">
        <img
          src="https://img.icons8.com/ios-filled/100/dog--v1.png"
          alt="Dog"
          className="w-24 h-24"
        />
      </div>

      <div className="flex items-center mb-2 mt-4">
        <img src="/src/assets/img/Icons/calendar_number.svg" alt="calendar_number" className="w-10 h-10 mr-2"></img>
        <p>{t("datePet")}: 20/16/2024 10:00</p>
      </div>

      <div className="flex items-center mb-2">
        <img src="/src/assets/img/Icons/gender.svg" alt="gender" className="w-10 h-10 mr-2"></img>
        <p> {t("genderPet")}: Masculino</p>
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

export default PetInfo;
