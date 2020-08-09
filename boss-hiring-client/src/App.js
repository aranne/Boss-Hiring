import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./features/users/Login";
import Register from "./features/users/Register";
import Main from "./features/main";

import { useSelector } from "react-redux";
import { selectCurrentUserId } from "./features/users/usersSlice";

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/">
          <Main />
        </PrivateRoute>
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

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  const currentUserId = useSelector(selectCurrentUserId);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUserId ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default App;
