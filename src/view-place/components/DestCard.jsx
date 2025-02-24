import React, { useEffect, useState } from 'react'
import { GetPlaceDetails, PHOTO_REF_URL } from '../../services/GlobalApi';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaExternalLinkAlt, FaBookmark } from 'react-icons/fa';

function DestCard({dest}) {

    const [PhotoUrl, setPhotoUrl] = useState();
        
        useEffect(() => {
            dest && GetphotoPlace();
          }, [dest]);
    
        const GetphotoPlace=async()=>{
            try{
                const data={
                    textQuery:dest?.name
                }
                
                const result = await GetPlaceDetails(data);
                console.log(result)
                const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', result.data.places[0].photos[3].name);
                setPhotoUrl(PhotoUrl);
            }
            catch(error){
                console.error('Error fetching photo:', error);
            }
        };



  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
      >
        <div>
        
        <img 
          src={PhotoUrl || '/Phaolder.jpg'} 
          className="h-64 w-full object-cover"
          alt={dest?.name}
        />
            <div className="p-4">
                <h2 className="text-2xl font-bold text-black mb-2">{dest?.name}</h2>
                </div>
                <div className="p-4">
                <p className="text-gray-600 leading-relaxed mb-4">{dest?.description}</p>
            </div>
                    
        </div>
        </motion.div>
  )
}

export default DestCard
