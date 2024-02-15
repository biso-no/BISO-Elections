import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("vote", (msg) => {
    console.log("message: " + msg);
  });
});

io.listen(3001);
