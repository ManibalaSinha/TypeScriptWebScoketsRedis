import { Request, Response } from "express";
import { Patient } from "../models/Patient";

export const getPatients = async (req: Request, res: Response) => {
  const patients = await Patient.find();
  res.json(patients);
};

export const createPatient = async (req: Request, res: Response) => {
  const patient = new Patient(req.body);
  await patient.save();
  res.status(201).json(patient);
};
