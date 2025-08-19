// src/socket.ts
import { Server as HttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import redisAdapter from 'socket.io-redis';

import { Server } from "socket.io";
import Redis from "ioredis";

const pubClient = new Redis();
const subClient = new Redis();

export const initSocket = (server: any) => {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("Client connected", socket.id);

    socket.on("joinRoom", (room) => socket.join(room));
    socket.on("leaveRoom", (room) => socket.leave(room));
  });

  // Listen Redis pub messages
  subClient.subscribe("patient-updates", () => {
    subClient.on("message", (channel, message) => {
      io.emit("patient-update", JSON.parse(message));
    });
  });
};
