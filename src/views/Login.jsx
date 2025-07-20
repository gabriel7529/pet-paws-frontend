//Login.jsx
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useUser } from '../hooks/useUser';
import { usePetData } from "../hooks/usePetData";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import LanguageSwitcher from "../components/ui/LanguageSwitcher";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginUser, fetchUserByEmail } from "../services/users";
import { getConfig } from "../services/config";
import { toast } from "sonner";
import Header from "../components/ui/Header";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { petData, setPetData } = usePetData();
  const schema = yup.object().shape({
    username: yup.string().required(t("usernameRequired")),
    password: yup.string().required(t("passwordRequired")),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const { login, setData} = useUser();

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth >= 768);
    };

    handleResize(); // Ejecutar al montar el componente
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {

      const profile = await loginUser(data.username, data.password);

      if (profile) {

        localStorage.setItem("user", JSON.stringify(profile));

        const data = await fetchUserByEmail(profile.email);
        const config = await getConfig(profile.id);

        setData({...data, ...config.data});
        login(data);
        const updatedData = {
        ...petData,
        id: profile.id
        }
        setPetData(updatedData);

        toast.success(t("loginSuccess"));
        if(profile.role === "ADMINISTRATOR") {
          navigate("/admin");
        }
        else{
          navigate("/feed");
        }

      } else {
        toast.error(t("incorrectLogin"));
      }
    } catch (error) {
      console.error(error);
      toast.error(t("loginError"));
    }
  });
  return (
    <div>
      <Header />
      <div
        className="h-screen bg-custom-50 flex items-center justify-center"
        style={isMediumScreen ? { height: "calc(100vh - 90px)" } : {}}
      >
        <div className="w-full h-full max-w-4xl p-6 flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Nueva columna izquierda */}
          <div className="hidden md:flex flex-1 h-full bg-white-100 start justify-center">
            <div className="text-custom-300 font-bold text-2xl w-full h-8 text-center">
             <img src="/src/assets/img/foto_principal.png" className="p-1 my-20"></img>
            </div>
          </div>

          {/* Formulario (segunda columna) */}
          <div className="form flex-1 h-full flex flex-col items-center relative">
            <LanguageSwitcher addClass="md:hidden" />
            <h2 className="register__title text-custom-250 p-4 font-semibold text-3xl">
              {t("loginTitle")}
            </h2>
            <form onSubmit={onSubmit} noValidate autoComplete="off">
              <Input
                type="text"
                placeholder={t("loginAccount")}
                {...register("username")}
              />
              {errors.username && (
                <span className="text-red-500">{errors.username.message}</span>
              )}
              <Input
                type="password"
                placeholder={t("password")}
                required
                {...register("password")}
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
              <Button type="submit">{t("login")}</Button>
            </form>
            <div className="register__footer flex text-custom-50 mb-3">
              <p>
                <Link to="/passwordrecovery" className="pl-1 text-custom-300">
                  {t("forgotPassword")}
                </Link>
              </p>
            </div>

            <Button
              onClick={() => {
                navigate("/signup");
              }}
              className="btn-secondary mt-auto"
            >
              {t("createAccount")}
            </Button>
            <div className="login__footer flex mt-auto text-custom-200 font-bold">
              <p>Pet Paws</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
