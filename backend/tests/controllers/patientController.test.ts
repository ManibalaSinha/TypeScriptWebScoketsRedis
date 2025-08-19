// tests/controllers/patientController.test.ts
import { createPatient } from '../../src/controllers/patientController';
import { Request, Response } from 'express';
import { Patient } from '../../src/models/patientModel';

jest.mock('../../src/models/patientModel');

describe('Patient Controller', () => {
  it('should create a patient', async () => {
    const req = { body: { name: 'John', age: 30, email: 'john@test.com', heartRate: 70 } } as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

    (Patient.create as jest.Mock).mockResolvedValue(req.body);

    await createPatient(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });
});
