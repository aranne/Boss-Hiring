import React from "react";
import { Switch, Route } from "react-router-dom";
import AddUserInfoForm from "./users/currentUser/AddUserInfoForm/AddUserInfoForm";
import NotFind from "../app/NotFind";
import Home from "./Home/Home";

function Main() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/userinfo">
        <AddUserInfoForm />
      </Route>
      <Route>
        <NotFind />
      </Route>
    </Switch>
  );
}

export default Main;
