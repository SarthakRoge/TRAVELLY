import React from 'react';
import { FaPlane, FaMapMarkedAlt, FaRegCalendarAlt } from 'react-icons/fa';

const StatCard = ({ icon: Icon, title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center">
      <div className="p-3 bg-primary bg-opacity-10 rounded-full">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div className="ml-4">
        <p className="text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-secondary">{value}</p>
      </div>
    </div>
  </div>
);

const TripStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard icon={FaPlane} title="Total Trips" value="12" />
      <StatCard icon={FaMapMarkedAlt} title="Countries Visited" value="8" />
      <StatCard icon={FaRegCalendarAlt} title="Upcoming Trips" value="3" />
    </div>
  );
};

export default TripStats;