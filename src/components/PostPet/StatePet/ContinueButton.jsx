import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ContinueButton = ({ onClick }) => {

  const navigate = useNavigate();
  const handleClick = () => {
    if (onClick) {
      onClick(); // Ejecuta cualquier otra lógica que venga de la función onClick
    }
    navigate('/post'); // Redirige a la página /post
  };

  return (
    <button
      className="bg-[#FF797D] text-white py-3 px-8 rounded-lg mt-4 w-full"
      onClick={handleClick}
    >
      Guardar
    </button>
  );
};

ContinueButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ContinueButton;
