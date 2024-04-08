import { createServer } from "http";
import { Server } from "socket.io";
import Express from "express";
import dotenv from "dotenv";

const app = Express();
app.use(Express.json());
dotenv.config();

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST;
const CLIENT_HOST = process.env.CLIENT_HOST;

const expressServer = createServer(app);

const io = new Server(expressServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? false
        : [CLIENT_HOST, `http://${CLIENT_HOST}`],
  },
});

io.on("connection", (socket) => {
<<<<<<< Updated upstream
  const { name } = socket.handshake.query;
  console.log(`User ${name} connected`);

  socket.on("message", (message) => {
    const newMessage = {
      ...message,
      socketID: socket.id,
    };
    io.emit("message", newMessage);
  });

  socket.on("someone-is-typing", (activity) => {
    io.emit("someone-is-typing", activity);
=======
  console.log(`User ${socket.id.substring(0, 5)} connected`);
  const userId = socket.id.substring(0, 5);

  socket.on("message", (message) => {
    console.log(message);
    io.emit("message", message);
>>>>>>> Stashed changes
  });
});

expressServer.listen(PORT, HOST, () => {
  console.log(`Server listening on port ${PORT}`);
});
