import { io } from 'socket.io-client';

const socket = io('https://whatapp-clone.onrender.com');

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
