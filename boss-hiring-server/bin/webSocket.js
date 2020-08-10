const User = require("../models/user");
const nanoid = require("nanoid").nanoid;

let clients = {};

exports.wsSocketListen = (wsSever) => {
  wsSever.on("request", function (request) {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log(
        new Date() + " Connection from origin " + request.origin + " rejected."
      );
      return;
    }
    var connection = request.accept("echo-protocol", request.origin);
    console.log(new Date() + " Connection accepted.");

    const clientId = nanoid();
    connection.on("message", function (message) {
      if (message.type === "utf8") {
        console.log("Received Message: " + message.utf8Data);
        const obj = JSON.parse(message.utf8Data);
        // new client
        if ("type" in obj) {
          clients[clientId] = { connection: connection, type: obj.type };
        }
      }
    });
    connection.on("close", function (reasonCode, description) {
      console.log(
        new Date() + " Peer " + connection.remoteAddress + " disconnected."
      );
      delete clients[clientId]; // don't forget delete client
    });
  });
};

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

/**
 * Notify one type of clients of the other type new users's list
 * @param {Type} type the type of clients need to be notified
 */
exports.notifyAll = async (type) => {
  const otherType = type === "employer" ? "employee" : "employer";
  for (let client in clients) {
    if (clients[client].type !== type) continue;
    try {
      const criteria = { type: otherType };
      const select = { password: 0 };
      const users = await User.list({ criteria, select });
      clients[client].connection.sendUTF(JSON.stringify(users));
    } catch (err) {
      throw err;
    }
  }
};
