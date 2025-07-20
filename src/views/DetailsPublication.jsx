import { useParams } from "react-router-dom";
//import PetInfo from "../components/DetailsPet/PetInfo";
import PetDescription from "../components/DetailsPet/PetDescription";
import { useGetPost } from "../hooks/useGetPosts";


const DetailsPublication = () =>{
  const { id } = useParams(); // Obtener el ID de la publicación de la URL
  const { post, loading, error } = useGetPost(id); // Usamos el hook personalizado

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex place-content-evenly items-center">
    <div className="w-full max-w-4xl h-full">
      <PetDescription
          id={id}
          description={post.pet_description}
          name={post.name || "Desconocido"}
          imageUrl={post.picture}
          //imageUrl={post.pictures?.[0]?.url}
      />
    </div>
  </div>
  );
}

export default DetailsPublication;
