import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { toast } from 'react-hot-toast';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import { motion } from 'framer-motion';
import { FaSave, FaTimes } from 'react-icons/fa';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function ViewTrip() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tripId) {
      getTripData();
    }
  }, [tripId]);

  const getTripData = async () => {
    try {
      const docRef = doc(db, 'AITrips', tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTrip(docSnap.data());
      } else {
        toast.error("Trip not found!");
      }
    } catch (error) {
      console.error("Error fetching trip:", error);
      toast.error("Error loading trip data");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      toast.success("Trip saved successfully!");
      navigate('/my-trips');
    } catch (error) {
      console.error("Error saving trip:", error);
      toast.error("Failed to save trip");
    }
  };

  const handleCancel = async () => {
    if (window.confirm('Are you sure you want to cancel? This will delete the current itinerary.')) {
      try {
        await deleteDoc(doc(db, 'AITrips', tripId));
        toast.success("Trip cancelled");
        navigate('/my-trips');
      } catch (error) {
        console.error("Error cancelling trip:", error);
        toast.error("Failed to cancel trip");
      }
    }
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <DotLottieReact
          src="https://lottie.host/91d6ba59-cd39-4300-a245-9d10cf838ca3/HMuptZkj6C.lottie"
          loop
          autoplay
        />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Trip not found</div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Trip Details</h1>
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <FaSave className="w-5 h-5" />
                Save Trip
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCancel}
                className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <FaTimes className="w-5 h-5" />
                Cancel
              </motion.button>
            </div>
          </div>
          <InfoSection trip={trip} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <Hotels trip={trip} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <PlacesToVisit trip={trip} />
        </div>
      </div>
    </div>
  );
}

export default ViewTrip;