import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FaTimes, 
  FaHome, 
  FaCompass, 
  FaSuitcase, 
  FaNewspaper, 
  FaTag, 
  FaEnvelope,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt
} from 'react-icons/fa';
import Button from '../common/Button';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

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

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'tween',
        duration: 0.3,
        when: 'afterChildren',
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.3,
        when: 'beforeChildren',
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.div
        variants={menuVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 overflow-y-auto"
      >
        <div className="p-4 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes className="w-6 h-6 text-gray-600" />
          </motion.button>
        </div>

        {user && (
          <motion.div 
            variants={itemVariants}
            className="px-6 py-4 border-b border-gray-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                {user.email.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-gray-900">{user.email.split('@')[0]}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          </motion.div>
        )}

        <nav className="px-4 py-2">
          <ul className="space-y-1">
            <motion.li variants={itemVariants}>
              <NavLink
                to="/"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary/10 text-primary font-semibold' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <FaHome className="w-5 h-5" />
                <span>Home</span>
              </NavLink>
            </motion.li>
            <motion.li variants={itemVariants}>
              <NavLink
                to="/discover"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary/10 text-primary font-semibold' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <FaCompass className="w-5 h-5" />
                <span>Discover</span>
              </NavLink>
            </motion.li>
            <motion.li variants={itemVariants}>
              <a
                href="/my-trips"
                onClick={handleMyTripsClick}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <FaSuitcase className="w-5 h-5" />
                <span>My Trips</span>
              </a>
            </motion.li>
            <motion.li variants={itemVariants}>
              <NavLink
                to="/blog"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary/10 text-primary font-semibold' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <FaNewspaper className="w-5 h-5" />
                <span>Blog</span>
              </NavLink>
            </motion.li>
            <motion.li variants={itemVariants}>
              <NavLink
                to="/pricing"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary/10 text-primary font-semibold' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <FaTag className="w-5 h-5" />
                <span>Pricing</span>
              </NavLink>
            </motion.li>
            <motion.li variants={itemVariants}>
              <NavLink
                to="/contact"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary/10 text-primary font-semibold' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <FaEnvelope className="w-5 h-5" />
                <span>Contact Us</span>
              </NavLink>
            </motion.li>
          </ul>

          <div className="mt-6 px-4">
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAuthAction}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium text-white
                ${user ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'} 
                transition-colors`}
            >
              {user ? (
                <>
                  <FaSignOutAlt className="w-5 h-5" />
                  Sign Out
                </>
              ) : (
                <>
                  <FaSignInAlt className="w-5 h-5" />
                  Sign In
                </>
              )}
            </motion.button>
            
            {!user && (
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  navigate('/signup');
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 mt-3 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <FaUserPlus className="w-5 h-5" />
                Sign Up
              </motion.button>
            )}
          </div>
        </nav>
      </motion.div>
    </>
  );
};

export default MobileMenu;