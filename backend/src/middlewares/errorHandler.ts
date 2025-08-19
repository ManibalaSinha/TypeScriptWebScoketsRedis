import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (err.name === 'MongoError') {
    return res.status(500).json({ message: 'Database error', details: err.message });
  }
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
};