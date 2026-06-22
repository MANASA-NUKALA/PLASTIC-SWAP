import React, { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const PostItem = ({ onItemPosted }) => {
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    contact: "",
    location: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to post an item.");
        return;
      }
      const data = new FormData();

      data.append("name", formData.name);
      data.append("desc", formData.desc);
      data.append("contact", formData.contact);
      data.append("location", formData.location);
      
      if (image) data.append("image", image);

      const res = await fetch(`${API_URL}/api/items`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.msg || errData?.message || "Failed to post item");
      }

      const result = await res.json();
      alert("Your item has been posted!");

      // Notify parent to update items dynamically
      if (onItemPosted) onItemPosted(result);

      // Clear form
      setFormData({
        name: "",
        desc: "",
        contact: "",
        location: "",
       
      });
      setImage(null);
    } catch (err) {
      console.error("Error posting item:", err);
      alert("Error posting item. Please check all fields and try again.");
    }
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-green-50 via-teal-50 to-blue-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-10 animate-fadeIn">
        <h2 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-teal-500 to-blue-400 text-center">
          Post a Plastic Item
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block font-semibold text-lg mb-2">Name of Plastic</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3"
              required
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block font-semibold text-lg mb-2">Short Description</label>
            <input
              type="text"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3"
              required
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block font-semibold text-lg mb-2">Contact Email</label>
            <input
              type="email"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-semibold text-lg mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3"
              required
            />
          </div>

          

          {/* Image Upload */}
          <div>
            <label className="block font-semibold text-lg mb-2">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-xl p-3"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-teal-400 text-white py-3 rounded-full font-bold text-lg shadow-lg hover:scale-105 transform transition-all duration-300"
          >
            Post Item
          </button>
        </form>
      </div>
    </section>
  );
};

export default PostItem;
