import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import Button from '../common/Button';
import { toast } from 'react-hot-toast';

const MobileMenu = ({ isOpen, onClose, user, onSignOut }) => {
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (user) {
      onSignOut();
    } else {
      navigate('/signin');
    }
    onClose();
  };

  const handleMyTripsClick = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to view your trips');
      navigate('/signin');
      return;
    }
    navigate('/my-trips');
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 flex justify-end">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <nav className="px-4 py-2">
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/"
                onClick={onClose}
                className={({ isActive }) =>
                  `block py-2 text-lg ${
                    isActive ? 'text-primary font-semibold' : 'text-gray-700'
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <a
                href="/my-trips"
                onClick={handleMyTripsClick}
                className="block py-2 text-lg text-gray-700 hover:text-primary"
              >
                My Trips
              </a>
            </li>
            <li>
              <NavLink
                to="/blog"
                onClick={onClose}
                className={({ isActive }) =>
                  `block py-2 text-lg ${
                    isActive ? 'text-primary font-semibold' : 'text-gray-700'
                  }`
                }
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                onClick={onClose}
                className={({ isActive }) =>
                  `block py-2 text-lg ${
                    isActive ? 'text-primary font-semibold' : 'text-gray-700'
                  }`
                }
              >
                Contact Us
              </NavLink>
            </li>
          </ul>

          <div className="mt-6">
            <Button
              variant="primary"
              className="w-full"
              onClick={handleAuthAction}
            >
              {user ? 'Sign Out' : 'Sign In'}
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;