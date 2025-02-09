import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaStar, FaDollarSign, FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '../../services/GlobalApi';
import { motion } from 'framer-motion';

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: hotel?.hotelName
      };

      const result = await GetPlaceDetails(data);
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', result.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    } catch (error) {
      console.error('Error fetching photo:', error);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const renderPriceRange = (price) => {
    const minPrice = price.split(' - ')[0];
    return (
      <div className="flex items-center gap-1 text-green-600 font-medium">
        <FaDollarSign className="w-4 h-4" />
        <span>{minPrice}</span>
        <span className="text-gray-500 text-sm">per night</span>
      </div>
    );
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
    >
      <div className="relative">
        <img
          src={photoUrl || '/placeholder.jpg'}
          className="h-48 w-full object-cover"
          alt={hotel?.hotelName}
        />
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex items-center gap-1 text-white">
            {renderStars(hotel?.rating)}
            <span className="ml-2 text-sm">({hotel?.rating})</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-2">
          {hotel?.hotelName}
        </h3>
        
        <div className="flex items-start gap-2 mb-3 text-gray-600">
          <FaMapMarkerAlt className="w-4 h-4 mt-1 flex-shrink-0" />
          <p className="text-sm">{hotel?.hotelAddress}</p>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {hotel?.description}
        </p>

        <div className="flex justify-between items-center">
          {renderPriceRange(hotel?.price)}
          
          <Link
            to={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(hotel?.hotelName + ' ' + hotel?.hotelAddress)}
            target='_blank'
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <span className="text-sm font-medium">View on Maps</span>
            <FaExternalLinkAlt className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default HotelCardItem;