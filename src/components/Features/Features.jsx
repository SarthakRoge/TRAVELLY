import React from 'react';
import { FaRoute, FaCloudSun, FaLightbulb, FaShieldAlt } from 'react-icons/fa';
import FeatureCard from './FeatureCard';

const features = [
  {
    icon: FaRoute,
    title: 'Itinerary Creation',
    description: 'Create detailed travel plans with our easy-to-use itinerary builder.',
  },
  {
    icon: FaCloudSun,
    title: 'Weather Updates',
    description: 'Get real-time weather forecasts for your destination.',
  },
  {
    icon: FaLightbulb,
    title: 'Travel Tips',
    description: 'Access expert travel advice and local recommendations.',
  },
  {
    icon: FaShieldAlt,
    title: 'Safety Guidelines',
    description: 'Stay informed about safety measures and travel advisories.',
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-secondary mb-12">
          Why Choose TRAVELLY?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;