import React from "react";

interface NavItemProps {
  title: string;
}

const NavItem: React.FC<NavItemProps> = ({ title }) => (
  <a
    href="#"
    className="text-gray-300 hover:text-sky-400 font-medium transition duration-300"
  >
    {title}
  </a>
);

export default NavItem;
