// src/tests/patient.test.ts
import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

describe('Patient Routes', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI!);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should create a patient', async () => {
    const res = await request(app).post('/patients').send({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890'
    });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('John Doe');
  });
});
