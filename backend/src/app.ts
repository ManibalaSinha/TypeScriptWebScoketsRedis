import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import patientRoutes from "./routes/patientRoutes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/patients", patientRoutes);

// Connect to DB
connectDB();

export default app;
