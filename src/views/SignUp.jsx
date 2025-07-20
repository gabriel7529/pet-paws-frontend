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
//import { useTranslation } from "react-i18next";
import { createUser, activateAccount } from "../services/users";
import { toast } from "sonner";

const SignUp = () => {
  return (
    <StepProvider>
      <SignUpForm />
    </StepProvider>
  );
};

const validateCode = (value, token) => {
  return value === token;
};

const SignUpForm = () => {
  //const { t } = useTranslation();

  const { step, nextStep } = useContext(StepContext);
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(getValidationSchema(step)),
    mode: "onTouched",
  });

  const { setValue } = methods;

  const onSubmit = async (data) => {
    if (step === 5) {
      //logica para enviar codigo de verificacion desde el correo
      try {
        data.birthDate = new Date(data.birthDate).toISOString();

        const userData = { ...data };
        delete userData.gender;
        delete userData.code; // Eliminar código antes de crear el usuario

        const createdUser = await createUser(userData);

        // Guardar el token de activación en localStorage
        localStorage.setItem("activationToken", createdUser.verificationToken);

        toast.success("Usuario creado. Revisa tu correo para activar la cuenta.");
        nextStep();
      } catch (error) {
        console.error(error);
        toast.error("Error al crear el usuario.");
      }
      nextStep(7);
    } else if (step === 6) {
      //logica para enviar codigo desde el telefono
      nextStep(7);
    } else if (step === 7) {
      const activationToken = localStorage.getItem("activationToken");

      if (!activationToken) {
        toast.error("No se encontró el token de activación.");
        return;
      }

      if (validateCode(data.code, activationToken)) {
        try {
          await activateAccount(activationToken);

          toast.success("Cuenta activada con éxito.");
          navigate("/login");
        } catch (error) {
          console.error(error);
          toast.error("Error al activar la cuenta.");
        }
      } else {
        setValue("code", "");
        toast.error("Código de verificación incorrecto.");
      }
    } else {
      nextStep();
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
