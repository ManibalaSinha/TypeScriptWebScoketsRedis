// src/services/patientService.ts
import { Patient, IPatient } from '../models/patientModel';

export const createPatient = async (data: Partial<IPatient>) => {
  return Patient.create(data);
};

export const getAllPatients = async () => {
  return Patient.find();
};

export const getPatientById = async (id: string) => {
  return Patient.findById(id);
};

export const updatePatient = async (id: string, data: Partial<IPatient>) => {
  return Patient.findByIdAndUpdate(id, data, { new: true });
};

export const deletePatient = async (id: string) => {
  return Patient.findByIdAndDelete(id);
};
