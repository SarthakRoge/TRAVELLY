import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../config/firebase';
import { toast } from 'react-hot-toast';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';

function Viewtrip() {
    const {tripId}=useParams();
    const [trip,setTrip]=useState([]);

    useEffect(()=>{
      tripId&&GetTripData();
    },[tripId])

    /**
     * Used to get Trip Information from firebase
     */

    const GetTripData=async()=>{
      const docRef=doc(db,'AITrips',tripId);
      const docSnap=await getDoc(docRef);

      if(docSnap.exists()){
        console.log("Document:",docSnap.data());
        setTrip(docSnap.data());
      }
      else{
        console.log("No such Document");
        toast.error("NO TRIP FOUND!!")

      }
    }
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <InfoSection trip={trip}/>
      
        <Hotels trip={trip}/>

        <PlacesToVisit trip={trip}/>

        
       

        
      </div>
    </div>
  )
}

export default Viewtrip
