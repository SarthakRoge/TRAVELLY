import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SocialLogin = ({ onGoogleSignIn }) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-950">Or continue with</span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={onGoogleSignIn}
        className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg
          shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
      >
        <FaGoogle className="w-5 h-5 text-red-500 mr-2" />
        Sign in with Google
      </motion.button>
    </div>
  );
};

export default SocialLogin;