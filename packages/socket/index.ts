import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected with ID:", socket.id);

  // Handle vote events
  socket.on("vote", (voteData) => {
    console.log("Vote received:", voteData);
    // Broadcast the vote to all connected clients (including the admin)
    io.emit("newVote", voteData);
  });

  socket.on("disconnect", (reason, details) => {
    // the reason of the disconnection, for example "transport error"
    console.log("A user disconnected with ID:", socket.id);
    console.log(reason);
  });
  socket.on("sessionUpdated", (sessionId) => {
    console.log("Session updated:", sessionId);
    // Broadcast the session update to all connected clients
    io.emit("newSession", sessionId);
  });
});

console.log("Socket server running on port 3001");

io.listen(3001);
