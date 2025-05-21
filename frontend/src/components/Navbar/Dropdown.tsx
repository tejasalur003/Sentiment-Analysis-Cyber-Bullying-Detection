import React from "react";

interface DropdownProps {
  title: string;
  items: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ title, items }) => {
  return (
    <div className="relative group">
      <button
        className="
          text-slate-100
          font-medium tracking-wide
          hover:text-pink-400
          transition-colors duration-300
          px-3 py-2 rounded-md
        "
      >
        {title} ▼
      </button>

      <div
        className="
          absolute hidden group-hover:block
          mt-2 w-44
          bg-gradient-to-br from-[#1e293b]/90 via-[#0f172a]/90 to-black/90
          border border-indigo-700
          rounded-lg shadow-[0_0_10px_rgba(129,140,248,0.2)]
          backdrop-blur-sm
          z-10
        "
      >
        {items.map((item, index) => (
          <a
            key={index}
            href="#"
            className="
              block px-4 py-2 text-slate-100
              hover:text-pink-400 hover:bg-indigo-900/30
              transition-colors duration-300 rounded-md
            "
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
