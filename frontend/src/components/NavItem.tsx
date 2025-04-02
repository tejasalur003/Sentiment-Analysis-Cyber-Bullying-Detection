import React from "react";

interface NavItemProps {
  title: string;
}

const NavItem: React.FC<NavItemProps> = ({ title }) => (
  <a
    href="#"
    className="text-gray-300 hover:text-green-400 font-medium tracking-wide transition duration-300 px-3 py-2 rounded-md"
  >
    {title}
  </a>
);

export default NavItem;
