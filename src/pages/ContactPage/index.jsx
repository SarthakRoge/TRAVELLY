import React from 'react';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';

const ContactPage = () => {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-black mb-8 text-center">Contact Us</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <div className="lg:col-span-1">
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;