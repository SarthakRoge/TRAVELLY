import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { db } from '../../config/firebase';
import Destination from '../components/Destination';


function ViewPlace() {
    const { AIplaceId } = useParams();
    const navigate = useNavigate();
    const [placeData, setPlaceData] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        AIplaceId&&getPlaceData();
      
    }, [AIplaceId])
  
    const getPlaceData = async () => {
      try {
        const docRef = doc(db, 'tempPlaces', AIplaceId);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
            console.log(docSnap.data())
            setPlaceData(docSnap.data());
          
        } else {

            toast.error('Place not found!');
            navigate('/discover');
        }
      } catch (error) {
        console.error('Error fetching place:', error);
        toast.error('Error loading place data');
      } finally {
        setLoading(false);
      }
    };
    if (loading) {
      return (
        <div className="pt-24 pb-12 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </div>
      );
    }
  
   
  
    return (
      <div className="pt-24 pb-12 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/discover')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 group"
        >
          <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Discovery</span>
        </motion.button>

        <Destination placeData={placeData} />
      </div>
    </div>
    );
  }
  
  export default ViewPlace;

  