import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import HomePage from '../pages/HomePage';
import MyTripsPage from '../pages/MyTripsPage';
import BlogPage from '../pages/BlogPage';
import ContactPage from '../pages/ContactPage';
import SignInForm from '../components/auth/SignInForm';
import SignUpForm from '../components/auth/SignUpForm';
import ForgotPassword from '../components/auth/ForgotPassword';
import CreateItineraryPage from '../pages/CreateItineraryPage';
import { AuthProvider } from '../contexts/AuthContext';
import Viewtrip from '../view-trip/[tripId]/Index';


export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'my-trips',
        element: <MyTripsPage />,
      },
      {
        path: 'blog',
        element: <BlogPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'signin',
        element: <SignInForm />,
      },
      {
        path: 'signup',
        element: <SignUpForm />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'create-itinerary',
        element: <CreateItineraryPage />,
      },
      {
        path:'view-trip/:tripId',
        element:<Viewtrip/>
      },
    ],
  },
]);