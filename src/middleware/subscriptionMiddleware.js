import { checkSubscription, getCurrentPlan, canCreateItinerary } from '../services/subscription';
import { toast } from 'react-hot-toast';

// Middleware to check if user has access to a feature based on their subscription
export const checkFeatureAccess = async (userId, featureName) => {
  try {
    if (!userId) {
      return {
        hasAccess: false,
        message: 'Please sign in to access this feature'
      };
    }
    
    const subscription = await checkSubscription(userId);
    
    // Define feature access by plan
    const featureAccess = {
      'create-itinerary': ['free', 'basic', 'pro'],
      'offline-access': ['basic', 'pro'],
      'premium-templates': ['basic', 'pro'],
      'personal-consultant': ['pro'],
      'exclusive-deals': ['pro'],
      'unlimited-itineraries': ['pro']
    };
    
    const hasAccess = featureAccess[featureName]?.includes(subscription.planId) || false;
    
    return {
      hasAccess,
      currentPlan: subscription.planId,
      message: hasAccess ? 
        'Access granted' : 
        `This feature is only available on ${getRequiredPlanName(featureAccess[featureName])} plans`
    };
  } catch (error) {
    console.error('Error checking feature access:', error);
    return {
      hasAccess: false,
      message: 'Error checking access. Please try again.'
    };
  }
};

// Helper function to get the required plan name
const getRequiredPlanName = (plans) => {
  if (!plans || plans.length === 0) return 'higher';
  
  if (plans.includes('pro')) {
    return 'Pro';
  } else if (plans.includes('basic')) {
    return 'Basic or Pro';
  } else {
    return 'paid';
  }
};

// Middleware to check if user can create a new itinerary
export const checkItineraryCreation = async (userId) => {
  try {
    if (!userId) {
      return {
        canCreate: false,
        message: 'Please sign in to create an itinerary'
      };
    }
    
    const result = await canCreateItinerary(userId);
    
    return {
      ...result,
      message: result.canCreate ? 
        'You can create a new itinerary' : 
        `You've reached your limit of ${result.maxCount} itineraries. Please upgrade your plan to create more.`
    };
  } catch (error) {
    console.error('Error checking itinerary creation:', error);
    return {
      canCreate: false,
      message: 'Error checking itinerary limit. Please try again.'
    };
  }
};

// Higher-order component to protect routes based on subscription
export const withSubscriptionCheck = (WrappedComponent, requiredFeature) => {
  return (props) => {
    const { user, navigate } = props;
    
    const checkAccess = async () => {
      const access = await checkFeatureAccess(user?.uid, requiredFeature);
      
      if (!access.hasAccess) {
        toast.error(access.message);
        navigate('/pricing');
        return false;
      }
      
      return true;
    };
    
    // Check access when component mounts
    React.useEffect(() => {
      checkAccess();
    }, [user]);
    
    return <WrappedComponent {...props} />;
  };
};