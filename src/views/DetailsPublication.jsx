import {useParams} from "react-router-dom";

import PetDescription from "../components/DetailsPet/PetDescription";
import {useGetPost} from "../hooks/useGetPosts";
import {useGetUser} from "../hooks/useGetUser";
import SectionCommets from "../components/DetailsPet/SectionCommets.jsx";


const DetailsPublication = () => {
  const {id} = useParams();
  const {post, loading, error} = useGetPost(id);
  const { user } = useGetUser(post?.userId);
  if (loading) {
    return <div>Cargando...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
      <div className=" flex justify-center flex w-full h-3/4 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
          <PetDescription
            id={id}
            description={post.description}
            name={post.pet.name || "Desconocido"}
            imageUrl={post.pet.imageUrl}
            imageUser={user.avatar}  className="flex-grow"
            postData ={post}
          />
          {/*<SavePost post={post} pos_x={300} pos_y={50}/>*/}
          <SectionCommets postId={id} />
        </div>
      </div>
  );
}

export default DetailsPublication;
