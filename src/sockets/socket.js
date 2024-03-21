import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_API_URL;

console.log(URL);

export const socket = io(URL);