import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  Radio,
  Button,
  Flex,
} from "antd-mobile";
import Logo from "../../app/log/logo";

const ListItem = List.Item;
const FlexItem = Flex.Item;
const RadioItem = Radio.RadioItem;

function Register(props) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("employer");
  let history = useHistory(); // use history hooks

  const handleChange = (name, val) => {
    if (name === "username") {
      setUserName(val);
    } else if (name === "password") {
      setPassword(val);
    } else {
      setType(val);
    }
  };

  const register = () => {};

  const toLogin = () => {
    history.replace("/login");
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
              onChange={(val) => handleChange("username", val)}
            >
              User Name
            </InputItem>
          </ListItem>
          <ListItem>
            <InputItem
              type="password"
              placeholder={"Please enter your password"}
              onChange={(val) => handleChange("password", val)}
            >
              Password
            </InputItem>
          </ListItem>

          <ListItem>
            <Flex>
              <FlexItem>
                <RadioItem
                  checked={type === "employer"}
                  onChange={() => handleChange("type", "employer")}
                  defaultChecked
                >
                  I'm an Employer
                </RadioItem>
              </FlexItem>
              <FlexItem>
                <RadioItem
                  checked={type === "employee"}
                  onChange={() => handleChange("type", "employee")}
                >
                  I'm a Job Seeker
                </RadioItem>
              </FlexItem>
            </Flex>
          </ListItem>

          <ListItem>
            <Button type="primary" onClick={() => register()}>
              Sign In
            </Button>
          </ListItem>
          <ListItem>
            <Button onClick={() => toLogin()}>Already Has an Account</Button>
          </ListItem>
        </List>
      </WingBlank>
    </div>
  );
}

export default Register;
