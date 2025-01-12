import React, { useEffect, useState } from 'react'
import { GetPlaceDetails, PHOTO_REF_URL } from '../../../services/GlobalApi';
import { Link } from 'react-router-dom';

function UserTripCardItem({trip}) {

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
    <Link to={'/view-trip/'+trip.id}>
        <div>
        <img src={photoUrl?photoUrl:'Phoalder.jpg'} className="object-cover rounded-xl"/>
        <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label} </h2>
            <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget</h2>
        </div>
        </div>
    </Link>
  )
}

export default UserTripCardItem
