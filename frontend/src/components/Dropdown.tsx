import React from "react";

interface DropdownProps {
  title: string;
  items: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ title, items }) => {
  return (
    <div className="relative group">
      <button className="text-gray-700 hover:text-red-600 font-medium">
        {title} ▼
      </button>
      <div className="absolute hidden group-hover:block bg-white border rounded shadow-md mt-2">
        {items.map((item, index) => (
          <a
            key={index}
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
