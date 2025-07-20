import PropTypes from "prop-types";
import PetInfo from "./PetInfo";
import SavePost from "../PostPet/SavePost"

import { Link } from "react-router-dom";

const CardPostPet = ({ name, description, imageUrl, imageUser, t, handleModalToggle, post }) => {

  return (
    <>
        {/* Primera Columna: Avatar, Descripción, Imagen, Botones */}
        <div className="flex flex-col p-3 bg-white rounded-lg">
          {/* Avatar y Descripción */}
          <div className="flex flex-wrap p-3 bg-white rounded-lg">
            {/* Avatar */}
            <div className="w-12 h-12 bg-[#ffa4a4] rounded-full flex items-center justify-center mr-2">
              <Link to={`/user/${post.userId}`}>
                  <img
                    src={imageUser || "/src/assets/img/Icons/avatar_placeholder.svg" }
                    alt="avatar"
                    className="w-full h-full rounded-full"
                  />
              </Link>
              </div>
            <div className="flex-1">
              {/* Nombre y opciones */}
              <div className="flex flex-wrap justify-between items-center">
                <div className="flex items-center">
                  <h2 className="text-lg font-bold text-pink-400 mr-2">{name}</h2>
                  <button className="text-pink-500 font-semibold">
                    {t("followLabel")}
                  </button>
                </div>
                {/* Contenido momentáneo, la hora de publicación */}
                <div className="flex items-center mt-2 md:mt-0">
                  <span className="text-gray-500 text-sm">{new Date(post.pet.createdAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })} </span>
                  <button className="ml-2 text-gray-500">
                    <img
                      src="/src/assets/img/Icons/more_options.svg"
                      alt="more"
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </div>

              {/* Descripción */}
              <p className="text-gray-700 text-m mt-4">{description}</p>
            </div>
          </div>

          {/* Contenedor de la imagen */}
          <div className="w-full flex items-center justify-center my-10">
            <div className="w-full max-w-[90%] h-auto flex items-center justify-center rounded-lg mx-4 relative">
              <img
                src={imageUrl}
                alt="Pet"
                className="w-full h-auto object-cover rounded-lg mx-4"
              />
              <SavePost post={post} pos_x={30} pos_y={20}/>
            </div>

          </div>


          {/* Botones debajo de la imagen */}
          <div className="flex justify-around mt-2">
            <button className="flex items-center bg-transparent text-pink-500">
              <img
                src="/src/assets/img/Icons/comment.svg"
                alt="comment"
                className="w-12 h-12"
              />
            </button>
            <PetInfo
              name={name}
              size= {post.pet.size}
              age= {post.pet.age}
              location= "Madrid"
              dateLost={new Date(post.pet.createdAt).toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
              gender= {post.pet.gender}
              imageUrl={imageUrl}
            />
            <button className="flex items-center bg-transparent text-pink-500">
              <img
                src="/src/assets/img/Icons/location_pink.svg"
                alt="location"
                className="w-12 h-12"
              />
            </button>
            <button
              className="flex items-center bg-transparent text-pink-500"
              onClick={handleModalToggle}
            >
              <img
                src="/src/assets/img/Icons/share.svg"
                alt="share"
                className="w-12 h-12"
              />
            </button>
          </div>
          <br />
          <hr className="border-solid border-1 border-[#FF797D]" />
        </div>
    </>
  );
};

CardPostPet.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  handleModalToggle: PropTypes.func.isRequired,
  imageUser: PropTypes.string,
  post: PropTypes.object.isRequired
};

export default CardPostPet;
