import { db } from '../config/firebase';
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { processPayment } from './razorpay';

export const subscriptionPlans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Start your journey',
    features: [
      'Feature',
      'Feature',
      'Feature'
    ],
    duration: 30 // days
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 499,
    description: 'Perfect for casual travelers',
    features: [
      'Feature',
      'Feature',
      'Feature',
      'Feature'
    ],
    duration: 30
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 999,
    description: 'For frequent travelers',
    features: [
      'Feature',
      'Feature',
      'Feature',
      'Feature',
      'Feature',
      'Feature'
    ],
    duration: 30
  }
];

export const createSubscription = async (userId, planId, paymentResponse) => {
  try {
    const plan = subscriptionPlans.find(p => p.id === planId);
    if (!plan) throw new Error('Invalid plan selected');

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.duration);

    const subscriptionData = {
      userId,
      planId,
      planName: plan.name,
      status: 'active',
      startDate,
      endDate,
      price: plan.price,
      paymentId: paymentResponse?.razorpay_payment_id,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await addDoc(collection(db, 'subscriptions'), subscriptionData);
    return { id: docRef.id, ...subscriptionData };
  } catch (error) {
    throw error;
  }
};

export const initiateSubscription = async (userId, plan, user) => {
  try {
    if (plan.id === 'free') {
      return await createSubscription(userId, plan.id);
    }

    const paymentResponse = await processPayment(plan, user);
    return await createSubscription(userId, plan.id, paymentResponse);
  } catch (error) {
    throw error;
  }
};

export const getUserSubscription = async (userId) => {
  try {
    const q = query(
      collection(db, 'subscriptions'),
      where('userId', '==', userId),
      where('status', '==', 'active')
    );
    
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;

    const subscription = querySnapshot.docs[0].data();
    return { id: querySnapshot.docs[0].id, ...subscription };
  } catch (error) {
    throw error;
  }
};

export const cancelSubscription = async (subscriptionId) => {
  try {
    const subscriptionRef = doc(db, 'subscriptions', subscriptionId);
    await updateDoc(subscriptionRef, {
      status: 'cancelled',
      updatedAt: new Date()
    });
  } catch (error) {
    throw error;
  }
};