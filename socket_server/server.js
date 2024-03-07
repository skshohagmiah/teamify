import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import { v4 as uuidV4 } from "uuid";

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: "*" });
const PORT=process.env.PORT || 3001


app.get('/', (req,res) => {
  res.send('response from socket-server')
})

io.on("connection", (socket) => {
  //one to one messaging handling events
  socket.on("message-send", (data) => {
    const { text, userId, imageUrl } = data;
    const uniqueId = uuidV4();

    io.emit(`${data.conversationId}`, {
      id: uniqueId,
      createdAt: new Date(),
      text,
      userId,
      imageUrl,
    });
  });

  //member unActive detection events
  socket.on("memberUnActive", (data) => {
    io.emit("memberUnActive", { projectId: data.projectId });
  });


  //one to one video calling events for web rtc
  socket.on("join room", (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit("other user", socket.id);
  });

  socket.on("offer", (offer, userId) => {
    socket.to(userId).emit("offer", offer, socket.id);
  });

  socket.on("answer", (answer, userId) => {
    socket.to(userId).emit("answer", answer);
  });

  socket.on("ice-candidate", (candidate, roomId) => {
    socket.to(roomId).emit("ice-candidate", candidate);
  });



  // notification events
  socket.on('notification-indicator', (data) => {
    io.emit(`notification-receive-for-${data.receiverId}`, data)
  })

  socket.on('memberActiveChange', (data) => {
    console.log(data)
    io.emit('memberActiveChange', data)
  })


// real time drawing events
socket.on('draw', (data,projectId) => {
  console.log(projectId)
  socket.join(projectId);

  socket.broadcast.emit('draw', data)
})

socket.on('clearDraw', (data,projectId) => {
  console.log(data)
  socket.join(projectId);

  socket.broadcast.emit('clearDraw', data)
})

socket.on('clearRect', (data,projectId) => {
  console.log(data)
  socket.join(projectId);

  socket.broadcast.emit('clearRect', data)
})

});


server.listen(PORT, () => console.log("server listening on port ", PORT));
