import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostItem from "../pages/PostItem"; // make sure path is correct

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const userData = await res.json();
        setUser(userData);
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Delete item function
  const handleDelete = async (activityIndex, itemId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/items/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete item");

      // Remove item from local state
      setUser((prev) => ({
        ...prev,
        activities: prev.activities.filter((_, i) => i !== activityIndex),
        recycledPlastics: prev.recycledPlastics - 1,
        points: prev.points - 5,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-500 animate-pulse">
          Loading Dashboard...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-green-50 via-teal-50 to-blue-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-2xl flex flex-col rounded-r-3xl">
        <div className="p-6 flex items-center justify-center border-b">
          <h1 className="text-3xl font-extrabold text-green-600">🌍 PlasticSwap</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full text-left px-4 py-2 rounded-lg hover:bg-green-100 font-medium text-gray-700 transition"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="w-full text-left px-4 py-2 rounded-lg hover:bg-green-100 font-medium text-gray-700 transition"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-100 font-medium text-red-600 transition"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-teal-500 to-blue-500">
              Welcome, {user.name} 👋
            </h2>
            <p className="text-gray-600 mt-2">{user.email}</p>
          </div>
          <img
            src={`https://ui-avatars.com/api/?name=${user.name}&background=10B981&color=fff&size=128`}
            alt="avatar"
            className="w-24 h-24 rounded-full mt-4 md:mt-0 border-4 border-green-300 shadow-md"
          />
        </div>

        {/* Stats / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Recycled Plastics</h3>
            <p className="text-3xl font-bold text-green-700">{user.recycledPlastics} kg</p>
          </div>
          <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Points Earned</h3>
            <p className="text-3xl font-bold text-blue-700">{user.points}</p>
          </div>
          <div className="bg-gradient-to-r from-teal-100 to-teal-200 rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Rank</h3>
            <p className="text-3xl font-bold text-teal-700">{user.rank}</p>
          </div>
        </div>

        {/* Recent Activities */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activities</h3>
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            {user.activities && user.activities.length > 0 ? (
              user.activities.map((activity, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b last:border-none pb-2"
                >
                  <p className="text-gray-600">{activity.description}</p>
                  <div className="flex items-center space-x-4">
                    <p className="text-green-500 font-semibold">+{activity.points} pts</p>
                    {activity.itemId && (
                      <button
                        onClick={() => handleDelete(index, activity.itemId)}
                        className="text-red-500 hover:text-red-700 font-semibold"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No activities yet. Start recycling! ♻️</p>
            )}
          </div>
        </div>

        {/* Post Item Section */}
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-4">Post a New Item</h3>
          <PostItem
            onItemPosted={(item) => {
              setUser((prev) => ({
                ...prev,
                recycledPlastics: prev.recycledPlastics + 1,
                points: prev.points + 5,
                activities: [
                  {
                    description: `Posted ${item.name}`,
                    points: 5,
                    date: new Date(),
                    itemId: item._id, // important for deletion
                  },
                  ...(prev.activities || []),
                ],
              }));
            }}
          />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
