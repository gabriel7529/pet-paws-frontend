import PropTypes from "prop-types";
import CloseButton from "./CloseButton";
import { useTranslation } from 'react-i18next'

const SignUpStep5_1 = ({ nextStep, handleChange, values }) => {
  const handleClick = () => {
    nextStep(6);
  }
  const { t } = useTranslation();
  return (
    <>
      <div className="h-screen bg-custom-200 flex flex-col items-center justify-center">
        <div className="register w-full max-w-md p-6 flex flex-col items-center relative h-full">

          <CloseButton/>
          <h2 className="register__title text-custom-50 p-4 font-semibold text-3xl">
          {t("createProfile")}
          </h2>
          <p className="register__subtitle text-custom-50 p-4 font-normal text-base pl-0">
            {t("enterEmail")}
          </p>
          <form
            className="register__form flex flex-col items-center w-full"
            onSubmit={(e) => {
              e.preventDefault();
              nextStep(7);
            }}
          >
            <input
              className="register__input border-2 border-custom-250 p-2 w-full mb-4 rounded-xl placeholder-custom-250 font-normal text-base text-custom-250"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              required
              placeholder={t("email")}
            />

            <button
              className="register__button bg-custom-250 w-full p-2 mb-4 mt-4 border-2 border-custom-250 rounded-xl text-custom-50 shadow-lg shadow-custom-300"
              type="submit"
            >
              {t("next")}
            </button>
          </form>
          <button onClick={handleClick} className="register-form__google-button bg-custom-200 w-full p-2 mb-4 mt-4 border-2 border-custom-50 rounded-xl text-custom-50 shadow-md shadow-custom-50">

            {t("signupWIthNumber")}
          </button>
          <div className="register__footer flex mt-auto text-custom-50">
            <p>
              {t("haveAccount")}
              <a href="/login" className="pl-1 text-custom-300 font-semibold">
                {t("login")}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

SignUpStep5_1.propTypes = {
  nextStep: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default SignUpStep5_1;
