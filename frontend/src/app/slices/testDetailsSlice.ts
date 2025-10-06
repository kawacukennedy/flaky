import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface TestDetails {
  id: string;
  name: string;
  status: string;
  duration: number;
  environment: string;
  flakiness_score: number;
  timestamp: string;
  logs: any[];
}

interface TestDetailsState {
  loading: boolean;
  error: string | null;
  data: TestDetails | null;
}

const initialState: TestDetailsState = {
  loading: false,
  error: null,
  data: null,
};

export const fetchTestDetails = createAsyncThunk(
  'testDetails/fetchTestDetails',
  async (testId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/tests/${testId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch test details');
    }
  }
);

const testDetailsSlice = createSlice({
  name: 'testDetails',
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
      });
  },
});

export default testDetailsSlice.reducer;