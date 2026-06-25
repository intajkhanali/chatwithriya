const express = require("express");
const http = require("http");
const { Server } = require("socket.io");


const app = express();
const server = http.createServer(app);

app.use(express.static("public"));

const io = new Server(server);

io.on("connection", (socket) => {

  socket.on("join-room", (room) => {
    socket.join(room);
  });

  socket.on("send-message", (data) => {
    socket.to(data.room).emit("receive-message", data);
  });
  socket.on("send-image", (data) => {
    socket.to(data.room).emit("receive-image", data);
});

});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
});
const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log("Running on port " + PORT);
});