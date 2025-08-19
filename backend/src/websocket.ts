import { Server as IOServer } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";

export function setupWebSocket(server: any) {
  const io = new IOServer(server, { cors: { origin: "*" } });

  // Redis adapter for scaling multiple instances
  const pubClient = createClient({ url: "redis://localhost:6379" });
  const subClient = pubClient.duplicate();
  io.adapter(createAdapter(pubClient, subClient));

  // Namespace for patients
  const patientNamespace = io.of("/patients");

  patientNamespace.on("connection", (socket) => {
    console.log("Patient connected:", socket.id);

    // Join room for a specific patient
    socket.on("joinPatientRoom", (patientId: string) => {
      socket.join(patientId);
    });

    // Broadcast updates to patient room
    socket.on("updatePatientData", ({ patientId, data }) => {
      patientNamespace.to(patientId).emit("patientDataUpdated", data);
    });

    socket.on("disconnect", () => {
      console.log("Patient disconnected:", socket.id);
    });
  });
}
