/**
 * Authentication Context
 *
 * PR2.2: Authentication Context and State Management
 *
 * This file provides a React Context for managing authentication state
 * across the entire application. It handles user login, logout, and
 * session persistence using Firebase Auth.
 *
 * Tasks Implemented:
 * - 2.2.1: React Context setup
 * - 2.2.2: AuthProvider component with state management
 * - 2.2.3: onAuthStateChanged listener for persistence
 * - 2.2.4: useAuth() custom hook
 * - 2.2.5: Loading state handling during auth initialization
 */

import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { auth, mapFirebaseUser, signInWithEmail, signOut, signUpWithEmail } from '../services/firebase';
import type { AuthState, LoginCredentials, SignupData, User } from '../services/types';

// ============================================================================
// Task 2.2.1: React Context Setup
// ============================================================================

/**
 * Authentication Context Type
 *
 * Defines the shape of the authentication context
 */
interface AuthContextType {
  /** Current authenticated user (null if not logged in) */
  user: User | null;

  /** Loading state during auth operations */
  loading: boolean;

  /** Error message if auth operation fails */
  error: string | null;

  /** Sign up a new user with email and password */
  signup: (data: SignupData) => Promise<void>;

  /** Sign in an existing user with email and password */
  login: (credentials: LoginCredentials) => Promise<void>;

  /** Sign out the current user */
  logout: () => Promise<void>;

  /** Clear any error messages */
  clearError: () => void;
}

/**
 * Create Authentication Context
 *
 * This context will be consumed by components throughout the app
 * to access authentication state and functions
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================================================
// Task 2.2.2: AuthProvider Component with State Management
// ============================================================================

/**
 * Authentication Provider Props
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Authentication Provider Component
 *
 * Wraps the application and provides authentication state and methods
 * to all child components via Context API
 *
 * @param props - Component props with children
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Authentication state
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true, // Start with loading true during initial auth check
    error: null,
  });

  // ============================================================================
  // Task 2.2.3: onAuthStateChanged Listener for Persistence
  // ============================================================================

  /**
   * Set up Firebase Auth State Listener
   *
   * This effect runs once on mount and sets up a listener that:
   * 1. Automatically detects when user logs in/out
   * 2. Persists user sessions across page refreshes
   * 3. Updates the auth state whenever auth status changes
   */
  useEffect(() => {
    console.log('🔍 [PR2.2.3] Setting up auth state listener...');

    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        if (firebaseUser) {
          // User is signed in
          console.log('✅ User authenticated:', firebaseUser.email);
          const user = mapFirebaseUser(firebaseUser);
          setAuthState({
            user,
            loading: false,
            error: null,
          });
        } else {
          // User is signed out
          console.log('ℹ️ No user authenticated');
          setAuthState({
            user: null,
            loading: false,
            error: null,
          });
        }
      },
      (error) => {
        // Error occurred during auth state check
        console.error('❌ Auth state error:', error);
        setAuthState({
          user: null,
          loading: false,
          error: error.message,
        });
      }
    );

    // Cleanup: unsubscribe when component unmounts
    return () => {
      console.log('🔄 Cleaning up auth state listener');
      unsubscribe();
    };
  }, []); // Empty dependency array = run once on mount

  // ============================================================================
  // Authentication Methods
  // ============================================================================

  /**
   * Sign Up Function
   *
   * Creates a new user account with email, password, and optional display name
   * Updates auth state on success, sets error on failure
   */
  const signup = async (data: SignupData): Promise<void> => {
    try {
      // Set loading state
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));

      console.log('📝 Signing up user:', data.email);

      // Call Firebase signup utility
      await signUpWithEmail(data);

      // Auth state will be updated by onAuthStateChanged listener
      console.log('✅ Signup successful');
    } catch (error: any) {
      console.error('❌ Signup error:', error);

      // Set error state
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: error.message || 'Signup failed. Please try again.',
      }));

      // Re-throw error so calling component can handle it
      throw error;
    }
  };

  /**
   * Login Function
   *
   * Authenticates an existing user with email and password
   * Updates auth state on success, sets error on failure
   */
  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      // Set loading state
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));

      console.log('🔐 Logging in user:', credentials.email);

      // Call Firebase login utility
      await signInWithEmail(credentials);

      // Auth state will be updated by onAuthStateChanged listener
      console.log('✅ Login successful');
    } catch (error: any) {
      console.error('❌ Login error:', error);

      // Set error state
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: error.message || 'Login failed. Please try again.',
      }));

      // Re-throw error so calling component can handle it
      throw error;
    }
  };

  /**
   * Logout Function
   *
   * Signs out the current user
   * Updates auth state to null, clears any errors
   */
  const logout = async (): Promise<void> => {
    try {
      // Set loading state
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));

      console.log('👋 Logging out user...');

      // Call Firebase logout utility
      await signOut();

      // Auth state will be updated by onAuthStateChanged listener
      console.log('✅ Logout successful');
    } catch (error: any) {
      console.error('❌ Logout error:', error);

      // Set error state
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: error.message || 'Logout failed. Please try again.',
      }));

      // Re-throw error so calling component can handle it
      throw error;
    }
  };

  /**
   * Clear Error Function
   *
   * Resets the error state to null
   * Useful for dismissing error messages
   */
  const clearError = (): void => {
    setAuthState((prev) => ({ ...prev, error: null }));
  };

  // ============================================================================
  // Task 2.2.5: Loading State Handling
  // ============================================================================

  /**
   * Context Value
   *
   * Combines auth state and methods into a single context value
   * Includes loading state for auth initialization
   */
  const value: AuthContextType = {
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    signup,
    login,
    logout,
    clearError,
  };

  // Provide the context value to all children
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ============================================================================
// Task 2.2.4: Custom Hook for Consuming Context
// ============================================================================

/**
 * useAuth Hook
 *
 * Custom hook to access authentication context
 * Provides easy access to auth state and methods from any component
 *
 * @returns AuthContextType - Authentication context value
 * @throws Error if used outside of AuthProvider
 *
 * @example
 * ```tsx
 * const { user, loading, login, logout } = useAuth();
 *
 * if (loading) return <div>Loading...</div>;
 * if (!user) return <LoginForm />;
 * return <div>Welcome, {user.displayName}!</div>;
 * ```
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  // Ensure hook is used within AuthProvider
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

/**
 * Export AuthContext for advanced use cases
 * (Usually you should use useAuth() hook instead)
 */
export default AuthContext;
