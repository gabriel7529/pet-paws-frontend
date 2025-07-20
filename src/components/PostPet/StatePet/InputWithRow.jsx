import { useState } from "react";
import PropTypes from "prop-types";

const InputWithRow = ({ placeholderText, onTagsChange }) => {
  const [texto, setTexto] = useState(""); // Solo mantenemos el texto del input

  const handleAddTag = () => {
    if (texto.trim()) {
      onTagsChange(texto.trim()); // Llamamos a onTagsChange con el nuevo tag
      setTexto(""); // Limpiamos el input después de agregar la etiqueta
    }
  };

  return (
    <div className="flex items-center p-3 bg-white rounded-9 w-full border-2 border-[#FFB0A9] rounded-lg">
      <input
        type="text"
        placeholder={placeholderText}
        className="bg-transparent flex-1 outline-none border-none text-black-500 placeholder-[#FF4146]"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />

      {/* Botón con flecha para agregar etiqueta */}
      <button onClick={handleAddTag} className="flex items-center justify-center text-red-500">
        <img src="/src/assets/img/Icons/submit_message.svg" className="w-8 h-8"/>
      </button>
    </div>
  );
};

InputWithRow.propTypes = {
  placeholderText: PropTypes.string.isRequired,
  onTagsChange: PropTypes.func.isRequired, // Asegúrate de que la función sea requerida
};

export default InputWithRow;

