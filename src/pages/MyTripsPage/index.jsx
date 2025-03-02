import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { getAuth } from 'firebase/auth';
import UserTripCardItem from './components/UserTripCardItem';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaSuitcase, FaCrown } from 'react-icons/fa';

function MyTrips() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { userPlan, itineraryCount, canCreateItinerary, getRemainingItineraries } = useSubscription();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      toast.error('Please sign in to view your trips');
      navigate('/signin');
      return;
    }
    GetUserTrips();
  }, [user, navigate]);

  const GetUserTrips = async () => {
    try {
      if (!user) return;

      setUserTrips([]); // Reset user trips before fetching
      const q = query(collection(db, 'AITrips'), where('email', '==', user.email));
      const querySnapshot = await getDocs(q);

      const trips = [];
      querySnapshot.forEach((doc) => {
        trips.push(doc.data());
      });

      setUserTrips(trips);
    } catch (error) {
      console.error('Error fetching user trips:', error);
      toast.error('Failed to load trips');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (tripId) => {
    setUserTrips(userTrips.filter(trip => trip.id !== tripId));
  };

  const handleCreateClick = () => {
    if (!canCreateItinerary()) {
      toast.error(`You've reached your plan limit. Please upgrade to create more itineraries.`);
      navigate('/pricing');
      return;
    }
    navigate('/create-itinerary');
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-secondary">My Trips</h1>
            <p className="text-gray-600 mt-2">
              {userTrips.length} {userTrips.length === 1 ? 'trip' : 'trips'} planned
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm">
              <span className="font-medium">Plan: </span>
              <span className="text-primary font-semibold">{userPlan.charAt(0).toUpperCase() + userPlan.slice(1)}</span>
              <span className="mx-2">•</span>
              <span className="font-medium">Remaining: </span>
              <span className="text-primary font-semibold">{getRemainingItineraries()}</span>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreateClick}
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <FaPlus className="w-4 h-4" />
              Create New Trip
            </motion.button>
          </div>
        </div>

        {/* Subscription warning if close to limit */}
        {userPlan !== 'pro' && itineraryCount > 0 && !canCreateItinerary() && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg"
          >
            <div className="flex items-start">
              <FaCrown className="w-6 h-6 text-yellow-400 mr-3 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800">You've reached your itinerary limit</h3>
                <p className="text-yellow-700 mt-1">
                  Upgrade your plan to create more amazing travel experiences.
                </p>
                <button
                  onClick={() => navigate('/pricing')}
                  className="mt-2 px-4 py-1.5 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 transition-colors"
                >
                  Upgrade Now
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Warning if approaching limit */}
        {userPlan !== 'pro' && itineraryCount > 0 && canCreateItinerary() && 
         ((userPlan === 'free' && itineraryCount >= 4) || 
          (userPlan === 'basic' && itineraryCount >= 45)) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 rounded-r-lg"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <FaCrown className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  You're approaching your plan's itinerary limit. 
                  <button
                    onClick={() => navigate('/pricing')}
                    className="ml-2 font-medium underline hover:text-blue-800"
                  >
                    Consider upgrading
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {userTrips.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userTrips.map((trip, index) => (
                <UserTripCardItem 
                  key={trip.id} 
                  trip={trip} 
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-white rounded-xl shadow-sm"
            >
              <FaSuitcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">No trips yet</h2>
              <p className="text-gray-500 mb-6">Start planning your next adventure!</p>
              <button
                onClick={handleCreateClick}
                className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Create Your First Trip
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default MyTrips;