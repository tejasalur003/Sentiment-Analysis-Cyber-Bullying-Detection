import React from "react";

interface NavItemProps {
  title: string;
}

const NavItem: React.FC<NavItemProps> = ({ title }) => (
  <a href="#" className="text-gray-700 hover:text-red-600 font-medium">
    {title}
  </a>
);

export default NavItem;
