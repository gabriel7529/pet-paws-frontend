import PetMap from "./PetMap";
import { useTranslation } from 'react-i18next';

const PetDescription = () => {
  const { t } = useTranslation();
  return (
      <div className="p-4 bg-[#f5e1dc] rounded-lg">
      <h2 className="text-xl font-bold mb-4"> {t("sharePet")}:</h2>
        <hr/>
      <p className="mb-4">
        Lleva un collar azul con una placa que tiene su nombre y un número de contacto. Tiene una pequeña cicatriz en la pata trasera derecha. Es muy amigable, pero puede estar asustado.
      </p>
      <div className="text-center mb-4">
        <span className="block text-lg font-semibold">{t("contactPet")}:</span>
        <span className="block text-pink-500 text-lg font-bold">+51 923900009</span>
      </div>
      <PetMap />
    </div>
  );
};

export default PetDescription;
