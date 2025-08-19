// src/tests/patient.test.ts
import request from "supertest";
import app from "../app";

describe("Patient API", () => {
  it("should get patients (authenticated)", async () => {
    const token = "valid-jwt-token";
    const res = await request(app)
      .get("/patients")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("patients");
  });
});
