import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/services/api";

interface User {
  id: number;
  username: string;
  email: string;
  is_admin: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("accessToken"),
  status: "idle",
  error: null,
};

export const signupUser = createAsyncThunk(
  "users/signupUser",
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/signup", userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (credentials: any, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/users/token",
        new URLSearchParams(credentials),
      );
      localStorage.setItem("accessToken", response.data.access_token);
      // Fetch user details after successful login
      const userResponse = await api.get("/users/me");
      return { token: response.data.access_token, user: userResponse.data };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  "users/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users/me");
      return response.data;
    } catch (error: any) {
      localStorage.removeItem("accessToken");
      return rejectWithValue(error.response.data);
    }
  },
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Optionally log in the user after signup, or just show success message
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.token = null;
        state.user = null;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.user = null;
        state.token = null;
      });
  },
});

export const { logout } = usersSlice.actions;
export default usersSlice.reducer;
