import { 
  signInWithEmailAndPassword as firebaseSignIn,
  createUserWithEmailAndPassword as firebaseSignUp,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail as firebaseSendPasswordReset
} from 'firebase/auth';
import { auth } from '../config/firebase';

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
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
  firebaseSignIn as signInWithEmailAndPassword,
  firebaseSignUp as createUserWithEmailAndPassword,
  firebaseSignOut as signOut,
  firebaseAuthStateChanged as onAuthStateChanged,
  firebaseSendPasswordReset as sendPasswordResetEmail
};