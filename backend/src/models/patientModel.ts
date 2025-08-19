// src/models/patientModel.ts
import { Schema, model, Document } from 'mongoose';

export interface IPatient extends Document {
  name: string;
  age: number;
  heartRate: number;
  createdAt: Date;
}

const patientSchema = new Schema<IPatient>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  heartRate: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Patient = model<IPatient>('Patient', patientSchema);
