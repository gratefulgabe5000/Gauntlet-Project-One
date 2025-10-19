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
    updateUserPresence,
} from '../services/realtime';
import type { UserPresence } from '../services/types';
import { CONSTANTS } from '../services/types';
import { formatUserDisplayName, getUserColor } from '../utils/colors';

interface UsePresenceReturn {
  // State
  activeUsers: UserPresence[];
  currentUserColor: string;
  currentUserName: string;
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
  const [currentUserName, setCurrentUserName] = useState('');

  // Track cursor update throttling
  const lastCursorUpdateRef = useRef<number>(0);
  const cursorThrottleMs = CONSTANTS.CURSOR_UPDATE_THROTTLE_MS;

  // PR10a: Use refs to prevent stale closures in presence subscription
  const currentUserColorRef = useRef<string>(currentUserColor);
  const currentUserNameRef = useRef<string>(currentUserName);
  const activeUsersRef = useRef<UserPresence[]>([]); // PR10a: Track active users to prevent unnecessary array re-creation

  // Update refs when state changes
  useEffect(() => {
    currentUserColorRef.current = currentUserColor;
    currentUserNameRef.current = currentUserName;
  }, [currentUserColor, currentUserName]);

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
    currentUserColorRef.current = color;

    // Get display name
    const displayName = formatUserDisplayName(user.displayName, user.email);
    setCurrentUserName(displayName);
    currentUserNameRef.current = displayName;

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
      // Find current user to update their color and name in real-time
      const currentUser = users.find((u) => u.userId === user.uid);
      if (currentUser) {
        // PR10a: Use refs to get current values and prevent unnecessary updates
        if (currentUser.cursorColor !== currentUserColorRef.current) {
          setCurrentUserColor(currentUser.cursorColor);
          currentUserColorRef.current = currentUser.cursorColor;
          console.log('🎨 Current user color updated:', currentUser.cursorColor);
        }
        if (currentUser.displayName !== currentUserNameRef.current) {
          setCurrentUserName(currentUser.displayName);
          currentUserNameRef.current = currentUser.displayName;
          console.log('👤 Current user name updated:', currentUser.displayName);
        }
      }

      // Filter out current user from the list
      const otherUsers = users.filter((u) => u.userId !== user.uid);
      
      // PR10a: Only update if users have actually changed (prevent unnecessary re-renders)
      const usersChanged = 
        otherUsers.length !== activeUsersRef.current.length ||
        otherUsers.some((u, i) => {
          const prevUser = activeUsersRef.current[i];
          return !prevUser || u.userId !== prevUser.userId;
        });
      
      if (usersChanged) {
        activeUsersRef.current = otherUsers;
        setActiveUsers(otherUsers);
      }
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
   * PR6.7: Heartbeat to keep presence alive
   *
   * Updates lastSeen timestamp every 5 seconds to maintain online status
   */
  useEffect(() => {
    if (!user || !isInitialized) return;

    console.log('💓 Starting presence heartbeat');

    // Update presence immediately
    updateUserPresence(user.uid);

    // Set up interval to update every 5 seconds
    const heartbeatInterval = setInterval(() => {
      updateUserPresence(user.uid);
    }, 5000);

    return () => {
      console.log('💔 Stopping presence heartbeat');
      clearInterval(heartbeatInterval);
    };
  }, [user, isInitialized]);

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
    currentUserName,
    isInitialized,

    // Actions
    updateCursor,
  };
}
