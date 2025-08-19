import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export default function validateRequest(type: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(type, req.body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      return res.status(400).json({
        errors: errors.map((err) => ({
          property: err.property,
          constraints: err.constraints,
        })),
      });
    }

    next();
  };
}
