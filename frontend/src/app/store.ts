import { configureStore } from '@reduxjs/toolkit';
import { api } from './services/api';
import toastReducer from './slices/toastSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    toast: toastReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
