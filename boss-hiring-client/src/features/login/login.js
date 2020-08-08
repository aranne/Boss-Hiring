import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  Button,
} from "antd-mobile";
import Logo from "../../app/log/logo";

const ListItem = List.Item;

function Login(props) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory(); // use history hooks

  const register = () => {};

  const toRegister = () => {
    history.replace("/register");
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
              onChange={(val) => setUserName(val)}
            >
              User Name
            </InputItem>
          </ListItem>
          <ListItem>
            <InputItem
              type="password"
              placeholder={"Please enter your password"}
              onChange={(val) => setPassword(val)}
            >
              Password
            </InputItem>
          </ListItem>

          <ListItem>
            <Button type="primary" onClick={() => register()}>
              Sign In
            </Button>
          </ListItem>
          <ListItem>
            <Button onClick={() => toRegister()}>Don't Have an Account?</Button>
          </ListItem>
        </List>
      </WingBlank>
    </div>
  );
}

export default Login;
