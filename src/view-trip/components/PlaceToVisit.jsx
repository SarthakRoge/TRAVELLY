import React from 'react'
import PlaceCarditem from './PlaceCardItem'

function PlaceToVisit({trip}) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5 mb-5">Places to Visit</h2>
      <div>
        {trip?.tripData?.travelPlan?.itinerary?.map((item, index) => (
          <div key={index}>
            <h2 className='font-bold text-lg mt-4'>Day {item.day}</h2>
            <div className='grid md:grid-cols-2 gap-5'>
              {item.places.map((place, placeIndex) => (
                <div key={placeIndex} className='my-3'>
                  <PlaceCarditem place={place}/>
                  
                  
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlaceToVisit
