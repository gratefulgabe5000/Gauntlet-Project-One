/**
 * useUndoRedo Hook
 *
 * PR8a.3.1: Undo/Redo functionality hook (Phase 2a)
 *
 * Features:
 * - Action history stack (max 50 actions)
 * - Redo stack for undone actions
 * - Multi-user undo isolation
 * - Methods: undo(), redo(), addAction()
 */

import { useCallback, useRef, useState } from 'react';
import {
    ACTION_HISTORY_CONFIG,
    type CanvasAction,
    type UndoRedoResult
} from '../types/canvas.types';

export interface UseUndoRedoReturn {
  /** Undo the last action by current user */
  undo: () => Promise<UndoRedoResult>;

  /** Redo the last undone action by current user */
  redo: () => Promise<UndoRedoResult>;

  /** Add an action to history */
  addAction: (action: CanvasAction) => void;

  /** Check if undo is available */
  canUndo: boolean;

  /** Check if redo is available */
  canRedo: boolean;

  /** Get current history size */
  historySize: number;

  /** Get current redo stack size */
  redoSize: number;

  /** Clear all history */
  clearHistory: () => void;
}

export interface UseUndoRedoOptions {
  /** Current user ID for multi-user undo isolation */
  userId: string | null;

  /** Handler to apply undo action */
  onUndo: (action: CanvasAction) => Promise<boolean>;

  /** Handler to apply redo action */
  onRedo: (action: CanvasAction) => Promise<boolean>;

  /** Max history size (default: 50) */
  maxHistorySize?: number;
}

/**
 * Custom hook for managing undo/redo functionality
 */
export function useUndoRedo({
  userId,
  onUndo,
  onRedo,
  maxHistorySize = ACTION_HISTORY_CONFIG.MAX_HISTORY_SIZE,
}: UseUndoRedoOptions): UseUndoRedoReturn {
  // Use refs for stacks to avoid re-renders on every action
  const historyStackRef = useRef<CanvasAction[]>([]);
  const redoStackRef = useRef<CanvasAction[]>([]);

  // State for triggering re-renders when can undo/redo changes
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [historySize, setHistorySize] = useState(0);
  const [redoSize, setRedoSize] = useState(0);

  /**
   * Update can undo/redo state
   */
  const updateState = useCallback(() => {
    if (!userId) {
      setCanUndo(false);
      setCanRedo(false);
      setHistorySize(0);
      setRedoSize(0);
      return;
    }

    // Check if there are any actions by current user in history
    const userHistoryCount = historyStackRef.current.filter(
      (action) => action.userId === userId
    ).length;

    // Check if there are any actions by current user in redo stack
    const userRedoCount = redoStackRef.current.filter(
      (action) => action.userId === userId
    ).length;

    setCanUndo(userHistoryCount > 0);
    setCanRedo(userRedoCount > 0);
    setHistorySize(historyStackRef.current.length);
    setRedoSize(redoStackRef.current.length);
  }, [userId]);

  /**
   * Add action to history
   * Clears redo stack when new action is added
   */
  const addAction = useCallback(
    (action: CanvasAction) => {
      // Add to history stack
      historyStackRef.current.push(action);

      // Limit history size
      if (historyStackRef.current.length > maxHistorySize) {
        historyStackRef.current.shift(); // Remove oldest
      }

      // Clear redo stack (can't redo after new action)
      redoStackRef.current = [];

      updateState();

      console.log('📝 Action added to history:', action.type, action.shapeId);
    },
    [maxHistorySize, updateState]
  );

  /**
   * Find last action by current user
   */
  const findLastUserAction = useCallback(
    (stack: CanvasAction[]): number => {
      if (!userId) return -1;

      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].userId === userId) {
          return i;
        }
      }
      return -1;
    },
    [userId]
  );

  /**
   * Undo last action by current user
   */
  const undo = useCallback(async (): Promise<UndoRedoResult> => {
    if (!userId) {
      return {
        success: false,
        error: 'No user logged in',
      };
    }

    // Find last action by current user
    const lastUserActionIndex = findLastUserAction(historyStackRef.current);

    if (lastUserActionIndex === -1) {
      return {
        success: false,
        error: 'No actions to undo',
      };
    }

    // Get the action
    const action = historyStackRef.current[lastUserActionIndex];

    try {
      // Apply undo
      const success = await onUndo(action);

      if (success) {
        // Remove from history
        historyStackRef.current.splice(lastUserActionIndex, 1);

        // Add to redo stack
        redoStackRef.current.push(action);

        // Limit redo stack size
        if (redoStackRef.current.length > maxHistorySize) {
          redoStackRef.current.shift();
        }

        updateState();

        console.log('⏪ Undo successful:', action.type, action.shapeId);

        return {
          success: true,
          action,
        };
      } else {
        return {
          success: false,
          error: 'Failed to undo action',
        };
      }
    } catch (error) {
      console.error('❌ Undo error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }, [userId, findLastUserAction, onUndo, maxHistorySize, updateState]);

  /**
   * Redo last undone action by current user
   */
  const redo = useCallback(async (): Promise<UndoRedoResult> => {
    if (!userId) {
      return {
        success: false,
        error: 'No user logged in',
      };
    }

    // Find last undone action by current user
    const lastUserRedoIndex = findLastUserAction(redoStackRef.current);

    if (lastUserRedoIndex === -1) {
      return {
        success: false,
        error: 'No actions to redo',
      };
    }

    // Get the action
    const action = redoStackRef.current[lastUserRedoIndex];

    try {
      // Apply redo
      const success = await onRedo(action);

      if (success) {
        // Remove from redo stack
        redoStackRef.current.splice(lastUserRedoIndex, 1);

        // Add back to history
        historyStackRef.current.push(action);

        // Limit history size
        if (historyStackRef.current.length > maxHistorySize) {
          historyStackRef.current.shift();
        }

        updateState();

        console.log('⏩ Redo successful:', action.type, action.shapeId);

        return {
          success: true,
          action,
        };
      } else {
        return {
          success: false,
          error: 'Failed to redo action',
        };
      }
    } catch (error) {
      console.error('❌ Redo error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }, [userId, findLastUserAction, onRedo, maxHistorySize, updateState]);

  /**
   * Clear all history (useful for testing or reset)
   */
  const clearHistory = useCallback(() => {
    historyStackRef.current = [];
    redoStackRef.current = [];
    updateState();
    console.log('🗑️ History cleared');
  }, [updateState]);

  return {
    undo,
    redo,
    addAction,
    canUndo,
    canRedo,
    historySize,
    redoSize,
    clearHistory,
  };
}
