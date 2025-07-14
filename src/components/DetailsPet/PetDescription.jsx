import PetMap from "./PetMap";
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const PetDescription = ({ description, contact }) => {
  const { t } = useTranslation();
  return (
      <div className="p-4 bg-[#f5e1dc] rounded-lg">
      <h2 className="text-xl font-bold mb-4"> {t("sharePet")}:</h2>
      <hr/>
      <p className="mb-4">
       {description}
      </p>
      <div className="text-center mb-4">
        <span className="block text-lg font-semibold">{t("contactPet")}:</span>
        <span className="block text-pink-500 text-lg font-bold">{contact}</span>
      </div>
      <PetMap />
    </div>
  );
};

PetDescription.propTypes = {
  description: PropTypes.string.isRequired,
  contact: PropTypes.string.isRequired,
};

export default PetDescription;
