import app from "./app";
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';

//import dotenv from "dotenv";
//dotenv.config();

const PORT = process.env.PORT || 5001;

// HTTP server
const server = http.createServer(app);

// WebSocket server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('New client connected');
  ws.send(JSON.stringify({ message: 'Welcome to WebSocket server' }));

  ws.on('message', (data) => {
    console.log('Received:', data.toString());
  });

  ws.on('close', () => console.log('Client disconnected'));
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));