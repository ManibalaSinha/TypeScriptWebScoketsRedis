import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { login } from '../controllers/authController';

const router = Router();

router.get("/patients", authMiddleware, (req, res) => {
  res.json({ patients: [] });
});

router.post('/login', login);

export default router;
