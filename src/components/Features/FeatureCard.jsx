import React from 'react';

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
      <div className="inline-block p-3 bg-primary bg-opacity-10 rounded-full mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-secondary mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;