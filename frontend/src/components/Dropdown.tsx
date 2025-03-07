import React from "react";

interface DropdownProps {
  title: string;
  items: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ title, items }) => {
  return (
    <div className="relative group">
      <button className="text-gray-200 font-semibold hover:text-sky-400 transition duration-300">
        {title} ▼
      </button>
      <div className="absolute hidden group-hover:block bg-gray-900 border border-gray-800 rounded-md shadow-lg mt-2">
        {items.map((item, index) => (
          <a
            key={index}
            href="#"
            className="block px-4 py-2 text-gray-200 hover:bg-sky-600 transition duration-300"
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
