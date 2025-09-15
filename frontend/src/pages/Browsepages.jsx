import React, { useEffect, useState } from "react";

export default function Browse() {
  const [items, setItems] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null); // For modal

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/items");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };
    fetchItems();
  }, []);

  const handleSwap = (item) => {
    setSelectedContact(item);
  };

  const closeModal = () => setSelectedContact(null);

  return (
    <section className="relative py-16 px-6 bg-gradient-to-b from-green-50 via-teal-50 to-blue-50 min-h-screen overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-green-100 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute bottom-10 right-20 w-32 h-32 bg-blue-100 rounded-full opacity-30 animate-pulse"></div>

      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-teal-500 to-blue-400">
        Browse Plastic Items
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {items.length === 0 ? (
          <p className="col-span-3 text-center text-gray-500 text-lg">
            No items yet. Be the first to post!
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition hover:scale-105 hover:shadow-3xl hover:-translate-y-1 duration-300"
            >
              <img
                src={`http://localhost:5000/uploads/${item.image}`} // <-- updated for backend images
                alt={item.name}
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
                <p className="text-gray-600 mb-3">{item.desc}</p>
                <p className="text-sm text-gray-500 mb-4">
                  <span className="font-semibold">Location:</span> {item.location}
                </p>
                <button
                  onClick={() => handleSwap(item)}
                  className="w-full bg-gradient-to-r from-green-400 to-teal-400 text-white py-3 rounded-full font-semibold shadow-lg hover:scale-105 transform transition-all duration-300"
                >
                  Swap Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for Contact Info */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Contact Info</h2>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Name:</span> {selectedContact.name}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Email:</span> {selectedContact.contact}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Location:</span> {selectedContact.location}
            </p>
            <button
              onClick={closeModal}
              className="mt-2 w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
