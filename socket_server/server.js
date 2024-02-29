import { Server } from "socket.io";
import { createServer } from "http";
import express, { text } from "express";
import { v4 as uuidV4 } from "uuid";

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: "*" });

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




  //notification handling events

  socket.on('notification-on-off', (data) => {
    console.log(data,socket.id)
    io.send(socket.id).emit('notificationChange', data)
  })

  socket.on('send-notification', (data) => {
    const id = uuidV4();
    const notificationData = {
      id,
      content:data.content,
      createdAt: new Date(),
      senderName:data.senderName,
      senderImage: data.senderImage
    }
    
    io.emit(`${data.receiverId}`, notificationData)
  })

  socket.on('group-notification', (data) => {
    socket.join(data.roomId)
    const id = uuidV4();
    const notificationData = {
      id,
      content:data.content,
      createdAt: new Date(),
      senderName:data.senderName,
      senderImage: data.senderImage
    }
    console.log(data)
    io.emit(`${data.roomId}`,notificationData)
  })

});

server.listen(3001, () => console.log("server listening on port 3001"));
