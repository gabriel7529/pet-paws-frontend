import useAllPosts from "../../hooks/useAllPosts";
import useModal from "../../hooks/useModal";
import { useState } from "react";
import Modal from "./ui/Modal";
import EditPost from "./EditPost";

const Posts = () => {
  const { posts, loading, error, updatePost } = useAllPosts();
  const { isOpen, openModal, closeModal } = useModal();
  const [editPost, setEditPost] = useState(null);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts: {error.message}</div>;

  const handleEditClick = (post) => {
    setEditPost(post);
    openModal();
  };

  const petTypeToText = (petType) => {
    switch (petType) {
      case "DOG":
        return "Perro";
      case "CAT":
        return "Gato";
      case "BIRD":
        return "Ave";
      case "RABBIT":
        return "Conejo";
      default:
        return "Otro";
    }
  }

  const stateToText = (state) => {
    switch(state){
      case "LOST":
        return "Perdido";
      case "FOUND":
        return "Encontrado";
      case "ADOPTION":
        return "Adopción";
      case "ADOPTED":
        return "Adoptado";
      default:
        return "Otro";
    }
  }

  const stateClass = (state) => {
    switch(state){
      case "LOST":
        return "text-red-500";
      case "FOUND":
        return "text-green-500";
      case "ADOPTION":
        return "text-yellow-500";
      case "ADOPTED":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  }
  return (
    <div className="p-10">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 min-w-80">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th className="w-8">#</th>
            <th>Titulo</th>
            <th>Autor</th>
            <th>Nombre de mascota</th>
            <th>tipo</th>
            <th>Estado</th>
            <th>Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <tr
                key={post.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td>{index + 1}</td>
                <td>{post.title}</td>
                <td>{post.user?.email || "No email"}</td>
                <td>{post.pet.name}</td>
                <td>{petTypeToText(post.pet.petType)}</td>
                <td className={stateClass(post.state)}>{stateToText(post.state)}</td>
                <td>{post.createdAt}</td>
                <td>
                  <button
                    className="p-1 text-gray-700 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-400"
                    onClick={() => handleEditClick(post)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path d="M 19.171875 2 C 18.448125 2 17.724375 2.275625 17.171875 2.828125 L 16 4 L 20 8 L 21.171875 6.828125 C 22.275875 5.724125 22.275875 3.933125 21.171875 2.828125 C 20.619375 2.275625 19.895625 2 19.171875 2 z M 14.5 5.5 L 3 17 L 3 21 L 7 21 L 18.5 9.5 L 14.5 5.5 z"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No hay posts</td>
            </tr>
          )}
        </tbody>
      </table>
      <Modal isOpen={isOpen} onClose={closeModal} title="Editar post">
        {" "}
        {editPost && <EditPost post={editPost} onClose={closeModal} handleSaveClick={updatePost}/>} {""}
      </Modal>
    </div>
  );
};
export default Posts;
