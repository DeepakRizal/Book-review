import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import ReviewForm from "../components/ReviewForm";
import { fetchBookById, fetchReviewsByBook } from "../api/api";

const BookDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    selectedBook: book,
    loading,
    error,
  } = useSelector((state) => state.book);

  const {
    reviews,
    loading: reviewsLoading,
    error: reviewsError,
  } = useSelector((state) => state.review);

  const user = useSelector((state) => state.auth?.user || null);

  useEffect(() => {
    dispatch(fetchBookById(id));
    dispatch(fetchReviewsByBook(id));
  }, [id, dispatch]);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <p>Loading book details...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="mb-6 flex flex-col items-center">
          <img
            src={book?.image}
            alt={book?.title}
            className="w-64 h-80 object-cover rounded-lg shadow-md"
          />
          <h1 className="text-3xl font-bold mt-4 text-center">{book?.title}</h1>
          <p className="text-gray-700 text-lg">by {book?.author}</p>
          <p className="text-yellow-500 text-lg">Rating: {book?.rating} ⭐</p>
          <p className="mt-2 text-gray-600 text-center">{book?.description}</p>
        </div>
      )}

      {user && <ReviewForm bookId={id} />}

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
