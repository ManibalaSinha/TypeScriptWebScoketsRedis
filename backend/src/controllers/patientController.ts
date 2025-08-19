// src/controllers/patientController.ts
import { Request, Response } from 'express';
import * as patientService from '../services/patientService';

export const createPatient = async (req: Request, res: Response) => {
  try {
    const patient = await patientService.createPatient(req.body);
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getPatients = async (req: Request, res: Response) => {
  try {
    const patients = await patientService.getAllPatients();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPatient = async (req: Request, res: Response) => {
  try {
    const patient = await patientService.getPatientById(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePatient = async (req: Request, res: Response) => {
  try {
    const updated = await patientService.updatePatient(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Patient not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deletePatient = async (req: Request, res: Response) => {
  try {
    const deleted = await patientService.deletePatient(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Patient not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
