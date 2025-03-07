import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
        
        {/* Column 1: General Info */}
        <div>
          <h2 className="text-lg font-semibold text-sky-500">Sentiment Analysis</h2>
          <ul className="mt-2 space-y-1">
            <li className="hover:text-sky-400 cursor-pointer">About Us</li>
            <li className="hover:text-sky-400 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-sky-400 cursor-pointer">Terms & Conditions</li>
          </ul>
        </div>

        {/* Column 2: Features */}
        <div>
          <h2 className="text-lg font-semibold text-sky-500">Features</h2>
          <ul className="mt-2 space-y-1">
            <li className="hover:text-sky-400 cursor-pointer">Real-time Analysis</li>
            <li className="hover:text-sky-400 cursor-pointer">Cyberbullying Detection</li>
            <li className="hover:text-sky-400 cursor-pointer">API Integration</li>
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div>
          <h2 className="text-lg font-semibold text-sky-500">Content Sources</h2>
          <div className="flex space-x-4 mt-2">
            <FaFacebookF className="text-xl cursor-pointer hover:text-sky-400 transition duration-300" />
            <FaTwitter className="text-xl cursor-pointer hover:text-sky-400 transition duration-300" />
            <FaInstagram className="text-xl cursor-pointer hover:text-sky-400 transition duration-300" />
            <FaYoutube className="text-xl cursor-pointer hover:text-sky-400 transition duration-300" />
            <FaTiktok className="text-xl cursor-pointer hover:text-sky-400 transition duration-300" />
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-6">
        © {new Date().getFullYear()} Sentiment Analysis. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
