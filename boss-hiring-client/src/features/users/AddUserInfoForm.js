import React from "react";
import { NavBar, Icon } from "antd-mobile";
import { useHistory } from "react-router-dom";

function AddUserInfoForm() {
  const history = useHistory();

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
      <div>Form</div>
    </div>
  );
}

export default AddUserInfoForm;
