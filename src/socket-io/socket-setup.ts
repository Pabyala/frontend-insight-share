import { io } from 'socket.io-client';

const socketSetup = io(process.env.REACT_APP_BASE_URL, {
    withCredentials: true, // Allow credentials if needed
    transports: ['websocket', 'polling'], // Ensure fallback support
    reconnection: true
});

export default socketSetup;