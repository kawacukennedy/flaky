import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../app/services/api';

interface Test {
  id: number;
  name: string;
  project_id: number;
}

interface TestsState {
  tests: Test[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TestsState = {
  tests: [],
  status: 'idle',
  error: null,
};

export const fetchTests = createAsyncThunk('tests/fetchTests', async () => {
  const response = await api.get('/tests');
  return response.data;
});

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

export const { addTest, updateExistingTest, removeTest } = testsSlice.actions;
export default testsSlice.reducer;