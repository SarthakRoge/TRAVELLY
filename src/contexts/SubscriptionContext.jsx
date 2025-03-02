import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { doc, getDoc, setDoc, collection, query, where, getDocs, increment, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { toast } from 'react-hot-toast';

const SubscriptionContext = createContext();

export const useSubscription = () => useContext(SubscriptionContext);

export const SubscriptionProvider = ({ children }) => {
  const { user } = useAuth();
  const [userPlan, setUserPlan] = useState('free');
  const [itineraryCount, setItineraryCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Plan limits
  const planLimits = {
    free: 5,
    basic: 50,
    pro: Infinity
  };

  useEffect(() => {
    if (user) {
      getUserSubscription();
      getItineraryCount();
    } else {
      setUserPlan('free');
      setItineraryCount(0);
      setLoading(false);
    }
  }, [user]);

  const getUserSubscription = async () => {
    try {
      const userDocRef = doc(db, 'userSubscriptions', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        setUserPlan(userDocSnap.data().planId);
      } else {
        // Create a default free subscription for new users
        await setDoc(userDocRef, {
          userId: user.uid,
          planId: 'free',
          status: 'active',
          startDate: new Date(),
          endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 100)), // Long expiry for free plan
          createdAt: new Date()
        });
        setUserPlan('free');
      }
    } catch (error) {
      console.error('Error getting user subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const getItineraryCount = async () => {
    try {
      const q = query(collection(db, 'AITrips'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      setItineraryCount(querySnapshot.size);
    } catch (error) {
      console.error('Error getting itinerary count:', error);
    }
  };

  const canCreateItinerary = () => {
    const maxItineraries = planLimits[userPlan];
    return itineraryCount < maxItineraries;
  };

  const getRemainingItineraries = () => {
    const maxItineraries = planLimits[userPlan];
    return maxItineraries === Infinity ? 'Unlimited' : maxItineraries - itineraryCount;
  };

  const incrementItineraryCount = async () => {
    try {
      setItineraryCount(prev => prev + 1);
      
      // In a real app, you would update a counter in the user's document
      // For simplicity, we're just updating the local state here
    } catch (error) {
      console.error('Error incrementing itinerary count:', error);
    }
  };

  const updateSubscription = async (newPlanId) => {
    try {
      if (!user) return;
      
      const userDocRef = doc(db, 'userSubscriptions', user.uid);
      await updateDoc(userDocRef, {
        planId: newPlanId,
        updatedAt: new Date()
      });
      
      setUserPlan(newPlanId);
      toast.success(`Your subscription has been updated to ${newPlanId.charAt(0).toUpperCase() + newPlanId.slice(1)}`);
    } catch (error) {
      console.error('Error updating subscription:', error);
      toast.error('Failed to update subscription');
    }
  };

  const value = {
    userPlan,
    itineraryCount,
    loading,
    canCreateItinerary,
    getRemainingItineraries,
    incrementItineraryCount,
    updateSubscription,
    planLimits
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};