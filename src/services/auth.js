import { 
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../config/firebase';

const googleProvider = new GoogleAuthProvider();
// Add scopes for additional Google features
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');
// Set custom parameters
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // Get the Google OAuth access token
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;
    return user;
  } catch (error) {
    // Handle specific Google Sign In errors
    if (error.code === 'auth/popup-blocked') {
      throw new Error('Please enable popups for this website to sign in with Google');
    }
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Google sign in was cancelled');
    }
    throw error;
  }
};

export {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
};