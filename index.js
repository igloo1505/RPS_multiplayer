const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
// const webpush = require("web-push");
const bodyParser = require("body-parser");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());

// Run on every client connection
const sockets = {};
io.on("connection", (socket) => {
  sockets[socket.io] = socket;
  console.log("sockets...", sockets);
  socket.emit("message", "Made connection");
  socket.broadcast.emit("message", "A new User has logged on");

  socket.on("disconnect", () => {
    delete sockets[socket.id];
    console.log("running on disconnect");
    console.log("socketID removed...", sockets);
    io.emit("message", "Someone left the chat");
  });
});

// !! Giving up on push notifications for now, Add back later
// const publicVapidKey =
//   "BONQDVSif7uK5J_Mqea65mp5fbk1v9aBWrI6G-R6WgW0B8-xO79_0E3tYDdtai0HqpDb3a8_CbZ7ZNUCvAZjHZ0";
// const privateVapidKey = "z_FS-6Ywn2v92QrKBzQM3hss_AHwebCJlEi1NdCyIEQ";
// webpush.setVapidDetails(
//   "mailto: aiglinski@icloud.com",
//   publicVapidKey,
//   privateVapidKey
// );

//!! Subscription to notification route
// app.post("/subscribe", (req, res) => {
//   console.log("post method reached with ...", req);
//   const subscription = req.body;
//   res.status(201).json({});
//   const payload = JSON.stringify({
//     title: "push test",
//   });
//   webpush
//     .sendNotification(subscription, payload)
//     .catch((err) => console.error(err));
// });

const PORT = 5000 || process.env.PORT;
server.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
