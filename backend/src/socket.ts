// src/socket.ts
import { Server as HttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import redisAdapter from 'socket.io-redis';

export const initSocket = (httpServer: HttpServer) => {
  const io = new SocketServer(httpServer, { cors: { origin: '*' } });

  // Redis adapter for multiple server instances
  io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));

  // Rooms for patient-specific streams
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('joinPatientRoom', (patientId) => {
      socket.join(`patient_${patientId}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};
