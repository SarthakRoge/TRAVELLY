import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Send email using EmailJS or similar service
      const response = await fetch('https://formsubmit.co/ajax/travelly.2004@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setIsSuccess(true);
      toast.success('Message sent successfully!');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-300/40 backdrop-blur-sm rounded-lg shadow-md p-6">
      {isSuccess ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r-md"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <FaPaperPlane className="h-5 w-5 text-green-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-green-800">Message Sent!</h3>
              <p className="mt-2 text-green-700">
                Thank you for contacting us. We'll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-3 text-sm font-medium text-green-700 hover:text-green-600 underline"
              >
                Send another message
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-primary focus:ring-primary
                  ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-primary focus:ring-primary
                  ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-primary focus:ring-primary
                ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-primary focus:ring-primary
                ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
            )}
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-primary focus:ring-primary
                ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
            ></textarea>
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">{errors.message}</p>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium text-white
              ${isSubmitting ? 'bg-primary/70' : 'bg-primary hover:bg-primary/90'} 
              transition-colors shadow-md`}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <FaPaperPlane className="w-5 h-5" />
                Send Message
              </>
            )}
          </motion.button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;