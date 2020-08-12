import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./features/users/currentUser/Login";
import Register from "./features/users/currentUser/Register";
import Main from "./features/Main/Main";
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
        <Route>
          <Redirect to="/home" /> {/* default route */}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
