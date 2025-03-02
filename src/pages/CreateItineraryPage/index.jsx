import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '../../constant/options';
import { FaMapMarkerAlt, FaCalendarAlt, FaGlobeAmericas, FaCrown } from 'react-icons/fa';
import Button from '../../components/common/Button';
import { chatSession } from '../../services/AIModal';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const CreateItineraryPage = () => {
  const { user } = useAuth();
  const { canCreateItinerary, getRemainingItineraries, incrementItineraryCount, userPlan } = useSubscription();
  const navigate = useNavigate();
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    if (!user) {
      toast.error('You need to sign in to create an itinerary');
      navigate('/signin');
      return;
    }

    // Check if user can create more itineraries
    if (!canCreateItinerary()) {
      setShowUpgradeModal(true);
    }
  }, [user, navigate, canCreateItinerary]);

  const handleInputChange = (name, value) => {
    if (name === 'noOfDays') {
      const days = parseInt(value);
      if (isNaN(days) || days < 1) {
        value = '1';
      } else if (days > 12) {
        value = '12';
      }
    }
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onGenerateTrip = async () => {
    if (!canCreateItinerary()) {
      setShowUpgradeModal(true);
      return;
    }

    if (!formData?.location || !formData?.tripName || !formData?.traveler || !formData?.budget || !formData?.noOfDays) {
      toast.error('Please fill in all details');
      return;
    }

    setLoading(true);
    try {
      const FINAL_PROMPT = AI_PROMPT
        .replace('{tripName}', formData?.tripName)
        .replace('{location}', formData?.location.label)
        .replace('{totalDays}', formData?.noOfDays)
        .replace('{traveler}', formData?.traveler)
        .replace('{budget}', formData?.budget)
        .replace('{totalDays}', formData?.noOfDays);

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      await saveAiTrip(result?.response?.text());
      
      // Increment the itinerary count after successful creation
      await incrementItineraryCount();
    } catch (error) {
      console.error('Error generating trip:', error);
      toast.error('Failed to generate trip');
      setLoading(false);
    }
  };

  const saveAiTrip = async (tripData) => {
    try {
      const docId = Date.now().toString();
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(tripData),
        id: docId,
        email: user.email,
        userId: user.uid,
        createdAt: new Date()
      });
      navigate(`/view-trip/${docId}`);
    } catch (error) {
      console.error('Error saving trip:', error);
      toast.error('Failed to save trip');
      setLoading(false);
    }
  };

  const handleUpgradeClick = () => {
    navigate('/pricing');
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50">
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-12 rounded-2xl shadow-2xl text-center max-w-[600px]"
            >
              <div className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] mx-auto mb-8">
                <DotLottieReact
                  src="https://lottie.host/148409e6-01e1-4862-8af6-344f0d8b8f73/8EcEwXq7e5.lottie"
                  speed="1.5"
                  style={{ width: "100%", height: "100%" }}
                  loop
                  autoplay
                />
              </div>
      
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Creating Your Perfect Itinerary
              </h2>
              <p className="text-lg text-gray-600">
                Please wait while we plan your dream journey...
              </p>
            </motion.div>
          </motion.div>
        )}

        {showUpgradeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-[500px] mx-4"
            >
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCrown className="w-8 h-8 text-yellow-500" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Itinerary Limit Reached
              </h2>
              <p className="text-gray-600 mb-6">
                You've reached the maximum number of itineraries allowed on your {userPlan.charAt(0).toUpperCase() + userPlan.slice(1)} plan. 
                Upgrade your plan to create more amazing travel experiences!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleUpgradeClick}
                  className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Upgrade Now
                </button>
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Plan Your Dream Journey 🌎
            </h1>
            <p className="text-lg text-gray-600">
              Tell us your preferences, and we'll create your perfect itinerary
            </p>
            
            {/* Subscription info banner */}
            <div className="mt-4 p-3 bg-gray-100 rounded-lg inline-block">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Your plan:</span> {userPlan.charAt(0).toUpperCase() + userPlan.slice(1)} • 
                <span className="font-medium"> Remaining itineraries:</span> {getRemainingItineraries()}
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Trip Name */}
            <div className="space-y-4">
              <label className="block text-xl font-semibold text-gray-700">
                Give your trip a name
              </label>
              <input
                type="text"
                placeholder="e.g., Summer Adventure 2024"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                onChange={(e) => handleInputChange('tripName', e.target.value)}
              />
            </div>

            {/* Destination */}
            <div className="space-y-4">
              <label className="block text-xl font-semibold text-gray-700">
                Where would you like to go?
              </label>
              <div className="relative">
                <GooglePlacesAutocomplete
                  apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                  selectProps={{
                    place,
                    onChange: (v) => { setPlace(v); handleInputChange('location', v) },
                    placeholder: "Search for a destination",
                    styles: {
                      control: (provided) => ({
                        ...provided,
                        padding: '4px',
                        borderRadius: '0.5rem',
                        border: '1px solid #D1D5DB',
                      })
                    }
                  }}
                />
                <FaMapMarkerAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-4">
              <label className="block text-xl font-semibold text-gray-700">
                How many days are you planning to travel? 
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="12"
                  placeholder="Enter number of days"
                  value={formData.noOfDays || ''}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                  onBlur={(e) => {
                    const value = parseInt(e.target.value);
                    if (value < 1) handleInputChange('noOfDays', '1');
                    if (value > 12) handleInputChange('noOfDays', '12');
                  }}
                />
                <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
            </div>

            {/* Budget */}
            <div className="space-y-4">
              <label className="block text-xl font-semibold text-gray-700">
                What's your budget range?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SelectBudgetOptions.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleInputChange('budget', item.title)}
                    className={`p-6 rounded-xl cursor-pointer transition-all ${
                      formData?.budget === item.title
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className={`text-sm ${formData?.budget === item.title ? 'text-white/80' : 'text-gray-500'}`}>
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Travelers */}
            <div className="space-y-4">
              <label className="block text-xl font-semibold text-gray-700">
                Who's traveling with you?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SelectTravelesList.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleInputChange('traveler', item.people)}
                    className={`p-6 rounded-xl cursor-pointer transition-all ${
                      formData?.traveler === item.people
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className={`text-sm ${formData?.traveler === item.people ? 'text-white/80' : 'text-gray-500'}`}>
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-center pt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
                onClick={onGenerateTrip}
                className={`
                  flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-semibold
                  ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'}
                  text-white shadow-lg transition-all
                `}
              >
                {loading ? 'Generating Trip...' : 'Generate Trip'}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateItineraryPage;