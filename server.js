import { createServer } from "http";
import { Server } from "socket.io";
import Express from "express";

const app = Express();
app.use(Express.json());

const PORT = process.env.PORT || 4000;

const expressServer = app.listen(PORT, () => {
  console.log(`Server listening on porrt`);
});

const io = new Server(expressServer, {
  cors: {
    origin:
      process.env.PORT === "production"
        ? false
        : ["http://localhost:3000", "http://127.0.0.1:3000"],
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on("message", (message) => {
    console.log(message);

    io.emit("message", message);
  });
});
