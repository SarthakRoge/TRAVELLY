import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaCrown, FaSpinner } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { subscriptionPlans, initiateSubscription, getUserSubscription, cancelSubscription } from '../../services/subscription';

const SubscriptionPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [processingSubscription, setProcessingSubscription] = useState(false);

  useEffect(() => {
    if (user) {
      loadUserSubscription();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadUserSubscription = async () => {
    try {
      const subscription = await getUserSubscription(user.uid);
      setCurrentSubscription(subscription);
    } catch (error) {
      console.error('Error loading subscription:', error);
      toast.error('Failed to load subscription details');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (plan) => {
    if (!user) {
      toast.error('Please sign in to subscribe');
      navigate('/signin');
      return;
    }

    setProcessingSubscription(true);
    try {
      await initiateSubscription(user.uid, plan, user);
      await loadUserSubscription();
      toast.success(`Successfully subscribed to ${plan.name} plan!`);
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Failed to process subscription');
    } finally {
      setProcessingSubscription(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!currentSubscription) return;

    if (window.confirm('Are you sure you want to cancel your subscription?')) {
      try {
        await cancelSubscription(currentSubscription.id);
        toast.success('Subscription cancelled successfully');
        await loadUserSubscription();
      } catch (error) {
        console.error('Error cancelling subscription:', error);
        toast.error('Failed to cancel subscription');
      }
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-12 min-h-screen flex items-center justify-center">
        <FaSpinner className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Travel Plan
          </h1>
          <p className="text-xl text-gray-600">
            Unlock premium features to enhance your travel planning experience
          </p>
          {currentSubscription && (
            <div className="mt-4 p-4 bg-primary/10 rounded-lg inline-block">
              <p className="text-gray-800">
                Current Plan: <span className="font-bold">{currentSubscription.planName}</span>
                {' • '}
                Valid until: {new Date(currentSubscription.endDate.seconds * 1000).toLocaleDateString()}
              </p>
              {currentSubscription.planId !== 'free' && (
                <button
                  onClick={handleCancelSubscription}
                  className="mt-2 text-red-500 hover:text-red-600 font-medium"
                >
                  Cancel Subscription
                </button>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subscriptionPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                relative bg-white rounded-2xl shadow-lg overflow-hidden
                ${plan.id === 'pro' ? 'ring-2 ring-primary' : ''}
              `}
            >
              {plan.id === 'pro' && (
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  {plan.id === 'pro' && <FaCrown className="text-primary w-6 h-6" />}
                </div>

                <div className="mb-6">
                  {plan.price === 0 ? (
                    <span className="text-4xl font-bold text-gray-900">Free</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-gray-900">
                        ₹{plan.price}
                      </span>
                      <span className="text-gray-600">/month</span>
                    </>
                  )}
                </div>

                <p className="text-gray-600 mb-6">{plan.description}</p>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FaCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSubscribe(plan)}
                  disabled={processingSubscription || (currentSubscription?.planId === plan.id)}
                  className={`
                    w-full py-3 rounded-lg font-semibold transition-colors
                    ${currentSubscription?.planId === plan.id
                      ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                      : plan.id === 'pro'
                        ? 'bg-primary text-white hover:bg-primary/90'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }
                  `}
                >
                  {processingSubscription ? (
                    <FaSpinner className="w-5 h-5 animate-spin mx-auto" />
                  ) : currentSubscription?.planId === plan.id ? (
                    'Current Plan'
                  ) : (
                    `Choose ${plan.name}`
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-600">
          <p>All paid plans include:</p>
          <div className="flex flex-wrap justify-center gap-8 mt-4">
            <div>✓ 14-day money-back guarantee</div>
            <div>✓ 24/7 customer support</div>
            <div>✓ Secure payments via Razorpay</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;