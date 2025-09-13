const { Server } = require("socket.io");

const userSocketMap = {};
let io;

function initSocket(server) {
  io = new Server(server, {
    cors: { origin: "http://localhost:5173" },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
     console.log("🔌 New client connected with userId:", userId);
    if (userId) userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
}

function getIo() {
  if (!io) throw new Error("Socket.io not initialized yet!");
  return io;
}

function getReceiversSocketId(userId) {
  return userSocketMap[userId];
}

module.exports = { initSocket, getReceiversSocketId, getIo };

