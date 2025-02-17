import { loadScript } from '../utils/loadScript';

const RAZORPAY_KEY_ID = "rzp_test_0Ltabc33HbSKio" // Replace with your Razorpay test key

export const initializeRazorpay = async () => {
  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
  if (!res) {
    throw new Error('Razorpay SDK failed to load');
  }
};

export const createRazorpayOrder = async (planDetails) => {
  try {
    // In a real application, you would make an API call to your backend
    // to create a Razorpay order and get the order_id
    const response = await fetch('/api/create-razorpay-order', {
      method: 'POST',
      body: JSON.stringify(planDetails),
    });
    const data = await response.json();
    return data.order_id;
  } catch (error) {
    throw error;
  }
};

export const processPayment = async (planDetails, user) => {
  try {
    await initializeRazorpay();
    
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: planDetails.price * 100, // Razorpay expects amount in paise
      currency: "INR",
      name: "Travelly",
      description: `${planDetails.name} Plan Subscription`,
      handler: async (response) => {
        // Handle successful payment
        return response;
      },
      prefill: {
        email: user.email,
      },
      theme: {
        color: "#00E5BE"
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    return new Promise((resolve, reject) => {
      paymentObject.on('payment.success', resolve);
      paymentObject.on('payment.error', reject);
    });
  } catch (error) {
    throw error;
  }
};