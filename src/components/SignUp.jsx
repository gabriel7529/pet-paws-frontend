import { useState } from "react";
import SignUpStep1 from "./SignUpPages/SignUpStep1";
import SignUpStep2 from "./SignUpPages/SignUpStep2";
import SignUpStep3 from "./SignUpPages/SignUpStep3";
import SignUpStep4 from "./SignUpPages/SignUpStep4";
import SignUpStep5_1 from "./SignUpPages/SignUpStep5_1";
import SignUpStep5_2 from "./SignUpPages/SignUpStep5_2";
import SignUpStep6 from "./SignUpPages/SignUpStep6";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    userName: "",
    password: "",
    email: "",
    phoneNumber: "",
  });
  const [step, setStep] = useState(1);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const nextStep = (number) => {
    setStep(number);
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <SignUpStep1
            nextStep={nextStep}
            handleChange={handleChange}
            values={formData}
          />
        );
      case 2:
        return (
          <SignUpStep2
            nextStep={nextStep}
            handleChange={handleChange}
            values={formData}
          />
        );
      case 3:
        return (
          <SignUpStep3
            nextStep={nextStep}
            handleChange={handleChange}
            values={formData}
          />
        );
      case 4:
        return (
          <SignUpStep4
            nextStep={nextStep}
            handleChange={handleChange}
            values={formData}
          />
        );
      case 5:
        return (
          <SignUpStep5_1
            nextStep={nextStep}
            handleChange={handleChange}
            values={formData}
          />
        );
      case 6:
        return (
          <SignUpStep5_2
            nextStep={nextStep}
            handleChange={handleChange}
            values={formData}
          />
        );
      case 7:
        return (
          <SignUpStep6
            nextStep={nextStep}
            handleChange={handleChange}
            values={formData}
          />
        );
      default:
        return <h1>todo</h1>;
    }
  };

  return (
    <>
      <div>{renderStep()}</div>
    </>
  );
};
export default SignUp;
