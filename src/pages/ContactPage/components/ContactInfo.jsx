import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const ContactItem = ({ icon: Icon, title, content }) => (
  <div className="flex items-start mb-6">
    <div className="p-3 bg-primary bg-opacity-10 rounded-full">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <div className="ml-4">
      <h3 className="text-lg font-semibold text-secondary">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </div>
  </div>
);

const ContactInfo = () => {
  return (
    <div className="bg-gray-300/40 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-secondary mb-6">Get in Touch</h2>
      <ContactItem
        icon={FaMapMarkerAlt}
        title="Address"
        content="123 Travel Street, Adventure City, TC 12345"
      />
      <ContactItem
        icon={FaPhone}
        title="Phone"
        content="+1 (555) 123-4567"
      />
      <ContactItem
        icon={FaEnvelope}
        title="Email"
        content="info@travelly.com"
      />
      <ContactItem
        icon={FaClock}
        title="Business Hours"
        content="Mon - Fri: 9:00 AM - 6:00 PM"
      />
    </div>
  );
};

export default ContactInfo;