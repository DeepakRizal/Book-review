import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const BookCard = ({ id, cover, title, author, rating }) => {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/books/${id}`);
  }

  return (
    <div
      onClick={handleClick}
      className="bg-white cursor-pointer shadow-lg rounded-2xl p-4 w-64"
    >
      <img
        src={cover}
        alt={title}
        className="w-28 h-auto mx-auto object-cover rounded-lg mb-4"
      />
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <p className="text-sm text-gray-600">by {author}</p>
      <div className="flex items-center mt-2">
        <span className="text-yellow-400 text-lg">&#9733;</span>
        <span className="ml-1 text-gray-700 font-medium">{rating}</span>
      </div>
    </div>
  );
};

export default BookCard;
