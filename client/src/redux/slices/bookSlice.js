import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchBooksStart(state) {
      state.loading = true;
    },
    fetchBooksSuccess(state, action) {
      state.books = action.payload;
      state.loading = false;
    },
    fetchBooksFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchBooksStart, fetchBooksSuccess, fetchBooksFailure } =
  bookSlice.actions;
export default bookSlice.reducer;
