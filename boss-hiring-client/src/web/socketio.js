import io from "socket.io-client";
import { socketIOConfig } from "../app/config";
import store from "../app/store";
import { messageAdded } from "../features/messages/messagesSlice";


export function initIO(user) {
  const userId = user._id;
  // singleton pattern
  if (!io.socket) {
    io.socket = io(socketIOConfig.url);
    io.socket.on('receiveMsg', (msg) => {
      console.log('Received ', msg);
      // only when msg is about me, 
      if (msg.from === userId || msg.to === userId) {
        store.dispatch(messageAdded(msg));
      }
    })
  }
}

export const sendMessage = (msg) => {
  console.log("Send ", msg);
  io.socket.emit('sendMsg', msg);
}
