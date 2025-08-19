import request from "supertest";
import app from "../app";

describe("Patient API", () => {
  it("should fetch all patients", async () => {
    const res = await request(app).get("/patients").set("Authorization", "Bearer testtoken");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);
  });
});
