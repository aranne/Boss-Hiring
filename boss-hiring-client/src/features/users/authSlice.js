import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { reqRegister, reqLogin } from "../../web/userAPI";

export const register = createAsyncThunk(
  "auth/register",
  async (user, { getState, requestId, rejectWithValue }) => {
    const { loading, currentReqeustId } = getState().auth;
    if (loading !== "pending" || currentReqeustId !== requestId)
      return Promise.reject("Try it later");
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
  async (user, { getState, requestId, rejectWithValue }) => {
    const { loading, currentReqeustId } = getState().auth;
    // if its the first request, loading should be 'pending' and request ID should be same
    if (loading !== "pending" || currentReqeustId !== requestId)
      return Promise.reject("Try it later");
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
    currentUser: null,
    loading: "idle",
    currentReqeustId: undefined,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: {
    [register.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentReqeustId = action.meta.requestId;
      }
    },
    [register.fulfilled]: (state, action) => {
      if (
        state.loading === "pending" &&
        state.currentReqeustId === action.meta.requestId
      ) {
        state.currentUser = action.payload;
        state.loading = "idle";
        state.currentReqeustId = undefined;
      }
    },
    [register.rejected]: (state, action) => {
      if (
        state.loading === "pending" &&
        state.currentReqeustId === action.meta.requestId
      ) {
        state.error = action.error;
        state.loading = "idle";
        state.currentReqeustId = undefined;
      }
    },
    [login.pending]: (state, action) => {
      // Only change it to 'pending' when we receive the first request and save current request ID
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentReqeustId = action.meta.requestId;
      }
    },
    [login.fulfilled]: (state, action) => {
      if (
        state.loading === "pending" &&
        state.currentReqeustId === action.meta.requestId
      ) {
        state.currentUser = action.payload;
        state.loading = "idle";
        state.currentReqeustId = undefined;
      }
    },
    [login.rejected]: (state, action) => {
      if (
        state.loading === "pending" &&
        state.currentReqeustId === action.meta.requestId
      ) {
        state.error = action.error;
        state.loading = "idle";
        state.currentReqeustId = undefined;
      }
    },
  },
});

export default authSlice.reducer;

export const { logout } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectLoadingStatus = (state) => state.auth.loading;
