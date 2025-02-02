import React, { useEffect, useState } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '../../services/GlobalApi';
import { motion } from 'framer-motion';
import { FaCalendar, FaWallet, FaUsers } from 'react-icons/fa';

function InfoSection({trip}) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.userSelection?.location?.label
      };

      const result = await GetPlaceDetails(data);
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', result.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    } catch (error) {
      console.error('Error fetching photo:', error);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-xl overflow-hidden"
      >
        <img 
          src={photoUrl} 
          alt={trip?.userSelection?.location?.label}
          className="h-[400px] w-full object-cover rounded-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h2 className="text-4xl font-bold mb-2">{trip?.userSelection?.location?.label}</h2>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-4 p-4 bg-primary/10 rounded-xl"
        >
          <div className="p-3 bg-primary/20 rounded-full">
            <FaCalendar className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Duration</p>
            <p className="font-semibold text-lg">{trip.userSelection?.noOfDays} Days</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-4 p-4 bg-secondary/10 rounded-xl"
        >
          <div className="p-3 bg-secondary/20 rounded-full">
            <FaWallet className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Budget</p>
            <p className="font-semibold text-lg">{trip.userSelection?.budget}</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-4 p-4 bg-gray-100 rounded-xl"
        >
          <div className="p-3 bg-gray-200 rounded-full">
            <FaUsers className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Travelers</p>
            <p className="font-semibold text-lg">{trip.userSelection?.traveler}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default InfoSection;