// src/routes/patientRoutes.ts
import { Router } from 'express';
import * as patientController from '../controllers/patientController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createPatient, getPatients } from '../controllers/patientController';

const router = Router();

router.use(authMiddleware); // Protect all patient routes

router.post('/', patientController.createPatient);
router.get('/', patientController.getPatients);
router.get('/:id', patientController.getPatients);
router.put('/:id', patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);

export default router;
