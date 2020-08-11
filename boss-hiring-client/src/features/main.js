import React from "react";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import AddBossInfoForm from "./users/AddBossInfoForm";
import AddSeekerInfoForm from './users/AddJobseekerInfoForm';
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./users/currentUserSlice";

function Main() {
  const { path } = useRouteMatch();
  const user = useSelector(selectCurrentUser);
  return (
    <div>
      <Link to={`${path}/userinfo`}>User Info</Link>
      <Switch>
        {/* Since this is a secondary route, we must retrieve path */}
        <Route path={`${path}/userinfo`}>
          {user.type === 'jobseeker' ? (
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
