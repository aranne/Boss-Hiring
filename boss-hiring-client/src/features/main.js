import React from "react";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import AddUserInfoForm from "./users/AddUserInfoForm";

function Main() {
  const { path } = useRouteMatch();
  return (
    <div>
      <Link to={`${path}/userinfo`}>User Info</Link>
      <Switch>
        {/* Since this is a secondary route, we must retrieve path */}
        <Route path={`${path}/userinfo`}>
          <AddUserInfoForm />
        </Route>
      </Switch>
    </div>
  );
}

export default Main;
