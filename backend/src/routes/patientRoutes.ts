// src/routes/patientRoutes.ts
import express from 'express';
import * as patientController from '../controllers/patientController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createPatient, getPatients, getPatientById, updatePatient, deletePatient } from '../controllers/patientController';
import validateRequest from "../middlewares/validateRequest";
import { CreatePatientDto } from "../dtos/createPatient.dto";

const router = express.Router();

router.use(authMiddleware); // Protect all patient routes

router.post('/', patientController.createPatient);
router.get('/', patientController.getPatients);
router.get('/:id', getPatientById);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);
router.post("/patients", authMiddleware, createPatient);
router.get("/patients", authMiddleware, getPatients);

export default router;
