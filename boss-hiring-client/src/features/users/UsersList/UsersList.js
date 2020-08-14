import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../usersSlice";
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
