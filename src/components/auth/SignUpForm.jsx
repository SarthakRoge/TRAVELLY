import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import AuthInput from './AuthInput';
import PasswordInput from './PasswordInput';
import AuthButton from './AuthButton';
import AuthBackground from './AuthBackground';
import AuthHeader from './AuthHeader';
import CancelButton from './CancelButton';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    setIsLoading(true);
    try {
      await signUp(email, password);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-20">
      <AuthBackground />
      
      <div className="relative w-full max-w-md bg-white/20 backdrop-blur-sm rounded-2xl shadow-xl p-8">
        <CancelButton/>
        <AuthHeader 
          title="Register Now!"
          subtitle="Join us today and start planning your perfect journey!"
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          <AuthInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <PasswordInput
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <PasswordInput
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <AuthButton type="submit" isLoading={isLoading}>
            Sign Up
          </AuthButton>
        </form>

        <p className="mt-6 text-center text-sm text-white">
          Already have an account?{' '}
          <Link
            to="/signin"
            className="font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;