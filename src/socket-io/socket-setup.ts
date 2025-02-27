import { io } from 'socket.io-client';

const socketSetup = io('http://localhost:8000', {
    withCredentials: true, // Allow credentials if needed
    transports: ['websocket', 'polling'], // Ensure fallback support
    reconnection: true
});

// export const joinUserRoom = (userId: string) => {
//     socketSetup.emit("join", userId);
// };

export default socketSetup;