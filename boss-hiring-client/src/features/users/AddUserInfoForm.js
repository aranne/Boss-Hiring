import React from "react";
import { NavBar, Icon, InputItem } from "antd-mobile";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./authSlice";

function AddUserInfoForm() {
  const history = useHistory();
  const user = useSelector(selectCurrentUser);

  const onLeftClick = () => {
    history.push("/");
  };

  return (
    <div>
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={onLeftClick}
        rightContent={[
          <Icon key="0" type="search" style={{ marginRight: "16px" }} />,
          <Icon key="1" type="ellipsis" />,
        ]}
      >
        Set up your profile
      </NavBar>
      {user.type === "employer" ? (
        <InputItem>Job Title</InputItem>
      ) : (
        <InputItem></InputItem>
      )}
    </div>
  );
}

export default AddUserInfoForm;
