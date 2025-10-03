import { configureStore } from '@reduxjs/toolkit';
import toastReducer from './slices/toastSlice';
import { api } from './services/api';

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;