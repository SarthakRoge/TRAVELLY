import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { getAuth } from 'firebase/auth';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  /**
   * Fetch all user trips from Firestore.
   */
  const GetUserTrips = async () => {
    try {
      const auth = getAuth(); // Initialize Firebase Auth
      const user = auth.currentUser; // Get the currently signed-in user

      if (!user) {
        navigate('/'); // Redirect if no user
        return;
      }

      setUserTrips([]); // Reset user trips before fetching

      // Query Firestore for trips related to this user's email
      const q = query(collection(db, 'AITrips'), where('email', '==', user.email));
      const querySnapshot = await getDocs(q);

      const trips = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        trips.push(doc.data()); // Collect trip data
      });

      setUserTrips(trips); // Update state with fetched trips
    } catch (error) {
      console.error('Error fetching user trips:', error);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-secondary mb-8">MY TRIPS</h1>
        <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
          {userTrips.length > 0 ? (
            userTrips.map((trip, index) => (
              <UserTripCardItem key={index} trip={trip} className="object-cover rounded-xl" />
            ))
          ) : (
            <p className="text-lg text-gray-500">No trips found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyTrips;