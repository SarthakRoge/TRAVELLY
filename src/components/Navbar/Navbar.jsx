import React, { useState } from 'react';
import { Link, NavLink as RouterNavLink, useNavigate } from 'react-router-dom';
import { FaEllipsisV } from 'react-icons/fa';
import MobileMenu from './MobileMenu';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import UserDropdown from './UserDropdown';
import Logo from '../common/Logo';

const NavLink = ({ to, children }) => (
  <RouterNavLink
    to={to}
    className={({ isActive }) =>
      `text-gray-700 hover:text-primary transition-colors ${
        isActive ? 'text-primary font-semibold' : ''
      }`
    }
  >
    {children}
  </RouterNavLink>
);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const handleMyTripsClick = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to view your trips');
      navigate('/signin');
      return;
    }
    navigate('/my-trips');
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>
          
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/discover">Discover</NavLink>
            <a
              href="/my-trips"
              onClick={handleMyTripsClick}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              My Trips
            </a>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/pricing">Pricing</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
          </div>

          <div className="hidden md:flex items-center">
            <UserDropdown user={user} onSignOut={handleSignOut} />
          </div>

          <div className="flex flex-1 justify-end md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <FaEllipsisV className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        user={user}
        onSignOut={handleSignOut}
      />
    </nav>
  );
};

export default Navbar;