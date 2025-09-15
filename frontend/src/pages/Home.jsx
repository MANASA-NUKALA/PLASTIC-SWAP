import React from "react";
import { Link } from "react-router-dom";
import { FaRecycle, FaUsers, FaLeaf, FaHandsHelping } from "react-icons/fa";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center text-center py-32 px-6 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1576037728058-ab2c538ac8d0?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 max-w-5xl text-white">
          <p className="font-extrabold mb-4 text-lg md:text-xl tracking-widest text-green-300">
            ♻ Reduce · Reuse · Connect
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Transform <span className="text-green-400">Plastic Waste</span> into
            Opportunities
          </h1>

          <p className="max-w-3xl mx-auto mb-12 text-lg md:text-xl text-gray-200 leading-relaxed">
            PlasticSwap is your eco-friendly marketplace to exchange plastic
            items, reduce waste, and build a sustainable future together.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link
              to="/browse"
              className="bg-green-500 text-white px-8 py-4 rounded-full shadow-lg transform transition hover:scale-105 hover:bg-green-600 font-semibold text-lg"
            >
              🌍 Start Browsing
            </Link>
            <Link
              to="/swap"
              className="bg-white border border-green-600 px-8 py-4 rounded-full shadow-lg transform transition hover:scale-105 hover:bg-green-100 font-semibold text-lg text-green-700"
            >
              ➕ Post Your First Item
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-700">
          What is PlasticSwap?
        </h2>
        <p className="max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed">
          PlasticSwap is a community-driven platform that helps people give
          plastic items a second life. Instead of throwing away plastic bottles,
          containers, or household items, you can share them with others who can
          reuse or repurpose them. Together, we reduce waste, save resources,
          and protect the environment.
        </p>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-green-50 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-green-700">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
            <FaRecycle className="text-green-600 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">1. Post Items</h3>
            <p className="text-gray-600">
              Share unused plastic items you no longer need.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
            <FaUsers className="text-teal-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">2. Connect</h3>
            <p className="text-gray-600">
              Find people in your community looking for them.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
            <FaHandsHelping className="text-blue-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">3. Swap</h3>
            <p className="text-gray-600">
              Exchange items safely and help reduce plastic waste.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-100 to-blue-100 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-green-700">
          Why PlasticSwap Matters
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
            <FaLeaf className="text-green-700 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Reduce Waste</h3>
            <p className="text-gray-600">
              Minimize plastic pollution by reusing everyday items.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
            <FaUsers className="text-teal-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Build Community</h3>
            <p className="text-gray-600">
              Strengthen local communities with eco-friendly exchanges.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
            <FaRecycle className="text-green-600 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Sustainable Future</h3>
            <p className="text-gray-600">
              Together we move closer to a cleaner, greener tomorrow.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
