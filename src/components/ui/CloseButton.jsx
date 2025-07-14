import { useNavigate } from "react-router-dom";

const CloseButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  }
  return (
    <button onClick={handleClick} className="register__close w-full flex justify-end text-custom-50" >
      X
    </button>
  );
};
export default CloseButton;
