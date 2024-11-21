import { io, Socket } from 'socket.io-client';

// Create a single socket instance to be shared across components
const socketInstance: Socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:3000', {
    transports: ['websocket'],
});

export default socketInstance;