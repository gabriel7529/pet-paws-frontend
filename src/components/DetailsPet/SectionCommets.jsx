import { useEffect, useState } from "react";
import Comentario from "./Comentario";
import InputWithIcon from "./InputWithIcon";
import { fetchCommentsByPost } from "../../services/comment";
import PropTypes from "prop-types";



const SectionCommets = ({ postId }) => {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {

    fetchCommentsByPost(postId)
      .then((data) => setComentarios(data))
      .catch((error) => console.error("Error al cargar comentarios:", error));
  }, [postId]);

  return (
    <div className="px-4">
      {comentarios.map((comentario) => (
        <Comentario
          key={comentario.id}
          avatar="/src/assets/img/Icons/avatar_placeholder.svg"
          nombre={`Usuario ${comentario.user_id}`}
          tiempo={new Date(comentario.timestamp).toLocaleString()}
          texto={comentario.text}
        />
      ))}
      <hr className="border-solid border-1 border-[#FF797D]" />
      <br />
      <InputWithIcon postId={postId} setComentarios={setComentarios} />
    </div>
  );
};

SectionCommets.propTypes = {
  postId: PropTypes.number.isRequired

};

export default SectionCommets;
