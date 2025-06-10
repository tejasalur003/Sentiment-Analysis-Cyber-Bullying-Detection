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
          <div className="text-lg sm:text-xl font-semibold tracking-wide text-orange-400 drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]">
            Sentiment
            <span className="text-slate-100 ">AI</span>
          </div>
          <ul className="mt-3 space-y-2 text-sm sm:text-base">
            <li className="text-slate-100 cursor-pointer">About Us</li>
            <li className="text-slate-100 cursor-pointer">Privacy Policy</li>
            <li className="text-slate-100 cursor-pointer">
              Terms & Conditions
            </li>
          </ul>
        </div>

        {/* Column 2: Features */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold tracking-wide text-orange-400 drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]">
            Features
          </h2>
          <ul className="mt-3 space-y-2 text-sm sm:text-base">
            <li className="text-slate-100 cursor-pointer">
              Real-time Analysis
            </li>
            <li className="text-slate-100 cursor-pointer">
              Cyberbullying Detection
            </li>
            <li className="text-slate-100 cursor-pointer">API Integration</li>
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold tracking-wide text-orange-400 drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]">
            Content Sources
          </h2>
          <div className="flex space-x-4 mt-3 text-xl">
            <FaFacebookF className="text-slate-100 cursor-pointer" />
            <FaTwitter className="text-slate-100 cursor-pointer" />
            <FaInstagram className="text-slate-100 cursor-pointer" />
            <FaYoutube className="text-slate-100 cursor-pointer" />
            <FaTiktok className="text-slate-100 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-slate-400 tracking-wide">
        © {new Date().getFullYear()} SentimentAI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
