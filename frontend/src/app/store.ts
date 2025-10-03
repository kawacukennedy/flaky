import { configureStore } from '@reduxjs/toolkit';
import testsReducer from './slices/testsSlice';
import usersReducer from './slices/usersSlice';
import toastReducer from './slices/toastSlice';

export const store = configureStore({
  reducer: {
    tests: testsReducer,
    users: usersReducer,
    toast: toastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;