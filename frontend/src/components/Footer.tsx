import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="
        w-full mt-20
        bg-black/30 backdrop-blur-md
        border-t border-indigo-700
        shadow-[0_-4px_20px_rgba(129,140,248,0.15)]
        text-slate-100 px-6 sm:px-12 py-10
      "
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Column 1: Info */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold tracking-wide text-slate-100">
            Sentiment Analysis
          </h2>
          <ul className="mt-3 space-y-2 text-sm sm:text-base">
            <li className="hover:text-pink-400 cursor-pointer transition-colors duration-300">
              About Us
            </li>
            <li className="hover:text-pink-400 cursor-pointer transition-colors duration-300">
              Privacy Policy
            </li>
            <li className="hover:text-pink-400 cursor-pointer transition-colors duration-300">
              Terms & Conditions
            </li>
          </ul>
        </div>

        {/* Column 2: Features */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold tracking-wide text-slate-100">
            Features
          </h2>
          <ul className="mt-3 space-y-2 text-sm sm:text-base">
            <li className="hover:text-pink-400 cursor-pointer transition-colors duration-300">
              Real-time Analysis
            </li>
            <li className="hover:text-pink-400 cursor-pointer transition-colors duration-300">
              Cyberbullying Detection
            </li>
            <li className="hover:text-pink-400 cursor-pointer transition-colors duration-300">
              API Integration
            </li>
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold tracking-wide text-slate-100">
            Content Sources
          </h2>
          <div className="flex space-x-4 mt-3 text-xl">
            <FaFacebookF className="hover:text-pink-400 transition-colors duration-300 cursor-pointer" />
            <FaTwitter className="hover:text-pink-400 transition-colors duration-300 cursor-pointer" />
            <FaInstagram className="hover:text-pink-400 transition-colors duration-300 cursor-pointer" />
            <FaYoutube className="hover:text-pink-400 transition-colors duration-300 cursor-pointer" />
            <FaTiktok className="hover:text-pink-400 transition-colors duration-300 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-slate-400 tracking-wide">
        © {new Date().getFullYear()} Sentiment Analysis. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
