import React, { useState, useEffect } from "react";
import {
  NavBar,
  Icon,
  InputItem,
  List,
  TextareaItem,
  Button,
  Grid,
} from "antd-mobile";
import { useHistory } from "react-router-dom";

function AddSeekerInfoForm() {
  const history = useHistory();
  const [avatarList, setAvatarList] = useState([]);

  const [avatar, setAvatar] = useState(null);
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");

  const onTitleChange = (val) => setTitle(val);
  const onInfoChange = (val) => setInfo(val);

  useEffect(() => {
    let list = [];
    for (let i = 1; i <= 20; i++) {
      list.push({
        icon: require(`../../app/images/avatars/avatar${i}.png`), // cannot use import
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

  const onSaveClick = () => {};

  const header = !avatar ? (
    "Please choose your avatar"
  ) : (
    <div>
      {"Selected avatar: "} <img src={avatar} alt="unavailable avatar"></img>
    </div>
  );

  return (
    <div>
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={onLeftClick}
        rightContent={[<Icon key="1" type="ellipsis" />]}
      >
        Boss Hiring
      </NavBar>
      <List renderHeader={() => header}>
        <Grid data={avatarList} isCarousel carouselMaxRow={1} onClick={el => onAvatarClick(el)}/>
      </List>
      <List renderHeader={() => "What kind of job are you seeking"}>
        <InputItem placeholder="What is the job title " onChange={val => onTitleChange(val)}>Job Title</InputItem>
      </List>
      <List renderHeader={() => "Self Introduction"}>
        <TextareaItem placeholder="Please introduce yourself" autoHeight onChange={val => onInfoChange(val)}/>
      </List>
      <List>
        <Button type="primary" onClick={onSaveClick}>Save</Button>
      </List>
    </div>
  );
}

export default AddSeekerInfoForm;
