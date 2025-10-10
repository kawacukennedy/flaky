import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface DashboardSummary {
  totalTests: number;
  flakyTests: number;
  averageFlakiness: number;
  // Add more fields as needed
}

interface DashboardSummaryState {
  loading: boolean;
  error: string | null;
  data: DashboardSummary | null;
}

const initialState: DashboardSummaryState = {
  loading: false,
  error: null,
  data: null,
};

export const fetchDashboardSummary = createAsyncThunk(
  "dashboardSummary/fetchDashboardSummary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/tests/summary"); // Adjust endpoint
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch summary");
    }
  },
);

const dashboardSummarySlice = createSlice({
  name: "dashboardSummary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDashboardSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dashboardSummarySlice.reducer;
