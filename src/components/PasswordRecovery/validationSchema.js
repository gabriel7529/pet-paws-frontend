// validationSchema.js
import * as Yup from 'yup';
import { steps } from './stepsConfig';

export const getValidationSchema = (stepId) => {
  const step = steps.find((s) => s.id === stepId);
  const schemaFields = {};

  step.fields.forEach((field) => {
    schemaFields[field.name] = field.validation || Yup.mixed();
  });

  return Yup.object().shape(schemaFields);
};
