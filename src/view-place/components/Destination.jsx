import React, { useEffect } from 'react'
import { GetPlaceDetails } from '../../services/GlobalApi'
import { useState } from 'react';
import DestCardItem from './DestCardItem';

function Destination({placeData}) {

    
  
    
    return (
        <div>
        <h2 className='font-bold text-xl mt-5'>Destination</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5'>
            {placeData?.places?.destinations?.map((dest,index)=>(
                <DestCardItem dest={dest}/>
            ))}
        </div>
    </div>
    )
}

export default Destination
