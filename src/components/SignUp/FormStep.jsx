// FormStep.jsx
import FormField from './FormField';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import CloseButton from '../ui/CloseButton';
import PropTypes from 'prop-types';


const FormStep = ({ stepData, onSubmit, onAlternativeClick }) => {
  const { t } = useTranslation();
  const { handleSubmit } = useFormContext();

  return (
    <div className="h-screen bg-custom-200 flex flex-col items-center justify-center">
      <div className="register w-full max-w-md p-6 flex flex-col items-center relative h-full">
      <CloseButton />
        <h2 className="text-custom-50 p-4 font-semibold text-3xl">
          {t(stepData.titleKey)}
        </h2>
        <p className="text-custom-50 p-4 font-normal text-base pl-0">
          {t(stepData.subtitleKey)}
        </p>
        <form className="flex flex-col items-center w-full" onSubmit={handleSubmit(onSubmit)}>
          {stepData.fields.map((field) => (
            <FormField key={field.name} field={field} />
          ))}
          <button
            className="bg-custom-250 w-full p-2 mb-4 mt-4 border-2 border-custom-250 rounded-xl text-custom-50 shadow-lg shadow-custom-300"
            type="submit"
          >
            {t('next')}
          </button>
        </form>
        {stepData.alternative && (
          <button
            onClick={onAlternativeClick}
            className="bg-custom-200 w-full p-2 mb-4 mt-4 border-2 border-custom-50 rounded-xl text-custom-50 shadow-md shadow-custom-50"
          >
            {t(stepData.alternative.buttonTextKey)}
          </button>
        )}
        <div className="flex mt-auto text-custom-50">
          <p>
            {t('haveAccount')}
            <a href="/login" className="pl-1 text-custom-300 font-semibold">
              {t('login')}
            </a>
          </p>
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
