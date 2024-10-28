// src/socket.js
import { io } from "socket.io-client";

const URL = "https://whatapp-clone.onrender.com"; // Replace with your server URL
const socket = io("https://whatapp-clone.onrender.com", {
    autoConnect: false,
    transports: ['websocket', 'polling'], // Ensure both transports are included
    withCredentials: true, // Include credentials if required by your CORS setup
});


export default socket;
