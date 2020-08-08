import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "./usersSlice";
import { unwrapResult } from "@reduxjs/toolkit";
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

function Register() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("employer");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  let history = useHistory(); // use history hooks
  const dispatch = useDispatch();

  const onUsernameChange = (val) => setUserName(val);
  const onPasswordChange = (val) => setPassword(val);
  const onTypeChange = (val) => setType(val);

  const canSave =
    [username, password, type].every(Boolean) && addRequestStatus === "idle";

  const onRegisterClick = async () => {
    if (!canSave) return;
    try {
      setAddRequestStatus("pending");
      const resultAction = await dispatch(
        register({ username, password, type })
      );
      const user = unwrapResult(resultAction);
    } catch (err) {
      console.log(err);
      if (err.response) {
        alert(err.response.data);
      } else if (err.request) {
        alert(err.register);
      } else {
        alert(err.message);
      }
    } finally {
      setAddRequestStatus("idle");
    }
  };

  const getRedirectPath = (user) => {
    let path;
    if (user.type === "employee") {
      path = "/employee";
    } else if (user.type === "employer") {
      path = "/employer";
    }
    if (Object.keys(user).length <= 4) {
      // fill out info form
      path += "/info";
    }
    return path;
  };

  const toLoginClick = () => {
    history.push("/login");
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
            <Flex>
              <FlexItem>
                <RadioItem
                  checked={type === "employer"}
                  onChange={() => onTypeChange("employer")}
                  defaultChecked
                >
                  I'm an Employer
                </RadioItem>
              </FlexItem>
              <FlexItem>
                <RadioItem
                  checked={type === "employee"}
                  onChange={() => onTypeChange("employee")}
                >
                  I'm a Job Seeker
                </RadioItem>
              </FlexItem>
            </Flex>
          </ListItem>

          <ListItem>
            <Button type="primary" onClick={onRegisterClick}>
              Sign In
            </Button>
          </ListItem>
          <ListItem>
            <Button onClick={toLoginClick}>Already Has an Account</Button>
          </ListItem>
        </List>
      </WingBlank>
    </div>
  );
}

export default Register;
