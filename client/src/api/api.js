import axios from "axios";
import {
  fetchReviewsStart,
  fetchReviewsSuccess,
  fetchReviewsFailure,
  addReview,
} from "../redux/slices/reviewSlice";
import {
  fetchBookFailure,
  fetchBookStart,
  fetchBookSuccess,
} from "../redux/slices/bookSlice";

const apiUrl = import.meta.env.VITE_API_URL;

// Fetch all reviews (global state update)
export const fetchAllReviews = () => async (dispatch) => {
  dispatch(fetchReviewsStart());
  try {
    const response = await axios.get(`${apiUrl}/reviews`);
    dispatch(fetchReviewsSuccess(response.data.data.reviews));
  } catch (error) {
    dispatch(
      fetchReviewsFailure(
        error.response?.data?.message || "Failed to load reviews"
      )
    );
  }
};

// Fetch reviews for a specific book
export const fetchReviewsByBook = (bookId) => async (dispatch) => {
  dispatch(fetchReviewsStart());
  try {
    const response = await axios.get(`${apiUrl}/reviews/${bookId}`);
    dispatch(fetchReviewsSuccess(response.data.data.reviews));
  } catch (error) {
    dispatch(
      fetchReviewsFailure(
        error.response?.data?.message || "Failed to load reviews"
      )
    );
  }
};

// Submit a new review and update state
export const submitReview = (review, token) => async (dispatch) => {
  try {
    const response = await axios.post(`${apiUrl}/reviews`, review, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(addReview(response.data.data.review));
  } catch (error) {
    console.error("Error submitting review:", error);
  }
};

export const fetchBookById = (bookId) => async (dispatch) => {
  dispatch(fetchBookStart());
  try {
    const response = await axios.get(`${apiUrl}/books/${bookId}`);
    dispatch(fetchBookSuccess(response.data.data.book));
  } catch (error) {
    dispatch(
      fetchBookFailure(
        error.response?.data?.message || "Failed to load book details"
      )
    );
  }
};
