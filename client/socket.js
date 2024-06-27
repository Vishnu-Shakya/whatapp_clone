// src/socket.js
import { io } from "socket.io-client";

const URL = "http://localhost:5000"; // Replace with your server URL
const socket = io(URL, { autoConnect: false });

export default socket;
