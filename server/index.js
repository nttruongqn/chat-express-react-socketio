const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");

const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
}) 

io.on("connection", (socket) => {
    console.log(`User connected:  ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`Tài khoản có id: ${socket.id} đang tham gia phòng: ${data}`)
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
        console.log(data);
    })

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id)
    })
})

app.use(cors());

server.listen(3001, () => {
    console.log("server running")
})