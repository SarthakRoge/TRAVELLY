import React from 'react';

const AuthBackground = () => {
  return (
    <div 
      className="absolute inset-0 bg-cover bg-center blur-sm"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e')",
        filter: 'brightness(0.6)'
      }}
    />
  );
};

export default AuthBackground;