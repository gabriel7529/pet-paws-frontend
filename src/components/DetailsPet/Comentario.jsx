import PropTypes from "prop-types";

const Comentario = ({ avatar, nombre, tiempo, texto }) => {
  return (
    <div className="flex items-start p-4 my-6 bg-red-100 rounded-lg ">
      {/* Avatar */}
      <div className="w-12 h-12 bg-[#ffa4a4] rounded-full flex items-center justify-center mr-4">
        <img src={avatar} alt="avatar" className="w-6 h-6" />
      </div>

      {/* Contenido */}
      <div className="flex-1">
        {/* Encabezado */}
        <div className="flex justify-between items-center">
          <h2 className="text-red-500 font-semibold text-base">{nombre}</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-red-400">{tiempo}</span>
            <button className="text-red-400">
              <svg
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <circle cx="3" cy="10" r="2" />
                <circle cx="10" cy="10" r="2" />
                <circle cx="17" cy="10" r="2" />
              </svg>
            </button>
          </div>
        </div>

        {/* Texto del comentario */}
        <p className="text-red-400 text-sm mt-1">{texto}</p>
      </div>
    </div>
  );
};

Comentario.propTypes = {
  avatar: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  tiempo: PropTypes.string.isRequired,
  texto: PropTypes.string.isRequired,
};

export default Comentario;
