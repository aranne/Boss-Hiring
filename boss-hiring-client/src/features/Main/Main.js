import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import AddUserInfoForm from "../users/currentUser/AddUserInfoForm/AddUserInfoForm";
import { useSelector } from "react-redux";
import { NavBar } from "antd-mobile";
import { selectCurrentUser } from "../users/currentUser/currentUserSlice";
import UserInfo from "../users/currentUser/UserInfo/UserInfo";
import UserList from "../users/UsersList/UsersList";
import MessageList from "./../messages/MessageList";
import NotFind from "../../app/NotFind";
import NavFooter from "../../app/NavFooter/NavFooter";
import "./Main.less";

const navList = [
  {
    path: "",
    children: UserList,
    icon: "Users",
    key: "users",
  },
  {
    path: "/message",
    children: MessageList,
    title: "Chats",
    icon: "Chats",
    key: "message",
  },
  {
    path: "/user",
    children: UserInfo,
    title: "Personal Ceter",
    icon: "Personal",
    key: "personal",
  },
];

function Main() {
  const { path } = useRouteMatch();
  const user = useSelector(selectCurrentUser);

  const matchUserList = useRouteMatch({
    path: `${path}${navList[0].path}`,
    exact: true,
    sensitive: true,
  });
  const matchMessageList = useRouteMatch({
    path: `${path}${navList[1].path}`,
    exact: true,
    sensitive: true,
  });
  const matchUserInfo = useRouteMatch({
    path: `${path}${navList[2].path}`,
    exact: true,
    sensitive: true,
  });

  let currentNav = null;
  if (matchUserList) currentNav = navList[0];
  else if (matchMessageList) currentNav = navList[1];
  else if (matchUserInfo) currentNav = navList[2];
  else currentNav = null;

  return (
    <div className="main-page">
      {currentNav ? (
        <NavBar className="sticky-header">
          {matchUserList
            ? user.type === "recruiter"
              ? "Job Seekers"
              : "Recruiters"
            : currentNav.title}
        </NavBar>
      ) : null}
      {/* Since this is a secondary route, we must retrieve path */}
      <Switch>
        {/* Since this is a secondary route, we must retrieve path */}
        {navList.map((nav, id) => (
          <Route key={id} exact path={`${path}${nav.path}`}>
            <nav.children />
          </Route>
        ))}
        <Route exact path={`${path}/userinfo`}>
          <AddUserInfoForm />
        </Route>
        <Route>
          <NotFind />
        </Route>
      </Switch>

      {currentNav ? <NavFooter navList={navList} /> : null}
    </div>
  );
}

export default Main;
