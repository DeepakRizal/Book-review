import { configureStore } from "@reduxjs/toolkit";
import BookReducer from "./slices/bookSlice";
import ReviewReducer from "./slices/reviewSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    book: BookReducer,
    review: ReviewReducer,
    auth: authReducer,
  },
});

export default store;
