import React from 'react';

const NavLink = ({ href, children, active }) => {
  return (
    <a
      href={href}
      className={`text-gray-700 hover:text-primary transition-colors ${
        active ? 'text-primary font-semibold' : ''
      }`}
    >
      {children}
    </a>
  );
};

export default NavLink;