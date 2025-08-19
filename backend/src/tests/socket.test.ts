// src/tests/socket.test.ts
import { io } from "socket.io-client";

test("should receive patient update", (done) => {
  const socket = io("http://localhost:5000");
  socket.emit("join-room", "room1");

  socket.on("patient-update", (data) => {
    expect(data.patientId).toBe("123");
    socket.disconnect();
    done();
  });
});
