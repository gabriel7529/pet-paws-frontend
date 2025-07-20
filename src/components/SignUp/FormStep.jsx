// FormStep.jsx
import { useEffect, useState } from "react";
import FormField from "./FormField";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import CloseButton from "../ui/CloseButton";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import PropTypes from "prop-types";
import Header from "../ui/Header";

const FormStep = ({ stepData, onSubmit, onAlternativeClick }) => {
  const { t } = useTranslation();
  const { handleSubmit } = useFormContext();

  const [isMediumScreen, setIsMediumScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth >= 768); // 'md' breakpoint de Tailwind
    };

    handleResize(); // Ejecutar al montar el componente
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <Header />
      <div
        className="h-screen bg-custom-200 md:bg-custom-50 flex flex-col items-center justify-center"
        style={isMediumScreen ? { height: "calc(100vh - 90px)" } : {}}
      >
        <div className="register w-full max-w-md p-6 flex flex-col items-center relative h-full">
          <CloseButton />
          <h2 className="text-custom-50 md:text-custom-250 p-4 font-semibold text-3xl">
            {t(stepData.titleKey)}
          </h2>
          <p className="text-custom-50 md:text-custom-250 p-4 font-normal text-base pl-0">
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
          {stepData.alternative && (
            <button
              onClick={onAlternativeClick}
              className="bg-custom-200 w-full p-2 mb-4 mt-4 border-2 border-custom-50 rounded-xl text-custom-50 shadow-md shadow-custom-50"
            >
              {t(stepData.alternative.buttonTextKey)}
            </button>
          )}
          <div className="flex mt-auto text-custom-50 md:text-custom-250">
            <p>
              {t("haveAccount")}
              <Link to="/login" className="pl-1 text-custom-300 font-semibold">
                {t("login")}
              </Link>
            </p>
          </div>
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
