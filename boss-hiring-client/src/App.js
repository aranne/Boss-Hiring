import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./features/users/Login";
import Register from "./features/users/Register";
import Main from "./features/Main";
import AuthenticateRoute from "./app/AuthenticateRoute";

function App() {
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
