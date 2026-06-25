const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://mercomartabcd_db_user:AvPoAwRzG7XWtnM9@0.ss2v2xx.mongodb.net/?appName=0");

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected");
});

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
server.listen(3000, () => {
  console.log("Running on port 3000");
});