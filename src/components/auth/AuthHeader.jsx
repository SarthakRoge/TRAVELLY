import React from 'react';
import Logo from '../common/Logo';

const AuthHeader = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
        <img src='/Tlogo.png' className='w-16 h-16'></img>
      </div>
      <h1 className="text-3xl font-bold text-gray-950 mb-2">{title}</h1>
      <p className="text-gray-950">{subtitle}</p>
    </div>
  );
};

export default AuthHeader;