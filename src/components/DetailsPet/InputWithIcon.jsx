import { useState } from "react";
import PropTypes from "prop-types";
import socket from "../../services/socket";

const InputWithIcon = ({ postId, setComentarios }) => {
  const [texto, setTexto] = useState("");
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear el nuevo comentario
    const nuevoComentario = {
      postId: Number(postId)  ,
      userId: user.id,
      content: texto,
      timestamp: new Date().toISOString(),
    };

    socket.emit('newComment', nuevoComentario);
    setComentarios((prevComentarios) => [...prevComentarios, nuevoComentario]);

    setTexto("");
  };
  return (
    <div className="flex items-center p-3 bg-red-100 rounded-9 w-full">
      <input
        type="text"
        placeholder="Escribe un comentario..."
        className="bg-transparent flex-1 outline-none border-none	text-red-500 placeholder-red-300"
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
  setComentarios: PropTypes.func

};
export default InputWithIcon;
