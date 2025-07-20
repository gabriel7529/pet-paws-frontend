import { useEffect, useState } from "react";
import Comentario from "./Comentario";
import InputWithIcon from "./InputWithIcon";
import { fetchCommentsByPost } from "../../services/comment";
import PropTypes from "prop-types";
import { fetchUsers } from "../../services/users";



const SectionCommets = ({ postId }) => {
  const [comentarios, setComentarios] = useState([]);
  const [usuarios, setUsuarios] = useState({});

  useEffect(() => {
    const loadCommentsAndUsers = async () => {

      try {
        // Carga comentarios
        const commentsData = await fetchCommentsByPost(postId);
        if (Array.isArray(commentsData)) {
          setComentarios(commentsData);
        } else {
          setComentarios([]);
        }

        // Carga usuarios
        const usersData = await fetchUsers();
        const usuariosMap = {};
        usersData.forEach(usuario => {
          usuariosMap[usuario.id] = usuario; // Mapea los usuarios por su ID
        });
        setUsuarios(usuariosMap);
      } catch (error) {
        console.error("Error al cargar comentarios o usuarios:", error);
      }
    }
      loadCommentsAndUsers();
    }, [postId]);


  return (
    <div className="px-4">
      {comentarios.length > 0 ? (
        comentarios.map((comentario) => (
          <Comentario
            key={comentario.id}
            avatar="/src/assets/img/Icons/avatar_placeholder.svg"
            nombre={usuarios[comentario.user_id] ? usuarios[comentario.user_id].username : `Usuario ${comentario.user_id}`}
            tiempo={new Date(comentario.timestamp).toLocaleString()}
            texto={comentario.text}
          />
        ))
      ):(
        <p className="flex items-center">No hay comentarios. ¿Quieres ser el primero?</p>
      )
     }
      <hr className="border-solid border-1 border-[#FF797D]" />
      <br />
      <InputWithIcon postId={postId} setComentarios={setComentarios} />
    </div>
  );
};

SectionCommets.propTypes = {
  postId: PropTypes.string.isRequired

};

export default SectionCommets;
