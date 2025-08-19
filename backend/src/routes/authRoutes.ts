import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
const router = Router();

router.get("/patients", authMiddleware, (req, res) => {
  res.json({ patients: [] });
});

export default router;
