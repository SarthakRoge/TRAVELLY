import React from 'react';
import TripCard from './TripCard';

const mockTrips = [
  {
    id: 1,
    title: 'Paris Adventure',
    date: '2024-06-15',
    duration: '7 days',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a',
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'Tokyo Explorer',
    date: '2024-08-20',
    duration: '10 days',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
    status: 'planning',
  },
];

const TripList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {mockTrips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
};

export default TripList;