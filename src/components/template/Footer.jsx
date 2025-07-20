import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logout clicked');
    navigate('/login');
  };

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-custom-250 flex px-5 sm:px-10 min-h-[70px]">
      <div className="container mx-auto">
        <div className="flex justify-around items-center w-full text-white mt-2">
          {/* Link a Feed */}
          <Link to="/feed" className="flex flex-col items-center">
            <svg className="h-[30px]" fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                 stroke="currentColor"
            >
              <title>paw</title>
              <path
                d="M8.35,3C9.53,2.83 10.78,4.12 11.14,5.9C11.5,7.67 10.85,9.25 9.67,9.43C8.5,9.61 7.24,8.32 6.87,6.54C6.5,4.77 7.17,3.19 8.35,3M15.5,3C16.69,3.19 17.35,4.77 17,6.54C16.62,8.32 15.37,9.61 14.19,9.43C13,9.25 12.35,7.67 12.72,5.9C13.08,4.12 14.33,2.83 15.5,3M3,7.6C4.14,7.11 5.69,8 6.5,9.55C7.26,11.13 7,12.79 5.87,13.28C4.74,13.77 3.2,12.89 2.41,11.32C1.62,9.75 1.9,8.08 3,7.6M21,7.6C22.1,8.08 22.38,9.75 21.59,11.32C20.8,12.89 19.26,13.77 18.13,13.28C17,12.79 16.74,11.13 17.5,9.55C18.31,8 19.86,7.11 21,7.6M19.33,18.38C19.37,19.32 18.65,20.36 17.79,20.75C16,21.57 13.88,19.87 11.89,19.87C9.9,19.87 7.76,21.64 6,20.75C5,20.26 4.31,18.96 4.44,17.88C4.62,16.39 6.41,15.59 7.47,14.5C8.88,13.09 9.88,10.44 11.89,10.44C13.89,10.44 14.95,13.05 16.3,14.5C17.41,15.72 19.26,16.75 19.33,18.38Z"/>
            </svg>
            <span>{t('feed')}</span>
          </Link>

          {/* Link a User Profile */}
          <Link to="/user/1" className="flex flex-col items-center"> {/* Cambia el "1" por el id de usuario dinámico */}
            <svg className="h-[30px]" fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                 stroke="currentColor"
            >
              <title>paw</title>
              <path
                d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"/>
            </svg>
            <span>{t('profile')}</span>
          </Link>

          {/* Botón para Logout */}
          <button onClick={handleLogout} className="flex flex-col items-center">
            <svg
              className="h-[30px] mb-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12h3m0 0l-4 4m4-4l-4-4m4 4H6"
              />
            </svg>
            <span>{t('logout')}</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
