/**
 * Realtime Database Service - User Presence & Cursor Tracking
 *
 * PR5.1: Realtime Database Setup
 *
 * This service handles high-frequency real-time updates:
 * - User presence tracking (online/offline status)
 * - Live cursor position updates
 * - User session management
 * - Automatic cleanup on disconnect
 *
 * Uses Firebase Realtime Database for low-latency updates
 * (Firestore is used for shapes, Realtime DB for cursors/presence)
 *
 * Database Structure:
 * /sessions/{canvasId}/{userId}
 *   - displayName: string
 *   - cursorColor: string
 *   - cursorX: number
 *   - cursorY: number
 *   - lastSeen: timestamp
 *   - isOnline: boolean
 */

import {
    off,
    onDisconnect,
    onValue,
    ref,
    set,
    update
} from 'firebase/database';
import { realtimeDb } from './firebase';
import type { CursorData, UserPresence } from './types';
import { CONSTANTS } from './types';

// ============================================================================
// User Session Management
// ============================================================================

/**
 * Task 5.1.1: Initialize user presence session
 *
 * Creates a presence entry in Realtime Database and sets up
 * automatic cleanup on disconnect
 */
export async function initializeUserPresence(
  userId: string,
  displayName: string,
  cursorColor: string,
  canvasId: string = CONSTANTS.GLOBAL_CANVAS_ID
): Promise<void> {
  try {
    const userRef = ref(realtimeDb, `sessions/${canvasId}/${userId}`);

    // Create initial presence data
    const presenceData: Partial<UserPresence> = {
      userId,
      displayName,
      cursorColor,
      cursorX: 0,
      cursorY: 0,
      lastSeen: Date.now(),
      isOnline: true,
    };

    // Set presence data
    await set(userRef, presenceData);

    // Set up automatic cleanup on disconnect
    const disconnectRef = onDisconnect(userRef);
    await disconnectRef.set({
      ...presenceData,
      isOnline: false,
      lastSeen: Date.now(),
    });

    console.log('✅ User presence initialized:', userId);
  } catch (error) {
    console.error('❌ Error initializing presence:', error);
    throw error;
  }
}

/**
 * Task 5.1.2: Update user presence (heartbeat)
 *
 * Updates the lastSeen timestamp to keep presence alive
 */
export async function updateUserPresence(
  userId: string,
  canvasId: string = CONSTANTS.GLOBAL_CANVAS_ID
): Promise<void> {
  try {
    const userRef = ref(realtimeDb, `sessions/${canvasId}/${userId}`);
    await update(userRef, {
      lastSeen: Date.now(),
      isOnline: true,
    });
  } catch (error) {
    console.error('❌ Error updating presence:', error);
  }
}

/**
 * Task 5.1.3: Remove user presence (cleanup)
 *
 * Explicitly removes user from presence tracking
 */
export async function removeUserPresence(
  userId: string,
  canvasId: string = CONSTANTS.GLOBAL_CANVAS_ID
): Promise<void> {
  try {
    const userRef = ref(realtimeDb, `sessions/${canvasId}/${userId}`);
    await update(userRef, {
      isOnline: false,
      lastSeen: Date.now(),
    });

    console.log('👋 User presence removed:', userId);
  } catch (error) {
    console.error('❌ Error removing presence:', error);
  }
}

// ============================================================================
// Cursor Position Updates
// ============================================================================

/**
 * Task 5.3.1: Update cursor position
 *
 * Updates the user's cursor position in real-time
 * Should be throttled to avoid excessive writes (100ms)
 */
export async function updateCursorPosition(
  userId: string,
  x: number,
  y: number,
  canvasId: string = CONSTANTS.GLOBAL_CANVAS_ID
): Promise<void> {
  try {
    const userRef = ref(realtimeDb, `sessions/${canvasId}/${userId}`);
    await update(userRef, {
      cursorX: x,
      cursorY: y,
      lastSeen: Date.now(),
      isOnline: true,
    });
  } catch (error) {
    // Silently fail for cursor updates to avoid console spam
    // Only log critical errors
    if (error instanceof Error && error.message.includes('permission')) {
      console.error('❌ Cursor update permission error:', error);
    }
  }
}

// ============================================================================
// Real-Time Subscriptions
// ============================================================================

/**
 * Task 5.1.4: Subscribe to all user presence updates
 *
 * Listens for changes to all users' presence data
 * Returns unsubscribe function
 */
export function subscribeToPresence(
  callback: (users: UserPresence[]) => void,
  canvasId: string = CONSTANTS.GLOBAL_CANVAS_ID
): () => void {
  const sessionsRef = ref(realtimeDb, `sessions/${canvasId}`);

  console.log('🔔 Subscribing to presence updates:', canvasId);

  const unsubscribe = onValue(
    sessionsRef,
    (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        console.log('📭 No active sessions');
        callback([]);
        return;
      }

      // Convert object of users to array
      const users: UserPresence[] = Object.values(data);

      // Filter out offline users older than 1 minute
      const activeUsers = users.filter((user) => {
        if (!user.isOnline) return false;
        const timeSinceLastSeen = Date.now() - user.lastSeen;
        return timeSinceLastSeen < 60000; // 1 minute
      });

      console.log('👥 Active users:', activeUsers.length);
      callback(activeUsers);
    },
    (error) => {
      console.error('❌ Error in presence subscription:', error);
    }
  );

  // Return cleanup function
  return () => {
    console.log('🔌 Unsubscribing from presence updates');
    off(sessionsRef);
  };
}

/**
 * Subscribe to a specific user's cursor position
 *
 * Useful for debugging or tracking specific users
 */
export function subscribeToUserCursor(
  userId: string,
  callback: (cursor: CursorData | null) => void,
  canvasId: string = CONSTANTS.GLOBAL_CANVAS_ID
): () => void {
  const userRef = ref(realtimeDb, `sessions/${canvasId}/${userId}`);

  const unsubscribe = onValue(
    userRef,
    (snapshot) => {
      const data = snapshot.val() as UserPresence | null;

      if (!data || !data.isOnline) {
        callback(null);
        return;
      }

      const cursorData: CursorData = {
        userId: data.userId,
        x: data.cursorX,
        y: data.cursorY,
        color: data.cursorColor,
        displayName: data.displayName,
      };

      callback(cursorData);
    },
    (error) => {
      console.error('❌ Error subscribing to user cursor:', error);
    }
  );

  return () => {
    off(userRef);
  };
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Get all currently active users (one-time read)
 */
export async function getActiveUsers(
  canvasId: string = CONSTANTS.GLOBAL_CANVAS_ID
): Promise<UserPresence[]> {
  return new Promise((resolve) => {
    const sessionsRef = ref(realtimeDb, `sessions/${canvasId}`);

    onValue(
      sessionsRef,
      (snapshot) => {
        const data = snapshot.val();

        if (!data) {
          resolve([]);
          return;
        }

        const users: UserPresence[] = Object.values(data);
        const activeUsers = users.filter((user) => {
          if (!user.isOnline) return false;
          const timeSinceLastSeen = Date.now() - user.lastSeen;
          return timeSinceLastSeen < 60000;
        });

        resolve(activeUsers);
      },
      { onlyOnce: true }
    );
  });
}

/**
 * Clean up stale presence entries (admin operation)
 *
 * Removes users who have been offline for more than 5 minutes
 */
export async function cleanupStalePresence(
  canvasId: string = CONSTANTS.GLOBAL_CANVAS_ID
): Promise<number> {
  try {
    const users = await getActiveUsers(canvasId);
    let cleanedCount = 0;

    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;

    for (const user of users) {
      if (now - user.lastSeen > fiveMinutes) {
        await removeUserPresence(user.userId, canvasId);
        cleanedCount++;
      }
    }

    if (cleanedCount > 0) {
      console.log(`🧹 Cleaned up ${cleanedCount} stale presence entries`);
    }

    return cleanedCount;
  } catch (error) {
    console.error('❌ Error cleaning up stale presence:', error);
    return 0;
  }
}
