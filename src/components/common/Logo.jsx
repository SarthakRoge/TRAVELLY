import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Logo = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  
  };

  return (
    <Link to="/">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-2"
      >
        <div className='flex items-center space-x-0'>
          <img src="/Tlogo.png" alt="Travelly Logo" className={`${sizes[size]} `} />
          <span className=" text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ">
            TRAVELLY
          </span>
          </div>
      </motion.div>
    </Link>
  );
};

export default Logo;