import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  if (!userId) return null;

  socket = io(
    import.meta.env.MODE === "development"
      ? "http://localhost:5000" // backend socket server
      : "/",
    {
      query: { userId },
    }
  );

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
