import React from 'react';
import { motion } from 'framer-motion';
import SocialLogin from './SocialLogin';


const AuthButton = ({ children, isLoading, ...props }) => {
  return (
    <motion.button 
      
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`
        w-full py-3 px-4 rounded-lg font-medium text-white
        bg-black hover:bg-black/90
        focus:outline-none focus:ring-2 focus:ring-black/50
        transform transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-md hover:shadow-lg
      `}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default AuthButton;