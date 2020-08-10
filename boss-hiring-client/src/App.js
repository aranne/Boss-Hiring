import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./features/users/Login";
import Register from "./features/users/Register";
import Main from "./features/Main";
import AuthenticateRoute from "./app/AuthenticateRoute";
import { w3cwebsocket } from "websocket";

const client = new w3cwebsocket("ws://localhost:8000/", "echo-protocol");

function App() {
  useEffect(() => {
    client.onopen = function () {
      console.log("WebSocket Client Connected");

      function sendNumber() {
        if (client.readyState === client.OPEN) {
          var number = Math.round(Math.random() * 0xffffff);
          client.send(number.toString());
          setTimeout(sendNumber, 1000);
        }
      }
      sendNumber();
    };
    client.onmessage = function (e) {
      if (typeof e.data === "string") {
        console.log("Received: '" + e.data + "'");
      }
    };
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <AuthenticateRoute path="/home">
          <Main />
        </AuthenticateRoute>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
