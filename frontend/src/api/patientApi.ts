import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// Automatically attach token from localStorage
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getPatients = () => API.get("/patients");
export const createPatient = (data: any) => API.post("/patients", data);
