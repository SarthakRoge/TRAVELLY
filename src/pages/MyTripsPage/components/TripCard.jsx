import React from 'react';
import { FaCalendar, FaClock } from 'react-icons/fa';

const TripCard = ({ trip }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={trip.image}
        alt={trip.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-secondary mb-2">{trip.title}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <FaCalendar className="mr-2" />
          <span>{trip.date}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FaClock className="mr-2" />
          <span>{trip.duration}</span>
        </div>
        <div className="mt-4">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium
            ${trip.status === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
            {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TripCard;