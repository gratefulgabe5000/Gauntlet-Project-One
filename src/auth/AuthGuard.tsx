/**
 * Authentication Guard Component
 *
 * PR2.4: Authentication Guard for Protected Routes
 *
 * A wrapper component that protects routes/components by requiring authentication.
 * Shows LoginForm for unauthenticated users and a loading spinner during auth check.
 *
 * Tasks Implemented:
 * - 2.4.1: Create AuthGuard wrapper component
 * - 2.4.2: Conditional rendering (LoginForm if not authenticated)
 * - 2.4.3: Loading spinner during auth initialization
 */

import { type ReactNode } from 'react';
import { useAuth } from './AuthContext';
import LoginForm from './LoginForm';

// ============================================================================
// Task 2.4.1: Create AuthGuard Wrapper Component
// ============================================================================

/**
 * AuthGuard Props
 */
interface AuthGuardProps {
  /** Child components to render when authenticated */
  children: ReactNode;
}

/**
 * Authentication Guard Component
 *
 * Protects routes/components by requiring authentication.
 * Automatically handles three states:
 * 1. Loading: Shows spinner while checking auth status
 * 2. Unauthenticated: Shows LoginForm
 * 3. Authenticated: Shows protected content (children)
 *
 * @param props - Component props with children
 * @returns Protected content, login form, or loading spinner
 *
 * @example
 * ```tsx
 * <AuthGuard>
 *   <Canvas />  // Only shown when user is authenticated
 * </AuthGuard>
 * ```
 */
const AuthGuard = ({ children }: AuthGuardProps) => {
  // Get authentication state from context
  const { user, loading } = useAuth();

  // ============================================================================
  // Task 2.4.3: Display Loading Spinner During Auth Check
  // PR2.7.2: Verified - Loading state is user-friendly with spinner and text
  // ============================================================================

  /**
   * Loading State
   *
   * Shows a centered loading spinner while Firebase checks authentication status.
   * This prevents showing the login form briefly before detecting existing sessions.
   *
   * PR2.7.2: Enhanced UX with:
   * - Animated spinner matching app color scheme
   * - Descriptive loading text
   * - Matching gradient background for consistency
   */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          {/* Animated Loading Spinner */}
          <div className="inline-block">
            <svg
              className="animate-spin h-12 w-12 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>

          {/* Loading Text */}
          <p className="mt-4 text-lg font-medium text-gray-700">Loading CollabCanvas...</p>
          <p className="mt-2 text-sm text-gray-500">Checking authentication status</p>
        </div>
      </div>
    );
  }

  // ============================================================================
  // Task 2.4.2: Conditional Rendering Based on Auth Status
  // ============================================================================

  /**
   * Unauthenticated State
   *
   * If no user is logged in, show the LoginForm component.
   * User must authenticate before accessing protected content.
   */
  if (!user) {
    console.log('🔒 User not authenticated - showing LoginForm');
    return <LoginForm />;
  }

  /**
   * Authenticated State
   *
   * User is logged in - render the protected content (children).
   * This is typically the main application canvas or dashboard.
   */
  console.log('✅ User authenticated - showing protected content');
  return <>{children}</>;
};

export default AuthGuard;
