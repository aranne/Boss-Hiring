import React from 'react'
import {NavBar, Icon} from 'antd-mobile';
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";

function AddUserInfoForm() {

  let { path } = useRouteMatch();
  console.log({path});
  return (
    <div>
      <NavBar mode="dark" icon={<Icon type="left"/>}></NavBar>
      <div>Form</div>
    </div>
  )
}

export default AddUserInfoForm;
