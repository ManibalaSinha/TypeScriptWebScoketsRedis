import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { login } from '../controllers/authController';

const router = Router();

// Login route
router.post('/login', login);

// Example protected route
router.get('/me', authMiddleware(), (req, res) => {
  res.json({ user: req.user });
});

// Example admin-only route
router.get('/admin', authMiddleware(['admin']), (_req, res) => {
  res.json({ message: 'Admin content' });
});

export default router;
