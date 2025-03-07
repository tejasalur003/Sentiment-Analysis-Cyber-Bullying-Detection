import React from "react";
import NavItem from "./NavItem";
import Dropdown from "./Dropdown";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 border-b border-sky-500 shadow-md bg-gray-900 z-50">
      {/* Logo */}
      <div className="text-xl font-bold text-sky-500">Sentiment Analysis</div>

      {/* Navigation Links */}
      <div className="flex space-x-6">
        <NavItem title="Analyze Text" />
        <NavItem title="Data Insights" />
        <NavItem title="Models" />
        <Dropdown title="More" items={["API Docs", "Blog", "Support"]} />
      </div>
    </nav>
  );
};

export default Navbar;
