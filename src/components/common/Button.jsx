import React from 'react';

const Button = ({ variant = 'primary', size = 'md', children, ...props }) => {
  const baseClasses = 'font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-primary hover:bg-primary/90 text-white focus:ring-primary',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-300',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;