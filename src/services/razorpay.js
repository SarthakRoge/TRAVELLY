import { loadScript } from '../utils/loadScript';

const RAZORPAYX_KEY_ID = "rzp_test_0Ltabc33HbSKio"; // Replace with your RazorpayX test key

export const initializeRazorpayX = async () => {
  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
  if (!res) {
    throw new Error('RazorpayX SDK failed to load');
  }
};

export const createRazorpayXOrder = async (planDetails) => {
  try {
    const response = await fetch('/api/create-razorpayx-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(planDetails),
    });
    const data = await response.json();
    return data.order_id;
  } catch (error) {
    console.error('Error creating RazorpayX order:', error);
    throw error;
  }
};

export const processRazorpayXPayment = async (planDetails, user) => {
  try {
    await initializeRazorpayX();

    const orderId = await createRazorpayXOrder(planDetails);

    const options = {
      key: RAZORPAYX_KEY_ID,
      amount: planDetails.price * 100,
      currency: "INR",
      name: "TripItry",
      description: `${planDetails.name} Plan Subscription`,
      order_id: orderId,
      handler: async (response) => {
        return response;
      },
      prefill: {
        email: user.email,
      },
      theme: {
        color: "#00E5BE",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    return new Promise((resolve, reject) => {
      paymentObject.on('payment.success', resolve);
      paymentObject.on('payment.error', reject);
    });
  } catch (error) {
    console.error('Error processing RazorpayX payment:', error);
    throw error;
  }
};