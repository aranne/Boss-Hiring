import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../currentUser/currentUserSlice";
import { ActivityIndicator } from "antd-mobile";
import { fetchUsers, selectAllUsers, selectLoadingStatus } from "../usersSlice";
import UserCard from "./UserCard";
import "./UsersList.less";

function UserList() {
  const dispath = useDispatch();
  const user = useSelector(selectCurrentUser);
  const users = useSelector(selectAllUsers);
  const loadStatus = useSelector(selectLoadingStatus);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    console.log("Fetching all users...");
    const type = {
      type: user.type === "recruiter" ? "jobseeker" : "recruiter",
    };
    async function getAllUsers() {
      await dispath(fetchUsers(type));
    }
    getAllUsers();
    setFirstRender(false);
  }, [user.type, dispath]);

  // waiting for fetching users.
  if (firstRender || loadStatus === "pending") {
    console.log("Start fetching all users");
    return <ActivityIndicator toast text="Loading..." animating={true} />;
  }

  return (
    <div className="users-list">
      {users.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
}

export default UserList;
