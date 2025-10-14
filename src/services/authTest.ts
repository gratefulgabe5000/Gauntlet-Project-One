/**
 * Firebase Auth Connection Test
 *
 * This file can be imported in the browser console to test Firebase Auth
 *
 * Usage in browser console:
 * 1. Open browser DevTools (F12)
 * 2. Navigate to Console tab
 * 3. The auth object should be available
 * 4. Check: auth.app.name should be "[DEFAULT]"
 * 5. Check: auth.config should show auth configuration
 */

import { auth } from './firebase';

// Test function to verify auth is working
export const testAuthConnection = () => {
  console.log('🔍 Testing Firebase Auth Connection...');

  if (!auth) {
    console.error('❌ Firebase Auth not initialized!');
    return false;
  }

  console.log('✅ Firebase Auth initialized successfully');
  console.log('📋 Auth Config:', {
    appName: auth.app.name,
    authDomain: auth.config.authDomain,
    apiKey: auth.config.apiKey ? '✓ Present' : '✗ Missing',
  });

  console.log('🔐 Current User:', auth.currentUser || 'No user logged in');

  return true;
};

// Auto-run test when imported
if (import.meta.env.DEV) {
  console.log('🚀 Firebase Auth Test Module Loaded');
  console.log('💡 Run testAuthConnection() to verify auth setup');
}

export default auth;
