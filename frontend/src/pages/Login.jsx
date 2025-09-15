import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../services/userServices";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const data = await userService.login({ email, password });

    // ✅ Save token and user to localStorage
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    console.log("Logged in user:", data.user);
    navigate("/dashboard"); // or /profile, depending on your routes
  } catch (err) {
    setError("Invalid email or password");
  }
};


  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50 via-teal-50 to-blue-50 flex items-center justify-center relative overflow-hidden py-16 px-4">
      <div className="absolute top-10 left-10 w-24 h-24 bg-green-100 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-100 rounded-full opacity-30 animate-pulse"></div>

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-teal-500 to-blue-400">
          Login to PlasticSwap
        </h2>
        {error && <p className="text-red-600 mb-4 text-center font-medium">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-teal-400 text-white py-3 rounded-full font-bold text-lg shadow-lg hover:scale-105 transform transition-all duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-gray-600 text-center">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-green-600 font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </section>
  );
}

export default Login;
