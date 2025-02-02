import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { GetPlaceDetails, PHOTO_REF_URL } from '../../../services/GlobalApi';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

function UserTripCardItem({ trip, onDelete }) {
  const [photoUrl, setPhotoUrl] = useState();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.userSelection?.location?.label
      };

      const resp = await GetPlaceDetails(data);
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    } catch (error) {
      console.error('Error fetching photo:', error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this trip?')) {
      setIsDeleting(true);
      try {
        await deleteDoc(doc(db, 'AITrips', trip.id));
        toast.success('Trip deleted successfully');
        if (onDelete) onDelete(trip.id);
      } catch (error) {
        console.error('Error deleting trip:', error);
        toast.error('Failed to delete trip');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <Link to={'/view-trip/' + trip.id}>
        <div className="relative">
          <img 
            src={photoUrl || '/placeholder.jpg'} 
            className="h-48 w-full object-cover"
            alt={trip?.userSelection?.location?.label}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="p-5">
          <h2 className="font-bold text-xl text-gray-800 mb-2">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {trip?.userSelection?.noOfDays} Days
              </span>
              <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                {trip?.userSelection?.budget} Budget
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                {trip?.userSelection?.traveler}
              </span>
            </div>
          </div>
        </div>
      </Link>
      <div className="px-5 pb-4 flex justify-end">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex items-center gap-2 px-4 py-2 text-red-500 hover:text-red-700 transition-colors"
        >
          <FaTrash className="w-4 h-4" />
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </motion.div>
  );
}

export default UserTripCardItem;