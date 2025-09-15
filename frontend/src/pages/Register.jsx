import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../services/userServices"; // 👈 import only

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await userService.register({ name, email, password });
      navigate("/login");
    } catch (err) {
      setError("Failed to register. Email might be taken.");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 via-green-50 to-teal-50 flex items-center justify-center relative overflow-hidden py-16 px-4">
      <div className="absolute top-10 right-20 w-32 h-32 bg-green-100 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-blue-100 rounded-full opacity-30 animate-pulse"></div>

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-green-500 to-teal-400">
          Create an Account
        </h2>
        {error && <p className="text-red-600 mb-4 text-center font-medium">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Name"
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-400 to-green-400 text-white py-3 rounded-full font-bold text-lg shadow-lg hover:scale-105 transform transition-all duration-300"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-gray-600 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </section>
  );
}

export default Register;
