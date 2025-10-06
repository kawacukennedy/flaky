import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface RootCause {
  type: string;
  description: string;
  severity: number;
  confidence: number;
}

interface RootCauseAnalysisState {
  loading: boolean;
  error: string | null;
  data: RootCause[];
}

const initialState: RootCauseAnalysisState = {
  loading: false,
  error: null,
  data: [],
};

export const fetchRootCause = createAsyncThunk(
  'rootCauseAnalysis/fetchRootCause',
  async (testId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/analysis/root_cause/${testId}`);
      return response.data.root_causes;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch root cause');
    }
  }
);

const rootCauseAnalysisSlice = createSlice({
  name: 'rootCauseAnalysis',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRootCause.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRootCause.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRootCause.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default rootCauseAnalysisSlice.reducer;