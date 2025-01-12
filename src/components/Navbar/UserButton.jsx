import React from 'react';
import { FaUser } from 'react-icons/fa';

const UserButton = ({ user, onClick }) => {
  const getInitial = (email) => {
    return email.split('@')[0][0].toUpperCase();
  };

  const getUserName = (email) => {
    return email.split('@')[0];
  };

  return (
    <div className="flex items-center space-x-3">
      <span className="hidden lg:block text-gray-700">
        {user && getUserName(user.email)}
      </span>
      <button
        onClick={onClick}
        className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors"
      >
        {user ? getInitial(user.email) : <FaUser />}
      </button>
    </div>
  );
};

export default UserButton;