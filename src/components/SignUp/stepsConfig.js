// stepsConfig.js
import * as Yup from 'yup';

export const steps = [
  {
    id: 1,
    titleKey: 'createProfile',
    subtitleKey: 'enterFullName',
    fields: [
      {
        name: 'name',
        labelKey: 'name',
        type: 'text',
        validation: Yup.string().required('nameRequired'),
      },
      {
        name: 'lastName',
        labelKey: 'lastName',
        type: 'text',
        validation: Yup.string().required('lastNameRequired'),
      },
    ],
  },
  {
    id: 2,
    titleKey: 'createProfile',
    subtitleKey: 'enterBirthdate',
    fields: [
      {
        name: 'birthDate',
        labelKey: 'birthDate',
        type: 'date',
        validation: Yup.date()
        .nullable()
        .transform((curr, orig) => (orig === '' ? null : curr))
        .required('birthDateRequired'),
      },
    ],
  },
  {
    id: 3,
    titleKey: 'createProfile',
    subtitleKey: 'enterGender',
    fields: [
      {
        name: 'gender',
        labelKey: 'gender',
        type: 'radio',
        options: [
          { value: 'Mujer', labelKey: 'woman' },
          { value: 'Hombre', labelKey: 'man' },
          { value: 'Otro', labelKey: 'other' },
        ],
        validation: Yup.string().required('genderRequired'),
      },
    ],
  },
  {
    id: 4,
    titleKey: 'createProfile',
    subtitleKey: 'enterUsernameAndPass',
    fields: [
      {
        name: 'account',
        labelKey: 'account',
        type: 'text',
        validation: Yup.string().required('usernameRequired'),
      },
      {
        name: 'password',
        labelKey: 'password',
        type: 'password',
        validation: Yup.string()
          .required('passwordRequired')
          .min(8, 'passwordLengthError')
          .matches(/[a-zA-Z]/, 'passwordLetterError')
          .matches(/\d/, 'passwordNumberError')
          .matches(/[!@#$%^&*(),.?":{}|<>]/, 'passwordSymbolError'),
      },
    ],
  },
  {
    id: 5,
    titleKey: 'createProfile',
    subtitleKey: 'enterEmail',
    fields: [
      {
        name: 'email',
        labelKey: 'email',
        type: 'email',
        validation: Yup.string()
          .email('emailError')
          .required('emailRequired'),
      },
    ],
    alternative: {
      nextStep: 6,
      buttonTextKey: 'signupWithNumber',
    },
  },
  {
    id: 6,
    titleKey: 'createProfile',
    subtitleKey: 'enterNumberPhone',
    fields: [
      {
        name: 'phoneNumber',
        labelKey: 'numberPhone',
        type: 'number',
        validation: Yup.string()
          .matches(/^9\d{8}$/, 'errorPhoneNumber')
          .required('phoneNumberRequired'),
      },
    ],
  },
  {
    id: 7,
    titleKey: 'createProfile',
    subtitleKey: 'enterCode',
    fields: [
      {
        name: 'code',
        labelKey: 'confirmationCode',
        type: 'text',
        validation: Yup.string()
          .matches(/^\d{7}$/, 'errorCode')
          .required('codeRequired'),
      },
    ],
  },
];
