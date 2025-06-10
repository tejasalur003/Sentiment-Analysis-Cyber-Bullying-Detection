import React from "react";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import Dropdown from "./Dropdown";

const Navbar = () => {
  return (
    <nav
      className="
        fixed top-0 left-0 w-full z-50
        flex items-center justify-between
        px-6 sm:px-12 py-4
        bg-black/30 backdrop-blur-md
        border-b border-indigo-700
        shadow-[0_2px_15px_rgba(255,115,0,0.15)]
      "
    >
      {/* Logo */}
      <Link to="/" className="select-none cursor-pointer">
        <div
          className="
            text-xl sm:text-2xl font-bold
            text-slate-100 tracking-wide
            hover:text-orange-400 transition-colors duration-100
            drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]
          "
        >
          Sentiment
          <span className="text-orange-400">AI</span>
        </div>
      </Link>

      {/* Nav Links */}
      <div className="flex space-x-6 text-slate-100">
        <NavItem title="Profile Review" href="profile-review" />
        <NavItem title="Adjust Tone" href="#" />
        <NavItem title="Mental Health Support" href="mental-health-support" />
        <Dropdown
          title="More"
          items={[
            { label: "Sentiment", href: "/" },
            { label: "Emotion", href: "/emotion-analysis" },
            { label: "Cyberbullying", href: "/cyberbullying-check" },
          ]}
        />
      </div>
    </nav>
  );
};

export default Navbar;
