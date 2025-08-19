// src/socket.ts
import { Server as HttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import redisAdapter from 'socket.io-redis';
import { createClient } from "redis";
import { Server } from "socket.io";
import Redis from "ioredis";
import { redisClient } from "./config/redis";

export const redisClient = createClient({ url: process.env.REDIS_URL });
redisClient.connect().catch(console.error);


const pubClient = new Redis();
const subClient = new Redis();

export const initSocket = (server: any) => {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  const redisClient = createClient({ url: process.env.REDIS_URL });
  redisClient.connect();

  const redisSubscriber = redisClient.duplicate();
  redisSubscriber.connect();

  redisSubscriber.subscribe("patient-updates", (message) => {
    const data = JSON.parse(message);
    io.to(data.room).emit("patient-update", data);
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("join-room", (room) => {
      socket.join(room);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);

/*   // Listen Redis pub messages
  subClient.subscribe("patient-updates", () => {
    subClient.on("message", (channel, message) => {
      io.emit("patient-update", JSON.parse(message));
   */

    });
  });
};
