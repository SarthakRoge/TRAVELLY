import React from 'react';
import { motion } from 'framer-motion';

const AuthInput = ({ label, error, ...props }) => {
  return (
    <div className="space-y-1">
      <label className="block text-md font-medium text-gray-950">
        {label}
      </label>
      <motion.div
        whileTap={{ scale: 0.995 }}
        className="relative"
      >
        <input
          {...props}
          className={`
            block w-full px-4 py-3 rounded-lg border
            focus:ring-2 focus:ring-primary/20 focus:border-primary
            transition-all duration-200
            ${error ? 'border-red-500' : 'border-gray-200'}
          `}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </motion.div>
    </div>
  );
};

export default AuthInput;