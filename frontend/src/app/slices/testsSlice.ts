import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../app/services/api';

interface Test {
  id: number;
  name: string;
  project_id: number;
  status?: string; // Added status for filtering
}

interface TestDetails extends Test {
  // Add any other fields specific to test details
  description?: string;
  last_run_timestamp?: string;
  flakiness_score?: number;
}

interface TestLogs {
  test_id: number;
  logs: string[];
}

interface RootCauseAnalysis {
  test_id: number;
  root_causes: string[]; // Assuming root_causes is an array of strings
}

interface TestsState {
  tests: Test[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  searchTerm: string;
  filters: Record<string, string>;
  selectedTestDetails: TestDetails | null;
  selectedTestLogs: TestLogs | null;
  selectedRootCauseAnalysis: RootCauseAnalysis | null;
}

const initialState: TestsState = {
  tests: [],
  status: 'idle',
  error: null,
  searchTerm: '',
  filters: {},
  selectedTestDetails: null,
  selectedTestLogs: null,
  selectedRootCauseAnalysis: null,
};

export const fetchTests = createAsyncThunk('tests/fetchTests', async () => {
  const response = await api.get('/tests');
  return response.data;
});

export const fetchFilteredTests = createAsyncThunk(
  'tests/fetchFilteredTests',
  async ({ query, filters }: { query: string; filters: Record<string, string> }) => {
    const params = new URLSearchParams();
    if (query) {
      params.append('search', query);
    }
    for (const key in filters) {
      if (filters[key]) {
        params.append(key, filters[key]);
      }
    }
    const response = await api.get(`/tests?${params.toString()}`);
    return response.data;
  }
);

export const fetchTestDetails = createAsyncThunk(
  'tests/fetchTestDetails',
  async (testId: number) => {
    const response = await api.get(`/tests/${testId}`);
    return response.data;
  }
);

export const fetchTestLogs = createAsyncThunk(
  'tests/fetchTestLogs',
  async (testId: number) => {
    const response = await api.get(`/tests/${testId}/logs`);
    return response.data;
  }
);

export const fetchRootCauseAnalysis = createAsyncThunk(
  'tests/fetchRootCauseAnalysis',
  async (testId: number) => {
    const response = await api.get(`/analysis/root_cause/${testId}`);
    return response.data;
  }
);

export const createTest = createAsyncThunk('tests/createTest', async (newTest: { name: string; project_id: number }) => {
  const response = await api.post('/tests', newTest);
  return response.data;
});

export const updateTest = createAsyncThunk('tests/updateTest', async (updatedTest: Test) => {
  const response = await api.put(`/tests/${updatedTest.id}`, updatedTest);
  return response.data;
});

export const deleteTest = createAsyncThunk('tests/deleteTest', async (testId: number) => {
  await api.delete(`/tests/${testId}`);
  return testId;
});

const testsSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    addTest: (state, action: PayloadAction<Test>) => {
      state.tests.push(action.payload);
    },
    updateExistingTest: (state, action: PayloadAction<Test>) => {
      const index = state.tests.findIndex(test => test.id === action.payload.id);
      if (index !== -1) {
        state.tests[index] = action.payload;
      }
    },
    removeTest: (state, action: PayloadAction<number>) => {
      state.tests = state.tests.filter(test => test.id !== action.payload);
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setFilter: (state, action: PayloadAction<{ key: string; value: string }>) => {
      state.filters[action.payload.key] = action.payload.value;
    },
    clearFilters: (state) => {
      state.filters = {};
      state.searchTerm = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTests.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTests.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tests = action.payload;
      })
      .addCase(fetchTests.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch tests';
      })
      .addCase(fetchFilteredTests.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFilteredTests.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tests = action.payload;
      })
      .addCase(fetchFilteredTests.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch filtered tests';
      })
      .addCase(fetchTestDetails.pending, (state) => {
        state.status = 'loading';
        state.selectedTestDetails = null;
      })
      .addCase(fetchTestDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedTestDetails = action.payload;
      })
      .addCase(fetchTestDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch test details';
      })
      .addCase(fetchTestLogs.pending, (state) => {
        state.status = 'loading';
        state.selectedTestLogs = null;
      })
      .addCase(fetchTestLogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedTestLogs = action.payload;
      })
      .addCase(fetchTestLogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch test logs';
      })
      .addCase(fetchRootCauseAnalysis.pending, (state) => {
        state.status = 'loading';
        state.selectedRootCauseAnalysis = null;
      })
      .addCase(fetchRootCauseAnalysis.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedRootCauseAnalysis = action.payload;
      })
      .addCase(fetchRootCauseAnalysis.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch root cause analysis';
      })
      .addCase(createTest.fulfilled, (state, action) => {
        // This is handled by WebSocket now, but keeping for direct API calls if any
        // state.tests.push(action.payload);
      })
      .addCase(updateTest.fulfilled, (state, action) => {
        // This is handled by WebSocket now
        // const index = state.tests.findIndex(test => test.id === action.payload.id);
        // if (index !== -1) {
        //   state.tests[index] = action.payload;
        // }
      })
      .addCase(deleteTest.fulfilled, (state, action) => {
        // This is handled by WebSocket now
        // state.tests = state.tests.filter(test => test.id !== action.payload);
      });
  },
});

export const { addTest, updateExistingTest, removeTest, setSearchTerm, setFilter, clearFilters } = testsSlice.actions;
export default testsSlice.reducer;