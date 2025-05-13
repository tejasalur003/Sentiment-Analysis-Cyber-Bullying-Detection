import React from "react";
import NavItem from "./NavItem";
import Dropdown from "./Dropdown";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 border-b border-blue-900 shadow-[0_2px_10px_rgba(0,0,0,0.4)] bg-gradient-to-r from-[#0d1b2a] via-[#1b263b] to-[#415a77] z-50">
      {/* Logo */}
      <div className="text-2xl font-semibold text-white tracking-wide">
        Sentiment Analysis
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-8 text-gray-200">
        <NavItem title="Analyze Text" />
        <NavItem title="Data Insights" />
        <NavItem title="Models" />
        <Dropdown title="More" items={["API Docs", "Blog", "Support"]} />
      </div>
    </nav>
  );
};

export default Navbar;
