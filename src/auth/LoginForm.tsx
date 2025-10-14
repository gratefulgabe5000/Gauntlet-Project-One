/**
 * Login Form Component
 *
 * PR2.3: Login Form with Validation and Tailwind Styling
 *
 * A comprehensive authentication form that supports both login and signup modes
 * with real-time validation, error handling, and beautiful Tailwind CSS styling.
 *
 * Tasks Implemented:
 * - 2.3.1: Form structure with React state
 * - 2.3.2: Email and password input fields with Tailwind styling
 * - 2.3.3: Form validation (email format, password length)
 * - 2.3.4: Login/signup mode switching
 * - 2.3.5: Firebase auth integration
 */

import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useAuth } from './AuthContext';

// ============================================================================
// Task 2.3.1: Form Structure with React State
// ============================================================================

/**
 * Form Mode Type
 */
type FormMode = 'login' | 'signup';

/**
 * Form Data Interface
 */
interface FormData {
  email: string;
  password: string;
  displayName?: string;
}

/**
 * Validation Errors Interface
 */
interface ValidationErrors {
  email?: string | undefined;
  password?: string | undefined;
  displayName?: string | undefined;
}

/**
 * Login Form Component
 *
 * Provides UI for user authentication with email/password
 * Supports both login and signup modes with form validation
 */
const LoginForm = () => {
  // Get auth context
  const { login, signup, loading, error, clearError } = useAuth();

  // Task 2.3.4: Login/signup mode state
  const [mode, setMode] = useState<FormMode>('login');

  // Form data state
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    displayName: '',
  });

  // Task 2.3.3: Validation errors state
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // Local loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ============================================================================
  // Task 2.3.3: Form Validation Functions
  // ============================================================================

  /**
   * Validate Email Format
   *
   * Uses regex to check if email is in valid format
   * @param email - Email address to validate
   * @returns Error message if invalid, undefined if valid
   */
  const validateEmail = (email: string): string | undefined => {
    if (!email) {
      return 'Email is required';
    }

    // Basic email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }

    return undefined;
  };

  /**
   * Validate Password Length
   *
   * Checks if password meets minimum length requirement
   * @param password - Password to validate
   * @returns Error message if invalid, undefined if valid
   */
  const validatePassword = (password: string): string | undefined => {
    if (!password) {
      return 'Password is required';
    }

    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }

    return undefined;
  };

  /**
   * Validate Display Name (Signup Only)
   *
   * Checks if display name is provided for signup
   * @param displayName - Display name to validate
   * @returns Error message if invalid, undefined if valid
   */
  const validateDisplayName = (displayName: string): string | undefined => {
    if (mode === 'signup' && !displayName) {
      return 'Display name is required';
    }

    return undefined;
  };

  /**
   * Validate Entire Form
   *
   * Runs all validation checks and returns validation result
   * @returns Object with isValid boolean and errors object
   */
  const validateForm = (): { isValid: boolean; errors: ValidationErrors } => {
    const errors: ValidationErrors = {
      email: validateEmail(formData.email) || undefined,
      password: validatePassword(formData.password) || undefined,
      displayName: undefined,
    };

    // Add display name validation for signup mode
    if (mode === 'signup') {
      errors.displayName = validateDisplayName(formData.displayName || '') || undefined;
    }

    // Check if form is valid (no error messages)
    const isValid = !errors.email && !errors.password && (mode === 'login' || !errors.displayName);

    return { isValid, errors };
  };

  // ============================================================================
  // Form Event Handlers
  // ============================================================================

  /**
   * Handle Input Change
   *
   * Updates form data and clears validation errors for the field
   * @param e - Change event from input element
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear validation error for this field
    setValidationErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));

    // Clear auth error when user starts typing
    if (error) {
      clearError();
    }
  };

  /**
   * Task 2.3.4: Toggle Between Login and Signup
   *
   * Switches between login and signup modes
   * Clears form data and errors when switching
   */
  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'signup' : 'login'));
    setFormData({ email: '', password: '', displayName: '' });
    setValidationErrors({});
    clearError();
  };

  // ============================================================================
  // PR2.7.1: Auto-dismiss Authentication Errors
  // ============================================================================

  /**
   * Auto-dismiss error messages after 10 seconds
   * Improves UX by not leaving stale error messages
   */
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 10000); // Auto-dismiss after 10 seconds

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [error, clearError]);

  /**
   * Task 2.3.5: Handle Form Submission
   *
   * Validates form and calls appropriate auth function
   * @param e - Form submit event
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    const { isValid, errors } = validateForm();

    if (!isValid) {
      setValidationErrors(errors);
      return;
    }

    // Set submitting state
    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        // Login with email and password
        await login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        // Signup with email, password, and display name
        await signup({
          email: formData.email,
          password: formData.password,
          displayName: formData.displayName || '',
        });
      }

      // Success! Auth context will handle state update
      console.log(`✅ ${mode === 'login' ? 'Login' : 'Signup'} successful`);
    } catch (err) {
      // Error is handled by auth context
      console.error(`❌ ${mode === 'login' ? 'Login' : 'Signup'} failed:`, err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================================================
  // Task 2.3.2: Render Form with Tailwind Styling
  // ============================================================================

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Form Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-600">
            {mode === 'login'
              ? 'Sign in to access CollabCanvas'
              : 'Join CollabCanvas and start collaborating'}
          </p>
        </div>

        {/* Auth Error Message - PR2.7.1: Enhanced with dismiss button */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={clearError}
                className="flex-shrink-0 ml-4 inline-flex text-red-400 hover:text-red-600 focus:outline-none transition-colors"
                aria-label="Dismiss error"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Login/Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Display Name Field (Signup Only) */}
          {mode === 'signup' && (
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
                Display Name
              </label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  validationErrors.displayName
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                } focus:outline-none focus:ring-2 transition-colors`}
                placeholder="Enter your name"
                disabled={loading || isSubmitting}
              />
              {validationErrors.displayName && (
                <p className="mt-2 text-sm text-red-600">{validationErrors.displayName}</p>
              )}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                validationErrors.email
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
              } focus:outline-none focus:ring-2 transition-colors`}
              placeholder="you@example.com"
              disabled={loading || isSubmitting}
              autoComplete="email"
            />
            {validationErrors.email && (
              <p className="mt-2 text-sm text-red-600">{validationErrors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                validationErrors.password
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
              } focus:outline-none focus:ring-2 transition-colors`}
              placeholder={mode === 'signup' ? 'Create a password (min 6 characters)' : 'Enter your password'}
              disabled={loading || isSubmitting}
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            />
            {validationErrors.password && (
              <p className="mt-2 text-sm text-red-600">{validationErrors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || isSubmitting}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading || isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                {mode === 'login' ? 'Signing in...' : 'Creating account...'}
              </span>
            ) : (
              <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
            )}
          </button>
        </form>

        {/* Task 2.3.4: Mode Toggle Button */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={toggleMode}
              disabled={loading || isSubmitting}
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {/* MVP Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-center text-gray-500">
            CollabCanvas MVP • Real-time Collaborative Whiteboard
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
