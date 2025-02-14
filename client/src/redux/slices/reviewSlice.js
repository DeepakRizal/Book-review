import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchReviewsStart(state) {
      state.loading = true;
    },
    fetchReviewsSuccess(state, action) {
      state.reviews = action.payload;
      state.loading = false;
    },
    fetchReviewsFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    addReview(state, action) {
      state.reviews.push(action.payload);
    },
  },
});

export const {
  fetchReviewsStart,
  fetchReviewsSuccess,
  fetchReviewsFailure,
  addReview,
} = reviewSlice.actions;
export default reviewSlice.reducer;
