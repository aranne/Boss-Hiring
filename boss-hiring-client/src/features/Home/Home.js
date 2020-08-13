import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavBar, TabBar } from "antd-mobile";
import { selectCurrentUser } from "../users/currentUser/currentUserSlice";
import UserInfo from "../users/currentUser/UserInfo/UserInfo";
import UserList from "../users/UsersList/UsersList";
import MessageList from "./../messages/MessageList";
import "./Home.less";

export default function Home() {
  const user = useSelector(selectCurrentUser);
  const userHead = user.type === "recruiter" ? "Job Seekers" : "Recruiters";

  const [title, setTilte] = useState(userHead);
  const [tab, setTab] = useState("first");

  return (
    <div className="home-page">
      <NavBar className="sticky-header">{title}</NavBar>
      <TabBar
        barTintColor="white"
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
      >
        <TabBar.Item
          title={userHead}
          key="users"
          icon={{
            uri: require("./images/users.png"),
            style: {
              width: "22px",
              height: "22px",
              background: `center center /  21px 21px no-repeat`,
            },
          }}
          selectedIcon={{
            uri: require("./images/users-selected.png"),
            style: {
              width: "22px",
              height: "22px",
              background: `center center /  21px 21px no-repeat`,
            },
          }}
          selected={tab === "first"}
          onPress={() => {
            setTab("first");
            setTilte(userHead);
          }}
        >
          <UserList />
        </TabBar.Item>
        <TabBar.Item
          title="Chats"
          key="Chats"
          icon={{
            uri: require("./images/chats.png"),
            style: {
              width: "22px",
              height: "22px",
              background: `center center /  21px 21px no-repeat`,
            },
          }}
          selectedIcon={{
            uri: require("./images/chats-selected.png"),
            style: {
              width: "22px",
              height: "22px",
              background: `center center /  21px 21px no-repeat`,
            },
          }}
          selected={tab === "second"}
          onPress={() => {
            setTab("second");
            setTilte("Chats");
          }}
        >
          <MessageList />
        </TabBar.Item>
        <TabBar.Item
          title="Personal"
          key="Personal"
          icon={{
            uri: require("./images/profile.png"),
            style: {
              width: "22px",
              height: "22px",
              background: `center center /  21px 21px no-repeat`,
            },
          }}
          selectedIcon={{
            uri: require("./images/profile-selected.png"),
            style: {
              width: "22px",
              height: "22px",
              background: `center center /  21px 21px no-repeat`,
            },
          }}
          selected={tab === "third"}
          onPress={() => {
            setTab("third");
            setTilte("Profile");
          }}
        >
          <UserInfo />
        </TabBar.Item>
      </TabBar>
    </div>
  );
}
