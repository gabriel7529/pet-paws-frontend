import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher"
import { useTranslation } from 'react-i18next'

const Login = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validatePassword = (password) => {
    return password.length >= 8;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
      setError(t("incorrectLogin"));
      return;
    }
    console.log(formData);
    // Navegar a la siguiente página si la validación es exitosa
    navigate('/description');
  };
  return(
    <>
      <div className="h-screen bg-custom-50 flex flex-col items-center justify-center">
        <div className="register w-full max-w-md p-6 flex flex-col items-center relative h-full">
          <LanguageSwitcher/>
          <h2 className="register__title text-custom-250 p-4 font-semibold text-3xl p-8">
            {t('loginTitle')}
          </h2>
          <form
            className="register__form flex flex-col items-center w-full"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="register__input border-2 border-custom-250 p-2 w-full mb-4 rounded-xl placeholder-custom-250 font-normal text-base text-custom-250"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
              placeholder={t("loginAccount")}
            />
            <input
              type="password"
              className="register__input border-2 border-custom-250 p-2 w-full mb-4 rounded-xl placeholder-custom-250 font-normal text-base text-custom-250"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder={t("password")}
            />
            {error && <p className="error text-custom-250">{error}</p>}
            <button
              className="register__button bg-custom-250 w-full p-2 mb-4 mt-4 border-2 border-custom-250 rounded-xl text-custom-50 shadow-lg shadow-custom-300"
              type="submit"
            >
              {t("login")}
            </button>
          </form>
          <div className="register__footer flex text-custom-50">
            <p>

              <a href="/todo" className="pl-1 text-custom-300 font-semibold">
                {t("forgotPassword")}
              </a>
            </p>
          </div>
          <button onClick={()=>{
            navigate('/signup');
          }} className="login__register-button bg-custom-150 w-full p-2 mb-4 mt-4 border-2 border-custom-50 rounded-xl text-custom-300 font-semibold shadow-md shadow-custom-50 mt-auto">

            {t("createAccount")}
          </button>
          <div className="login__footer flex mt-8 text-custom-200 font-bold">
            <p>
              Pet Paws
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
