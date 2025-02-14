import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/slices/authSlice";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const response = await axios.post(`${apiUrl}/users/login`, {
        email,
        password,
      });
      const { user } = response.data.data;
      const { token } = response.data;

      dispatch(loginSuccess({ user, token }));
      navigate("/");
    } catch (error) {
      dispatch(loginFailure(error.response.data.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleLogin}>
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
            className="w-full bg-blue-600 text-white p-2 cursor-pointer rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
          <p className="mt-10 mb-5">
            Don&apos;t have an accout?{" "}
            <Link className="text-blue-500" to={"/signin"}>
              Signup
            </Link>
          </p>
          <Link className="underline text-blue-500" to={"/"}>
            Home Page
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
