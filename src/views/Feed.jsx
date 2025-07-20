import { useEffect, useState } from 'react';

import { fetchPosts } from '../services/posts';
import CardPostPet from '../components/DetailsPet/CardPostPet';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from "flowbite-react"; // Asegúrate de importar Button desde flowbite
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const { t } = useTranslation();

  const toggleModal = () => setModalOpen(!isModalOpen);
  const navigate = useNavigate(); // Inicializar useNavigate

  const handleRedirect = () => {
    navigate("/post");
  }


  useEffect(() => {
    const loadPosts = async () => {
      const postsData = await fetchPosts();
      setPosts(postsData);
    };
    loadPosts();
  }, []);
  return (
    <>
    <div className="mx-10">

    <Button className="bg-[#fca5a5] text-black" onClick={handleRedirect}>
        {t("functionButton")}
      </Button>
    </div>



    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {posts.map((post) => (
        <Link to={`/pet/${post.id}`} key={post.id}>
          <CardPostPet
            name={post.name}
            description={post.description}
            //imageUrl={post.pictures?.[0]?.url}
            imageUrl={post.picture}
            t={(key) => key}
            handleModalToggle={toggleModal}
          />
        </Link>
      ))}
    </div>
    </>
  );
};


export default Feed;

