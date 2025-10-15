/**
 * Error Message Utilities
 *
 * PR6.3.2: User-friendly error messages for common failures
 *
 * Converts technical error messages into user-friendly descriptions
 */

/**
 * Get user-friendly error message for common Firebase/Firestore errors
 */
export function getFriendlyErrorMessage(error: unknown): string {
  if (!error) return 'An unknown error occurred';

  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorCode = (error as any)?.code;

  // Firebase Authentication Errors
  if (errorCode) {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email address';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again';
      case 'auth/email-already-in-use':
        return 'This email is already registered';
      case 'auth/weak-password':
        return 'Password is too weak. Use at least 6 characters';
      case 'auth/invalid-email':
        return 'Please enter a valid email address';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later';

      // Firestore Errors
      case 'permission-denied':
        return 'You don\'t have permission to perform this action';
      case 'unavailable':
        return 'Service temporarily unavailable. Please try again';
      case 'deadline-exceeded':
        return 'Request timed out. Please try again';
      case 'not-found':
        return 'The requested resource was not found';

      // Realtime Database Errors
      case 'PERMISSION_DENIED':
        return 'You don\'t have permission to access this data';
      case 'NETWORK_ERROR':
        return 'Network error. Please check your connection';
    }
  }

  // Generic error message parsing
  if (errorMessage.toLowerCase().includes('network')) {
    return 'Network connection problem. Please check your internet';
  }
  if (errorMessage.toLowerCase().includes('permission')) {
    return 'You don\'t have permission to perform this action';
  }
  if (errorMessage.toLowerCase().includes('timeout')) {
    return 'Request timed out. Please try again';
  }
  if (errorMessage.toLowerCase().includes('not found')) {
    return 'Resource not found';
  }

  // Return original message if no friendly version found
  return errorMessage;
}

/**
 * Get user-friendly success messages for common actions
 */
export function getSuccessMessage(action: string): string {
  switch (action) {
    case 'shape-created':
      return 'Rectangle created successfully!';
    case 'shape-deleted':
      return 'Rectangle deleted';
    case 'shape-updated':
      return 'Rectangle updated';
    case 'login':
      return 'Welcome back!';
    case 'signup':
      return 'Account created successfully!';
    case 'logout':
      return 'Logged out successfully';
    default:
      return 'Action completed successfully';
  }
}
