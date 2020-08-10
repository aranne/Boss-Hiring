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

    const userId = nanoid();
    connection.on("message", function (message) {
      if (message.type === "utf8") {
        console.log("Received Message: " + message.utf8Data);
        const obj = JSON.parse(message.utf8Data);
        // new client
        if ("userId" in obj) {
          clients[userId] = { connection: connection, userId: obj.userId };
        }
      }
    });
    connection.on("close", function (reasonCode, description) {
      console.log(
        new Date() + " Peer " + connection.remoteAddress + " disconnected."
      );
      delete clients[userId]; // don't forget delete disconnected connection
    });
  });
};

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

exports.notifyAll = () => {
  Object.keys(clients).map(async (client) => {
    let criteria = { _id: clients[client].userId };
    const select = { password: 0 };
    try {
      const user = await User.load({ criteria, select });
      const type = user.type === "employee" ? "employer" : "employee";
      criteria = { type };
      const users = await User.list({ criteria, select });
      clients[client].connection.sendUTF(JSON.stringify(users));
    } catch (err) {
      throw err;
    }
  });
};
