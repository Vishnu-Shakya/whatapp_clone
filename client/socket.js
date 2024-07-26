// src/socket.js
import { io } from "socket.io-client";

const URL = "https://whatapp-clone.onrender.com"; // Replace with your server URL
const socket = io(URL, { autoConnect: false , transports: ['websocket', 'polling']});

export default socket;
