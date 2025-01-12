import React, { useEffect, useState } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '../../services/GlobalApi';


function InfoSection({trip}) {

  const [photoUrl,setPhotoUrl]=useState();
  useEffect(()=>{
    trip && GetPlacePhoto();

  },[trip])
  const GetPlacePhoto=async()=>{
    const data={
      textQuery:trip?.userSelection?.location?.label

    }

    const result=await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data.places[0].photos[3].name)

      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    })
  }
  return (
    <div>
      
      <img src={photoUrl} className='h-[340px] w-full object-cover rounded-xl'/>
      <div>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
          <div className='flex gap-5'>
              <h2 className='p-2 px- bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>{trip.userSelection?.noOfDays} Days</h2>
              <h2 className='p-2 px- bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>{trip.userSelection?.budget} Budget</h2>
              <h2 className='p-2 px- bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>No. of Traveler: {trip.userSelection?.traveler} </h2>
          </div>
        </div>
      </div>
      <button></button>
    </div>
  )
}

export default InfoSection
