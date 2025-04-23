import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ContactItem = ({ icon: Icon, title, content }) => (
  <motion.div 
    whileHover={{ x: 5 }}
    className="flex items-start mb-6"
  >
    <div className="p-3 bg-primary bg-opacity-10 rounded-full">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <div className="ml-4">
      <h3 className="text-lg font-semibold text-secondary">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </div>
  </motion.div>
);

const SocialLink = ({ icon: Icon, href, label }) => (
  <motion.a
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="p-3 bg-gray-100 rounded-full hover:bg-primary hover:text-white transition-colors"
  >
    <Icon className="w-5 h-5" />
  </motion.a>
);

const ContactInfo = () => {
  return (
    <div className="bg-gray-300/40 backdrop-blur-sm rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-secondary mb-6">Get in Touch</h2>
      
      <ContactItem
        icon={FaMapMarkerAlt}
        title="Address"
        content="123 Travel Street, Adventure City, India"
      />
      <ContactItem
        icon={FaPhone}
        title="Phone"
        content="+91 123 456 7890"
      />
      <ContactItem
        icon={FaEnvelope}
        title="Email"
        content="travelly.2004@gmail.com"
      />
      <ContactItem
        icon={FaClock}
        title="Business Hours"
        content="Mon - Fri: 9:00 AM - 6:00 PM"
      />
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-secondary mb-4">Follow Us</h3>
        <div className="flex gap-4">
          <SocialLink 
            icon={FaFacebook} 
            href="https://facebook.com" 
            label="Facebook"
          />
          <SocialLink 
            icon={FaTwitter} 
            href="https://twitter.com" 
            label="Twitter"
          />
          <SocialLink 
            icon={FaInstagram} 
            href="https://instagram.com" 
            label="Instagram"
          />
          <SocialLink 
            icon={FaLinkedin} 
            href="https://linkedin.com" 
            label="LinkedIn"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;