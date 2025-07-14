import { useParams } from "react-router-dom";
import PetInfo from "../components/DetailsPet/PetInfo";
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
    <div className="w-full max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <PetInfo
          name={post.name}
          age={post.pet_age}
          size={post.pet_size}
          location={post.location || "Desconocido"}
          dateLost={post.date_lost}
          gender={post.pet_gender}
          imageUrl={post.pictures?.[0]?.url}
        />
        <PetDescription
          description={post.pet_description}
          contact={post.contact || "Desconocido"}
        />
      </div>
    </div>
  </div>
  );
}

export default DetailsPublication;
