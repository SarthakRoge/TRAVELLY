import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../common/Logo';

const AuthCard = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-12">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center blur-sm"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e')",
          filter: 'brightness(0.7)'
        }}
      />
      
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
          <img src='/Tlogo.png' className='w-16 h-16'></img>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-900">{subtitle}</p>
        </div>

        {children}
      </motion.div>
    </div>
  );
};

export default AuthCard;