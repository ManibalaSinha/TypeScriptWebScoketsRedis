// src/controllers/patientController.ts
import { Request, Response } from 'express';
import Patient from "../models/Patient";
//import { Patient } from '../models/patientModel';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreatePatientDto } from '../dtos/createPatient.dto';
import * as patientService from '../services/patientService';

export const createPatient = async (req: Request, res: Response) => {
    // Convert plain JSON to DTO instance
  const dto = plainToInstance(CreatePatientDto, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  
  try {
    const patient = await Patient.create(dto);
    return res.status(201).json(patient);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const getPatients = async (req: Request, res: Response) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
    //return res.status(200).json(patients);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

// Additional CRUD: getPatientById
export const getPatientById = async (req: Request, res: Response) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.json(patient);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const updatePatient = async (req: Request, res: Response) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators:true, });

    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.json(patient);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const deletePatient = async (req: Request, res: Response) => {
  try {
    const deleted = await Patient.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Patient not found' });
    res.status(204).send();
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

