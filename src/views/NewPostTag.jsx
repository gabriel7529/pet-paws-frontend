import ContinueButton from "../components/PostPet/StatePet/ContinueButton";
import InputWithRow from "../components/PostPet/StatePet/InputWithRow";
import { usePetData } from "../hooks/usePetData";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const NewPostTag = () => {
  const { petData, setPetData } = usePetData();
  const [tags, setTags] = useState(petData.tags || []); // Estado de tags global
  const { t } = useTranslation();

  const handleTagsChange = (newTag) => {
    if (newTag && !tags.includes(newTag)) {
      setTags((prevTags) => [...prevTags, newTag]); // Actualiza el array de tags
    }
  };

  const handleContinue = () => {
    setPetData({
      ...petData,
      tags, // Guarda las etiquetas en el petData
    });
    console.log("petData con tags actualizado:", petData);
  };

  const handleRemoveTag = (indexToRemove) => {
    setTags((prevTags) => prevTags.filter((_, index) => index !== indexToRemove)); // Elimina una etiqueta
  };

  return (
    <div className="max-w-[375px] mx-auto p-4">
      <InputWithRow
        placeholderText={t("insertTagsLabel")}
        onTagsChange={handleTagsChange} // Pasamos la función para actualizar los tags
      />

      {/* Lista de etiquetas */}
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div key={index} className="bg-red-100 text-red-500 px-2 py-1 rounded-full flex items-center">
            <span>{tag}</span>
            <button
              onClick={() => handleRemoveTag(index)}
              className="ml-2 text-red-700 font-bold"
            >
              x
            </button>
          </div>
        ))}
      </div>

      <ContinueButton onClick={handleContinue} />
    </div>
  );
};

export default NewPostTag;
