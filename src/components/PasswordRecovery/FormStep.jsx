// FormStep.jsx
import FormField from "./FormField";
import { useNavigate, Link } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import PropTypes from "prop-types";
import Header from "../PasswordRecovery/Header";

const FormStep = ({ stepData, onSubmit }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { handleSubmit } = useFormContext();

  return (
    <div>
      <Header />
      <div className="h-screen bg-custom-50 flex flex-col items-center justify-center">
        <div className="register w-full max-w-md p-6 flex flex-col items-center relative h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            fill="#000000"
            height="120px"
            width="120px"
            version="1.1"
            id="Layer_1"
            viewBox="0 0 330 330"
            className="fill-current text-custom-250"
            xmlSpace="preserve"
          >
            <g id="XMLID_509_">
              <path
                id="XMLID_510_"
                d="M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85
          S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M180,234.986V255c0,8.284-6.716,15-15,15
          s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986c0-13.785,11.215-25,25-25s25,11.215,25,25
          C190,223.162,186.068,230.421,180,234.986z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z"
              />
            </g>
          </svg>
          <h2 className="text-custom-250 p-4 font-semibold text-3xl text-center">
            {t(stepData.titleKey)}
          </h2>
          <p className="text-custom-250 font-normal text-base pl-0 text-center">
            {t(stepData.subtitleKey)}
          </p>
          <form
            className="flex flex-col items-center w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            {stepData.fields.map((field) => (
              <FormField key={field.name} field={field} />
            ))}
            <Button type="submit">{t("next")}</Button>
          </form>
          <Link to="/todo" className="text-custom-250">
            {t("cantChangePassword")}
          </Link>
          <div className="flex items-center w-full my-4 md:hidden">
            <div className="flex-grow border-t-2 border-custom-250"></div>
            <span className="mx-2 text-custom-250">{t("or")}</span>
            <div className="flex-grow border-t-2 border-custom-250"></div>
          </div>
          <Button
            onClick={() => {
              navigate("/signup");
            }}
            className="btn-secondary md:hidden"
          >
            {t("createAccount")}
          </Button>
        </div>
      </div>
    </div>
  );
};

FormStep.propTypes = {
  stepData: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onAlternativeClick: PropTypes.func.isRequired,
};

export default FormStep;
