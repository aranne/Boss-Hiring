import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../currentUser/currentUserSlice";
import { ActivityIndicator } from "antd-mobile";
import { fetchUsers, selectAllUsers, selectLoadingStatus } from "../usersSlice";
import UserCard from "./UserCard";
import "./UsersList.less";

function UserList() {
  const users = useSelector(selectAllUsers);

  return (
    <div className="users-list">
      {users.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
}

export default UserList;
