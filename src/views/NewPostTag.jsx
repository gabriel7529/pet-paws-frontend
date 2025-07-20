import ContinueButton from "../components/PostPet/StatePet/ContinueButton";
import InputWithRow from "../components/PostPet/StatePet/InputWithRow";

const NewPostTag = () => {
  return (
    <div className="max-w-[375px] mx-auto p-4">

      <InputWithRow placeholderText="Coloca aquí tus etiquetas" />
      <ContinueButton />
    </div>
  );
};

export default NewPostTag;
