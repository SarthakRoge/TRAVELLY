import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaClock,  FaStar, FaTicketAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '../../services/GlobalApi';
import { motion } from 'framer-motion';

function PlaceCarditem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: place.name
      };

      const resp = await GetPlaceDetails(data);
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
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

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    place?.name
  )}`;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
    >
      <div className="relative">
        <img
          src={photoUrl || '/placeholder.jpg'}
          className="h-48 w-full object-cover"
          alt={place.name}
        />
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex items-center gap-1 text-white">
            {renderStars(place?.rating)}
            <span className="ml-2 text-sm">({place?.rating})</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg text-gray-900">{place.name}</h3>
          <Link
            to={mapUrl}
            target="_blank"
            className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-sm"
          >
            <FaMapMarkerAlt className="w-4 h-4" />
            <span>Map</span>
          </Link>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{place.details}</p>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="p-1.5 bg-gray-100 rounded-lg">
              <FaTicketAlt className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Entry Fee</p>
              <p className="text-sm font-medium">{place.ticketPricing}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <div className="p-1.5 bg-gray-100 rounded-lg">
              <FaClock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Travel Time</p>
              <p className="text-sm font-medium">{place.timeToTravel}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default PlaceCarditem;