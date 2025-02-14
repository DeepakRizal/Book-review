import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";

const apiUrl = import.meta.env.VITE_API_URL;

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 6;

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${apiUrl}/books?page=${page}&limit=${limit}`
        );
        setBooks(response.data.data.books);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [page]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Books</h1>
      {loading ? (
        <p>Loading books...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard
              key={book._id}
              id={book._id}
              cover={book.image}
              title={book.title}
              author={book.author}
              rating={book.rating}
            />
          ))}
        </div>
      )}
      <div className="flex justify-center mt-6">
        <button
          className="px-4 py-2 cursor-pointer bg-gray-800 text-white rounded-lg mr-2 disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <button
          className="px-4 cursor-pointer py-2 bg-gray-800 text-white rounded-lg"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookList;
