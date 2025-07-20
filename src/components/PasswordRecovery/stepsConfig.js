// stepsConfig.js
import * as Yup from "yup";

export const steps = [
  {
    id: 1,
    titleKey: "forgotPassword",
    subtitleKey: "passwordRecoveryText",
    fields: [
      {
        name: "email",
        labelKey: "email",
        type: "email",
        validation: Yup.string()
          .test(
            "email-or-phone",
            "emailOrPhoneInvalid",
            (value) =>
              Yup.string().email().isValidSync(value) ||
              /^[9][0-9]{8}$/.test(value)
          )
          .required("emailOrPhoneRequired"),
      },
    ],
  },

  {
    id: 2,
    titleKey: "forgotPassword",
    subtitleKey: "enterCode",
    fields: [
      {
        name: "code",
        labelKey: "confirmationCode",
        type: "text",
        validation: Yup.string()
          .matches(/^\d{6}$/, "errorCode")
          .required("codeRequired"),
      },
    ],
  },

  {
    id: 3,
    titleKey: "forgotPassword",
    subtitleKey: "enterNewPassword",
    fields: [
      {
        name: "password",
        labelKey: "password",
        type: "password",
        validation: Yup.string()
          .required("passwordRequired")
          .min(8, "passwordLengthError")
          .matches(/[a-zA-Z]/, "passwordLetterError")
          .matches(/\d/, "passwordNumberError")
          .matches(/[!@#$%^&*(),.?":{}|<>]/, "passwordSymbolError"),
      },
    ],
  },
];
