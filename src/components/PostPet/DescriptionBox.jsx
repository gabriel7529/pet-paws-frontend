import { usePetData } from '../../contexts/post/PetProvider';


const DescriptionBox = () => {
  const { petData, setPetData } = usePetData();

  const handleDescriptionChange = (e) => {
    setPetData({
      ...petData,
      pet_description: e.target.value,
    });
  };

  return (

      <div className="mb-4">
      <h3 className="mb-3 text-[#FF4146] font-medium">Descripción</h3>
      <textarea
        className="w-full p-2 border-2 border-[#FFB0A9] rounded-lg"
        maxLength="320"
        rows="4"
        value={petData.pet_description}
        onChange={handleDescriptionChange}
      ></textarea>
      <p className="text-right  text-sm text-[#FFB0A9]">{petData.pet_description.length}/320</p>
      </div>
  );
};

export default DescriptionBox;
