import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
  email: string;
  role?: string;
  [key: string]: any;
}

// Extend Express Request
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authMiddleware = (roles: string[] = []) => (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization?.split(" ")[1];
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (roles.length && !roles.includes(decoded.role || '')) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
