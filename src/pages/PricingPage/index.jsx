import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes, FaQuestionCircle, FaCrown } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const PricingPage = () => {
  const { user } = useAuth();
  const { userPlan, updateSubscription } = useSubscription();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFaq, setShowFaq] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      badge: null,
      price: 0,
      description: 'Perfect for casual travelers',
      features: [
        'Create up to 5 itineraries',
        'Basic AI recommendations',
        'Email support'
        
      ],
      limitations: [
      
        'No priority support',

        'No exclusive deals'
      ],
      buttonText: 'Get Started',
      buttonColor: 'bg-gray-500 hover:bg-gray-600',
      limit: '5 itineraries'
    },
    {
      id: 'basic',
      name: 'Basic',
      badge: 'Most Popular',
      price: 199,
      description: 'For frequent travelers',
      features: [
        'Create up to 50 itineraries',
        'Advanced AI recommendations',
        'Priority email support'
        
      ],
      limitations: [
        'No personal travel consultant',
        
        'No exclusive deals'
      ],
      buttonText: 'Choose Basic',
      buttonColor: 'bg-primary hover:bg-primary/90',
      limit: '50 itineraries'
    },
    {
      id: 'pro',
      name: 'Pro',
      badge: 'Best Value',
      price: 399,
      description: 'Ultimate travel planning experience',
      features: [
        'Unlimited itineraries',
        'Premium AI recommendations',
        '24/7 VIP support',
        
        'Personal travel consultant',
        'Exclusive deals and discounts'
        
      ],
      limitations: [],
      buttonText: 'Choose Pro',
      buttonColor: 'bg-secondary hover:bg-secondary/90',
      limit: 'Unlimited'
    }
  ];

  const handleSelectPlan = (planId) => {
    if (!user) {
      toast.error('Please sign in to subscribe to a plan');
      navigate('/signin');
      return;
    }

    if (planId === userPlan) {
      toast.info('You are already subscribed to this plan');
      return;
    }

    setSelectedPlan(planId);
    
    if (planId === 'free') {
      // Handle downgrade to free plan
      updateSubscription('free');
      return;
    }

    // Initialize payment
    initializePayment(planId);
  };

  const initializePayment = (planId) => {
    setIsProcessing(true);
    
    // Get the selected plan details
    const plan = plans.find(p => p.id === planId);
    
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    
    script.onload = () => {
      const options = {
        key: 'rzp_test_0Ltabc33HbSKio', // Enter the Key ID generated from the Dashboard
        amount: plan.price * 100, // Amount is in currency subunits. Default currency is INR
        currency: 'INR',
        name: 'Travelly',
        description: `${plan.name} Plan Subscription`,
        image: '/Tlogo.png',
        handler: function (response) {
          // Handle successful payment
          handlePaymentSuccess(response, planId);
        },
        prefill: {
          name: user?.displayName || '',
          email: user?.email || '',
        },
        theme: {
          color: '#00E5BE',
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
            toast.error('Payment cancelled');
          }
        }
      };
      
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    };
    
    script.onerror = () => {
      setIsProcessing(false);
      toast.error('Failed to load payment gateway');
    };
    
    document.body.appendChild(script);
  };

  const handlePaymentSuccess = (response, planId) => {
    // In a real application, you would verify the payment on your server
    // and update the user's subscription in your database
    
    setIsProcessing(false);
    
    // Update the user's subscription
    updateSubscription(planId);
    
    // Navigate to trips page
    setTimeout(() => {
      navigate('/my-trips');
    }, 2000);
  };

  const toggleFaq = () => {
    setShowFaq(!showFaq);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Perfect Plan</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock premium features and create unforgettable travel experiences with our flexible subscription plans.
          </p>
        </div>

        {/* Current Plan Indicator */}
        {user && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-8 text-center">
            <div className="flex items-center justify-center gap-2">
              <FaCrown className="text-yellow-500" />
              <p className="text-gray-700">
                Your current plan: <span className="font-semibold text-primary">{userPlan.charAt(0).toUpperCase() + userPlan.slice(1)}</span>
              </p>
            </div>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 ${
                plan.id === 'basic' ? 'border-2 border-primary md:transform md:scale-105' : ''
              } ${plan.id === 'pro' ? 'border border-secondary' : ''}`}
            >
              {plan.badge && (
                <div className={`absolute top-0 right-0 mt-4 mr-4 px-3 py-1 rounded-full text-xs font-semibold ${
                  plan.id === 'basic' ? 'bg-primary text-white' : 'bg-secondary text-white'
                }`}>
                  {plan.badge}
                </div>
              )}

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">₹{plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                
                <div className="bg-gray-100 px-4 py-2 rounded-lg mb-6">
                  <span className="text-sm font-medium text-gray-700">
                    {plan.limit}
                  </span>
                </div>
                
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <FaCheck className={`w-5 h-5 mr-3 flex-shrink-0 ${
                        plan.id === 'free' ? 'text-gray-500' : 
                        plan.id === 'basic' ? 'text-primary' : 'text-secondary'
                      }`} />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations.map((limitation, index) => (
                    <div key={`limit-${index}`} className="flex items-start">
                      <FaTimes className="w-5 h-5 mr-3 flex-shrink-0 text-gray-400" />
                      <span className="text-gray-500">{limitation}</span>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={isProcessing || (userPlan === plan.id)}
                  className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
                    isProcessing ? 'bg-gray-400 cursor-not-allowed' : 
                    userPlan === plan.id ? 'bg-green-500 hover:bg-green-600' : plan.buttonColor
                  }`}
                >
                  {isProcessing ? 'Processing...' : 
                   userPlan === plan.id ? 'Current Plan' : plan.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-16">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Features
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.id} scope="col" className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Itinerary Limit
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">5</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">50</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">Unlimited</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    AI Recommendations
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">Basic</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">Advanced</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">Premium</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Customer Support
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">Email</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">Priority Email</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">24/7 VIP</td>
                </tr>
              
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Personal Travel Consultant
                  </td>
                  <td className="px-6 py-4 text-center">
                    <FaTimes className="w-5 h-5 mx-auto text-gray-400" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <FaTimes className="w-5 h-5 mx-auto text-gray-400" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <FaCheck className="w-5 h-5 mx-auto text-secondary" />
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Exclusive Deals
                  </td>
                  <td className="px-6 py-4 text-center">
                    <FaTimes className="w-5 h-5 mx-auto text-gray-400" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <FaTimes className="w-5 h-5 mx-auto text-gray-400" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <FaCheck className="w-5 h-5 mx-auto text-secondary" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center cursor-pointer" onClick={toggleFaq}>
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <FaQuestionCircle className="w-6 h-6 text-primary" />
            </div>
            
            {showFaq && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 space-y-6"
              >
                <div>
                  <h3 className="text-lg font- semibold text-gray-900 mb-2">How do I upgrade my plan?</h3>
                  <p className="text-gray-700">
                    Simply select the plan you want to upgrade to and complete the payment process. Your account will be upgraded immediately.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I downgrade my plan?</h3>
                  <p className="text-gray-700">
                    Yes, you can downgrade your plan at any time. Your current plan benefits will remain active until the end of your billing cycle.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
                  <p className="text-gray-700">
                    We accept all major credit and debit cards, UPI, and net banking through our secure payment gateway.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there a refund policy?</h3>
                  <p className="text-gray-700">
                    We offer a 7-day money-back guarantee for all new subscriptions. If you're not satisfied with our service, contact our support team for a full refund.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">What happens if I exceed my itinerary limit?</h3>
                  <p className="text-gray-700">
                    You'll need to upgrade to a higher plan or delete some of your existing itineraries to create new ones.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;