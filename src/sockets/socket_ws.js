import { useState, useEffect } from 'react';

const URL = "ws://localhost:8080/";

let socketInstance = null;

const useWebSocket = () => {
  const [socket, setSocket] = useState(socketInstance);

  useEffect(() => {
    console.log("Connecting");
    if (!socketInstance) {
      const newSocket = new WebSocket(URL);

      newSocket.onopen = () => {
        console.log("WebSocket connected");
      };

      newSocket.onclose = () => {
        console.log("WebSocket disconnected");
      };

      socketInstance = newSocket;
      setSocket(newSocket);
    }

    const cleanup = () => {
      socketInstance = null; // Reset socketInstance when component unmounts
    };

    return cleanup;
  }, []);

  return socket;
};

export default useWebSocket;
