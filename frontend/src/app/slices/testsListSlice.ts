import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Test {
  id: string;
  name: string;
  status: string;
  duration: number;
  environment: string;
  flakiness_score: number;
  timestamp: string;
}

interface TestsListState {
  loading: boolean;
  error: string | null;
  data: Test[];
  selectedTestId: string | null;
  query: string;
  appliedFilters: any;
}

const initialState: TestsListState = {
  loading: false,
  error: null,
  data: [],
  selectedTestId: null,
  query: "",
  appliedFilters: {},
};

export const fetchFilteredTests = createAsyncThunk(
  "testsList/fetchFilteredTests",
  async (
    { query, filters }: { query: string; filters: any },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.get("/tests", {
        params: { query, ...filters },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch tests");
    }
  },
);

export const applyFilters = createAsyncThunk(
  "testsList/applyFilters",
  async (filters: any, { rejectWithValue }) => {
    // Update filters and refetch
    return filters;
  },
);

export const sortTests = createAsyncThunk(
  "testsList/sortTests",
  async (sortBy: string, { rejectWithValue }) => {
    // Sort logic
    return sortBy;
  },
);

const testsListSlice = createSlice({
  name: "testsList",
  initialState,
  reducers: {
    setSelectedTestId: (state, action) => {
      state.selectedTestId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredTests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredTests.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFilteredTests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(applyFilters.fulfilled, (state, action) => {
        state.appliedFilters = action.payload;
      });
  },
});

export const { setSelectedTestId } = testsListSlice.actions;
export default testsListSlice.reducer;
