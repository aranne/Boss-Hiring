const nanoid = require('nanoid').nanoid;

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
    clients[userId] = connection;

    connection.on("message", function (message) {
      if (message.type === "utf8") {
        console.log("Received Message: " + message.utf8Data);
        connection.sendUTF(message.utf8Data);
      } else if (message.type === "binary") {
        console.log(
          "Received Binary Message of " + message.binaryData.length + " bytes"
        );
        connection.sendBytes(message.binaryData);
      }
    });
  });
};

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}
