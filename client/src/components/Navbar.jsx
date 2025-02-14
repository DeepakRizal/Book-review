import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between bg-slate-800 p-5 text-white">
      <Link to="/" className="font-semibold italic">
        BookReview
      </Link>

      {user ? (
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 cursor-pointer py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      ) : (
        <Link to="/login" className="hover:underline cursor-pointer">
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
