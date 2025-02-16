import React, { useEffect, useState } from 'react'
import { GetPlaceDetails, PHOTO_REF_URL } from '../../services/GlobalApi';

function DestCardItem({dest}) {

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
        <div>
        
            <img src={PhotoUrl} className='rounded-xl'/>
            <div >
                <h2>{dest?.name}</h2>
                <h2>{dest?.description}</h2>
            </div>
                    
        </div>
    )
}

export default DestCardItem
