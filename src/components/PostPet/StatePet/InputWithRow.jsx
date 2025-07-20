import { useState } from "react";

import PropTypes from "prop-types";


const InputWithRow = ({placeholderText}) => {
  const [texto, setTexto] = useState("");

  return (
    <div className="flex items-center p-3 bg-white rounded-9 w-full border-2 border-[#FFB0A9] rounded-lg">
      <input
        type="text"
        placeholder={placeholderText}
        className="bg-transparent flex-1 outline-none border-none	text-black-500 placeholder-[#FF4146]"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />


      {/* Botón con flecha */}
      <button   className="flex items-center justify-center text-red-500">
      <img src="/src/assets/img/Icons/submit_message.svg" className="w-8 h-8"/>
      </button>
    </div>
  );
};

InputWithRow.propTypes = {
  placeholderText: PropTypes.string.isRequired

};

export default InputWithRow;
