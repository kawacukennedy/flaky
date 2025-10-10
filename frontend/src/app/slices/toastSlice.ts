import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ToastState {
  message: string | null;
  type: "success" | "error" | "info" | "warning" | null;
  id: string | null;
}

const initialState: ToastState = {
  message: null,
  type: null,
  id: null,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<{
        message: string;
        type: "success" | "error" | "info" | "warning";
      }>,
    ) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.id = Date.now().toString(); // Unique ID for each toast
    },
    clearToast: (state) => {
      state.message = null;
      state.type = null;
      state.id = null;
    },
  },
});

export const { showToast, clearToast } = toastSlice.actions;

export default toastSlice.reducer;
