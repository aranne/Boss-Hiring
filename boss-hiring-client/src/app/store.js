import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "../features/users/usersSlice";
import authReducer from '../features/users/authSlice';

export default configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
  },
});
