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

function AddBossInfoForm() {
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
      <List renderHeader={() => "What kind of job are you hiring"}>
        <InputItem placeholder="What is the job title ">Job Title</InputItem>
        <InputItem placeholder="What is your company name">Company</InputItem>
        <InputItem
          type="money"
          clear
          placeholder="What is the salary a month"
          extra="$"
        >
          Salary
        </InputItem>
      </List>
      <List renderHeader={() => "Job Description"}>
        <TextareaItem placeholder="Please describe this job more" autoHeight />
      </List>
      <List>
        <Button type="primary">Post this job</Button>
      </List>
    </div>
  );
}

export default AddBossInfoForm;
