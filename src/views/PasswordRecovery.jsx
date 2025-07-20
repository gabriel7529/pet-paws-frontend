// SignUp.jsx
import { useForm, FormProvider } from "react-hook-form";
import { StepProvider } from "../components/PasswordRecovery/StepContext";
import { useContext } from "react";
import { steps } from "../components/PasswordRecovery/stepsConfig";
import { StepContext } from "../components/PasswordRecovery/StepContext";
import { getValidationSchema } from "../components/PasswordRecovery/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import FormStep from "../components/PasswordRecovery/FormStep";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { resetPassword, recoverPassword } from "../services/users";
import { toast } from "sonner";

const SignUp = () => {
  return (
    <StepProvider>
      <SignUpForm />
    </StepProvider>
  );
};

const validateCode = (value) => {
  const tokenRecovery =  localStorage.getItem('tokenrecoverypassword');
  return value === tokenRecovery;
};

const SignUpForm = () => {
  const { t } = useTranslation();
  const { step, nextStep } = useContext(StepContext);
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(getValidationSchema(step)),
    mode: "onTouched",
  });

  const { setValue } = methods;

  const onSubmit = async (data) => {
    if (step === 1) {
      try {
        console.log(data.email);
        const result = await recoverPassword(data.email);
        localStorage.setItem('tokenrecoverypassword', result.token);
        if (result.token.length > 0) {
          toast.error(t("verificationCodeSent"));
          nextStep(2);
        } else {
          toast.error(t("userNotExists"));
        }
      } catch (error) {
        console.error(error);
        toast.error(t("serverError"));
      }
    } else if (step === 2) {
      if (validateCode(data.code)) {
        try {
          toast.success(t("codeVerified"));
          nextStep(3);
        } catch (error) {
          console.error(error);
          toast.error(t("recoverCodeError"));
        }
      } else {
        setValue("code", "");
        toast.error(t("errorCode"));
      }
    } else if (step === 3) {
      try {
        const token = localStorage.getItem('tokenrecoverypassword');
        await resetPassword(token, data.password);
        toast.success(t("passwordChanged"));
        navigate("/login");
      } catch (error) {
        console.error(error);
        toast.error(t("serverError"));
      }
    }
  };


  const onAlternativeClick = () => {
    // Manejar la navegación alternativa (ej. cambiar entre email y número de teléfono)
    const alternativeStep = steps.find((s) => s.id === step).alternative
      .nextStep;
    nextStep(alternativeStep);
  };

  const stepData = steps.find((s) => s.id === step);

  return (
    <FormProvider {...methods}>
      <FormStep
        stepData={stepData}
        onSubmit={methods.handleSubmit(onSubmit)}
        onAlternativeClick={onAlternativeClick}
      />
    </FormProvider>
  );
};

export default SignUp;
