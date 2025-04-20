import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import { LoadScript } from '@react-google-maps/api';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={['places']}
    >
      <AuthProvider>
        <SubscriptionProvider>
          <Toaster position="top-center" />
          <RouterProvider router={router} />
        </SubscriptionProvider>
      </AuthProvider>
    </LoadScript>
  </React.StrictMode>,
);