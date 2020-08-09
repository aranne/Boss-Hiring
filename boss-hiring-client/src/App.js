import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./features/users/Login";
import Register from "./features/users/Register";
import Main from "./features/main";
import AuthenticateRoute from "./app/AuthenticateRoute";

function App() {
  return (
    <Router>
      <Switch>
        <AuthenticateRoute exact path="/">
          <Main />
        </AuthenticateRoute>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
