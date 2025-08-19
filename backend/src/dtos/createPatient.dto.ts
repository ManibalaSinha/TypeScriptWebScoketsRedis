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
