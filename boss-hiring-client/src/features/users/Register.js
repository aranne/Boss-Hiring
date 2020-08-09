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
  Button,
  Flex,
  Toast,
} from "antd-mobile";
import Logo from "../../app/logo/logo";

const ListItem = List.Item;
const FlexItem = Flex.Item;

function Register() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("employer");
  const [typeStyle1, setTypeStyle1] = useState("primary");
  const [typeStyle2, setTypeStyle2] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  let history = useHistory(); // use history hooks
  const dispatch = useDispatch();

  const onUsernameChange = (val) => setUserName(val);
  const onPasswordChange = (val) => setPassword(val);
  
  const onTypeStyleClick1 = () => {
    setType("employer");
    if (typeStyle1 !== "primary") {
      setTypeStyle1("primary");
      setTypeStyle2("");
    }
  };
  const onTypeStyleClick2 = () => {
    setType("employee");
    if (typeStyle2 !== "primary") {
      setTypeStyle2("primary");
      setTypeStyle1("");
    }
  };

  const canSave =
    [username, password, type].every(Boolean) && addRequestStatus === "idle";

  const onRegisterClick = async () => {
    if (!canSave) return;
    setAddRequestStatus("pending");
    const resultAction = await dispatch(
      // since we use rejectWithValue, we don't need to unwarp the result
      register({ username, password, type })
    );
    if (register.fulfilled.match(resultAction)) {
      // succeed
      const user = unwrapResult(resultAction);
      history.push(getRedirectPath(user));
    } else {
      if (resultAction.payload) {
        Toast.fail(resultAction.payload.message, 1.5);
      } else {
        Toast.fail(resultAction.error.message, 1.5);
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
    // if (Object.keys(user).filter(key => user[key]).length <= 3) {
    //   // fill out info form
    //   path += "/info";
    // }
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
                <Button type={typeStyle1} onClick={onTypeStyleClick1}>
                  I'm an Employer
                </Button>
              </FlexItem>
              <FlexItem>
                <Button type={typeStyle2} onClick={onTypeStyleClick2}>
                  I'm a Job Seeker
                </Button>
              </FlexItem>
            </Flex>
          </ListItem>

          <ListItem>
            <Button
              type="primary"
              onClick={onRegisterClick}
              disabled={!canSave}
            >
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