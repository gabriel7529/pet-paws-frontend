import { useEffect, useState } from "react";

import Comentario from "./Comentario";
import InputWithIcon from "./InputWithIcon";
import { fetchCommentsByPost } from "../../services/comment";
import PropTypes from "prop-types";
import { fetchUsers } from "../../services/users";
import socket from "../../services/socket";


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

        const usuariosMap = usersData.reduce((map, user) => {
          map[user.id] = user;
          return map;
        }, {});

        //console.log(usuariosMap);
        setUsuarios(usuariosMap);
      } catch (error) {
        console.error("Error al cargar comentarios o usuarios:", error);
      }
    }
    loadCommentsAndUsers();
       // Escucha el evento de nuevo comentario
    socket.on('commentAdded', (newComment) => {
      setComentarios((prevComentarios) => [newComment, ...prevComentarios]);
    });

    // Limpiar evento al desmontar
    return () => {
      socket.off('commentAdded');
    };
  }, [postId]);

  return (
    <div className="px-5">
       <div className="overflow-auto max-h-80">
          {comentarios.length > 0 ? (
            comentarios.map((comentario, index) => (
              <Comentario
                key={comentario.id || `temp-${index}`}
                avatar={ usuarios[comentario.userId] ? usuarios[comentario.userId].avatar : "/src/assets/img/Icons/avatar_placeholder.svg"}
                nombre={usuarios[comentario.userId] ? usuarios[comentario.userId].name : `Usuario ${comentario.userId}`}
                tiempo={comentario.createdAt ? new Date(comentario.createdAt).toLocaleString() : new Date().toLocaleString()}
                texto={comentario.content}
              />
            ))
          ):(
            <p className="flex items-center">No hay comentarios. ¿Quieres ser el primero?</p>
          )
        }
        </div>
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
