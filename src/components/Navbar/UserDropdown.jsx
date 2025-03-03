import React from 'react';
import { Menu } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaCog, FaSuitcase } from 'react-icons/fa';
import { motion } from 'framer-motion';

const UserDropdown = ({ user, onSignOut }) => {
  const navigate = useNavigate();

  const menuItems = user
    ? [
        { 
          label: 'My Trips', 
          icon: FaSuitcase,
          onClick: () => navigate('/my-trips') 
        },
        { 
          label: 'Sign Out', 
          icon: FaSignOutAlt,
          onClick: onSignOut 
        }
      ]
    : [
        { 
          label: 'Sign In', 
          icon: FaSignInAlt,
          onClick: () => navigate('/signin') 
        },
        { 
          label: 'Sign Up', 
          icon: FaUserPlus,
          onClick: () => navigate('/signup') 
        },
      ];

  return (
    <Menu as="div" className="relative">
      <Menu.Button as={React.Fragment}>
        {({ open }) => (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-black/90 transition-colors"
          >
            {user ? (
              <span className="font-bold">
                {user.email.split('@')[0][0].toUpperCase()}
              </span>
            ) : (
              <FaUser className="w-5 h-5" />
            )}
          </motion.button>
        )}
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-1 z-50">
        {user && (
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.email.split('@')[0]}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user.email}
            </p>
          </div>
        )}
        
        {menuItems.map((item) => (
          <Menu.Item key={item.label}>
            {({ active }) => (
              <button
                onClick={item.onClick}
                className={`${
                  active ? 'bg-black text-white' : 'text-gray-700'
                } group flex w-full items-center px-4 py-2 text-sm`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default UserDropdown;