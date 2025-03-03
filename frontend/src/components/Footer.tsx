import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 py-8 border-t relative">
      
      <div className="max-w-7xl  mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
        
        {/* Column 1: General Info */}
        <div>
          <h2 className="text-lg font-semibold text-red-600">Sentiment Analysis</h2>
          <ul className="mt-2 space-y-1">
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* Column 2: Features */}
        <div>
          <h2 className="text-lg font-semibold text-red-600">Features</h2>
          <ul className="mt-2 space-y-1">
            <li>Real-time Analysis</li>
            <li>Cyberbullying Detection</li>
            <li>API Integration</li>
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div>
          <h2 className="text-lg font-semibold text-red-600">Content Sources</h2>
          <div className="flex space-x-4 mt-2">
            <FaFacebookF className="text-xl cursor-pointer hover:text-blue-600" />
            <FaTwitter className="text-xl cursor-pointer hover:text-blue-400" />
            <FaInstagram className="text-xl cursor-pointer hover:text-pink-500" />
            <FaYoutube className="text-xl cursor-pointer hover:text-red-500" />
            <FaTiktok className="text-xl cursor-pointer hover:text-black" />
          </div>
        </div>

      </div>
      <div className="text-center text-sm text-gray-600 mt-6">
        © {new Date().getFullYear()} Sentiment Analysis. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
