import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // Para la redirección

const ActionButton = ({ text, icon, redirectTo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (redirectTo) {
      navigate(redirectTo);
    }
  };

  return (
    <div
      className="flex items-center justify-between bg-[#FFB0A9] p-2 rounded-lg mb-2 cursor-pointer"
      onClick={handleClick}
    >
      {/* Contenido: Icono, Texto y Flecha */}
      <div className="flex items-center space-x-2">
        {icon && (
          <img
            src={icon} // Usa la ruta del icono
            alt="icon"
            className="w-9 h-9"
          />
        )}
        <span className="text-white text-lg">{text}</span>
      </div>

      {/* Flecha a la derecha */}
      <img
        src="/src/assets/img/Icons/row-right.svg" // Ruta corregida del SVG
        alt="arrow"
        className="w-4 h-4"
      />
    </div>
  );
};

ActionButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string, // Ahora es un string que representa la ruta de la imagen
  redirectTo: PropTypes.string
};

export default ActionButton;
