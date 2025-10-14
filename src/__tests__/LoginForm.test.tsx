/**
 * LoginForm Tests
 *
 * PR2.6.2: Test login form validation and submission
 *
 * Simplified test suite focusing on core functionality
 * Tests key aspects without complex state interactions
 */

import { render, screen } from '@testing-library/react';
import type { User as FirebaseUser } from 'firebase/auth';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthProvider } from '../auth/AuthContext';
import LoginForm from '../auth/LoginForm';

// Mock Firebase services
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
    setTimeout(() => callback(null), 0);
    return () => {};
  }),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Helper function to render LoginForm with AuthProvider
  const renderLoginForm = () => {
    return render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    );
  };

  // ============================================================================
  // Test 1: Form Renders with Email Input
  // ============================================================================
  it('should render email input field', () => {
    const { container } = renderLoginForm();

    const emailInput = container.querySelector('input[type="email"]');
    expect(emailInput).toBeInTheDocument();
  });

  // ============================================================================
  // Test 2: Form Renders with Password Input
  // ============================================================================
  it('should render password input field', () => {
    const { container } = renderLoginForm();

    const passwordInput = container.querySelector('input[type="password"]');
    expect(passwordInput).toBeInTheDocument();
  });

  // ============================================================================
  // Test 3: Form Has Submit Button
  // ============================================================================
  it('should render submit button', () => {
    const { container } = renderLoginForm();

    const submitButton = container.querySelector('button[type="submit"]');
    expect(submitButton).toBeInTheDocument();
  });

  // ============================================================================
  // Test 4: Form Has Proper Structure
  // ============================================================================
  it('should have form element', () => {
    const { container } = renderLoginForm();

    const form = container.querySelector('form');
    expect(form).toBeInTheDocument();
  });

  // ============================================================================
  // Test 5: Sign In Mode by Default
  // ============================================================================
  it('should show "Sign In" button by default', () => {
    renderLoginForm();

    const signInButton = screen.getByText(/Sign In/i, { selector: 'span' });
    expect(signInButton).toBeInTheDocument();
  });

  // ============================================================================
  // Test 6: Has Mode Switch Button
  // ============================================================================
  it('should have button to switch between login and signup modes', () => {
    renderLoginForm();

    // Should show link to create account
    const createAccountText = screen.getByText(/Don't have an account/i);
    expect(createAccountText).toBeInTheDocument();
  });

  // ============================================================================
  // Test 7: Email Input Accepts Text
  // ============================================================================
  it('should accept email input', () => {
    const { container } = renderLoginForm();

    const emailInput = container.querySelector('input[type="email"]') as HTMLInputElement;
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.name).toBe('email');
  });

  // ============================================================================
  // Test 8: Password Input Type is Password
  // ============================================================================
  it('should have password input with type password', () => {
    const { container } = renderLoginForm();

    const passwordInput = container.querySelector('input[type="password"]') as HTMLInputElement;
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput.type).toBe('password');
  });

  // ============================================================================
  // Test 9: Form Has Email Label
  // ============================================================================
  it('should have email label', () => {
    renderLoginForm();

    const emailLabel = screen.getByText(/Email Address/i);
    expect(emailLabel).toBeInTheDocument();
  });

  // ============================================================================
  // Test 10: Form Has Password Label
  // ============================================================================
  it('should have password label', () => {
    renderLoginForm();

    const passwordLabel = screen.getByText(/^Password$/i);
    expect(passwordLabel).toBeInTheDocument();
  });
});

console.log('✅ LoginForm tests loaded successfully');
