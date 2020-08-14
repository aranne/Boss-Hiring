const Chat = require('../models/chat')

module.exports = function (server) {
  const io = require("socket.io")(server);

  io.on("connection", (socket) => {
    console.log("One Socket IO connection");

    socket.on("sendMsg", (message) => {
      console.log("Received", message);
      const time = Date.now();
      const msg = new Chat({...message, time});
      
      async function saveMsg() {
        try {
          const newMsg = await msg.save();
          console.log("Saved ", newMsg);
          io.emit('receiveMsg', newMsg);
        } catch (err) {
          console.log("Message saving failed")
        }
      }
      saveMsg();
    });
  });
};
