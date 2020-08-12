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

function AddBossInfoForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [avatarList, setAvatarList] = useState([]);

  const [avatar, setAvatar] = useState(null);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [salary, setSalary] = useState("");
  const [info, setInfo] = useState("");

  const onTitleChange = (val) => setTitle(val);
  const onCompanyChange = (val) => setCompany(val);
  const onSalaryChange = (val) => setSalary(val);
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
    const data = { avatar, title, company, salary, info };
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
      <List renderHeader={() => "What kind of job are you hiring"}>
        <InputItem
          placeholder="What is the job title "
          onChange={(val) => onTitleChange(val)}
        >
          Job Title
        </InputItem>
        <InputItem
          placeholder="What is your company name"
          onChange={(val) => onCompanyChange(val)}
        >
          Company
        </InputItem>
        <InputItem
          type="money"
          labelNumber={8}
          clear
          placeholder="What is the salary a month"
          extra="$"
          onChange={(val) => onSalaryChange(val)}
        >
          Salary per month
        </InputItem>
      </List>
      <List renderHeader={() => "Job Description"}>
        <TextareaItem
          placeholder="Please describe this job more"
          autoHeight
          onChange={(val) => onInfoChange(val)}
        />
      </List>
      <List>
        <Button type="primary" onClick={onSaveClick}>
          Post this job
        </Button>
      </List>
    </div>
  );
}

export default AddBossInfoForm;
