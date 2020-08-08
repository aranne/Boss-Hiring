import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { reqRegister, reqLogin } from "../../api/userAPI";

const usersAdapter = createEntityAdapter({
  selectId: (user) => user._id,
  sortComparer: (a, b) => a.username.localeCompare(b.username),
});

export const register = createAsyncThunk(
  "users/register",
  async (user) => {
    const response = await reqRegister(user);
    return response.data.user;
  }
);

export const login = createAsyncThunk(
  "users/login",
  async (user) => {
    const response = await reqLogin(user);
    return response.data.user;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState({
    currentUserId: null,
    status: "idle",
    error: null,
  }),
  reducers: {},
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.currentUserId = action.payload._id;
    },
    [login.fulfilled]: (state, action) => {
      state.currentUserId = action.payload._id;
    },
  },
});

export default usersSlice.reducer;

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors(state => state.users);