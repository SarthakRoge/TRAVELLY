import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import AuthCard from './AuthCard';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';
import CancelButton from './CancelButton';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await resetPassword(email);
      toast.success('Password reset email sent!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard title="Reset Password">
      <CancelButton/>
      <p className="text-center text-gray-950 mb-6">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <AuthInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <AuthButton type="submit" isLoading={isLoading}>
          Send Reset Link
        </AuthButton>
      </form>

      <p className="mt-6 text-center text-sm text-white">
        Remember your password?{' '}
        <Link
          to="/signin"
          className="font-medium text-primary hover:text-primary/90 transition-colors"
        >
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
};

export default ForgotPassword;