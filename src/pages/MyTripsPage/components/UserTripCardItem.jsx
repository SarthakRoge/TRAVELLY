import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { GetPlaceDetails, PHOTO_REF_URL } from '../../../services/GlobalApi';
import { FaTrash, FaShare, FaDownload, FaEllipsisV } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { generatePDF } from '../../../utils/pdfGenerator';
import { sharePDF } from '../../../utils/shareGenpdf';


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
    toast.loading('Generating PDF for sharing...');
    
    try {
      const pdfBlob = await sharePDF(trip, photoUrl);
      
      // Create a file from the blob
      const file = new File([pdfBlob], `${trip?.userSelection?.location?.label.replace(/\s+/g, '_')}_Itinerary.pdf`, { 
        type: 'application/pdf' 
      });
      
      // Check if Web Share API is supported and can share files
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `Travel Itinerary: ${trip?.userSelection?.location?.label}`,
          text: `Check out my travel itinerary for ${trip?.userSelection?.location?.label}!`,
        });
        toast.success('Itinerary shared successfully');
      } else {
        // Fallback for browsers that don't support sharing files
        const url = URL.createObjectURL(pdfBlob);
        
        // Create sharing links
        const emailSubject = encodeURIComponent(`Travel Itinerary: ${trip?.userSelection?.location?.label}`);
        const emailBody = encodeURIComponent(`Check out my travel itinerary for ${trip?.userSelection?.location?.label}!`);
        const emailLink = `mailto:?subject=${emailSubject}&body=${emailBody}`;
        
        const whatsappText = encodeURIComponent(`Check out my travel itinerary for ${trip?.userSelection?.location?.label}!`);
        const whatsappLink = `https://wa.me/?text=${whatsappText}`;
        
        // Create a modal for sharing options
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '9999';
        
        const modalContent = document.createElement('div');
        modalContent.style.backgroundColor = 'white';
        modalContent.style.padding = '20px';
        modalContent.style.borderRadius = '10px';
        modalContent.style.maxWidth = '400px';
        modalContent.style.width = '90%';
        
        modalContent.innerHTML = `
          <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 15px;">Share Itinerary</h3>
          <p style="margin-bottom: 15px;">Choose how you want to share your itinerary:</p>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <a href="${url}" download="${trip?.userSelection?.location?.label.replace(/\s+/g, '_')}_Itinerary.pdf" style="padding: 10px; background-color: #00E5BE; color: white; text-decoration: none; border-radius: 5px; text-align: center;">Download PDF</a>
            <a href="${emailLink}" style="padding: 10px; background-color: #EA4335; color: white; text-decoration: none; border-radius: 5px; text-align: center;">Share via Email</a>
            <a href="${whatsappLink}" target="_blank" style="padding: 10px; background-color: #25D366; color: white; text-decoration: none; border-radius: 5px; text-align: center;">Share via WhatsApp</a>
            <button id="close-modal" style="padding: 10px; background-color: #f1f1f1; border: none; border-radius: 5px; margin-top: 10px; cursor: pointer;">Close</button>
          </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        document.getElementById('close-modal').addEventListener('click', () => {
          document.body.removeChild(modal);
          URL.revokeObjectURL(url);
        });
        
        toast.success('Choose your sharing option');
      }
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
