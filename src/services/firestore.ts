/**
 * Firestore Service - Real-Time Canvas Shape Persistence
 *
 * PR4.2: Firestore Service Layer
 *
 * This service handles all Firestore operations for shape management:
 * - Create shapes
 * - Update shape positions/properties
 * - Delete shapes
 * - Subscribe to real-time shape updates
 * - Shape locking mechanism
 *
 * Firestore Structure:
 * /canvases/{canvasId}
 *   - canvasId: string
 *   - shapes: Shape[]
 *   - metadata: { createdAt, lastModifiedAt, activeUsers, shapeCount }
 */

import {
    arrayRemove,
    arrayUnion,
    doc,
    getDoc,
    onSnapshot,
    setDoc,
    updateDoc,
    type Unsubscribe
} from 'firebase/firestore';
import { db } from './firebase';
import type {
    CanvasDocument,
    CreateShapeData,
    LockStatus,
    Shape,
    ShapeOperationResult,
    UpdateShapeData,
} from './types';
import { CONSTANTS } from './types';

// ============================================================================
// Canvas Document Operations
// ============================================================================

/**
 * Task 4.2.1: Initialize or get canvas document
 *
 * Creates a new canvas document if it doesn't exist,
 * or retrieves existing canvas data
 */
export async function getOrCreateCanvas(
  canvasId: string = CONSTANTS.GLOBAL_CANVAS_ID
): Promise<CanvasDocument> {
  const canvasRef = doc(db, CONSTANTS.COLLECTIONS.CANVASES, canvasId);
  const canvasSnap = await getDoc(canvasRef);

  if (canvasSnap.exists()) {
    console.log('📄 Canvas exists, loading data...');
    return canvasSnap.data() as CanvasDocument;
  }

  // Create new canvas document
  console.log('🆕 Creating new canvas document...');
  const newCanvas: CanvasDocument = {
    canvasId,
    shapes: [],
    metadata: {
      createdAt: Date.now(),
      lastModifiedAt: Date.now(),
      activeUsers: 0,
      shapeCount: 0,
    },
  };

  await setDoc(canvasRef, newCanvas);
  console.log('✅ Canvas created:', canvasId);
  return newCanvas;
}

// ============================================================================
// Shape CRUD Operations
// ============================================================================

/**
 * Task 4.2.2: Create a new shape
 *
 * Adds a shape to the canvas and returns the shape ID
 */
export async function createShape(
  shapeData: CreateShapeData,
  userId: string,
  canvasId: string = CONSTANTS.GLOBAL_CANVAS_ID,
  customId?: string // PR8a.3: Optional custom ID for undo/redo
): Promise<ShapeOperationResult> {
  try {
    const canvasRef = doc(db, CONSTANTS.COLLECTIONS.CANVASES, canvasId);
    const canvasSnap = await getDoc(canvasRef);

    if (!canvasSnap.exists()) {
      await getOrCreateCanvas(canvasId);
    }

    // Generate unique shape ID or use custom ID (for undo/redo)
    const shapeId = customId || `shape_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = Date.now();

    // Build shape object explicitly to avoid undefined values in Firestore
    const newShape: any = {
      id: shapeId,
      type: shapeData.type,
      x: shapeData.x,
      y: shapeData.y,
      width: shapeData.width,
      height: shapeData.height,
      fill: shapeData.fill || CONSTANTS.DEFAULT_SHAPE_FILL,
      createdBy: userId,
      createdAt: now,
      lastModifiedBy: userId,
      lastModifiedAt: now,
      isLocked: false,
      lockedBy: null,
      lockedAt: null,
    };

    // Only add optional properties if they have actual values
    if (shapeData.text !== undefined && shapeData.text !== null) {
      newShape.text = shapeData.text;
    }
    if (shapeData.fontSize !== undefined && shapeData.fontSize !== null) {
      newShape.fontSize = shapeData.fontSize;
    }
    if (shapeData.points !== undefined && shapeData.points !== null) {
      newShape.points = shapeData.points;
    }
    if (shapeData.pointerLength !== undefined && shapeData.pointerLength !== null) {
      newShape.pointerLength = shapeData.pointerLength;
    }
    if (shapeData.pointerWidth !== undefined && shapeData.pointerWidth !== null) {
      newShape.pointerWidth = shapeData.pointerWidth;
    }

    // Shape object built - ready for Firestore

    // Add shape to canvas document
    await updateDoc(canvasRef, {
      shapes: arrayUnion(newShape),
      'metadata.lastModifiedAt': now,
      'metadata.shapeCount': (canvasSnap.data()?.shapes?.length || 0) + 1,
    });

    console.log('✅ Shape created:', shapeId);
    return { success: true, shapeId };
  } catch (error) {
    console.error('❌ Error creating shape:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Task 4.2.3: Update shape position or properties
 *
 * Updates an existing shape's properties
 */
export async function updateShape(
  shapeId: string,
  updates: UpdateShapeData,
  userId: string,
  canvasId: string = CONSTANTS.GLOBAL_CANVAS_ID
): Promise<ShapeOperationResult> {
  try {
    const canvasRef = doc(db, CONSTANTS.COLLECTIONS.CANVASES, canvasId);
    const canvasSnap = await getDoc(canvasRef);

    if (!canvasSnap.exists()) {
      return { success: false, error: 'Canvas not found' };
    }

    const canvasData = canvasSnap.data() as CanvasDocument;
    const shapeIndex = canvasData.shapes.findIndex((s) => s.id === shapeId);

    if (shapeIndex === -1) {
      return { success: false, error: 'Shape not found' };
    }

    // Update shape
    const updatedShapes = [...canvasData.shapes];
    const now = Date.now();
    updatedShapes[shapeIndex] = {
      ...updatedShapes[shapeIndex],
      ...updates,
      lastModifiedBy: userId,
      lastModifiedAt: now,
    };

    await updateDoc(canvasRef, {
      shapes: updatedShapes,
      'metadata.lastModifiedAt': now,
    });

    console.log('✅ Shape updated:', shapeId);
    return { success: true, shapeId };
  } catch (error) {
    console.error('❌ Error updating shape:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * PR8a: Update multiple shapes at once (for multi-select operations)
 * This avoids race conditions when updating multiple shapes in parallel
 */
export async function updateMultipleShapes(
  updates: Array<{ shapeId: string; updates: UpdateShapeData }>,
  userId: string,
  canvasId: string = CONSTANTS.GLOBAL_CANVAS_ID
): Promise<ShapeOperationResult> {
  try {
    const canvasRef = doc(db, CONSTANTS.COLLECTIONS.CANVASES, canvasId);
    const canvasSnap = await getDoc(canvasRef);

    if (!canvasSnap.exists()) {
      return { success: false, error: 'Canvas not found' };
    }

    const canvasData = canvasSnap.data() as CanvasDocument;
    let updatedShapes = [...canvasData.shapes];
    const now = Date.now();

    // Apply all updates
    updates.forEach(({ shapeId, updates: shapeUpdates }) => {
      const shapeIndex = updatedShapes.findIndex((s) => s.id === shapeId);
      if (shapeIndex !== -1) {
        updatedShapes[shapeIndex] = {
          ...updatedShapes[shapeIndex],
          ...shapeUpdates,
          lastModifiedBy: userId,
          lastModifiedAt: now,
        };
      }
    });

    await updateDoc(canvasRef, {
      shapes: updatedShapes,
      'metadata.lastModifiedAt': now,
    });

    console.log(`✅ ${updates.length} shapes updated`);
    return { success: true };
  } catch (error) {
    console.error('❌ Error updating multiple shapes:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Task 4.2.4: Delete a shape
 *
 * Removes a shape from the canvas
 */
export async function deleteShape(
  shapeId: string,
  canvasId: string = CONSTANTS.GLOBAL_CANVAS_ID
): Promise<ShapeOperationResult> {
  try {
    const canvasRef = doc(db, CONSTANTS.COLLECTIONS.CANVASES, canvasId);
    const canvasSnap = await getDoc(canvasRef);

    if (!canvasSnap.exists()) {
      return { success: false, error: 'Canvas not found' };
    }

    const canvasData = canvasSnap.data() as CanvasDocument;
    const shapeToDelete = canvasData.shapes.find((s) => s.id === shapeId);

    if (!shapeToDelete) {
      return { success: false, error: 'Shape not found' };
    }

    const now = Date.now();

    await updateDoc(canvasRef, {
      shapes: arrayRemove(shapeToDelete),
      'metadata.lastModifiedAt': now,
      'metadata.shapeCount': canvasData.shapes.length - 1,
    });

    console.log('✅ Shape deleted:', shapeId);
    return { success: true, shapeId };
  } catch (error) {
    console.error('❌ Error deleting shape:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// ============================================================================
// Real-Time Subscription
// ============================================================================

/**
 * Task 4.2.5: Subscribe to real-time canvas updates
 *
 * Listens for changes to the canvas document and calls callback
 * Returns unsubscribe function
 */
export function subscribeToCanvas(
  callback: (shapes: Shape[]) => void,
  canvasId: string = CONSTANTS.GLOBAL_CANVAS_ID
): Unsubscribe {
  const canvasRef = doc(db, CONSTANTS.COLLECTIONS.CANVASES, canvasId);

  console.log('🔔 Subscribing to canvas updates:', canvasId);

  const unsubscribe = onSnapshot(
    canvasRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const canvasData = snapshot.data() as CanvasDocument;
        console.log('🔄 Canvas update received:', canvasData.shapes.length, 'shapes');
        callback(canvasData.shapes);
      } else {
        console.log('📭 Canvas document does not exist yet');
        callback([]);
      }
    },
    (error) => {
      console.error('❌ Error in canvas subscription:', error);
    }
  );

  return unsubscribe;
}

// ============================================================================
// Shape Locking Mechanism (PR4.4)
// ============================================================================

/**
 * Acquire lock on a shape (first-come-first-serve)
 *
 * Returns true if lock was acquired, false if already locked
 */
export async function acquireShapeLock(
  shapeId: string,
  userId: string,
  canvasId: string = CONSTANTS.GLOBAL_CANVAS_ID
): Promise<boolean> {
  try {
    const canvasRef = doc(db, CONSTANTS.COLLECTIONS.CANVASES, canvasId);
    const canvasSnap = await getDoc(canvasRef);

    if (!canvasSnap.exists()) {
      return false;
    }

    const canvasData = canvasSnap.data() as CanvasDocument;
    const shapeIndex = canvasData.shapes.findIndex((s) => s.id === shapeId);

    if (shapeIndex === -1) {
      return false;
    }

    const shape = canvasData.shapes[shapeIndex];

    // Check if shape is already locked by another user
    if (shape.isLocked && shape.lockedBy !== userId) {
      // Check if lock has expired (30 seconds)
      const now = Date.now();
      if (shape.lockedAt && now - shape.lockedAt < CONSTANTS.LOCK_TIMEOUT_MS) {
        console.log('🔒 Shape already locked by another user:', shape.lockedBy);
        return false;
      }
    }

    // Acquire lock
    const updatedShapes = [...canvasData.shapes];
    updatedShapes[shapeIndex] = {
      ...shape,
      isLocked: true,
      lockedBy: userId,
      lockedAt: Date.now(),
    };

    await updateDoc(canvasRef, {
      shapes: updatedShapes,
      'metadata.lastModifiedAt': Date.now(),
    });

    console.log('🔓 Lock acquired for shape:', shapeId);
    return true;
  } catch (error) {
    console.error('❌ Error acquiring lock:', error);
    return false;
  }
}

/**
 * Release lock on a shape
 */
export async function releaseShapeLock(
  shapeId: string,
  userId: string,
  canvasId: string = CONSTANTS.GLOBAL_CANVAS_ID
): Promise<boolean> {
  try {
    const canvasRef = doc(db, CONSTANTS.COLLECTIONS.CANVASES, canvasId);
    const canvasSnap = await getDoc(canvasRef);

    if (!canvasSnap.exists()) {
      return false;
    }

    const canvasData = canvasSnap.data() as CanvasDocument;
    const shapeIndex = canvasData.shapes.findIndex((s) => s.id === shapeId);

    if (shapeIndex === -1) {
      return false;
    }

    const shape = canvasData.shapes[shapeIndex];

    // Only release if locked by this user
    if (!shape.isLocked || shape.lockedBy !== userId) {
      console.log('⚠️ Cannot release lock - not owned by user');
      return false;
    }

    // Release lock
    const updatedShapes = [...canvasData.shapes];
    updatedShapes[shapeIndex] = {
      ...shape,
      isLocked: false,
      lockedBy: null,
      lockedAt: null,
    };

    await updateDoc(canvasRef, {
      shapes: updatedShapes,
      'metadata.lastModifiedAt': Date.now(),
    });

    console.log('🔓 Lock released for shape:', shapeId);
    return true;
  } catch (error) {
    console.error('❌ Error releasing lock:', error);
    return false;
  }
}

/**
 * Get lock status for a shape
 */
export async function getShapeLockStatus(
  shapeId: string,
  canvasId: string = CONSTANTS.GLOBAL_CANVAS_ID
): Promise<LockStatus | null> {
  try {
    const canvasRef = doc(db, CONSTANTS.COLLECTIONS.CANVASES, canvasId);
    const canvasSnap = await getDoc(canvasRef);

    if (!canvasSnap.exists()) {
      return null;
    }

    const canvasData = canvasSnap.data() as CanvasDocument;
    const shape = canvasData.shapes.find((s) => s.id === shapeId);

    if (!shape) {
      return null;
    }

    return {
      isLocked: shape.isLocked,
      lockedBy: shape.lockedBy,
      lockedAt: shape.lockedAt,
    };
  } catch (error) {
    console.error('❌ Error getting lock status:', error);
    return null;
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Get all shapes from canvas (one-time read)
 */
export async function getAllShapes(
  canvasId: string = CONSTANTS.GLOBAL_CANVAS_ID
): Promise<Shape[]> {
  try {
    const canvasRef = doc(db, CONSTANTS.COLLECTIONS.CANVASES, canvasId);
    const canvasSnap = await getDoc(canvasRef);

    if (!canvasSnap.exists()) {
      console.log('📭 Canvas does not exist, returning empty array');
      return [];
    }

    const canvasData = canvasSnap.data() as CanvasDocument;
    return canvasData.shapes || [];
  } catch (error) {
    console.error('❌ Error getting shapes:', error);
    return [];
  }
}

/**
 * Clear all shapes from canvas (for testing/reset)
 */
export async function clearAllShapes(
  canvasId: string = CONSTANTS.GLOBAL_CANVAS_ID
): Promise<boolean> {
  try {
    const canvasRef = doc(db, CONSTANTS.COLLECTIONS.CANVASES, canvasId);
    await updateDoc(canvasRef, {
      shapes: [],
      'metadata.lastModifiedAt': Date.now(),
      'metadata.shapeCount': 0,
    });

    console.log('🗑️ All shapes cleared from canvas');
    return true;
  } catch (error) {
    console.error('❌ Error clearing shapes:', error);
    return false;
  }
}
