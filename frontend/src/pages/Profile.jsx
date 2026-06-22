import React, { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  const cachedUser = localStorage.getItem("user");
  if (cachedUser) {
    setUser(JSON.parse(cachedUser));
  }

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
        const res = await fetch(`${API_URL}/api/auth/me`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Unauthorized");

      const userData = await res.json();
      setUser(userData);

      // ✅ Keep updated user in localStorage too
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      console.error(err);
      navigate("/login");
    }
  };

  fetchUser();
}, [navigate]);


  if (!user)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-500">Loading Profile...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-teal-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        {/* User Avatar */}
        <div className="flex flex-col items-center">
          <img
            src={`https://ui-avatars.com/api/?name=${user.name}&background=10B981&color=fff&size=128`}
            alt="avatar"
            className="w-28 h-28 rounded-full border-4 border-green-300 shadow-lg"
          />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-green-100 rounded-2xl p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700">
              Recycled Plastics
            </h3>
            <p className="text-2xl font-bold text-green-700">
              {user.recycledPlastics} kg
            </p>
          </div>
          <div className="bg-blue-100 rounded-2xl p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700">Points</h3>
            <p className="text-2xl font-bold text-blue-700">{user.points}</p>
          </div>
          <div className="bg-teal-100 rounded-2xl p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700">Rank</h3>
            <p className="text-2xl font-bold text-teal-700">{user.rank}</p>
          </div>
        </div>

       {/* Settings / Future Actions */}
<div className="mt-10">
  <h3 className="text-xl font-bold text-gray-800 mb-4">Account Settings</h3>
  
  {/* Edit Name */}
  <div className="space-y-3">
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/api/auth/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: e.target.name.value }),
        });
        const data = await res.json();
        alert(data.message || "Name updated successfully!");
        window.location.reload(); // refresh profile
      }}
      className="space-y-2"
    >
      <input
        type="text"
        name="name"
        placeholder="Enter new name"
        className="w-full px-4 py-2 border rounded-lg"
      />
      <button className="w-full px-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition">
        Update Name
      </button>
    </form>

    {/* Change Password */}
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/api/auth/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password: e.target.password.value }),
        });
        const data = await res.json();
        alert(data.message || "Password updated successfully!");
      }}
      className="space-y-2"
    >
      <input
        type="password"
        name="password"
        placeholder="Enter new password"
        className="w-full px-4 py-2 border rounded-lg"
      />
      <button className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition">
        Change Password
      </button>
    </form>
  </div>
</div>

      </div>
    </div>
  );
}

export default Profile;
