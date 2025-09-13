import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios.js";
import { toast } from "react-toastify";

// 🔹 Fetch all users
export const getUsers = createAsyncThunk(
  "chat/getUsers",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/message/users");
      return res.data.users;
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to fetch users";
      toast.error(msg);
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

// 🔹 Fetch messages for a selected user
export const getMessages = createAsyncThunk(
  "chat/getMessages",
  async (userId, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      return res.data;
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to fetch messages";
      toast.error(msg);
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

// 🔹 Send a message (supports AI responses)
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (messageData, thunkAPI) => {
    try {
      const { chat } = thunkAPI.getState();

      if (!chat.selectedUser?._id) {
        throw new Error("No recipient selected");
      }

      const res = await axiosInstance.post(
        `/message/send/${chat.selectedUser._id}`,
        messageData
      );

      return res.data;
    } catch (error) {
      const msg =
        error.response?.data?.error ||
        error.message ||
        "Failed to send message";
      toast.error(msg);
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    users: [],
    selectedUser: null,
    IsUsersLoading: false,
    IsMessagesLoading: false,
    IsSending: false,
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
      state.messages = []; // reset messages when switching user
    },
    pushNewMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Users
      .addCase(getUsers.pending, (state) => {
        state.IsUsersLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload || [];
        state.IsUsersLoading = false;
      })
      .addCase(getUsers.rejected, (state) => {
        state.IsUsersLoading = false;
      })

      // 🔹 Messages
      .addCase(getMessages.pending, (state) => {
        state.IsMessagesLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.messages = action.payload?.messages || [];
        state.IsMessagesLoading = false;
      })
      .addCase(getMessages.rejected, (state) => {
        state.IsMessagesLoading = false;
      })

      // 🔹 Sending messages
      .addCase(sendMessage.pending, (state) => {
        state.IsSending = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
        state.IsSending = false;
      })
      .addCase(sendMessage.rejected, (state) => {
        state.IsSending = false;
      });
  },
});

export const { setSelectedUser, pushNewMessage } = chatSlice.actions;
export default chatSlice.reducer;
