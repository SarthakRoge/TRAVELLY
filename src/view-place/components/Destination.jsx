import React, { useEffect } from 'react'


import { motion } from 'framer-motion';
import { FaCompass, FaMapMarkedAlt } from 'react-icons/fa';
import DestCard from './DestCard';


function Destination({placeData}) {


    return (
        
      

      <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 mb-4"
        >
          <div className="p-2 bg-primary/10 rounded-lg">
            <FaCompass className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Discover Your Next Adventure
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600"
        >
          Based on your preferences, we've curated these amazing destinations just for you.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {placeData?.places?.map((dest,index)=>(
                <DestCard dest={dest}/>
            ))}
      </div>

      {placeData?.places?.length === 0 && (
        <div className="text-center py-12">
          <div className="p-3 bg-gray-100 rounded-full inline-block mb-4">
            <FaMapMarkedAlt className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Destinations Found
          </h3>
          <p className="text-gray-500">
            Try adjusting your preferences to discover more places.
          </p>
        </div>
      )}
    </div>
      
    )
}

export default Destination
