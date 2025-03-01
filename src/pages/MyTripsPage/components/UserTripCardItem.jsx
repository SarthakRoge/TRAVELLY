import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { GetPlaceDetails, PHOTO_REF_URL } from '../../../services/GlobalApi';
import { FaTrash, FaShare, FaDownload, FaEllipsisV } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { generatePDF } from '../../../utils/pdfGenerator';


function UserTripCardItem({ trip, onDelete }) {
  const [photoUrl, setPhotoUrl] = useState();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsDownloading(true);
    toast.loading('Generating PDF...');
    
    try {
      const pdfBlob = await generatePDF(trip, photoUrl);
      const fileUrl = URL.createObjectURL(pdfBlob);
      
      const emailSubject = encodeURIComponent(`Travel Itinerary: ${trip?.userSelection?.location?.label}`);
      const emailBody = encodeURIComponent(`Check out my travel itinerary for ${trip?.userSelection?.location?.label}! Here is the itinerary PDF: ${fileUrl}`);
      const whatsappMessage = encodeURIComponent(`Check out my travel itinerary for ${trip?.userSelection?.location?.label}! Here is the itinerary PDF: ${fileUrl}`);
      
      const mailtoLink = `mailto:?subject=${emailSubject}&body=${emailBody}`;
      const whatsappLink = `https://wa.me/?text=${whatsappMessage}`;
      
      window.open(mailtoLink, '_blank');
      window.open(whatsappLink, '_blank');
      
      toast.success('PDF ready to be shared');
    } catch (error) {
      console.error('Error sharing itinerary:', error);
      toast.error('Failed to share itinerary');
    } finally {
      toast.dismiss();
      setIsDownloading(false);
    }
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsDownloading(true);
    toast.loading('Downloaging PDF...');
    
    try {
      await generatePDF(trip, photoUrl);
      toast.dismiss();
      toast.success('Itinerary PDF downloaded successfully');
    } catch (error) {
      console.error('Error downloading itinerary:', error);
      toast.dismiss();
      toast.error('Failed to download itinerary');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
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
        </div>
      </Link>
      
      <div className="absolute top-2 right-2">
        <button 
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300" 
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
        >
          <FaEllipsisV className="text-gray-600" />
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-32 overflow-hidden">
            <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 w-full text-primary hover:bg-gray-100">
              <FaDownload className="w-4 h-4" /> Download
            </button>
            <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 w-full text-secondary hover:bg-gray-100">
              <FaShare className="w-4 h-4" /> Share
            </button>
            <button onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 w-full text-red-500 hover:bg-gray-100">
              <FaTrash className="w-4 h-4" /> Delete
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default UserTripCardItem;
