import { w3cwebsocket } from "websocket";
import { usersUpdated } from "../features/users/usersSlice";
import { wsSeverConfig } from "../app/config";
import store from '../app/store';

export default function registerWSClient(type) {
  console.log("Build web socket TCP connection");
  const wsClient = new w3cwebsocket(wsSeverConfig.url, wsSeverConfig.protocal);
  wsClient.onopen = function () {
    console.log("WebSocket Client Connected");
    wsClient.send(JSON.stringify({ type })); // if connection is open, send client user type
  };
  wsClient.onmessage = function (e) {
    if (typeof e.data === "string") {
      store.dispatch(usersUpdated(JSON.parse(e.data)));
    }
  };
}
