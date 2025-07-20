// SignUp.jsx
import { useForm, FormProvider } from "react-hook-form";
import { StepProvider } from "../components/SignUp/StepContext";
import { useContext } from "react";
import { steps } from "../components/SignUp/stepsConfig";
import { StepContext } from "../components/SignUp/StepContext";
import { getValidationSchema } from "../components/SignUp/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import FormStep from "../components/SignUp/FormStep";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { createUser } from "../services/users";
import { toast } from "sonner";

const SignUp = () => {
  return (
    <StepProvider>
      <SignUpForm />
    </StepProvider>
  );
};

const validateCode = (value) => {
  return value === "123456";
};

const SignUpForm = () => {
  const { t } = useTranslation();

  const { step, nextStep } = useContext(StepContext);
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(getValidationSchema(step)),
    mode: "onTouched",
  });

  const { getValues, setValue } = methods;

  const onSubmit = async (data) => {
    if (step === 5) {
      //logica para enviar codigo de verificacion desde el correo
      nextStep(7);
    } else if (step === 6) {
      //logica para enviar codigo desde el telefono
      nextStep(7);
    } else if (step === 7) {
      if(!data.email) data.email = ""
      if(!data.phoneNumber) data.phoneNumber = ""
      if (validateCode(data.code)) {
        try {
          const allData = getValues();
          const userData = Object.entries(allData).reduce(
            (acc, [key, value]) => {
              if (key !== "code") {
                acc[key] = value;
              }
              return acc;
            },
            {}
          );

          // Llamamos a createUser para crear el nuevo usuario
          await createUser(userData);
          toast.success(t("signupSuccess"));
          navigate("/login");
        } catch (error) {
          console.error(error);
          toast.error(
            t("signupError")
          );
        }
      } else {
        setValue("code", "");
        toast.error(t("errorCode"));
      }
    } else if (step < steps.length) {
      nextStep();
    } else {
      navigate("/login");
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
