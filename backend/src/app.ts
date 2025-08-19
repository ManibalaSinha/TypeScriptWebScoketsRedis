import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { connectDB } from "./config/db";
import patientRoutes from "./routes/patientRoutes";
import mongoose from 'mongoose';

dotenv.config();
connectDB(); // Connect to DB

const app = express();
app.use(express.json());

// Middleware
app.use(cors());

mongoose.connect('mongodb://localhost:27017/health', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Routes
app.get('/', (_req, res) => res.send('API is running'));
app.use("/patients", patientRoutes);

export default app;
