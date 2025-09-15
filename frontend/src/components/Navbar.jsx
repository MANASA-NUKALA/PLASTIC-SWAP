import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-10 py-5 bg-gradient-to-r from-green-50 via-white to-teal-50 shadow-lg sticky top-0 z-50">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center text-3xl font-extrabold bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent tracking-wide drop-shadow-lg hover:scale-105 transition-transform duration-300"
      >
        <span className="mr-2">♻️</span> Plastic<span className="text-gray-800">Swap</span>
      </Link>

      {/* Links (Always Visible) */}
      <div className="hidden md:flex space-x-8 text-gray-800 font-semibold text-lg">
        <Link
          to="/"
          className="hover:text-green-600 relative after:block after:h-[2px] after:w-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full hover:scale-105 transform transition"
        >
          Home
        </Link>
        <Link
          to="/browse"
          className="hover:text-green-600 relative after:block after:h-[2px] after:w-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full hover:scale-105 transform transition"
        >
          Browse Items
        </Link>
        <Link
          to="/about"
          className="hover:text-green-600 relative after:block after:h-[2px] after:w-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full hover:scale-105 transform transition"
        >
          How It Works
        </Link>
        <Link
          to="/impact"
          className="hover:text-green-600 relative after:block after:h-[2px] after:w-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full hover:scale-105 transform transition"
        >
          Impact
        </Link>
        {token && (
          <Link
            to="/swap"
            className="bg-green-100 text-green-700 px-5 py-2 rounded-lg hover:bg-green-200 hover:shadow-lg transition duration-300 font-medium text-base"
          >
            + Post Item
          </Link>
        )}
      </div>

      {/* Right Side: Conditional */}
      <div className="flex items-center space-x-5">
        {!token ? (
          <>
            <Link
              to="/login"
              className="px-6 py-2 text-lg font-semibold bg-gradient-to-r from-green-400 to-teal-400 text-white rounded-full shadow hover:shadow-xl hover:scale-105 transform transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2 text-lg font-semibold bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-full shadow hover:shadow-xl hover:scale-105 transform transition-all duration-300"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center space-x-3 px-5 py-2 bg-gray-100 rounded-full hover:bg-gray-200 hover:shadow-md transition duration-300"
            >
              <img
                src={`https://ui-avatars.com/api/?name=${
                  user?.name || "U"
                }&background=10B981&color=fff&size=40`}
                alt="profile"
                className="w-10 h-10 rounded-full shadow"
              />
              <span className="font-semibold text-gray-800 text-lg">
                {user?.name}
              </span>
            </button>
            <button
              onClick={handleLogout}
              className="px-5 py-2 text-lg font-semibold bg-red-500 text-white rounded-full shadow hover:bg-red-600 hover:shadow-lg transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
