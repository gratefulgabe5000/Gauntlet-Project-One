/**
 * usePresence Hook - User Presence & Cursor Tracking
 *
 * PR5.4: Presence Management
 *
 * This hook manages user presence and cursor tracking:
 * - Initializes user session on mount
 * - Tracks cursor position with throttling
 * - Subscribes to other users' presence
 * - Handles automatic cleanup on unmount
 *
 * Uses Firebase Realtime Database for low-latency updates
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import {
    initializeUserPresence,
    removeUserPresence,
    subscribeToPresence,
    updateCursorPosition,
} from '../services/realtime';
import type { UserPresence } from '../services/types';
import { CONSTANTS } from '../services/types';
import { formatUserDisplayName, getUserColor } from '../utils/colors';

interface UsePresenceReturn {
  // State
  activeUsers: UserPresence[];
  currentUserColor: string;
  isInitialized: boolean;

  // Actions
  updateCursor: (x: number, y: number) => void;
}

/**
 * Task 5.4.1: User presence and cursor tracking hook
 */
export function usePresence(): UsePresenceReturn {
  const { user } = useAuth();
  const [activeUsers, setActiveUsers] = useState<UserPresence[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentUserColor, setCurrentUserColor] = useState('#4ECDC4');

  // Track cursor update throttling
  const lastCursorUpdateRef = useRef<number>(0);
  const cursorThrottleMs = CONSTANTS.CURSOR_UPDATE_THROTTLE_MS;

  /**
   * Task 5.4.2: Initialize user presence on mount
   */
  useEffect(() => {
    if (!user) {
      console.log('⚠️ No user authenticated, skipping presence initialization');
      setIsInitialized(false);
      return;
    }

    console.log('🔔 Initializing user presence...');

    // Get user color
    const color = getUserColor(user.uid);
    setCurrentUserColor(color);

    // Get display name
    const displayName = formatUserDisplayName(user.displayName, user.email);

    // Initialize presence
    initializeUserPresence(user.uid, displayName, color)
      .then(() => {
        console.log('✅ Presence initialized');
        setIsInitialized(true);
      })
      .catch((error) => {
        console.error('❌ Error initializing presence:', error);
      });

    // Subscribe to all users' presence
    const unsubscribe = subscribeToPresence((users) => {
      // Filter out current user from the list
      const otherUsers = users.filter((u) => u.userId !== user.uid);
      setActiveUsers(otherUsers);
    });

    // Cleanup on unmount
    return () => {
      console.log('🔌 Cleaning up presence...');
      removeUserPresence(user.uid);
      unsubscribe();
      setIsInitialized(false);
    };
  }, [user]);

  /**
   * Task 5.3.2: Update cursor position with throttling
   *
   * Throttles updates to avoid excessive writes to Realtime Database
   */
  const updateCursor = useCallback(
    (x: number, y: number) => {
      if (!user || !isInitialized) return;

      const now = Date.now();
      const timeSinceLastUpdate = now - lastCursorUpdateRef.current;

      // Throttle updates to 100ms
      if (timeSinceLastUpdate < cursorThrottleMs) {
        return;
      }

      lastCursorUpdateRef.current = now;
      updateCursorPosition(user.uid, x, y);
    },
    [user, isInitialized, cursorThrottleMs]
  );

  return {
    // State
    activeUsers,
    currentUserColor,
    isInitialized,

    // Actions
    updateCursor,
  };
}
