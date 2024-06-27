import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

socket.on('connect', () => {
  console.log('connected to server');
});

socket.on('sendMessage', (data) => {
  console.log('New message:', data);
});

export const sendMessage = (msg) => {
  socket.emit('message', msg);
};

export default socket;
