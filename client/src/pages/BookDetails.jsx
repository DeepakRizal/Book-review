import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import ReviewForm from "../components/ReviewForm";

const apiUrl = import.meta.env.VITE_API_URL;

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [bookLoading, setBookLoading] = useState(true);
  const [bookError, setBookError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState(null);

  const user = useSelector((state) => state.auth?.user || null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setBookError(null);
        const response = await axios.get(`${apiUrl}/books/${id}`);
        setBook(response.data.data.book);
        setBookLoading(false);
      } catch (error) {
        setBookError(error.message);
        setBookLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        setReviewsError(null);
        const response = await axios.get(`${apiUrl}/reviews/${id}`);
        setReviews(response.data.data.reviews);
        setReviewsLoading(false);
      } catch (error) {
        setReviewsError(error.message);
        setReviewsLoading(false);
      }
    };

    fetchBook();
    fetchReviews();
  }, [id]);

  // Function to update reviews immediately after submission
  const handleAddReview = (newReview) => {
    setReviews((prevReviews) => [newReview, ...prevReviews]);
  };

  return (
    <div className="container mx-auto p-4">
      {bookLoading ? (
        <p>Loading book details...</p>
      ) : bookError ? (
        <p className="text-red-500">{bookError}</p>
      ) : (
        <div className="mb-6 flex flex-col items-center">
          <img
            src={book.image}
            alt={book.title}
            className="w-64 h-80 object-cover rounded-lg shadow-md"
          />
          <h1 className="text-3xl font-bold mt-4 text-center">{book.title}</h1>
          <p className="text-gray-700 text-lg">by {book.author}</p>
          <p className="text-yellow-500 text-lg">Rating: {book.rating} ⭐</p>
          <p className="mt-2 text-gray-600 text-center">{book.description}</p>
        </div>
      )}

      {user && <ReviewForm bookId={id} onAddReview={handleAddReview} />}

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Reviews</h2>
        {reviewsLoading ? (
          <p>Loading reviews...</p>
        ) : reviewsError ? (
          <p className="text-red-500">{reviewsError}</p>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-4 rounded-lg shadow-md mb-4"
            >
              <p className="text-gray-600">{review.comment}</p>
              <p className="text-yellow-500">Rating: {review.rating} ⭐</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews for this book yet.</p>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
