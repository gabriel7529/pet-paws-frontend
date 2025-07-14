import { useForm } from "react-hook-form";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';



const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const schema = yup.object().shape({
    username: yup.string().required(t('usernameRequired')),
    password: yup.string().required(t('passwordRequired')),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <div className="h-screen bg-custom-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-6 flex flex-col items-center relative h-full">
        <LanguageSwitcher />
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
        <div className="register__footer flex text-custom-50">
          <p>
            <a href="/todo" className="pl-1 text-custom-300">
              {t("forgotPassword")}
            </a>
          </p>
        </div>

        <Button onClick={()=>{
            navigate('/signup');
          }}   className="btn-secondary mt-auto">
          {t("createAccount")}
        </Button>
        <div className="login__footer flex mt-8 text-custom-200 font-bold">
          <p>Pet Paws</p>

        </div>


      </div>
    </div>
  );
};
export default Login;

