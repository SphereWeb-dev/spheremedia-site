import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaRobot, FaInstagram } from "react-icons/fa";

export default function App() {
  return (
    <div className="relative bg-gradient-to-br from-[#0A0A1A] via-[#1a0025] to-[#0A0A1A] text-white font-sans overflow-x-hidden">
      {/* Hero Section with Logo */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Spheremedia-logo-pink.png/320px-Spheremedia-logo-pink.png"
          alt="Spheremedia Logo"
          className="w-[220px] md:w-[260px] mb-8 hover:scale-105 transition-transform drop-shadow-xl"
        />
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
        >
          We Design the Future of Brands
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 text-lg md:text-xl text-purple-300"
        >
          Spheremedia.in – Where Creativity Meets Strategy
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <button className="mt-6 px-8 py-4 text-lg bg-pink-600 hover:bg-pink-700 rounded-full shadow-lg">
            Launch Your Brand 🚀
          </button>
        </motion.div>
      </section>

      {/* Floating Chatbot */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="fixed bottom-6 right-6 bg-pink-600 text-white p-4 rounded-full shadow-lg hover:scale-105 cursor-pointer z-20"
      >
        <FaRobot size={24} title="SphereBot – Need Help?" />
      </motion.div>
    </div>
  );
}
