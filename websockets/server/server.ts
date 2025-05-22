import { createServer } from "http";
import { Server, Socket } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

interface Score {
  name?: string;
  score?: string;
  id?: string;
}

let playerScores: Score[] = [];

io.on("connection", (socket: Socket) => {
  // ...

  // socket.on("message", (data) => {
  //   console.log(data);
  // });

  // socket.emit("message", "Hello from server!");

  console.log("A user connected", socket.id);

  socket.on("scores", (scores: Score) => {
    playerScores.push({ ...scores, id: socket.id });

    socket.emit("playerScores", playerScores);
  });

  setInterval(() => {
    socket.emit("playerScores", playerScores);
  }, 5000);
});

httpServer.listen(3000);
console.log("Socket.IO server changing at http://localhost:3000/");
