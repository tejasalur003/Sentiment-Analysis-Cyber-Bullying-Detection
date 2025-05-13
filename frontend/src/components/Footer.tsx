import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-[#0d1b2a] via-[#1b263b] to-[#415a77] py-8 border-t border-blue-900 shadow-[0_2px_10px_rgba(0,0,0,0.4)] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Column 1: General Info */}
        <div>
          <h2 className="text-lg font-semibold tracking-wide text-white">Sentiment Analysis</h2>
          <ul className="mt-2 space-y-1">
            <li className="hover:text-blue-400 cursor-pointer transition duration-300">About Us</li>
            <li className="hover:text-blue-400 cursor-pointer transition duration-300">Privacy Policy</li>
            <li className="hover:text-blue-400 cursor-pointer transition duration-300">Terms & Conditions</li>
          </ul>
        </div>

        {/* Column 2: Features */}
        <div>
          <h2 className="text-lg font-semibold tracking-wide text-white">Features</h2>
          <ul className="mt-2 space-y-1">
            <li className="hover:text-blue-400 cursor-pointer transition duration-300">Real-time Analysis</li>
            <li className="hover:text-blue-400 cursor-pointer transition duration-300">Cyberbullying Detection</li>
            <li className="hover:text-blue-400 cursor-pointer transition duration-300">API Integration</li>
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div>
          <h2 className="text-lg font-semibold tracking-wide text-white">Content Sources</h2>
          <div className="flex space-x-4 mt-2">
            <FaFacebookF className="text-xl cursor-pointer hover:text-blue-400 transition duration-300" />
            <FaTwitter className="text-xl cursor-pointer hover:text-blue-400 transition duration-300" />
            <FaInstagram className="text-xl cursor-pointer hover:text-blue-400 transition duration-300" />
            <FaYoutube className="text-xl cursor-pointer hover:text-blue-400 transition duration-300" />
            <FaTiktok className="text-xl cursor-pointer hover:text-blue-400 transition duration-300" />
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 mt-6">
        © {new Date().getFullYear()} Sentiment Analysis. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
