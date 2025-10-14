// Firebase configuration and initialization
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'

// Firebase configuration using environment variables
// These are loaded from .env.local file (not committed to version control)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDfSy3-5_7FEL6i7wtMWXzCkyEFg_4se7c",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "collabcanvas-mvp-53120.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://collabcanvas-mvp-53120-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "collabcanvas-mvp-53120",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "collabcanvas-mvp-53120.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "615952718313",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:615952718313:web:72293228261abb6ea29378",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-S3JS309B81"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const realtimeDb = getDatabase(app)

// Export the app instance
export default app
