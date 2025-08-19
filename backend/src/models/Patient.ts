import mongoose, { Schema, Document } from "mongoose";

export interface IPatient extends Document {
  name: string;
  age: number;
  email: string;
  heartRate: number;
}

const PatientSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    heartRate: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IPatient>("Patient", PatientSchema);
