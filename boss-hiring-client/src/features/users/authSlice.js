import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { reqRegister, reqLogin } from "../../api/userAPI";

export const register = createAsyncThunk(
  "auth/register",
  async (user, { rejectWithValue }) => {
    try {
      const response = await reqRegister(user);
      return response.data.user;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await reqLogin(user);
      return response.data.user;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUserId: null,
    loading: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.currentUserId = null;
      state.loading = "idle";
    },
  },
  extraReducers: {
    [register.pending]: (state) => {
      state.loading = "pending";
    },
    [register.fulfilled]: (state, action) => {
      state.loading = "idle";
      state.currentUserId = action.payload._id;
    },
    [register.rejected]: (state) => {
      state.loading = "idle";
    },
    [login.pending]: (state) => {
      state.loading = "pending";
    },
    [login.fulfilled]: (state, action) => {
      state.currentUserId = action.payload._id;
      state.loading = "idle";
    },
    [login.rejected]: (state) => {
      state.loading = "idle";
    },
  },
});

export default authSlice.reducer;

export const { logout } = authSlice.actions;

export const selectCurrentUserId = (state) => state.auth.currentUserId;
export const selectLoadingStatus = (state) => state.auth.loading;
