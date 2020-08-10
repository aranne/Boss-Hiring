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
      <List renderHeader={() => "Please choose your avatar"}>
        <Grid data={avatarList}  isCarousel carouselMaxRow={1}/>
      </List>
      <List renderHeader={() => "What kind of job are you seeking"}>
        <InputItem placeholder="What is the job title ">Job Title</InputItem>
      </List>
      <List renderHeader={() => "Self Introduction"}>
        <TextareaItem placeholder="Please introduce yourself" autoHeight />
      </List>
      <List>
        <Button type="primary">Save</Button>
      </List>
    </div>
  );
}

export default AddSeekerInfoForm;
