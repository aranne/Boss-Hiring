import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  selectCurrentUser,
  fetchCurrentUser,
} from "../features/users/currentUserSlice";
import { fetchUsers, usersUpdated } from "../features/users/usersSlice";
import { Toast } from "antd-mobile";
import Cookies from "js-cookie";
import { w3cwebsocket } from "websocket";
import { wsSeverConfig } from "./config";

export let wsClient = new w3cwebsocket(
  wsSeverConfig.url,
  wsSeverConfig.protocal
);

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export default function AuthenticateRoute({ children, ...rest }) {
  const userId = Cookies.get("userId");
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) {
      Toast.fail("Your login cession has expired, please login again");
    }

    const connectWsServer = (newUser) => {
      wsClient = new w3cwebsocket(
        wsSeverConfig.url,
        wsSeverConfig.protocal
      );
      wsClient.onopen = function () {
        console.log("WebSocket Client Connected");
        wsClient.send(JSON.stringify({ type: newUser.type })); // if connection is open, send client user type
      };
      wsClient.onmessage = function (e) {
        if (typeof e.data === "string") {
          dispatch(usersUpdated(JSON.parse(e.data)));
        }
      };
    };

    const fetchUser = async () => {
      const resultAction = await dispatch(fetchCurrentUser());
      if (fetchCurrentUser.fulfilled.match(resultAction)) {
        const newUser = unwrapResult(resultAction);
        const type = {
          type: newUser.type === "recruiter" ? "jobseeker" : "recruiter",
        };
        await dispatch(fetchUsers(type)); // fetch all users when login
        // if we fetch current logged in user, send its type to web socket Sever
        console.log("Build web socket TCP connection");
        connectWsServer(newUser);
      } else {
        if (resultAction.payload) {
          Toast.fail(resultAction.payload.message, 1.5);
        } else {
          Toast.fail(resultAction.error.message, 1.5);
        }
      }
    };
    // if we have userId in cookies but redux doesn't have current user
    if (userId && !user) {
      console.log("Start fetching user");
      fetchUser(); // after fetching user, this component will re-render
    }
  });

  // stop render to wait for async result !!!!!!!
  if (userId && !user) {
    console.log("Auth accetps but user doesn't exist in Redux");
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        userId ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
