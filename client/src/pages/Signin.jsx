import { useState } from "react";
import { useDispatch } from "react-redux";
import { signupSuccess } from "../redux/slices/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/users/signin`, {
        name,
        email,
        password,
      });
      dispatch(signupSuccess(response.data.data.user));
      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <form onSubmit={handleSignin}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            Sign Up
          </button>
          <Link className="text-blue-500 underline mt-5" to={"/"}>
            Home Page
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signin;
