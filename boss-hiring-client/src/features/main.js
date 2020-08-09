import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import AddUserInfoForm from "./users/AddUserInfoForm";

function Main() {
  return (
    <div>Main</div>
  )
  // let {path} = useRouteMatch();
  // console.log(path);
  // return (
  //   <Switch>
  //     <Route path={`${path}/userinfo`}>
  //       <AddUserInfoForm />
  //     </Route>
  //   </Switch>
  // );
}

export default Main;
