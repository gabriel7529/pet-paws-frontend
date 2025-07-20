import { useState } from "react";
import { createComment } from "../../services/comment";
import PropTypes from "prop-types";


const InputWithIcon = ({ postId, setComentarios }) => {
  const [texto, setTexto] = useState("");
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear el nuevo comentario
    const nuevoComentario = {
      post_id: postId,
      user_id: user.id,
      text: texto,
      timestamp: new Date().toISOString(),
    };

    createComment(nuevoComentario)
      .then((data) => {

        setComentarios((prevComentarios) => [...prevComentarios, data]);
        setTexto("");
      })
      .catch((error) => console.error("Error al agregar comentario:", error));
  };
  return (
    <div className="flex items-center p-3 bg-red-100 rounded-9 w-full">
      <input
        type="text"
        placeholder="Escribe un comentario..."
        className="bg-transparent flex-1 outline-none border-none	 text-red-500 placeholder-red-300"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />

      {/* Emoji */}
      <button className="flex items-center justify-center text-red-500 mr-2">
        <img src="/src/assets/img/Icons/icon_happy.svg" className="w-8 h-8"/>
      </button>

      {/* Botón con flecha */}
      <button  onClick={handleSubmit} className="flex items-center justify-center text-red-500">
      <img src="/src/assets/img/Icons/submit_message.svg" className="w-8 h-8"/>
      </button>
    </div>
  );
};

InputWithIcon.propTypes = {
  postId: PropTypes.string.isRequired,
  setComentarios: PropTypes.func.isRequired

};

export default InputWithIcon;
