// const io = require("./socket.io/socket.io.js");
const socket = io();

socket.on("message", (message) => {
  console.log(message);
  console.log(message === "Someone left the chat");
  switch (message) {
    case "Made connection":
      return M.toast({ html: "You are now connected" });
    case "Someone left the chat":
      return M.toast({ html: "Someone left the game" });
  }
});
