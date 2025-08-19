import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });

  res.json({ token });
};
