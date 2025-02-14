import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);

  useEffect(() => {
    const getFeaturedBooks = async () => {
      const response = await axios.get(`${apiUrl}/books/featured`);

      const books = response.data.data.books;
      setFeaturedBooks(books);
    };
    getFeaturedBooks();
  }, []);

  return (
    <div>
      <SearchBar />
      <div className="grid   grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 place-items-center">
        {featuredBooks.map((book) => (
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
      <div className="flex items-center justify-center p-5">
        <Link
          to={"/books"}
          className="px-6 py-1 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-900 transition duration-300 cursor-pointer"
        >
          View more books
        </Link>
      </div>
    </div>
  );
};

export default Home;
