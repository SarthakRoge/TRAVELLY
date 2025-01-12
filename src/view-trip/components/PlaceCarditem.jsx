import React, { useEffect, useState } from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '../../services/GlobalApi';

function PlaceCarditem({place}) {

  const [photoUrl,setPhotoUrl]=useState();
    useEffect(()=>{
      place && GetPlacePhoto();
  
    },[place])
    const GetPlacePhoto=async()=>{
      const data={
        textQuery:place.name
  
      }
  
      const result=await GetPlaceDetails(data).then(resp=>{
        
  
        const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
        setPhotoUrl(PhotoUrl);
      })
    }

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.name} target='_blank'>
      <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img src={photoUrl?photoUrl:'/Phoalder.jpg'} className=' rounded-xl h-[130px] w-[130px] object-cover'/> 
        <div>
          <h2 className='font-bold text-lg'>{place.name}</h2>
          <p className='text-sm text-gray-400'>{place.details}</p>
          {/*<button><FaMapLocationDot /></button>*/}

        </div>
      </div>
    </Link>
  )
}

export default PlaceCarditem
