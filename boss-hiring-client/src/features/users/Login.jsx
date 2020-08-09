import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./usersSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  Button,
  Toast,
} from "antd-mobile";
import Logo from "../../app/log/logo";

const ListItem = List.Item;

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  let history = useHistory(); // use history hooks
  const dispatch = useDispatch();

  const onUsernameChange = (val) => setUserName(val);
  const onPasswordChange = (val) => setPassword(val);

  const canLogin =
    [username, password].every(Boolean) && addRequestStatus === "idle";

  const onLoginClick = async () => {
    if (!canLogin) return;
    setAddRequestStatus("pending");
    const resultAction = await dispatch(
      // since we use rejectWithValue, we don't need to unwarp the result
      login({ username, password})
    );
    if (login.fulfilled.match(resultAction)) {
      // succeed
      const user = unwrapResult(resultAction);
      console.log(user);
    } else {
      if (resultAction.payload) {
        Toast.fail(resultAction.payload.message);
      } else {
        Toast.fail(resultAction.error.message);
      }
    }
    setAddRequestStatus("idle");
  };

  const getRedirectPath = (user) => {
    let path;
    if (user.type === "employee") {
      path = "/employee";
    } else if (user.type === "employer") {
      path = "/employer";
    }
    if (Object.keys(user).filter(key => user[key]).length <= 3) {
      // fill out info form
      path += "/info";
    }
    return path;
  };

  const toRegisterClick = () => {
    history.push("/register");
  };

  return (
    <div>
      <NavBar>BOSS HIRING</NavBar>
      <Logo />
      <WingBlank size="lg">
        <List>
          <ListItem>
            <InputItem
              placeholder={"Please enter your user name"}
              onChange={onUsernameChange}
            >
              User Name
            </InputItem>
          </ListItem>
          <ListItem>
            <InputItem
              type="password"
              placeholder={"Please enter your password"}
              onChange={onPasswordChange}
            >
              Password
            </InputItem>
          </ListItem>
          <ListItem>
            <Button type="primary" onClick={onLoginClick} disabled={!canLogin}>
              Sign In
            </Button>
          </ListItem>
          <ListItem>
            <Button onClick={toRegisterClick}>Already Has an Account</Button>
          </ListItem>
        </List>
      </WingBlank>
    </div>
  );
}

export default Login;
