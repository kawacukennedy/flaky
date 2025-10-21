import { configureStore } from "@reduxjs/toolkit";
import testsReducer from "./slices/testsSlice";
import usersReducer from "./slices/usersSlice";
import toastReducer from "./slices/toastSlice";
import dashboardSummaryReducer from "./slices/dashboardSummarySlice";
import testsListReducer from "./slices/testsListSlice";
import testDetailsReducer from "./slices/testDetailsSlice";
import rootCauseAnalysisReducer from "./slices/rootCauseAnalysisSlice";
import userReducer from "./slices/userSlice";
import filtersReducer from "./slices/filtersSlice";

export const store = configureStore({
  reducer: {
    tests: testsReducer,
    users: usersReducer,
    toast: toastReducer,
    dashboardSummary: dashboardSummaryReducer,
    testsList: testsListReducer,
    testDetails: testDetailsReducer,
    rootCauseAnalysis: rootCauseAnalysisReducer,
    user: userReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
