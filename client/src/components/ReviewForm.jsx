/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addReview } from "../redux/slices/reviewSlice";

const apiUrl = import.meta.env.VITE_API_URL;

const ReviewForm = ({ bookId, onAddReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const storedToken = localStorage.getItem("token"); // Ensure token is stored
  const token = useSelector((state) => state.auth?.user?.token) || storedToken;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to submit a review.");
      return;
    }

    const review = { bookId, userId: user._id, rating, comment };

    try {
      const response = await axios.post(`${apiUrl}/reviews`, review, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Dispatch the new review to Redux store
      dispatch(addReview(response.data.data.review));
      onAddReview(response.data.data.review);

      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-5xl mx-auto">
      <div>
        <label className="block text-gray-700">Rating</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
