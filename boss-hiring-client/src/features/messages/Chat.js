import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { NavBar, List, Icon } from "antd-mobile";
import { selectAllMessages } from "./messagesSlice";
import { selectCurrentUser } from "../users/currentUser/currentUserSlice";
import { selectUserById } from "../../features/users/usersSlice";
import "./Chat.less";

function Chat() {
  const history = useHistory();
  const currentUser = useSelector(selectCurrentUser);
  let { userId: otherUserId } = useParams();
  const otherUser = useSelector((state) => selectUserById(state, otherUserId));
  const allMessages = useSelector(selectAllMessages);
  const messages = allMessages.filter(
    (msg) => msg.to === otherUserId || msg.from === otherUserId
  );

  const onLeftClick = () => {
    history.goBack();
  };

  if (!otherUser) {
    history.replace("/notfind");
    return null;
  }

  return (
    <div className="chat-page">
      <NavBar
        icon={<Icon type="left" />}
        className="sticky-header"
        onLeftClick={onLeftClick}
      >
        {otherUser.username}
      </NavBar>
      <List className="chat-page">
        {messages.map((msg) => {
          // if this msg is from other user to me
          if (otherUser._id === msg.from) {
            return (
              <List.Item key={msg._id} thumb={otherUser.avatar}>
                {msg.content}
              </List.Item>
            );
          } else {
            return (
              <List.Item className='chat-me' key={msg._id} thumb={currentUser.avatar}>
                {msg.content}
              </List.Item>
            );
          }
        })}
      </List>
    </div>
  );
}

export default Chat;
