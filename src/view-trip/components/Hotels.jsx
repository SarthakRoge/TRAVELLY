import React from 'react';
import HotelCardItem from './HotelCardItem';
import { motion } from 'framer-motion';
import { FaHotel } from 'react-icons/fa';

function Hotels({ trip }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <FaHotel className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Recommended Hotels
        </h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {trip?.tripData?.travelPlan?.hotelOptions?.map((hotel, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: index * 0.1 }
            }}
          >
            <HotelCardItem hotel={hotel} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Hotels;