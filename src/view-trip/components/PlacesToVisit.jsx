import React from 'react';
import PlaceCarditem from './PlaceCarditem';

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>
      <div>
        {trip?.tripData?.travelPlan?.itinerary?.map((item,index)=>(
          <div >
            
              <h2 className='font-bold text-lg'>Day {item.day}</h2>
              <div className='grid md:grid-cols-2 gap-5'>
                {item.places.map((place,index)=>(
                  <div className='my-3'>
                    <h2>Hii</h2>
                    <PlaceCarditem place={place}/>
                  </div>
              

                ))}
              </div>
            
          </div>

        ))}
      </div>
     
    </div>
  );
}

export default PlacesToVisit;