import PropTypes from "prop-types";
import PetInfo from "./PetInfo";
import SavePost from "../PostPet/SavePost";
import PetMap from "./PetMap";

import { Link } from "react-router-dom";

const CardPostPet = ({ name, description, imageUrl, imageUser, t, handleModalToggle, post }) => {
  return (
    <>
      {/* Contenedor principal */}
      <div className="flex flex-col p-3 bg-white rounded-lg w-full max-w-screen-lg mx-auto">
        {/* Primera sección: Avatar y descripción */}
        <div className="flex flex-wrap items-start p-3 bg-white rounded-lg gap-3">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full flex items-center justify-center mr-2">
            <Link to={`/user/${post.userId}`}>
              <img
                src={imageUser || "/src/assets/img/Icons/avatar_placeholder.svg"}
                alt="avatar"
                className="w-full h-full rounded-full"
              />
            </Link>
          </div>
          {/* Información del usuario y descripción */}
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-pink-400">{name}</h2>
                <button className="text-pink-500 font-semibold">{t("followLabel")}</button>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <span>
                  {new Date(post.pet.createdAt).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </span>
                <button className="ml-2">
                  <img
                    src="/src/assets/img/Icons/more_options.svg"
                    alt="more"
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </div>
            <p className="text-gray-700 text-m mt-4">{description}</p>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex items-center justify-center my-10 relative z-0">
          <div className="w-full h-auto max-w-screen-md rounded-lg mx-4 relative">
            <img
              src={imageUrl}
              alt="Pet"
              className="w-full h-96 object-cover rounded-lg"
            />
            <SavePost post={post} pos_x={30} pos_y={20} />
          </div>
        </div>

        {/* Botones y acciones */}
        <div className="flex justify-around items-center mt-2 gap-3 flex-wrap">
          <button className="flex items-center bg-transparent text-pink-500">
            <img
              src="/src/assets/img/Icons/comment.svg"
              alt="comment"
              className="w-10 h-10"
            />
          </button>
          <PetInfo
            name={name}
            size={post.pet.size}
            age={post.pet.age}
            location={post.location}
            dateLost={new Date(post.pet.createdAt).toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            gender={post.pet.gender}
            imageUrl={imageUrl}
          />
          <PetMap
            longitude={post.pet.sightings.longitude}
            latitude={post.pet.sightings.latitude}
          />
          <button
            className="flex items-center bg-transparent text-pink-500"
            onClick={handleModalToggle}
          >
            <img
              src="/src/assets/img/Icons/share.svg"
              alt="share"
              className="w-10 h-10"
            />
          </button>
        </div>
        <hr className="border-t border-pink-400 mt-4" />
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
  post: PropTypes.object.isRequired,
};

export default CardPostPet;
