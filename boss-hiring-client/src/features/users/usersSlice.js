import { reqAllUsers } from "../../api/userAPI";
import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter({
  selectId: (user) => user._id,
  sortComparer: (a, b) => a.username.localeCompare(b.username),
});

const fetchUsers = createAsyncThunk("users/fetchUsers", async (type) => {
  const response = await reqAllUsers(type);
  return response.data.users;
});

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState({
    loading: "idle",
    currentRequestId: null,
    error: null,
  }),
  reducers: {
    userAdded: usersAdapter.addOne,
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      
    }
  },
});

export default usersSlice.reducer;

export const { userAdded } = usersSlice.actions;

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors((state) => state.users);
