// src/dtos/createPatient.dto.ts
import { IsString, IsInt, Min, Max, IsEmail } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  name!: string;

  @IsInt()
  @Min(0)
  age!: number;

  @IsEmail()
  email!: string;

  @IsInt()
  @Min(30)
  @Max(200)
  heartRate!: number;
}

// src/middlewares/validateDto.ts
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export const validateDto = (dtoClass: any) => async (req: Request, res: Response, next: NextFunction) => {
  const dtoObject = plainToInstance(dtoClass, req.body);
  const errors: ValidationError[] = await validate(dtoObject);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};
