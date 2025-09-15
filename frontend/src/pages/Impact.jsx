import React from "react";
import { FaRecycle, FaUsers, FaLeaf } from "react-icons/fa";

function Impact() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-green-50 via-teal-50 to-blue-50 text-center relative overflow-hidden">
      {/* Decorative floating circles */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-green-100 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-100 rounded-full opacity-30 animate-pulse"></div>

      <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-teal-500 to-blue-400">
        Our Impact
      </h2>
      <p className="text-gray-700 max-w-3xl mx-auto mb-16 text-lg md:text-xl">
        Every swap you make reduces plastic waste and helps create a cleaner, healthier planet.
      </p>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {/* Plastic Items Reused */}
        <div className="p-10 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
          <div className="text-green-500 text-5xl mb-4 flex justify-center">
            <FaRecycle />
          </div>
          <h3 className="text-4xl font-extrabold text-green-600 mb-2 animate-pulse">500+</h3>
          <p className="text-gray-600 text-lg">Plastic items reused</p>
        </div>

        {/* Community Members */}
        <div className="p-10 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
          <div className="text-teal-500 text-5xl mb-4 flex justify-center">
            <FaUsers />
          </div>
          <h3 className="text-4xl font-extrabold text-teal-600 mb-2 animate-pulse">200+</h3>
          <p className="text-gray-600 text-lg">Community members</p>
        </div>

        {/* Plastic Saved */}
        <div className="p-10 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
          <div className="text-blue-500 text-5xl mb-4 flex justify-center">
            <FaLeaf />
          </div>
          <h3 className="text-4xl font-extrabold text-blue-600 mb-2 animate-pulse">50kg+</h3>
          <p className="text-gray-600 text-lg">Plastic saved from landfills</p>
        </div>
      </div>
    </section>
  );
}

export default Impact;
