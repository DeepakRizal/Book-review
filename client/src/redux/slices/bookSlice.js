import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    selectedBook: null, // Store selected book
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
    fetchBookStart(state) {
      state.loading = true;
      state.selectedBook = null;
    },
    fetchBookSuccess(state, action) {
      state.selectedBook = action.payload;
      state.loading = false;
    },
    fetchBookFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchBooksStart,
  fetchBooksSuccess,
  fetchBooksFailure,
  fetchBookStart,
  fetchBookSuccess,
  fetchBookFailure,
  setPage,
} = bookSlice.actions;

export default bookSlice.reducer;
