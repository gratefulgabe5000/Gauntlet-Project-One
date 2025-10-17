/**
 * useShapes Hook - Real-Time Shape Synchronization
 *
 * PR4.3: Real-Time Shape Synchronization
 *
 * This hook manages real-time shape state synchronized with Firestore:
 * - Subscribes to real-time shape updates
 * - Handles shape CRUD operations with optimistic updates
 * - Manages conflicts between local and remote updates
 * - Shape locking during drag operations
 *
 * Replaces the local-only useCanvas hook from PR3
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import {
    acquireShapeLock,
    createShape,
    deleteShape,
    getOrCreateCanvas,
    releaseShapeLock,
    subscribeToCanvas,
    updateMultipleShapes,
    updateShape,
} from '../services/firestore';
import type { CreateShapeData, Shape } from '../services/types';
import { ActionType, type CanvasAction } from '../types/canvas.types';
import { useUndoRedo } from './useUndoRedo';

interface UseShapesReturn {
  // State
  shapes: Shape[];
  selectedShapeId: string | null; // Primary selection for backwards compatibility
  selectedShapeIds: string[]; // PR8a: Multi-select support
  isLoading: boolean;
  error: string | null;

  // Shape operations
  addShape: (shapeData: CreateShapeData) => Promise<string | null>;
  removeShape: (shapeId: string) => Promise<boolean>;
  updateShapePosition: (shapeId: string, x: number, y: number) => Promise<boolean>;
  updateShapeText: (shapeId: string, text: string) => Promise<boolean>;
  updateShapeColor: (shapeId: string, color: string) => Promise<boolean>;
  updateMultipleShapeColors: (shapeIds: string[], color: string) => Promise<{ successCount: number; totalCount: number }>; // PR8a: Multi-select
  clearAllShapes: () => Promise<boolean>;

  // Selection (PR8a: Updated for multi-select)
  selectShape: (shapeId: string | null, addToSelection?: boolean) => void;
  selectAllShapes: () => void; // PR8a: Select all shapes at once
  clearSelection: () => void;
  getSelectedShape: () => Shape | null;
  getSelectedShapes: () => Shape[]; // PR8a: Get all selected shapes
  removeSelectedShape: () => Promise<boolean>;
  removeSelectedShapes: () => Promise<boolean>; // PR8a: Remove all selected

  // Locking
  acquireLock: (shapeId: string) => Promise<boolean>;
  releaseLock: (shapeId: string) => Promise<boolean>;

  // PR8a.3.3: Undo/Redo (Phase 2a)
  undo: () => Promise<void>;
  redo: () => Promise<void>;
  canUndo: boolean;
  canRedo: boolean;

  // PR8a.4: Enhanced keyboard shortcuts (Phase 2a)
  moveShapeByDelta: (shapeId: string, deltaX: number, deltaY: number) => Promise<boolean>;
  duplicateShape: (shapeId: string) => Promise<string | null>;
}

/**
 * Task 4.3.1: Real-time shape state management with Firestore
 */
export function useShapes(): UseShapesReturn {
  const { user } = useAuth();
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [selectedShapeIds, setSelectedShapeIds] = useState<string[]>([]); // PR8a: Multi-select
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Track pending operations for optimistic updates
  const pendingOperationsRef = useRef<Set<string>>(new Set());

  /**
   * PR8a.3.3: Undo/Redo handlers (Phase 2a)
   */
  const handleUndo = useCallback(
    async (action: CanvasAction): Promise<boolean> => {
      try {
        switch (action.type) {
          case ActionType.CREATE:
            // Undo CREATE: Delete the shape
            console.log('⏪ Undoing CREATE:', action.shapeId);
            return await deleteShape(action.shapeId).then((r) => r.success);

          case ActionType.DELETE:
            // Undo DELETE: Recreate the shape with original ID
            console.log('⏪ Undoing DELETE:', action.shapeId);
            const deleteAction = action as any; // Cast to access shape property
            if (deleteAction.shape) {
              const result = await createShape(
                {
                  type: deleteAction.shape.type,
                  x: deleteAction.shape.x,
                  y: deleteAction.shape.y,
                  width: deleteAction.shape.width,
                  height: deleteAction.shape.height,
                  fill: deleteAction.shape.fill,
                  text: deleteAction.shape.text,
                },
                deleteAction.shape.createdBy,
                undefined, // Use default canvasId
                deleteAction.shape.id // Preserve original ID
              );
              return result.success;
            }
            return false;

          case ActionType.MOVE:
            // Undo MOVE: Restore old position
            console.log('⏪ Undoing MOVE:', action.shapeId);
            const moveAction = action as any;
            return await updateShape(
              action.shapeId,
              {
                x: moveAction.oldPosition.x,
                y: moveAction.oldPosition.y,
              },
              user?.uid || ''
            ).then((r) => r.success);

          case ActionType.COLOR_CHANGE:
            // Undo COLOR_CHANGE: Restore old color
            console.log('⏪ Undoing COLOR_CHANGE:', action.shapeId);
            const colorAction = action as any;
            return await updateShape(
              action.shapeId,
              { fill: colorAction.oldColor },
              user?.uid || ''
            ).then((r) => r.success);

          case ActionType.TEXT_CHANGE:
            // Undo TEXT_CHANGE: Restore old text
            console.log('⏪ Undoing TEXT_CHANGE:', action.shapeId);
            const textAction = action as any;
            return await updateShape(
              action.shapeId,
              { text: textAction.oldText },
              user?.uid || ''
            ).then((r) => r.success);

          default:
            console.warn('⚠️ Unknown action type for undo:', action.type);
            return false;
        }
      } catch (error) {
        console.error('❌ Undo handler error:', error);
        return false;
      }
    },
    [user]
  );

  const handleRedo = useCallback(
    async (action: CanvasAction): Promise<boolean> => {
      try {
        switch (action.type) {
          case ActionType.CREATE:
            // Redo CREATE: Recreate the shape with original ID
            console.log('⏩ Redoing CREATE:', action.shapeId);
            const createAction = action as any;
            if (createAction.shape) {
              const result = await createShape(
                {
                  type: createAction.shape.type,
                  x: createAction.shape.x,
                  y: createAction.shape.y,
                  width: createAction.shape.width,
                  height: createAction.shape.height,
                  fill: createAction.shape.fill,
                  text: createAction.shape.text,
                },
                createAction.shape.createdBy,
                undefined, // Use default canvasId
                createAction.shape.id // Preserve original ID
              );
              return result.success;
            }
            return false;

          case ActionType.DELETE:
            // Redo DELETE: Delete the shape again
            console.log('⏩ Redoing DELETE:', action.shapeId);
            return await deleteShape(action.shapeId).then((r) => r.success);

          case ActionType.MOVE:
            // Redo MOVE: Restore new position
            console.log('⏩ Redoing MOVE:', action.shapeId);
            const moveAction = action as any;
            return await updateShape(
              action.shapeId,
              {
                x: moveAction.newPosition.x,
                y: moveAction.newPosition.y,
              },
              user?.uid || ''
            ).then((r) => r.success);

          case ActionType.COLOR_CHANGE:
            // Redo COLOR_CHANGE: Apply new color
            console.log('⏩ Redoing COLOR_CHANGE:', action.shapeId);
            const colorAction = action as any;
            return await updateShape(
              action.shapeId,
              { fill: colorAction.newColor },
              user?.uid || ''
            ).then((r) => r.success);

          case ActionType.TEXT_CHANGE:
            // Redo TEXT_CHANGE: Apply new text
            console.log('⏩ Redoing TEXT_CHANGE:', action.shapeId);
            const textAction = action as any;
            return await updateShape(
              action.shapeId,
              { text: textAction.newText },
              user?.uid || ''
            ).then((r) => r.success);

          default:
            console.warn('⚠️ Unknown action type for redo:', action.type);
            return false;
        }
      } catch (error) {
        console.error('❌ Redo handler error:', error);
        return false;
      }
    },
    [user]
  );

  // Initialize undo/redo hook
  const {
    undo: undoAction,
    redo: redoAction,
    addAction,
    canUndo,
    canRedo,
  } = useUndoRedo({
    userId: user?.uid || null,
    onUndo: handleUndo,
    onRedo: handleRedo,
  });

  /**
   * Task 4.3.2: Set up real-time Firestore listener
   */
  useEffect(() => {
    if (!user) {
      console.log('⚠️ No user authenticated, skipping Firestore subscription');
      setIsLoading(false);
      return;
    }

    console.log('🔔 Setting up real-time shape subscription...');

    // Initialize canvas if needed
    getOrCreateCanvas()
      .then(() => {
        console.log('✅ Canvas initialized');
      })
      .catch((err) => {
        console.error('❌ Error initializing canvas:', err);
        setError('Failed to initialize canvas');
      });

    // Subscribe to real-time updates
    const unsubscribe = subscribeToCanvas((updatedShapes) => {
      console.log('🔄 Received shape update:', updatedShapes.length, 'shapes');
      setShapes(updatedShapes);
      setIsLoading(false);
      setError(null);
    });

    // Cleanup subscription on unmount
    return () => {
      console.log('🔌 Unsubscribing from shape updates');
      unsubscribe();
    };
  }, [user]);

  /**
   * Task 4.3.3: Add shape with optimistic update
   * PR8a.3.3: Record CREATE action for undo
   */
  const addShape = useCallback(
    async (shapeData: CreateShapeData): Promise<string | null> => {
      if (!user) {
        console.error('❌ Cannot add shape: no user authenticated');
        return null;
      }

      try {
        // Create shape in Firestore
        const result = await createShape(shapeData, user.uid);

        if (result.success && result.shapeId) {
          console.log('✅ Shape added successfully:', result.shapeId);

          // PR8a.3.3: Record CREATE action for undo
          // Wait for the shape to appear in state before recording
          setTimeout(() => {
            const createdShape = shapes.find(s => s.id === result.shapeId);
            if (createdShape) {
              addAction({
                type: ActionType.CREATE,
                userId: user.uid,
                timestamp: Date.now(),
                shapeId: result.shapeId!,
                shape: createdShape,
              });
            }
          }, 100);

          return result.shapeId;
        } else {
          console.error('❌ Failed to add shape:', result.error);
          setError(result.error || 'Failed to add shape');
          return null;
        }
      } catch (err) {
        console.error('❌ Error adding shape:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        return null;
      }
    },
    [user, shapes, addAction]
  );

  /**
   * Remove shape
   * PR8a.3.3: Record DELETE action for undo
   */
  const removeShape = useCallback(
    async (shapeId: string): Promise<boolean> => {
      if (!user) {
        console.error('❌ Cannot remove shape: no user authenticated');
        return false;
      }

      try {
        // PR8a.3.3: Save shape data before deletion for undo
        const shapeToDelete = shapes.find(s => s.id === shapeId);
        if (!shapeToDelete) {
          console.error('❌ Cannot find shape to delete:', shapeId);
          return false;
        }

        // Optimistically remove from local state
        setShapes((prev) => prev.filter((s) => s.id !== shapeId));
        if (selectedShapeId === shapeId) {
          setSelectedShapeId(null);
        }

        // Delete from Firestore
        const result = await deleteShape(shapeId);

        if (result.success) {
          console.log('✅ Shape removed successfully:', shapeId);

          // PR8a.3.3: Record DELETE action
          addAction({
            type: ActionType.DELETE,
            userId: user.uid,
            timestamp: Date.now(),
            shapeId: shapeId,
            shape: shapeToDelete,
          });

          return true;
        } else {
          console.error('❌ Failed to remove shape:', result.error);
          setError(result.error || 'Failed to remove shape');
          return false;
        }
      } catch (err) {
        console.error('❌ Error removing shape:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        return false;
      }
    },
    [user, selectedShapeId, shapes, addAction]
  );

  /**
   * Update shape position (after drag)
   * PR8a.3.3: Record MOVE action for undo
   */
  const updateShapePosition = useCallback(
    async (shapeId: string, x: number, y: number): Promise<boolean> => {
      if (!user) {
        console.error('❌ Cannot update shape: no user authenticated');
        return false;
      }

      try {
        // PR8a.3.3: Save old position before updating
        const shapeToUpdate = shapes.find(s => s.id === shapeId);
        if (!shapeToUpdate) {
          console.error('❌ Cannot find shape to update:', shapeId);
          return false;
        }
        const oldPosition = { x: shapeToUpdate.x, y: shapeToUpdate.y };

        // Optimistically update local state
        setShapes((prev) =>
          prev.map((shape) => (shape.id === shapeId ? { ...shape, x, y } : shape))
        );

        // Update in Firestore
        const result = await updateShape(shapeId, { x, y }, user.uid);

        if (result.success) {
          console.log('✅ Shape position updated:', shapeId, { x, y });

          // PR8a.3.3: Record MOVE action
          addAction({
            type: ActionType.MOVE,
            userId: user.uid,
            timestamp: Date.now(),
            shapeId: shapeId,
            oldPosition: oldPosition,
            newPosition: { x, y },
          });

          return true;
        } else {
          console.error('❌ Failed to update shape:', result.error);
          setError(result.error || 'Failed to update shape');
          return false;
        }
      } catch (err) {
        console.error('❌ Error updating shape:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        return false;
      }
    },
    [user, shapes, addAction]
  );

  /**
   * Update shape text content
   * PR8a.3.3: Record TEXT_CHANGE action for undo
   */
  const updateShapeText = useCallback(
    async (shapeId: string, text: string): Promise<boolean> => {
      if (!user) {
        console.error('❌ Cannot update shape: no user authenticated');
        return false;
      }

      try {
        // PR8a.3.3: Save old text before updating
        const shapeToUpdate = shapes.find(s => s.id === shapeId);
        if (!shapeToUpdate) {
          console.error('❌ Cannot find shape to update:', shapeId);
          return false;
        }
        const oldText = shapeToUpdate.text || '';

        // Optimistically update local state
        setShapes((prev) =>
          prev.map((shape) => (shape.id === shapeId ? { ...shape, text } : shape))
        );

        // Update in Firestore
        const result = await updateShape(shapeId, { text }, user.uid);

        if (result.success) {
          console.log('✅ Shape text updated:', shapeId);

          // PR8a.3.3: Record TEXT_CHANGE action
          addAction({
            type: ActionType.TEXT_CHANGE,
            userId: user.uid,
            timestamp: Date.now(),
            shapeId: shapeId,
            oldText: oldText,
            newText: text,
          });

          return true;
        } else {
          console.error('❌ Failed to update shape text:', result.error);
          setError(result.error || 'Failed to update shape text');
          return false;
        }
      } catch (err) {
        console.error('❌ Error updating shape text:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        return false;
      }
    },
    [user, shapes, addAction]
  );

  /**
   * Update shape color
   * PR8a.3.3: Record COLOR_CHANGE action for undo
   */
  const updateShapeColor = useCallback(
    async (shapeId: string, color: string): Promise<boolean> => {
      if (!user) {
        console.error('❌ Cannot update shape: no user authenticated');
        return false;
      }

      try {
        // PR8a.3.3: Save old color before updating
        const shapeToUpdate = shapes.find(s => s.id === shapeId);
        if (!shapeToUpdate) {
          console.error('❌ Cannot find shape to update:', shapeId);
          return false;
        }
        const oldColor = shapeToUpdate.fill || '#000000';

        // Optimistically update local state
        setShapes((prev) =>
          prev.map((shape) => (shape.id === shapeId ? { ...shape, fill: color } : shape))
        );

        // Update in Firestore
        const result = await updateShape(shapeId, { fill: color }, user.uid);

        if (result.success) {
          console.log('✅ Shape color updated:', shapeId, color);

          // PR8a.3.3: Record COLOR_CHANGE action
          addAction({
            type: ActionType.COLOR_CHANGE,
            userId: user.uid,
            timestamp: Date.now(),
            shapeId: shapeId,
            oldColor: oldColor,
            newColor: color,
          });

          return true;
        } else {
          console.error('❌ Failed to update shape color:', result.error);
          setError(result.error || 'Failed to update shape color');
          return false;
        }
      } catch (err) {
        console.error('❌ Error updating shape color:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        return false;
      }
    },
    [user, shapes, addAction]
  );

  /**
   * Update multiple shapes' colors at once (PR8a: Multi-select color change)
   * This avoids race conditions that occur when calling updateShapeColor in parallel
   */
  const updateMultipleShapeColors = useCallback(
    async (shapeIds: string[], color: string): Promise<{ successCount: number; totalCount: number }> => {
      if (!user) {
        console.error('❌ Cannot update shapes: no user authenticated');
        return { successCount: 0, totalCount: shapeIds.length };
      }

      try {
        // Save old colors before updating
        const shapesToUpdate = shapes.filter(s => shapeIds.includes(s.id));
        if (shapesToUpdate.length === 0) {
          console.error('❌ No shapes found to update');
          return { successCount: 0, totalCount: shapeIds.length };
        }

        const oldColors = new Map(shapesToUpdate.map(s => [s.id, s.fill || '#000000']));

        // Optimistically update all shapes in a single state update (avoids race condition)
        setShapes((prev) =>
          prev.map((shape) =>
            shapeIds.includes(shape.id) ? { ...shape, fill: color } : shape
          )
        );

        // Update all shapes in Firestore in a SINGLE operation (avoids race condition)
        const updates = shapeIds.map(shapeId => ({
          shapeId,
          updates: { fill: color }
        }));

        const result = await updateMultipleShapes(updates, user.uid);

        if (result.success) {
          // Record COLOR_CHANGE actions for all successful updates
          shapesToUpdate.forEach((shape) => {
            addAction({
              type: ActionType.COLOR_CHANGE,
              userId: user.uid,
              timestamp: Date.now(),
              shapeId: shape.id,
              oldColor: oldColors.get(shape.id) || '#000000',
              newColor: color,
            });
          });

          console.log(`✅ ${shapeIds.length}/${shapeIds.length} shape colors updated to:`, color);
          return { successCount: shapeIds.length, totalCount: shapeIds.length };
        } else {
          console.error('❌ Failed to update shape colors:', result.error);
          return { successCount: 0, totalCount: shapeIds.length };
        }
      } catch (err) {
        console.error('❌ Error updating multiple shape colors:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        return { successCount: 0, totalCount: shapeIds.length };
      }
    },
    [user, shapes, addAction]
  );

  /**
   * Select a shape (PR8a: Updated for multi-select)
   */
  const selectShape = useCallback((shapeId: string | null, addToSelection: boolean = false) => {
    if (shapeId === null) {
      // Clear selection
      setSelectedShapeId(null);
      setSelectedShapeIds([]);
      return;
    }

    if (addToSelection) {
      // Add to or toggle in selection
      setSelectedShapeIds((prev) => {
        if (prev.includes(shapeId)) {
          // Remove from selection
          const newSelection = prev.filter(id => id !== shapeId);
          setSelectedShapeId(newSelection.length > 0 ? newSelection[newSelection.length - 1] : null);
          return newSelection;
        } else {
          // Add to selection
          const newSelection = [...prev, shapeId];
          setSelectedShapeId(shapeId); // Set as primary
          return newSelection;
        }
      });
    } else {
      // Replace selection
      setSelectedShapeId(shapeId);
      setSelectedShapeIds([shapeId]);
    }
  }, []);

  /**
   * Clear selection
   */
  const clearSelection = useCallback(() => {
    setSelectedShapeId(null);
    setSelectedShapeIds([]);
  }, []);

  /**
   * Select all shapes (PR8a: Multi-select)
   */
  const selectAllShapes = useCallback(() => {
    if (shapes.length === 0) return;

    const allIds = shapes.map(s => s.id);
    setSelectedShapeIds(allIds);
    setSelectedShapeId(allIds[allIds.length - 1]); // Set last as primary

    console.log('📋 Selected all ' + shapes.length + ' shapes');
  }, [shapes]);

  /**
   * Get currently selected shape (primary selection)
   */
  const getSelectedShape = useCallback((): Shape | null => {
    if (!selectedShapeId) return null;
    return shapes.find((s) => s.id === selectedShapeId) || null;
  }, [selectedShapeId, shapes]);

  /**
   * Get all selected shapes (PR8a: Multi-select)
   */
  const getSelectedShapes = useCallback((): Shape[] => {
    return shapes.filter((s) => selectedShapeIds.includes(s.id));
  }, [selectedShapeIds, shapes]);

  /**
   * Remove currently selected shape (primary)
   */
  const removeSelectedShape = useCallback(async (): Promise<boolean> => {
    if (!selectedShapeId) return false;
    return await removeShape(selectedShapeId);
  }, [selectedShapeId, removeShape]);

  /**
   * Remove all selected shapes (PR8a: Multi-select)
   */
  const removeSelectedShapes = useCallback(async (): Promise<boolean> => {
    if (selectedShapeIds.length === 0) return false;

    const deletePromises = selectedShapeIds.map((id) => removeShape(id));
    const results = await Promise.all(deletePromises);

    const allDeleted = results.every((result) => result);
    if (allDeleted) {
      clearSelection();
    }

    return allDeleted;
  }, [selectedShapeIds, removeShape, clearSelection]);

  /**
   * Clear all shapes from canvas
   */
  const clearAllShapes = useCallback(async (): Promise<boolean> => {
    if (!user) {
      console.error('❌ Cannot clear shapes: no user authenticated');
      return false;
    }

    try {
      // Delete all shapes
      const deletePromises = shapes.map((shape) => deleteShape(shape.id));
      const results = await Promise.all(deletePromises);

      const allDeleted = results.every((result) => result.success);

      if (allDeleted) {
        console.log('✅ All shapes cleared successfully');
        setSelectedShapeId(null);
        return true;
      } else {
        console.error('❌ Some shapes failed to delete');
        setError('Failed to clear all shapes');
        return false;
      }
    } catch (err) {
      console.error('❌ Error clearing shapes:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      return false;
    }
  }, [user, shapes]);

  /**
   * PR8a.4: Move shape by delta (for arrow keys)
   */
  const moveShapeByDelta = useCallback(
    async (shapeId: string, deltaX: number, deltaY: number): Promise<boolean> => {
      const shape = shapes.find((s) => s.id === shapeId);
      if (!shape) {
        console.error('❌ Cannot find shape to move:', shapeId);
        return false;
      }

      const newX = Math.max(0, shape.x + deltaX);
      const newY = Math.max(0, shape.y + deltaY);

      return await updateShapePosition(shapeId, newX, newY);
    },
    [shapes, updateShapePosition]
  );

  /**
   * PR8a.4: Duplicate selected shape
   */
  const duplicateShape = useCallback(
    async (shapeId: string): Promise<string | null> => {
      if (!user) {
        console.error('❌ Cannot duplicate shape: no user authenticated');
        return null;
      }

      const shapeToDuplicate = shapes.find((s) => s.id === shapeId);
      if (!shapeToDuplicate) {
        console.error('❌ Cannot find shape to duplicate:', shapeId);
        return null;
      }

      // Create duplicate with offset position
      const offset = 20;
      const newShape: CreateShapeData = {
        type: shapeToDuplicate.type,
        x: shapeToDuplicate.x + offset,
        y: shapeToDuplicate.y + offset,
        width: shapeToDuplicate.width,
        height: shapeToDuplicate.height,
        fill: shapeToDuplicate.fill,
        text: shapeToDuplicate.text,
      };

      const newShapeId = await addShape(newShape);
      if (newShapeId) {
        console.log('✅ Shape duplicated:', shapeId, '→', newShapeId);
        // Select the new duplicate
        setSelectedShapeId(newShapeId);
      }

      return newShapeId;
    },
    [user, shapes, addShape]
  );

  /**
   * Task 4.4: Acquire lock on shape
   */
  const acquireLock = useCallback(
    async (shapeId: string): Promise<boolean> => {
      if (!user) return false;

      const lockAcquired = await acquireShapeLock(shapeId, user.uid);
      if (lockAcquired) {
        console.log('🔒 Lock acquired for shape:', shapeId);
      } else {
        console.log('⚠️ Could not acquire lock for shape:', shapeId);
      }
      return lockAcquired;
    },
    [user]
  );

  /**
   * Task 4.4: Release lock on shape
   */
  const releaseLock = useCallback(
    async (shapeId: string): Promise<boolean> => {
      if (!user) return false;

      const lockReleased = await releaseShapeLock(shapeId, user.uid);
      if (lockReleased) {
        console.log('🔓 Lock released for shape:', shapeId);
      }
      return lockReleased;
    },
    [user]
  );

  return {
    // State
    shapes,
    selectedShapeId,
    selectedShapeIds, // PR8a: Multi-select
    isLoading,
    error,

    // Shape operations
    addShape,
    removeShape,
    updateShapePosition,
    updateShapeText,
    updateShapeColor,
    updateMultipleShapeColors, // PR8a: Multi-select color change
    clearAllShapes,

    // Selection
    selectShape,
    selectAllShapes, // PR8a: Select all at once
    clearSelection,
    getSelectedShape,
    getSelectedShapes, // PR8a: Multi-select
    removeSelectedShape,
    removeSelectedShapes, // PR8a: Multi-select

    // Locking
    acquireLock,
    releaseLock,

    // PR8a.3.3: Undo/Redo
    undo: undoAction,
    redo: redoAction,
    canUndo,
    canRedo,

    // PR8a.4: Enhanced keyboard shortcuts
    moveShapeByDelta,
    duplicateShape,
  };
}
