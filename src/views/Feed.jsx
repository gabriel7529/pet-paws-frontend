import {useEffect, useState} from 'react';
import {fetchPosts} from '../services/posts';
import CardPostPet from '../components/DetailsPet/CardPostPet';
import {useNavigate, useParams, Link} from 'react-router-dom';
import ModalFormulario from '../components/PublicForm';
import {useTranslation} from 'react-i18next';
import pawPlusSVG from "../assets/img/Icons/SVG/3pawplus.svg";

import { fetchUsers } from '../services/users.js';

const Feed = () => {
  const {filter} = useParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const {t} = useTranslation();
  const showFilters = filter === "true"
  const [searchParams, setSearchParams] = useState({
    name: '',
    pet_type: '',
    pet_gender: ''
  });

  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState(null);
  const toggleModal = () => setModalOpen(!isModalOpen);
  const loadPosts = async (params = {}) => {
    const postsData = await fetchPosts(params);
    setPosts(postsData);
  };

  const loadUsers = async () => {
    const usersData = await fetchUsers();
    setUsers(usersData);
  }

  useEffect(() => {
    loadPosts();
    loadUsers();
  }, []);

  const handleSearch = (e) => {
    const {name, value} = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    loadPosts(searchParams);
  }, [searchParams]);

  return (
    <>
      <div className="flex justify-center items-center h-20 space-x-2 px-5 border-b-2 border-custom-200">
        <div className="w-1/2">
          <button
            className="bg-custom-250 text-white px-4 py-2 rounded-xl w-full h-full"
          >
            {'Para ti'}
          </button>
        </div>
        <div className="w-1/2">
          <button
            className="bg-transparent text-custom-250 px-4 py-2 w-full h-full text-2xl"
          >
            {'Siguiendo'}
          </button>
        </div>
      </div>
      <div className="mx-10">
        {showFilters && (
          <div className="mb-4">
            <input
              type="text"
              className="border p-2 w-full mb-4"
              placeholder="Search by name"
              name="name"
              value={searchParams.name}
              onChange={handleSearch}
            />
            <input
              type="text"
              className="border p-2 w-full mb-4"
              placeholder="Search by pet type"
              name="pet_type"
              value={searchParams.pet_type}
              onChange={handleSearch}
            />
            <input
              type="text"
              className="border p-2 w-full mb-4"
              placeholder="Search by gender"
              name="pet_gender"
              value={searchParams.pet_gender}
              onChange={handleSearch}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {posts.length > 0 && posts.map((post) => {

          const user = users.find(u => u.id === post.userId);
          const userAvatar = user ? user.avatar : "/public/img/users/default.jpg";

          return (
            <div key={post.id} className="relative" onClick={() => navigate(`/pet/${post.id}`)}>
                <CardPostPet
                  name={post.pet.name}
                  description={post.description}
                  imageUrl={post.pet.imageUrl}
                  imageUser={userAvatar}
                  handleModalToggle={toggleModal}
                  t={t}
                  post={post}
                />
            </div>
          );
        })}
      </div>
      <Link to={`/post`}>
        <button
          className="fixed w-[74px] h-[74px] bottom-[100px] right-4 bg-custom-250 text-white p-3 rounded-full shadow-lg hover:bg-custom-300 focus:outline-none">
          <img src={pawPlusSVG} className="w-full mx-auto" alt="Foto"/>
        </button>
      </Link>
      {isModalOpen && (
        <ModalFormulario
          post={selectedPost}
          onClose={() => {
            setModalOpen(false);
            setSelectedPost(null);
            loadPosts();
          }}
        />
      )}
    </>
  );
};


export default Feed;

