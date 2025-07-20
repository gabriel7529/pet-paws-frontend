import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useUser();
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Cerrar Sesión</h2>
      <button
        onClick={()=>{
          logout()
          navigate('/login')
        }}
        className="bg-red-500 text-white p-2 rounded"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Logout;
