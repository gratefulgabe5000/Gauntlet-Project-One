/**
 * User Color Generation Utilities
 *
 * PR5.2: User Color System
 *
 * Generates consistent, visually distinct colors for users
 * based on their user ID hash. Each user gets the same color
 * every time, making them recognizable across sessions.
 *
 * Features:
 * - 12 distinct, accessible colors
 * - Deterministic color assignment from user ID
 * - High contrast for visibility on canvas
 * - No similar colors to avoid confusion
 */

// ============================================================================
// Color Palette
// ============================================================================

/**
 * Task 5.2.1: Define color palette for users
 *
 * 12 vibrant, distinct colors that work well for:
 * - Cursor indicators
 * - User avatars
 * - Name labels
 *
 * Colors chosen for maximum distinction and accessibility
 */
export const USER_COLOR_PALETTE = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#FFA07A', // Light Coral
  '#98D8C8', // Mint
  '#F7DC6F', // Yellow
  '#BB8FCE', // Purple
  '#85C1E2', // Sky Blue
  '#F8B500', // Orange
  '#52B788', // Green
  '#E76F51', // Burnt Orange
  '#8E44AD', // Deep Purple
] as const;

/**
 * Task 5.2.2: Generate consistent color from user ID
 *
 * Uses a simple hash function to convert user ID to a
 * consistent index in the color palette
 *
 * @param userId - Firebase user ID
 * @returns Color hex code
 */
export function getUserColor(userId: string): string {
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    const char = userId.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Get positive index
  const index = Math.abs(hash) % USER_COLOR_PALETTE.length;

  return USER_COLOR_PALETTE[index];
}

/**
 * Get contrasting text color for a given background color
 *
 * Returns either black or white depending on background luminance
 * Useful for text labels on colored backgrounds
 *
 * @param hexColor - Background color in hex format
 * @returns '#000000' or '#FFFFFF'
 */
export function getContrastTextColor(hexColor: string): string {
  // Remove # if present
  const hex = hexColor.replace('#', '');

  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black or white based on luminance
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

/**
 * Get a lighter version of a color (for hover states, backgrounds)
 *
 * @param hexColor - Color in hex format
 * @param percent - Amount to lighten (0-100)
 * @returns Lighter color in hex format
 */
export function lightenColor(hexColor: string, percent: number): string {
  const hex = hexColor.replace('#', '');

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const amount = Math.round(2.55 * percent);

  const newR = Math.min(255, r + amount);
  const newG = Math.min(255, g + amount);
  const newB = Math.min(255, b + amount);

  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

/**
 * Get user initials from display name
 *
 * Extracts 1-2 initials from a user's display name
 * Useful for avatar placeholders
 *
 * @param displayName - User's display name
 * @returns Initials (1-2 characters)
 */
export function getUserInitials(displayName: string | null): string {
  if (!displayName) return '?';

  const parts = displayName.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * Format user display name with fallback
 *
 * Returns display name or email prefix if name is not set
 *
 * @param displayName - User's display name (can be null)
 * @param email - User's email address
 * @returns Formatted display name
 */
export function formatUserDisplayName(
  displayName: string | null,
  email: string | null
): string {
  if (displayName) return displayName;
  if (email) return email.split('@')[0];
  return 'Anonymous User';
}
