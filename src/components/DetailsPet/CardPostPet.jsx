import PropTypes from "prop-types";
import PetInfo from "./PetInfo";

const CardPostPet = ({ name, description, imageUrl, t, handleModalToggle }) => {
  return (
    <>
        {/* Primera Columna: Avatar, Descripción, Imagen, Botones */}
        <div className="flex flex-col p-3 bg-white rounded-lg">
          {/* Avatar y Descripción */}
          <div className="flex flex-wrap p-3 bg-white rounded-lg">
            {/* Avatar */}
            <div className="w-12 h-12 bg-[#ffa4a4] rounded-full flex items-center justify-center mr-2">
              <img
                src="/src/assets/img/Icons/avatar_placeholder.svg"
                alt="avatar"
                className="w-8 h-8"
              />
            </div>
            <div className="flex-1">
              {/* Nombre y opciones */}
              <div className="flex flex-wrap justify-between items-center">
                <div className="flex items-center">
                  <h2 className="text-lg font-bold mr-2">{name}</h2>
                  <button className="text-pink-500 font-semibold">
                    {t("followLabel")}
                  </button>
                </div>
                {/* Contenido momentáneo, la hora de publicación */}
                <div className="flex items-center mt-2 md:mt-0">
                  <span className="text-gray-500 text-sm">50 min</span>
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
              <p className="text-gray-700 text-sm mt-2">{description}</p>
            </div>
          </div>

          {/* Contenedor de la imagen */}
          <div className="w-full flex items-center justify-center my-10">
            <div className="w-full max-w-[90%] md:max-w-auto h-auto flex items-center justify-center bg-[#ffaca4]">
              <img
                src={imageUrl}
                alt="Pet"
                className="max-w-full h-auto object-cover rounded-lg mx-4"
              />
            </div>
          </div>

          {/* Botones debajo de la imagen */}
          <div className="flex justify-around mt-2">
            <button className="flex items-center bg-transparent text-pink-500">
              <img
                src="/src/assets/img/Icons/comment.svg"
                alt="comment"
                className="w-8 h-8 mr-2"
              />
            </button>
            <PetInfo
              name={name}
              size="Mediano"
              age="2"
              location="Madrid"
              dateLost="01/09/2024"
              gender="Macho"
              imageUrl={imageUrl}
            />
            <button className="flex items-center bg-transparent text-pink-500">
              <img
                src="/src/assets/img/Icons/location_pink.svg"
                alt="location"
                className="w-8 h-8 mr-2"
              />
            </button>
            <button
              className="flex items-center bg-transparent text-pink-500"
              onClick={handleModalToggle}
            >
              <img
                src="/src/assets/img/Icons/share.svg"
                alt="share"
                className="w-8 h-8 mr-2"
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
};

export default CardPostPet;
