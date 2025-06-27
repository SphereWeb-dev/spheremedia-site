import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaRobot, FaInstagram } from "react-icons/fa";

export default function App() {
  return (
    <div className="relative bg-gradient-to-br from-[#0A0A1A] via-[#1a0025] to-[#0A0A1A] text-white font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4">
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

      {/* Services Section */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-pink-500 mb-12">Our Services</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            "Ad Campaign Creation",
            "Social Media Management",
            "Brand Identity Design",
            "Motion Graphics & Reels",
            "Content Strategy",
            "Instagram Growth Service"
          ].map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#1f1a2e] p-6 rounded-xl shadow-md hover:scale-105 duration-300"
            >
              <p className="text-lg font-medium text-white">{service}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Ratings Section */}
      <section className="py-20 px-6 bg-[#0F0A1A] text-center">
        <h2 className="text-3xl font-bold text-purple-400 mb-10">Client Ratings</h2>
        <div className="grid gap-10 md:grid-cols-3">
          {[
            { name: "Aarav Sharma 🇮🇳", stars: 5 },
            { name: "Sophia Müller 🇩🇪", stars: 4 },
            { name: "Liam Johnson 🇺🇸", stars: 5 },
            { name: "Kavya Patel 🇮🇳", stars: 5 },
            { name: "Jin Lee 🇰🇷", stars: 4 },
            { name: "Fatima Khan 🇦🇪", stars: 5 },
          ].map((user, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#1c1427] p-6 rounded-xl shadow-md"
            >
              <p className="text-lg font-semibold mb-2">{user.name}</p>
              <div className="flex justify-center text-yellow-400">
                {[...Array(user.stars)].map((_, idx) => (
                  <FaStar key={idx} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-pink-400 mb-10">Let’s Work Together</h2>
        <form className="max-w-xl mx-auto grid gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="p-3 rounded-md bg-[#1f1a2e] text-white outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-3 rounded-md bg-[#1f1a2e] text-white outline-none"
          />
          <textarea
            placeholder="Tell us about your project..."
            rows="5"
            className="p-3 rounded-md bg-[#1f1a2e] text-white outline-none"
          />
          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 py-3 rounded-md font-semibold"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Floating Chatbot */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="fixed bottom-6 right-6 bg-pink-600 text-white p-4 rounded-full shadow-lg hover:scale-105 cursor-pointer z-20"
        title="Need Help? Talk to SphereBot"
      >
        <FaRobot size={24} />
      </motion.div>

      {/* Floating Instagram Button */}
      <a
        href="https://www.instagram.com/spheremedia.in"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform z-20"
        title="Visit our Instagram"
      >
        <FaInstagram size={24} />
      </a>
    </div>
  );
}

