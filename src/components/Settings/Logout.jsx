import { useTranslation } from 'react-i18next';
import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { t } = useTranslation();
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    logout();
    navigate('/login');
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">{t('logout')}</h2>
      <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">
        {t('logout')}
      </button>
    </div>
  );
};

export default Logout;
