import React from "react";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import AddBossInfoForm from "./users/AddBossInfoForm";
import AddSeekerInfoForm from './users/AddSeekerInfoForm';
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/users/authSlice";

function Main() {
  const { path } = useRouteMatch();
  const user = useSelector(selectCurrentUser);
  return (
    <div>
      <Link to={`${path}/userinfo`}>User Info</Link>
      <Switch>
        {/* Since this is a secondary route, we must retrieve path */}
        <Route path={`${path}/userinfo`}>
          {user.type === 'employer' ? (
            <AddSeekerInfoForm />
          ) : (
            <AddBossInfoForm />
          )}
        </Route>
      </Switch>
    </div>
  );
}

export default Main;
