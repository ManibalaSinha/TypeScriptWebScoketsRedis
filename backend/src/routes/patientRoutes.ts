// src/routes/patientRoutes.ts
import express from 'express';
import * as patientController from '../controllers/patientController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createPatient, getPatients, getPatientById, updatePatient, deletePatient } from '../controllers/patientController';
import validateRequest from "../middlewares/validateRequest";
import { CreatePatientDto } from "../dtos/createPatient.dto";

const router = express.Router();

router.use(authMiddleware()); // Protect all patient routes

// CRUD routes
router.post('/', validateRequest(CreatePatientDto), createPatient);
router.get('/', getPatients);
router.get('/:id', getPatientById);
router.put('/:id', updatePatient);
router.get('/patients', authMiddleware(['admin', 'doctor']), getPatients);
router.delete('/:id', authMiddleware(['admin']), deletePatient);


export default router;
