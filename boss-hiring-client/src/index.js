import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Main from "./containers/main/main";
import Login from "./containers/login/login";
import Register from "./containers/register/register";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
