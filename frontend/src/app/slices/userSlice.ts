import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface UserState {
  loading: boolean;
  error: string | null;
  data: User | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  data: null,
};

export const login = createAsyncThunk(
  "user/login",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(
        "/users/login",
        new URLSearchParams({ username, password }),
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  },
);

export const signup = createAsyncThunk(
  "user/signup",
  async (
    userData: { username: string; email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post("/users/signup", userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Signup failed");
    }
  },
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData: Partial<User>, { rejectWithValue }) => {
    try {
      const response = await axios.put("/users/me", userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Update failed");
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.user;
        // Store token in localStorage or something
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
