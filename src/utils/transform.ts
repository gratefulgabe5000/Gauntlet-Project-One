/**
 * Transform Utilities
 * 
 * Phase 2b: Figma-Inspired Transform Operations
 * Task 8b.1.2: Corner resize logic with aspect ratio support
 * 
 * Features:
 * - Diagonal resize calculations for corner handles
 * - Aspect ratio locking with Shift key
 * - Minimum size constraints (10px × 10px)
 * - Real-time bounds calculation
 */

import type { HandleType } from '../components/TransformHandles';

export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TransformOptions {
  /** Whether to maintain aspect ratio (Shift key pressed) */
  maintainAspectRatio?: boolean;
  /** Minimum width/height constraints */
  minSize?: number;
  /** Original bounds for aspect ratio calculations */
  originalBounds?: Bounds;
}

const DEFAULT_MIN_SIZE = 10;

/**
 * Calculate new bounds when resizing from corner handles
 */
export function calculateCornerResize(
  handleType: HandleType,
  originalBounds: Bounds,
  deltaX: number,
  deltaY: number,
  options: TransformOptions = {}
): Bounds {
  const { maintainAspectRatio = false, minSize = DEFAULT_MIN_SIZE } = options;
  
  let newBounds = { ...originalBounds };

  // Calculate new dimensions based on handle type
  switch (handleType) {
    case 'nw': // Northwest corner
      newBounds.x = originalBounds.x + deltaX;
      newBounds.y = originalBounds.y + deltaY;
      newBounds.width = originalBounds.width - deltaX;
      newBounds.height = originalBounds.height - deltaY;
      break;
      
    case 'ne': // Northeast corner  
      newBounds.y = originalBounds.y + deltaY;
      newBounds.width = originalBounds.width + deltaX;
      newBounds.height = originalBounds.height - deltaY;
      break;
      
    case 'se': // Southeast corner
      newBounds.width = originalBounds.width + deltaX;
      newBounds.height = originalBounds.height + deltaY;
      break;
      
    case 'sw': // Southwest corner
      newBounds.x = originalBounds.x + deltaX;
      newBounds.width = originalBounds.width - deltaX;
      newBounds.height = originalBounds.height + deltaY;
      break;
      
    default:
      // Not a corner handle, return original bounds
      return originalBounds;
  }

  // Apply aspect ratio locking if requested
  if (maintainAspectRatio) {
    newBounds = applyAspectRatioLock(newBounds, originalBounds, handleType);
  }

  // Apply minimum size constraints
  newBounds = applyMinimumSizeConstraints(newBounds, originalBounds, minSize, handleType);

  return newBounds;
}

/**
 * Calculate new bounds when resizing from edge handles
 */
export function calculateEdgeResize(
  handleType: HandleType,
  originalBounds: Bounds,
  deltaX: number,
  deltaY: number,
  options: TransformOptions = {}
): Bounds {
  const { minSize = DEFAULT_MIN_SIZE } = options;
  
  let newBounds = { ...originalBounds };

  // Calculate new dimensions based on handle type
  switch (handleType) {
    case 'n': // North edge
      newBounds.y = originalBounds.y + deltaY;
      newBounds.height = originalBounds.height - deltaY;
      break;
      
    case 'e': // East edge
      newBounds.width = originalBounds.width + deltaX;
      break;
      
    case 's': // South edge
      newBounds.height = originalBounds.height + deltaY;
      break;
      
    case 'w': // West edge
      newBounds.x = originalBounds.x + deltaX;
      newBounds.width = originalBounds.width - deltaX;
      break;
      
    default:
      // Not an edge handle, return original bounds
      return originalBounds;
  }

  // Apply minimum size constraints
  newBounds = applyMinimumSizeConstraints(newBounds, originalBounds, minSize, handleType);

  return newBounds;
}

/**
 * Apply aspect ratio locking to maintain proportions
 */
function applyAspectRatioLock(
  newBounds: Bounds,
  originalBounds: Bounds,
  handleType: HandleType
): Bounds {
  const originalAspectRatio = originalBounds.width / originalBounds.height;
  
  // For corner resizing, use the dimension that changed most
  const widthRatio = newBounds.width / originalBounds.width;
  const heightRatio = newBounds.height / originalBounds.height;
  
  // Use the smaller ratio to ensure we don't exceed intended size
  const ratio = Math.min(Math.abs(widthRatio), Math.abs(heightRatio));
  
  const lockedBounds = { ...newBounds };
  
  switch (handleType) {
    case 'nw':
      lockedBounds.width = originalBounds.width * ratio;
      lockedBounds.height = originalBounds.height * ratio;
      lockedBounds.x = originalBounds.x + originalBounds.width - lockedBounds.width;
      lockedBounds.y = originalBounds.y + originalBounds.height - lockedBounds.height;
      break;
      
    case 'ne':
      lockedBounds.width = originalBounds.width * ratio;
      lockedBounds.height = originalBounds.height * ratio;
      lockedBounds.y = originalBounds.y + originalBounds.height - lockedBounds.height;
      break;
      
    case 'se':
      lockedBounds.width = originalBounds.width * ratio;
      lockedBounds.height = originalBounds.height * ratio;
      break;
      
    case 'sw':
      lockedBounds.width = originalBounds.width * ratio;
      lockedBounds.height = originalBounds.height * ratio;
      lockedBounds.x = originalBounds.x + originalBounds.width - lockedBounds.width;
      break;
  }
  
  return lockedBounds;
}

/**
 * Apply minimum size constraints to prevent shapes from becoming too small
 */
function applyMinimumSizeConstraints(
  newBounds: Bounds,
  originalBounds: Bounds,
  minSize: number,
  handleType: HandleType
): Bounds {
  const constrainedBounds = { ...newBounds };
  
  // Enforce minimum width
  if (constrainedBounds.width < minSize) {
    constrainedBounds.width = minSize;
    
    // Adjust position for handles that affect the left edge
    if (handleType === 'nw' || handleType === 'sw' || handleType === 'w') {
      constrainedBounds.x = originalBounds.x + originalBounds.width - minSize;
    }
  }
  
  // Enforce minimum height
  if (constrainedBounds.height < minSize) {
    constrainedBounds.height = minSize;
    
    // Adjust position for handles that affect the top edge
    if (handleType === 'nw' || handleType === 'ne' || handleType === 'n') {
      constrainedBounds.y = originalBounds.y + originalBounds.height - minSize;
    }
  }
  
  return constrainedBounds;
}

/**
 * Check if a handle is a corner handle
 */
export function isCornerHandle(handleType: HandleType): boolean {
  return ['nw', 'ne', 'se', 'sw'].includes(handleType);
}

/**
 * Check if a handle is an edge handle
 */
export function isEdgeHandle(handleType: HandleType): boolean {
  return ['n', 'e', 's', 'w'].includes(handleType);
}

/**
 * Calculate the delta (change) in position from drag event
 */
export function calculateDragDelta(
  startX: number,
  startY: number,
  currentX: number,
  currentY: number
): { deltaX: number; deltaY: number } {
  return {
    deltaX: currentX - startX,
    deltaY: currentY - startY,
  };
}

/**
 * Get the appropriate cursor style for a handle type
 */
export function getCursorForHandle(handleType: HandleType): string {
  const cursors = {
    nw: 'nw-resize',
    n: 'n-resize', 
    ne: 'ne-resize',
    e: 'e-resize',
    se: 'se-resize',
    s: 's-resize',
    sw: 'sw-resize',
    w: 'w-resize',
  };
  
  return cursors[handleType] || 'default';
}
