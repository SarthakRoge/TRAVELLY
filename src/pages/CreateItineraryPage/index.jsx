import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '../../constant/options';
import { FaDollarSign, FaMoneyBillWave, FaGem, FaUser, FaHeart, FaHome, FaUsers } from 'react-icons/fa';
import Button from '../../components/common/Button';
import { chatSession } from '../../services/AIModal';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CreateItineraryPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [place, SetPlace] = useState();
  const [formData, setFormData] = useState([]);

  const [loading, setLoading] = useState(false);

  




  React.useEffect(() => {
    if (!user) {
      toast.error('You need to sign in to create an itinerary');
      navigate('/signin');
    }
  }, [user, navigate]);

  const handleInputChange = (name, value) => {


    setFormData({
      ...formData,
      [name]: value
    })

  }

  useEffect(() => {
    console.log(formData);
  }, [formData])





  const OnGenerateTrip = async () => {




    if (formData?.noOfDays > 9 && !formData?.location || !formData?.tripName || !formData?.traveler || !formData?.budget) {
      toast.error('Please fill all details')
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{tripName}', formData?.tripName)
      .replace('{location}', formData?.location.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays)




    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("--", result?.response?.text());
    setLoading(false);

    SaveAiTrip(result?.response?.text())


  }

  const SaveAiTrip = async (TripData) => {

    setLoading(true);

    const docId = Date.now().toString()

    if (!user) {
      toast.error('User not authenticated!');
      return;
    }

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      id: docId,
      email: user.email, // Include user's email
      userId: user.uid,

    });
    setLoading(false);
    navigate(`/view-trip/${docId}`);
  }



  return (
    <div className="sm:px-10 md:px-2 lg:px-56 xl:px-72 px-5 mt-40">

      <h1 className="text-4xl font-bold">Tell us your travel preferences 🏔️🏝️</h1>
      <p className='mt3 text-gray-500 text-2xl'>Just provide some basic information, and our trip planner will generate a customized based on your preferences.
      </p>

      <div className='mt-10 flex flex-col gap-10'>
        <div className='space-y-4'>
          <h2 className="text-2xl font-bold text-secondary">Your Trip Name?</h2>
          <input
            type='string'

            placeholder="e.g., Summer Adventure 2024"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 transition-all"
            onChange={({ target: { value } }) => handleInputChange('tripName', value)}
          />

        </div>
        <div className='space-y-4'>
          <h2 className="text-2xl font-bold text-secondary">What is destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { SetPlace(v); handleInputChange('location', v) }
            }}

          />

        </div>
        <div className='space-y-4'>
          <h2 className="text-2xl font-bold text-secondary">How many days are you planning your trip?</h2>
          <input
            type="number"
            placeholder="Ex:3"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 transition-all"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>
        <div className='space-y-4'>
          <h2 className="text-2xl font-bold text-secondary">What is Your Budget?</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-6 border cursor-pointer 
              rounded-lg hover:shadow-2xl 
              ${formData?.budget == item.title && 'shadow-lg border-black'}
              `}>
                <h2 className='text-3xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.description}</h2>

              </div>
            ))}
          </div>

        </div>

        <div className='space-y-4'>
          <h2 className="text-2xl font-bold text-secondary">Who do you plan on travelling on travelling with on your next adventure?</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {SelectTravelesList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-6 border cursor-pointer 
              rounded-lg hover:shadow-2xl
              ${formData?.traveler == item.people && 'shadow-lg border-black'}
              `}>
                <h2 className='text-3xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.description}</h2>

              </div>
            ))}
          </div>

        </div>
        <div className='space-y-4 mb-10 flex justify-center '>
          <Button disabled={loading} onClick={OnGenerateTrip}>
            {loading ?
              <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : "Generate Trip"
            }

          </Button>
        </div>

      </div>

    </div>
  );
};

export default CreateItineraryPage;