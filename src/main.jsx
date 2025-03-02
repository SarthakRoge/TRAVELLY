import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';
import { SubscriptionProvider } from './contexts/SubscriptionContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <SubscriptionProvider>
        <Toaster position="top-center" />
        <RouterProvider router={router} />
      </SubscriptionProvider>
    </AuthProvider>
  </React.StrictMode>,
);