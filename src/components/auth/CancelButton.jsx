import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CancelButton = () => {
  const navigate = useNavigate();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => navigate('/')}
      className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
      aria-label="Close"
    >
      <FaTimes className="w-6 h-6" />
    </motion.button>
  );
};

export default CancelButton;