import { Schema, model } from "mongoose";

const patientSchema = new Schema({
  name: { type: String, required: true },
  birthDate: { type: Date, required: true },
  conditions: { type: [String], default: [] },
});

export const Patient = model("Patient", patientSchema);
