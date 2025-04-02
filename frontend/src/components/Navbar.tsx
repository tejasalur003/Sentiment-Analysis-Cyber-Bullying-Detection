import React from "react";
import NavItem from "./NavItem";
import Dropdown from "./Dropdown";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 border-b border-gray-700 shadow-md bg-gradient-to-r from-purple-900 to-indigo-700 z-50">
      {/* Logo */}
      <div className="text-2xl font-semibold text-gray-200 tracking-wide">
        Sentiment Analysis
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-8">
        <NavItem title="Analyze Text" />
        <NavItem title="Data Insights" />
        <NavItem title="Models" />
        <Dropdown title="More" items={["API Docs", "Blog", "Support"]} />
      </div>
    </nav>
  );
};

export default Navbar;
