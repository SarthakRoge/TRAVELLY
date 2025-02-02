import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';

const backgroundImages = [
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1682687982501-1e58ab814714"
];

const Hero = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${backgroundImages[currentImageIndex]}')`
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </motion.div>
      </AnimatePresence>
      
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Your AI-Powered
              <span className="text-primary block">Travel Companion</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Let artificial intelligence plan your perfect journey. From personalized itineraries to local insights, 
              experience travel planning reimagined.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => navigate('/create-itinerary')}
                className="px-8 py-4 text-lg font-semibold bg-primary hover:bg-primary/90 text-white rounded-full"
              >
                Start Planning Now
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => navigate('/blog')}
                className="px-8 py-4 text-lg font-semibold bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm"
              >
                Explore Travel Stories
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-12 flex justify-center gap-8 text-white/80"
          >
            <div className="text-center">
              <h3 className="text-3xl font-bold text-primary">1000+</h3>
              <p>Destinations</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-primary">24/7</h3>
              <p>AI Support</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-primary">100%</h3>
              <p>Personalized</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background image indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentImageIndex === index ? 'bg-primary w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;