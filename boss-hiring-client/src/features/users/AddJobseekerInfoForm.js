import React, { useState, useEffect } from "react";
import {
  NavBar,
  Icon,
  InputItem,
  List,
  TextareaItem,
  Button,
  Grid,
  Toast,
  ActivityIndicator,
} from "antd-mobile";
import { useHistory } from "react-router-dom";
import { updateUser, selectLoadingStatus } from "./currentUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

function AddSeekerInfoForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [avatarList, setAvatarList] = useState([]);

  const [avatar, setAvatar] = useState(null);
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");

  const onTitleChange = (val) => setTitle(val);
  const onInfoChange = (val) => setInfo(val);

  const loadingStatus = useSelector(selectLoadingStatus);

  useEffect(() => {
    let list = [];
    for (let i = 1; i <= 20; i++) {
      list.push({
        icon: require(`./avatars/avatar${i}.png`), // cannot use import
        text: "avatar" + i,
      });
    }
    setAvatarList(list);
  }, []);

  const onLeftClick = () => {
    history.push("/");
  };

  const onAvatarClick = (el) => {
    setAvatar(el.icon);
  };

  const onSaveClick = async () => {
    const data = { avatar, title, info };
    const resultAction = await dispatch(updateUser(data));
    if (updateUser.fulfilled.match(resultAction)) {
      // succeed
      const user = unwrapResult(resultAction);
      console.log(user);
    } else {
      if (resultAction.payload) {
        Toast.fail(resultAction.payload.message, 1.5);
      } else {
        Toast.fail(resultAction.error.message, 1.5);
      }
    }
  };

  const header = !avatar ? (
    "Please choose your avatar"
  ) : (
    <div>
      {"Selected avatar: "} <img src={avatar} alt="unavailable avatar"></img>
    </div>
  );

  return (
    <div>
      <List>
        <ActivityIndicator
          animating={loadingStatus === "pending"}
          toast={true}
        />
      </List>
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={onLeftClick}
        rightContent={[<Icon key="1" type="ellipsis" />]}
      >
        Boss Hiring
      </NavBar>
      <List renderHeader={() => header}>
        <Grid
          data={avatarList}
          isCarousel
          carouselMaxRow={1}
          onClick={(el) => onAvatarClick(el)}
        />
      </List>
      <List renderHeader={() => "What kind of job are you seeking"}>
        <InputItem
          placeholder="What is the job title "
          onChange={(val) => onTitleChange(val)}
        >
          Job Title
        </InputItem>
      </List>
      <List renderHeader={() => "Self Introduction"}>
        <TextareaItem
          placeholder="Please introduce yourself"
          autoHeight
          onChange={(val) => onInfoChange(val)}
        />
      </List>
      <List>
        <Button type="primary" onClick={onSaveClick}>
          Save
        </Button>
      </List>
    </div>
  );
}

export default AddSeekerInfoForm;
