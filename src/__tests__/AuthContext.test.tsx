/**
 * AuthContext Tests
 *
 * PR2.6.1: Test authentication context and state management
 *
 * Tests:
 * - AuthProvider initialization
 * - useAuth hook functionality
 * - Auth state updates (login/logout)
 * - Loading states
 * - Error handling
 */

import { render, screen, waitFor } from '@testing-library/react';
import type { User as FirebaseUser } from 'firebase/auth';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthProvider, useAuth } from '../auth/AuthContext';

// Mock Firebase auth module
vi.mock('../services/firebase', () => ({
  mapFirebaseUser: vi.fn((firebaseUser: FirebaseUser) => ({
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    emailVerified: firebaseUser.emailVerified,
  })),
  signUpWithEmail: vi.fn(),
  signInWithEmail: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn((_auth, callback) => {
    // Simulate immediate callback with null user (not logged in)
    setTimeout(() => callback(null), 0);
    // Return unsubscribe function
    return () => {};
  }),
}));

// Test component that uses useAuth
const TestComponent = () => {
  const { user, loading, error } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (user) return <div>User: {user.email}</div>;
  return <div>No user</div>;
};

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ============================================================================
  // Test 1: AuthProvider Renders Children
  // ============================================================================
  it('should render children when wrapped in AuthProvider', () => {
    render(
      <AuthProvider>
        <div>Test Child</div>
      </AuthProvider>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  // ============================================================================
  // Test 2: Initial Loading State
  // ============================================================================
  it('should start with loading state as true', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Initially should show loading
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  // ============================================================================
  // Test 3: Transitions to No User State
  // ============================================================================
  it('should transition from loading to no user state', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Wait for auth state to resolve
    await waitFor(() => {
      expect(screen.getByText('No user')).toBeInTheDocument();
    });

    // Loading should be gone
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  // ============================================================================
  // Test 4: useAuth Hook Outside Provider
  // ============================================================================
  it('should throw error when useAuth is used outside AuthProvider', () => {
    // Suppress console.error for this test
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useAuth must be used within an AuthProvider');

    consoleError.mockRestore();
  });

  // ============================================================================
  // Test 5: Auth Context Values
  // ============================================================================
  it('should provide auth context values', async () => {
    const TestContextValues = () => {
      const { user, loading, error, signup, login, logout, clearError } = useAuth();

      return (
        <div>
          <div>Loading: {loading ? 'true' : 'false'}</div>
          <div>User: {user ? user.email : 'null'}</div>
          <div>Error: {error || 'null'}</div>
          <div>Has signup: {typeof signup === 'function' ? 'true' : 'false'}</div>
          <div>Has login: {typeof login === 'function' ? 'true' : 'false'}</div>
          <div>Has logout: {typeof logout === 'function' ? 'true' : 'false'}</div>
          <div>Has clearError: {typeof clearError === 'function' ? 'true' : 'false'}</div>
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestContextValues />
      </AuthProvider>
    );

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText('Loading: false')).toBeInTheDocument();
    });

    // Check all context values are provided
    expect(screen.getByText('User: null')).toBeInTheDocument();
    expect(screen.getByText('Error: null')).toBeInTheDocument();
    expect(screen.getByText('Has signup: true')).toBeInTheDocument();
    expect(screen.getByText('Has login: true')).toBeInTheDocument();
    expect(screen.getByText('Has logout: true')).toBeInTheDocument();
    expect(screen.getByText('Has clearError: true')).toBeInTheDocument();
  });

  // ============================================================================
  // Test 6: Multiple Components Share Same Context
  // ============================================================================
  it('should share auth state across multiple components', async () => {
    const ComponentA = () => {
      const { loading } = useAuth();
      return <div>Component A Loading: {loading ? 'true' : 'false'}</div>;
    };

    const ComponentB = () => {
      const { loading } = useAuth();
      return <div>Component B Loading: {loading ? 'true' : 'false'}</div>;
    };

    render(
      <AuthProvider>
        <ComponentA />
        <ComponentB />
      </AuthProvider>
    );

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText('Component A Loading: false')).toBeInTheDocument();
      expect(screen.getByText('Component B Loading: false')).toBeInTheDocument();
    });
  });
});

console.log('✅ AuthContext tests loaded successfully');
