import React from "react";
import { FaUpload, FaSearch, FaExchangeAlt } from "react-icons/fa";

function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-green-50 via-teal-50 to-blue-50 text-center relative overflow-hidden">
      {/* Decorative bubbles for plastic theme */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-green-100 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-100 rounded-full opacity-30 animate-pulse"></div>

      <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-teal-500 to-blue-400">
        How PlasticSwap Works
      </h2>
      <p className="text-gray-700 max-w-3xl mx-auto mb-16 text-lg md:text-xl">
        Giving your unwanted plastic items a second life has never been easier. Follow these simple steps to reduce waste and connect with your community.
      </p>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {/* Step 1 */}
        <div className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
          <div className="flex justify-center mb-4 text-green-500 text-4xl">
            <FaUpload />
          </div>
          <h3 className="font-bold text-2xl mb-2">1. Post Items</h3>
          <p className="text-gray-600">
            Easily upload your plastic items with pictures, descriptions, and quantity. Let your community know what’s available for reuse.
          </p>
        </div>

        {/* Step 2 */}
        <div className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
          <div className="flex justify-center mb-4 text-teal-500 text-4xl">
            <FaSearch />
          </div>
          <h3 className="font-bold text-2xl mb-2">2. Browse</h3>
          <p className="text-gray-600">
            Explore a curated list of available plastic items near you. Filter by type, quantity, or location to find exactly what you need.
          </p>
        </div>

        {/* Step 3 */}
        <div className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
          <div className="flex justify-center mb-4 text-blue-500 text-4xl">
            <FaExchangeAlt />
          </div>
          <h3 className="font-bold text-2xl mb-2">3. Swap</h3>
          <p className="text-gray-600">
            Connect with other users to swap items safely. Reduce waste, save resources, and give your plastic a second life.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
