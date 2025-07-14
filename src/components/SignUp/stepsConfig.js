// stepsConfig.js
import * as Yup from 'yup';

export const steps = [
  {
    id: 1,
    titleKey: 'createProfile',
    subtitleKey: 'enterFullName',
    fields: [
      {
        name: 'firstName',
        labelKey: 'name',
        type: 'text',
        validation: Yup.string().required('El nombre es obligatorio'),
      },
      {
        name: 'lastName',
        labelKey: 'lastName',
        type: 'text',
        validation: Yup.string().required('El apellido es obligatorio'),
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
        .required('La fecha de nacimiento es obligatoria'),
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
        validation: Yup.string().required('El género es obligatorio'),
      },
    ],
  },
  {
    id: 4,
    titleKey: 'createProfile',
    subtitleKey: 'enterUsernameAndPass',
    fields: [
      {
        name: 'userName',
        labelKey: 'userName',
        type: 'text',
        validation: Yup.string().required('El nombre de usuario es obligatorio'),
      },
      {
        name: 'password',
        labelKey: 'password',
        type: 'password',
        validation: Yup.string()
          .required('La contraseña es obligatoria')
          .min(8, 'La contraseña debe tener al menos 8 caracteres')
          .matches(/[a-zA-Z]/, 'La contraseña debe contener letras')
          .matches(/\d/, 'La contraseña debe contener números')
          .matches(/[!@#$%^&*(),.?":{}|<>]/, 'La contraseña debe contener símbolos'),
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
          .email('Email inválido')
          .required('El email es obligatorio'),
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
          .matches(/^9\d{8}$/, 'Número de teléfono inválido')
          .required('El número de teléfono es obligatorio'),
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
          .matches(/^\d{6}$/, 'Código inválido')
          .required('El código es obligatorio'),
      },
    ],
  },
];
