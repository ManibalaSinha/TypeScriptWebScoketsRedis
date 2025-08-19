//import errorHandler from "./middlewares/errorHandler";
import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { connectDB } from "./config/db";
import authRoutes from './routes/authRoutes';
import patientRoutes from "./routes/patientRoutes";
import mongoose from 'mongoose';

dotenv.config();
connectDB(); // Connect to DB

const app = express();
app.use(express.json());

// Routes
app.get('/', (_req, res) => res.send('API is running'));
app.use('/auth', authRoutes);  
app.use('/patients', patientRoutes);
//app.use(errorHandler);

export default app;
