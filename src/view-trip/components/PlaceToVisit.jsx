import React from 'react';

import { motion } from 'framer-motion';
import { FaMapMarkedAlt, FaCalendarDay } from 'react-icons/fa';
import PlaceCarditem from './PlaceCarditem';

function PlacesToVisit({ trip }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-primary/10 rounded-lg">
          <FaMapMarkedAlt className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Places to Visit
        </h2>
      </div>

      <div className="space-y-12">
        {trip?.tripData?.travelPlan?.itinerary?.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <FaCalendarDay className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Day {item.day}</h2>
                <p className="text-sm text-gray-600">{item.theme}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {item.places.map((place, placeIndex) => (
                <motion.div
                  key={placeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: (index * 0.1) + (placeIndex * 0.05) }
                  }}
                >
                  <PlaceCarditem place={place} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;