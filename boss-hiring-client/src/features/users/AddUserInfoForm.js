import React from "react";
import { NavBar, Icon, InputItem } from "antd-mobile";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersSlice";
import { selectCurrentUserId } from "./authSlice";

function AddUserInfoForm() {
  const history = useHistory();
  const userId = useSelector(selectCurrentUserId);
  const user = useSelector((state) => selectUserById(state, userId));

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
      {/* {user.type === "employer" ? (
        <InputItem>Job Title</InputItem>
      ) : (
        <InputItem></InputItem>
      )} */}

    </div>
  );
}

export default AddUserInfoForm;
