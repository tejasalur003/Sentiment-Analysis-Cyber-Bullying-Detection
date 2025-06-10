import React from "react";
import { Link } from "react-router-dom";

interface DropdownProps {
  title: string;
  items: { label: string; href: string }[];
}

const Dropdown: React.FC<DropdownProps> = ({ title, items }) => {
  return (
    <div className="relative group">
      {/* Trigger Button */}
      <button
        className="
          text-slate-100
          font-medium tracking-wide
          hover:text-orange-400
          transition-colors duration-200
          px-4 py-2 rounded-md
        "
      >
        {title} ▼
      </button>

      {/* Dropdown Menu */}
      <div
        className="
          absolute left-0 md:right-0 mt-2
          opacity-0 group-hover:opacity-100
          invisible group-hover:visible
          transition-all duration-300 ease-in-out
          bg-gradient-to-br from-[#1e293b]/90 via-[#0f172a]/90 to-black/90
          border border-indigo-700
          rounded-lg shadow-[0_0_10px_rgba(129,140,248,0.2)]
          backdrop-blur-sm
          z-20
          py-2 mx-2 w-52
        "
      >
        {items.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className="
              block
              text-slate-100 whitespace-nowrap
              hover:text-orange-400 hover:bg-indigo-900/30
              transition-colors duration-150 rounded-md
              font-medium tracking-wide
              transition-colors duration-100
              px-3 py-2 rounded-md
            "
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
