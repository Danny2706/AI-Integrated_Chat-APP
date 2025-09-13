import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosInstance } from "../../lib/axios";
import { connectSocket, disconnectSocket } from "../../lib/socket";
import { toast } from "react-toastify";

export const getUser = createAsyncThunk("auth/me", async (_, thunkAPI) => {
    try {
        const res = await axiosInstance.get("/auth/me");
        connectSocket(res.data.user);
        return res.data.user;
    } catch (error) {
        console.log("Error fetching user:", error);
        return thunkAPI.rejectWithValue(
            error.response?.data || "Failed to fetch user"
        )
    }
})

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        await axiosInstance.post("/auth/logout");
        disconnectSocket();
        return null;
    } catch (error) {
        toast.error(error.response.data.message);
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
}) 


export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const res = await axiosInstance.post("/auth/login",data);
      connectSocket(res.data);
      toast.success("Logged in successfully")
      return res.data
  } catch (error) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
})

export const signup = createAsyncThunk("auth/signup", async (data, thunkAPI) => {
    try {
        const res = await axiosInstance.post("/auth/signup", data);
        connectSocket(res.data.user, thunkAPI.dispatch); 
        toast.success("Account Created Successfully")
        return res.data
    } catch (error) {
        toast.error(error.response.data.message);
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})

export const updateProfile = createAsyncThunk("/auth/update_profile", async (data, thunkAPI) => {
  try {
    const res = await axiosInstance.put("/auth/update_profile", data);
    toast.success("Profile Updated Successfully.")
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        authUser: null,
        isSigningUp: false,
        isLoggingIn: false,
        isUpdatingProfile: false,
        isCheckingAuth: true,
        onlineUsers: [],
    },
    reducers: {
        setOnlineUsers(state, action) {
        state.onlineUsers = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
          .addCase(getUser.fulfilled, (state, action) => {
            state.authUser = action.payload;
            state.isCheckingAuth = false;
          })
          .addCase(getUser.rejected, (state, action) => {
            state.authUser = null;
            state.isCheckingAuth = false;
          })
          .addCase(logout.fulfilled, (state) => {
            state.authUser = null;
          })
          .addCase(logout.rejected, (state) => {
            // eslint-disable-next-line no-self-assign
            state.authUser = state.authUser;
          })
          .addCase(login.pending, (state) => {
            state.isLoggingIn = true;
          })
          .addCase(login.fulfilled, (state, action) => {
            state.authUser = action.payload;
            state.isLoggingIn = false;
          })
          .addCase(login.rejected, (state) => {
            state.isLoggingIn = false;
          })
          .addCase(signup.pending, (state) => {
            state.isSigningUp = true;
          })
          .addCase(signup.fulfilled, (state, action) => {
            state.authUser = action.payload;
            state.isSigningUp = false;
          })
          .addCase(signup.rejected, (state) => {
            state.isSigningUp = false;
          })
         .addCase(updateProfile.pending, (state) => {
            state.isUpdatingProfile = true;
          })
          .addCase(updateProfile.fulfilled, (state, action) => {
            state.authUser = action.payload;
            state.isUpdatingProfile = false;
          })
          .addCase(updateProfile.rejected, (state) => {
            state.isUpdatingProfile = false;
          });
    }

});

export const { setOnlineUsers } = authSlice.actions;

export default authSlice.reducer