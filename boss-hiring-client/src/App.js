import React, { useEffect } from "react";
import {useDispatch} from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./features/users/Login";
import Register from "./features/users/Register";
import Main from "./features/Main";
import AuthenticateRoute from "./app/AuthenticateRoute";
import { w3cwebsocket } from "websocket";
import {usersUpdated} from './features/users/usersSlice'

export const wsClient = new w3cwebsocket("ws://localhost:8000/", "echo-protocol");

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    wsClient.onopen = function () {
      console.log("WebSocket Client Connected");
    };
    wsClient.onmessage = function (e) {
      if (typeof e.data === "string") {
        dispatch(usersUpdated(JSON.parse(e.data)));
      }
    };
  }, []); // [] means this will only trigger once

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
