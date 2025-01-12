import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import AuthInput from './AuthInput';
import PasswordInput from './PasswordInput';
import AuthButton from './AuthButton';
import RememberMe from './RememberMe';
import SocialLogin from './SocialLogin';
import AuthBackground from './AuthBackground';
import AuthHeader from './AuthHeader';
import CancelButton from './CancelButton';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signIn(email, password);
      toast.success('Successfully signed in!');
      navigate('/');
    } catch (error) {
      toast.error('Email not Registered!!!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success('Successfully signed in with Google!');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative min-h-80  flex items-center justify-center px- py-20">
      <AuthBackground />
      
      <div className="relative w-full max-w-md bg-white/20 backdrop-blur-sm rounded-2xl shadow-xl p-8">
        <CancelButton/>
        <AuthHeader 
          title="Welcome Back!"
          subtitle="Ready for your next adventure? Let's explore and create memories!"
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

          <div className="flex items-center justify-between">
            <RememberMe
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <AuthButton  type="submit" isLoading={isLoading} >
            Sign In
          </AuthButton>
        </form>

        <div className="mt-6">
          <SocialLogin onGoogleSignIn={handleGoogleSignIn} />
        </div>

        <p className="mt-6 text-center text-sm text-white">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;