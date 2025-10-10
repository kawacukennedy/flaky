import { createSlice } from "@reduxjs/toolkit";

interface FiltersState {
  query: string;
  appliedFilters: any;
}

const initialState: FiltersState = {
  query: "",
  appliedFilters: {},
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setAppliedFilters: (state, action) => {
      state.appliedFilters = action.payload;
    },
  },
});

export const { setQuery, setAppliedFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
