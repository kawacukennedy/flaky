import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface TestDetails {
  id: string;
  name: string;
  status: string;
  duration: number;
  environment: string;
  flakiness_score: number;
  timestamp: string;
}

interface TestLogs {
  test_id: string;
  logs: string[];
  has_more: boolean;
}

interface TestDetailsState {
  loading: boolean;
  error: string | null;
  data: TestDetails | null;
  logs: TestLogs | null;
  logsLoading: boolean;
  logsError: string | null;
}

const initialState: TestDetailsState = {
  loading: false,
  error: null,
  data: null,
  logs: null,
  logsLoading: false,
  logsError: null,
};

export const fetchTestDetails = createAsyncThunk(
  "testDetails/fetchTestDetails",
  async (testId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/tests/${testId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch test details",
      );
    }
  },
);

export const fetchTestLogs = createAsyncThunk(
  "testDetails/fetchTestLogs",
  async ({ testId, skip = 0 }: { testId: string; skip?: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/tests/${testId}/logs`, { params: { skip, limit: 50 } });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch test logs",
      );
    }
  },
);

const testDetailsSlice = createSlice({
  name: "testDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTestDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTestLogs.pending, (state) => {
        state.logsLoading = true;
        state.logsError = null;
      })
      .addCase(fetchTestLogs.fulfilled, (state, action) => {
        state.logsLoading = false;
        if (state.logs) {
          state.logs.logs = [...state.logs.logs, ...action.payload.logs];
          state.logs.has_more = action.payload.has_more;
        } else {
          state.logs = action.payload;
        }
      })
      .addCase(fetchTestLogs.rejected, (state, action) => {
        state.logsLoading = false;
        state.logsError = action.payload as string;
      });
  },
});

export default testDetailsSlice.reducer;
