import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { reqAllMessages } from "../../web/messageAPI";

const messagesAdapter = createEntityAdapter({
  selectId: (message) => message._id,
  sortComparer: (a, b) => b.time.localeCompare(a.time),
});

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (_, { requestId, getState }) => {
    const { loading, currentRequestId } = getState().messages;
    if (loading !== "pending" || currentRequestId !== requestId) {
      return Promise.reject("Try it later");
    }
    const response = await reqAllMessages();
    return response.data.chats;
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState: messagesAdapter.getInitialState({
    loading: "idle",
    currentRequestId: undefined,
    error: null,
  }),
  reducers: {
    allMessagesRead(state, action) {
      const msgs = action.payload; // an array of msgs
      msgs.forEach((msg) => {
        msg.read = true;
      });
    },
  },
  extraReducers: {
    [fetchMessages.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = action.meta.requestId;
      }
    },
    [fetchMessages.fulfilled]: (state, action) => {
      if (
        state.loading === "pending" &&
        state.currentRequestId === action.meta.requestId
      ) {
        state.loading = "idle";
        state.currentRequestId = undefined;
        messagesAdapter.upsertMany(state, action.payload);
      }
    },
    [fetchMessages.rejected]: (state, action) => {
      if (
        state.loading === "pending" &&
        state.currentRequestId === action.meta.requestId
      ) {
        state.loading = "idle";
        state.currentRequestId = undefined;
        state.error = action.error;
      }
    },
  },
});

export default messagesSlice.reducer;

export const { allMessagesRead } = messagesSlice.actions;

export const { selectAll: selectAllMessages } = messagesAdapter.getSelectors(
  (state) => state.messages
);
