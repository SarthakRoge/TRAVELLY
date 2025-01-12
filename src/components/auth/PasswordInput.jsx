import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AuthInput from './AuthInput';

const PasswordInput = ({ ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <AuthInput
        type={showPassword ? 'text' : 'password'}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 h-9 " 
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
};

export default PasswordInput;