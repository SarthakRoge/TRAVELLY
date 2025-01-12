import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithGoogle
} from '../services/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    loading,
    signIn: (email, password) => signInWithEmailAndPassword(auth, email, password),
    signUp: (email, password) => createUserWithEmailAndPassword(auth, email, password),
    signOut: () => signOut(auth),
    signInWithGoogle,
    resetPassword: (email) => sendPasswordResetEmail(auth, email)
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};