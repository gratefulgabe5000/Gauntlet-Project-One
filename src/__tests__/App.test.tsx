/**
 * App Component Tests
 *
 * PR2.6.3 - Updated tests for authenticated app state
 *
 * Test Strategy:
 * - Mock authentication context with logged-in user
 * - Verify App component renders with AuthGuard
 * - Validate toolbar elements with user info
 * - Confirm Canvas component integration
 * - Test logout button functionality
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App';
import { AuthProvider } from '../auth/AuthContext';
import type { User } from '../services/types';

// Mock Firebase services
vi.mock('../services/firebase', () => ({
  mapFirebaseUser: vi.fn(),
  signUpWithEmail: vi.fn(),
  signInWithEmail: vi.fn(),
  signOut: vi.fn(),
}));

// Mock firebase/auth with authenticated user
const mockUser: User = {
  uid: 'test-uid-123',
  email: 'test@example.com',
  displayName: 'Test User',
  photoURL: null,
  emailVerified: true,
};

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn((_auth, callback) => {
    // Simulate authenticated user
    setTimeout(() => callback(mockUser), 0);
    return () => {};
  }),
}));

describe('App Component (Authenticated)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Helper to render App with AuthProvider
  const renderApp = () => {
    return render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );
  };

  // ============================================================================
  // Test 1: App Renders When Authenticated
  // ============================================================================
  it('renders app when user is authenticated', async () => {
    renderApp();

    await waitFor(() => {
      expect(screen.getByText(/CollabCanvas MVP/i)).toBeInTheDocument();
    });
  });

  // ============================================================================
  // Test 2: Toolbar Renders with Buttons
  // ============================================================================
  it('renders toolbar with shape creation buttons', async () => {
    const { container } = renderApp();

    await waitFor(() => {
      expect(screen.getByText(/CollabCanvas MVP/i)).toBeInTheDocument();
    });

    // Verify toolbar exists
    const toolbar = container.querySelector('.toolbar');
    expect(toolbar).toBeInTheDocument();

    // Verify buttons exist
    const addButton = container.querySelector('.toolbar-button');
    expect(addButton).toBeInTheDocument();
    expect(addButton?.textContent).toContain('Add Rectangle');
  });

  // ============================================================================
  // Test 3: User Info Display
  // ============================================================================
  it('displays authenticated user info in toolbar', async () => {
    renderApp();

    await waitFor(() => {
      expect(screen.getByText('Test User')).toBeInTheDocument();
    });

    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  // ============================================================================
  // Test 4: User Avatar with Initial
  // ============================================================================
  it('displays user avatar with initial', async () => {
    const { container } = renderApp();

    await waitFor(() => {
      expect(screen.getByText('Test User')).toBeInTheDocument();
    });

    const avatar = container.querySelector('.user-avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar?.textContent).toBe('T'); // First letter of "Test User"
  });

  // ============================================================================
  // Test 5: Logout Button Exists
  // ============================================================================
  it('renders logout button', async () => {
    renderApp();

    await waitFor(() => {
      expect(screen.getByText(/CollabCanvas MVP/i)).toBeInTheDocument();
    });

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();
  });

  // ============================================================================
  // Test 6: Logout Confirmation Dialog
  // ============================================================================
  it('shows confirmation dialog when clicking logout', async () => {
    // Mock window.confirm
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false);

    renderApp();

    await waitFor(() => {
      expect(screen.getByText(/CollabCanvas MVP/i)).toBeInTheDocument();
    });

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);

    // Confirm should have been called
    expect(confirmSpy).toHaveBeenCalledWith('Are you sure you want to log out?');

    confirmSpy.mockRestore();
  });

  // ============================================================================
  // Test 7: Canvas Component Integration
  // ============================================================================
  it('renders canvas component when authenticated', async () => {
    const { container } = renderApp();

    await waitFor(() => {
      expect(screen.getByText(/CollabCanvas MVP/i)).toBeInTheDocument();
    });

    // Canvas wrapper should be in the DOM
    const canvasWrapper = container.querySelector('.canvas-wrapper');
    expect(canvasWrapper).toBeInTheDocument();
  });

  // ============================================================================
  // Test 8: User Presence Section
  // ============================================================================
  it('renders user presence section with all elements', async () => {
    const { container } = renderApp();

    await waitFor(() => {
      expect(screen.getByText(/CollabCanvas MVP/i)).toBeInTheDocument();
    });

    // Verify user presence section exists
    const userPresence = container.querySelector('.user-presence');
    expect(userPresence).toBeInTheDocument();

    // Should contain avatar, name, email, and logout button
    expect(userPresence?.textContent).toContain('Test User');
    expect(userPresence?.textContent).toContain('test@example.com');
    expect(userPresence?.textContent).toContain('Logout');
  });

  // ============================================================================
  // Test 9: Shape Counter Button Functionality
  // ============================================================================
  it('increments counter when Add Rectangle is clicked', async () => {
    const { container } = renderApp();

    await waitFor(() => {
      expect(screen.getByText(/CollabCanvas MVP/i)).toBeInTheDocument();
    });

    const addButton = container.querySelector('.toolbar-button') as HTMLButtonElement;
    expect(addButton.textContent).toContain('Add Rectangle (0)');

    // Click button
    fireEvent.click(addButton);

    // Counter should increment
    await waitFor(() => {
      expect(addButton.textContent).toContain('Add Rectangle (1)');
    });
  });

  // ============================================================================
  // Test 10: Full App Structure
  // ============================================================================
  it('has proper app structure with all main sections', async () => {
    const { container } = renderApp();

    await waitFor(() => {
      expect(screen.getByText(/CollabCanvas MVP/i)).toBeInTheDocument();
    });

    // Main container
    const mainDiv = container.querySelector('.h-screen.w-screen');
    expect(mainDiv).toBeInTheDocument();

    // Toolbar
    const toolbar = container.querySelector('.toolbar');
    expect(toolbar).toBeInTheDocument();

    // Canvas wrapper
    const canvasWrapper = container.querySelector('.canvas-wrapper');
    expect(canvasWrapper).toBeInTheDocument();
  });
});

console.log('✅ App authenticated tests loaded successfully');
