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
    updateShape,
} from '../services/firestore';
import type { CreateShapeData, Shape } from '../services/types';

interface UseShapesReturn {
  // State
  shapes: Shape[];
  selectedShapeId: string | null;
  isLoading: boolean;
  error: string | null;

  // Shape operations
  addShape: (shapeData: CreateShapeData) => Promise<string | null>;
  removeShape: (shapeId: string) => Promise<boolean>;
  updateShapePosition: (shapeId: string, x: number, y: number) => Promise<boolean>;
  updateShapeText: (shapeId: string, text: string) => Promise<boolean>;
  updateShapeColor: (shapeId: string, color: string) => Promise<boolean>;
  clearAllShapes: () => Promise<boolean>;

  // Selection
  selectShape: (shapeId: string | null) => void;
  clearSelection: () => void;
  getSelectedShape: () => Shape | null;
  removeSelectedShape: () => Promise<boolean>;

  // Locking
  acquireLock: (shapeId: string) => Promise<boolean>;
  releaseLock: (shapeId: string) => Promise<boolean>;
}

/**
 * Task 4.3.1: Real-time shape state management with Firestore
 */
export function useShapes(): UseShapesReturn {
  const { user } = useAuth();
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Track pending operations for optimistic updates
  const pendingOperationsRef = useRef<Set<string>>(new Set());

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
    [user]
  );

  /**
   * Remove shape
   */
  const removeShape = useCallback(
    async (shapeId: string): Promise<boolean> => {
      if (!user) {
        console.error('❌ Cannot remove shape: no user authenticated');
        return false;
      }

      try {
        // Optimistically remove from local state
        setShapes((prev) => prev.filter((s) => s.id !== shapeId));
        if (selectedShapeId === shapeId) {
          setSelectedShapeId(null);
        }

        // Delete from Firestore
        const result = await deleteShape(shapeId);

        if (result.success) {
          console.log('✅ Shape removed successfully:', shapeId);
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
    [user, selectedShapeId]
  );

  /**
   * Update shape position (after drag)
   */
  const updateShapePosition = useCallback(
    async (shapeId: string, x: number, y: number): Promise<boolean> => {
      if (!user) {
        console.error('❌ Cannot update shape: no user authenticated');
        return false;
      }

      try {
        // Optimistically update local state
        setShapes((prev) =>
          prev.map((shape) => (shape.id === shapeId ? { ...shape, x, y } : shape))
        );

        // Update in Firestore
        const result = await updateShape(shapeId, { x, y }, user.uid);

        if (result.success) {
          console.log('✅ Shape position updated:', shapeId, { x, y });
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
    [user]
  );

  /**
   * Update shape text content
   */
  const updateShapeText = useCallback(
    async (shapeId: string, text: string): Promise<boolean> => {
      if (!user) {
        console.error('❌ Cannot update shape: no user authenticated');
        return false;
      }

      try {
        // Optimistically update local state
        setShapes((prev) =>
          prev.map((shape) => (shape.id === shapeId ? { ...shape, text } : shape))
        );

        // Update in Firestore
        const result = await updateShape(shapeId, { text }, user.uid);

        if (result.success) {
          console.log('✅ Shape text updated:', shapeId);
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
    [user]
  );

  /**
   * Update shape color
   */
  const updateShapeColor = useCallback(
    async (shapeId: string, color: string): Promise<boolean> => {
      if (!user) {
        console.error('❌ Cannot update shape: no user authenticated');
        return false;
      }

      try {
        // Optimistically update local state
        setShapes((prev) =>
          prev.map((shape) => (shape.id === shapeId ? { ...shape, fill: color } : shape))
        );

        // Update in Firestore
        const result = await updateShape(shapeId, { fill: color }, user.uid);

        if (result.success) {
          console.log('✅ Shape color updated:', shapeId, color);
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
    [user]
  );

  /**
   * Select a shape
   */
  const selectShape = useCallback((shapeId: string | null) => {
    setSelectedShapeId(shapeId);
  }, []);

  /**
   * Clear selection
   */
  const clearSelection = useCallback(() => {
    setSelectedShapeId(null);
  }, []);

  /**
   * Get currently selected shape
   */
  const getSelectedShape = useCallback((): Shape | null => {
    if (!selectedShapeId) return null;
    return shapes.find((s) => s.id === selectedShapeId) || null;
  }, [selectedShapeId, shapes]);

  /**
   * Remove currently selected shape
   */
  const removeSelectedShape = useCallback(async (): Promise<boolean> => {
    if (!selectedShapeId) return false;
    return await removeShape(selectedShapeId);
  }, [selectedShapeId, removeShape]);

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
    isLoading,
    error,

    // Shape operations
    addShape,
    removeShape,
    updateShapePosition,
    updateShapeText,
    updateShapeColor,
    clearAllShapes,

    // Selection
    selectShape,
    clearSelection,
    getSelectedShape,
    removeSelectedShape,

    // Locking
    acquireLock,
    releaseLock,
  };
}
