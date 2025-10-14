import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Toolbar from '../../components/Toolbar';

/**
 * Toolbar Component Tests
 *
 * PR3.7: Integration & Testing
 *
 * Tests for:
 * - Button rendering
 * - Add Rectangle button functionality
 * - Zoom controls
 * - User display
 */

describe('Toolbar Component', () => {
  const mockUser = {
    displayName: 'Test User',
    email: 'test@example.com',
  };

  const mockProps = {
    onAddRectangle: vi.fn(),
    onZoomIn: vi.fn(),
    onZoomOut: vi.fn(),
    user: mockUser,
    onLogout: vi.fn(),
  };

  it('should render toolbar with all controls', () => {
    render(<Toolbar {...mockProps} />);

    // Check for main elements
    expect(screen.getByText('CollabCanvas MVP')).toBeInTheDocument();
    expect(screen.getByText(/Add Rectangle/i)).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('should call onAddRectangle when Add Rectangle button is clicked', () => {
    const onAddRectangle = vi.fn();
    render(<Toolbar {...mockProps} onAddRectangle={onAddRectangle} />);

    const addButton = screen.getByText(/Add Rectangle/i);
    fireEvent.click(addButton);

    expect(onAddRectangle).toHaveBeenCalledTimes(1);
  });

  it('should display user information correctly', () => {
    render(<Toolbar {...mockProps} />);

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('should render zoom controls when provided', () => {
    render(<Toolbar {...mockProps} />);

    // Zoom controls should be present (emoji buttons)
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(2); // At least Add, Zoom In, Zoom Out, Logout
  });

  it('should call onZoomIn when zoom in button is clicked', () => {
    const onZoomIn = vi.fn();
    render(<Toolbar {...mockProps} onZoomIn={onZoomIn} />);

    const zoomInButton = screen.getByTitle('Zoom In');
    fireEvent.click(zoomInButton);

    expect(onZoomIn).toHaveBeenCalledTimes(1);
  });

  it('should call onZoomOut when zoom out button is clicked', () => {
    const onZoomOut = vi.fn();
    render(<Toolbar {...mockProps} onZoomOut={onZoomOut} />);

    const zoomOutButton = screen.getByTitle('Zoom Out');
    fireEvent.click(zoomOutButton);

    expect(onZoomOut).toHaveBeenCalledTimes(1);
  });

  it('should call onLogout when logout button is clicked', () => {
    const onLogout = vi.fn();
    render(<Toolbar {...mockProps} onLogout={onLogout} />);

    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    expect(onLogout).toHaveBeenCalledTimes(1);
  });

  it('should display user avatar with first letter of name', () => {
    render(<Toolbar {...mockProps} />);

    // Check for avatar (first letter should be 'T' for Test User)
    const avatar = screen.getByText('T');
    expect(avatar).toBeInTheDocument();
  });

  it('should handle user without display name', () => {
    const userWithoutName = {
      displayName: null,
      email: 'user@example.com',
    };

    render(<Toolbar {...mockProps} user={userWithoutName} />);

    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByText('user@example.com')).toBeInTheDocument();
  });
});
