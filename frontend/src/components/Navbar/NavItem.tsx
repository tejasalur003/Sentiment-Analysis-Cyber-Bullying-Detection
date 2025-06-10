import React from "react";

interface NavItemProps {
  title: string;
  href: string;
}

const NavItem: React.FC<NavItemProps> = ({ title, href }) => (
  <a
    href={href}
    className="
      text-slate-100
      hover:text-orange-400
      font-medium tracking-wide
      transition-colors duration-100
      px-3 py-2 rounded-md
    "
  >
    {title}
  </a>
);

export default NavItem;
