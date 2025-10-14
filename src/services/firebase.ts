// Firebase configuration and initialization
import { initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
  type User as FirebaseUser,
} from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'
import type { LoginCredentials, SignupData, User } from './types'

// Firebase configuration using environment variables
// These are loaded from .env.local file (not committed to version control)
const firebaseConfig = {
  apiKey: import.meta.env['VITE_FIREBASE_API_KEY'] || "AIzaSyDfSy3-5_7FEL6i7wtMWXzCkyEFg_4se7c",
  authDomain: import.meta.env['VITE_FIREBASE_AUTH_DOMAIN'] || "collabcanvas-mvp-53120.firebaseapp.com",
  databaseURL: import.meta.env['VITE_FIREBASE_DATABASE_URL'] || "https://collabcanvas-mvp-53120-default-rtdb.firebaseio.com",
  projectId: import.meta.env['VITE_FIREBASE_PROJECT_ID'] || "collabcanvas-mvp-53120",
  storageBucket: import.meta.env['VITE_FIREBASE_STORAGE_BUCKET'] || "collabcanvas-mvp-53120.firebasestorage.app",
  messagingSenderId: import.meta.env['VITE_FIREBASE_MESSAGING_SENDER_ID'] || "615952718313",
  appId: import.meta.env['VITE_FIREBASE_APP_ID'] || "1:615952718313:web:72293228261abb6ea29378",
  measurementId: import.meta.env['VITE_FIREBASE_MEASUREMENT_ID'] || "G-S3JS309B81"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const realtimeDb = getDatabase(app)

// ============================================================================
// Authentication Utility Functions (PR2.1.5)
// ============================================================================

/**
 * Convert Firebase User to our User type
 *
 * Maps Firebase Auth User to our simplified User interface
 */
export const mapFirebaseUser = (firebaseUser: FirebaseUser): User => {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    emailVerified: firebaseUser.emailVerified,
    createdAt: firebaseUser.metadata.creationTime,
  };
};

/**
 * Sign Up with Email and Password
 *
 * Creates a new user account with email and password
 * Optionally sets display name if provided
 *
 * @param signupData - Email, password, and optional display name
 * @returns Promise<User> - The created user
 * @throws Error if signup fails
 */
export const signUpWithEmail = async (signupData: SignupData): Promise<User> => {
  try {
    const { email, password, displayName } = signupData;

    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Update profile with display name if provided
    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
    }

    // Return mapped user
    return mapFirebaseUser(userCredential.user);
  } catch (error: any) {
    console.error('❌ Signup failed:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

/**
 * Sign In with Email and Password
 *
 * Authenticates an existing user with email and password
 *
 * @param credentials - Email and password
 * @returns Promise<User> - The authenticated user
 * @throws Error if login fails
 */
export const signInWithEmail = async (credentials: LoginCredentials): Promise<User> => {
  try {
    const { email, password } = credentials;

    // Sign in with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // Return mapped user
    return mapFirebaseUser(userCredential.user);
  } catch (error: any) {
    console.error('❌ Login failed:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

/**
 * Sign Out
 *
 * Signs out the current user
 *
 * @returns Promise<void>
 * @throws Error if sign out fails
 */
export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
    console.log('✅ User signed out successfully');
  } catch (error: any) {
    console.error('❌ Sign out failed:', error);
    throw new Error('Failed to sign out. Please try again.');
  }
};

/**
 * Get User-Friendly Error Message
 *
 * Converts Firebase error codes to user-friendly messages
 *
 * @param errorCode - Firebase error code
 * @returns User-friendly error message
 */
const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please sign in instead.';
    case 'auth/invalid-email':
      return 'Invalid email address. Please check and try again.';
    case 'auth/operation-not-allowed':
      return 'Email/password accounts are not enabled. Please contact support.';
    case 'auth/weak-password':
      return 'Password is too weak. Please use at least 6 characters.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/user-not-found':
      return 'No account found with this email. Please sign up first.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection and try again.';
    default:
      return 'Authentication failed. Please try again.';
  }
};

// Export the app instance
export default app
