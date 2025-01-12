import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
      
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="max-w-3xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Plan Your Dream Journey with Ease!
          </h1>
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => navigate('/create-itinerary')}
          >
            Start Planning
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;