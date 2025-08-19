// src/utils/validateInput.ts
import { body } from 'express-validator';

export const patientValidationRules = [
  body('name').isString().notEmpty(),
  body('age').isInt({ min: 0 }),
  body('heartRate').isInt({ min: 30, max: 200 }),
];
