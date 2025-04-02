import React from "react";

interface DropdownProps {
  title: string;
  items: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ title, items }) => {
  return (
    <div className="relative group">
      <button className="text-gray-300 font-medium hover:text-green-400 tracking-wide transition duration-300 px-3 py-2 rounded-md">
        {title} ▼
      </button>
      <div className="absolute hidden group-hover:block bg-gray-900 border border-gray-700 rounded-md shadow-lg mt-2 w-40">
        {items.map((item, index) => (
          <a
            key={index}
            href="#"
            className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-green-500 transition duration-300 rounded-md"
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
