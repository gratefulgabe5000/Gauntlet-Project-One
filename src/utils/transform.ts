/**
 * Transform Utilities
 * 
 * Phase 2b: Figma-Inspired Transform Operations
 * Task 8b.1.2: Corner resize logic with aspect ratio support
 * Task 8b.2.2: Rotation logic with angle snapping
 * 
 * Features:
 * - Diagonal resize calculations for corner handles
 * - Aspect ratio locking with Shift key
 * - Minimum size constraints (10px × 10px)
 * - Real-time bounds calculation
 * - Rotation angle calculation from mouse position
 * - 15° angle snapping with Shift key
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
  const cursors: Record<HandleType, string> = {
    nw: 'nw-resize',
    n: 'n-resize', 
    ne: 'ne-resize',
    e: 'e-resize',
    se: 'se-resize',
    s: 's-resize',
    sw: 'sw-resize',
    w: 'w-resize',
    rotate: 'grab',
  };
  
  return cursors[handleType] || 'default';
}

/**
 * Calculate rotation angle from shape center to mouse position
 * Task 8b.2.2: Rotation logic
 * 
 * @param centerX - X coordinate of shape center
 * @param centerY - Y coordinate of shape center
 * @param mouseX - X coordinate of mouse position
 * @param mouseY - Y coordinate of mouse position
 * @returns Rotation angle in degrees (0-360)
 */
export function calculateRotationAngle(
  centerX: number,
  centerY: number,
  mouseX: number,
  mouseY: number
): number {
  // Calculate angle using arctangent
  // atan2 returns radians in range [-PI, PI]
  const radians = Math.atan2(mouseY - centerY, mouseX - centerX);
  
  // Convert to degrees
  let degrees = radians * (180 / Math.PI);
  
  // Konva rotation: 0° = pointing right (3 o'clock), increases clockwise
  // atan2: 0° = pointing right (3 o'clock), increases counter-clockwise
  // We need to maintain the natural atan2 behavior for intuitive rotation
  
  // Normalize to 0-360 range
  if (degrees < 0) {
    degrees += 360;
  }
  
  return degrees;
}

/**
 * Snap rotation angle to nearest increment
 * Task 8b.2.2: Shift-snap to 15° increments
 * 
 * @param angle - Current rotation angle in degrees
 * @param snapIncrement - Degree increment to snap to (default: 15)
 * @returns Snapped angle in degrees
 */
export function snapRotationAngle(angle: number, snapIncrement: number = 15): number {
  return Math.round(angle / snapIncrement) * snapIncrement;
}

/**
 * Format rotation angle for display
 * 
 * @param angle - Rotation angle in degrees
 * @returns Formatted string (e.g., "45°" or "0°")
 */
export function formatRotationAngle(angle: number): string {
  // Round to nearest degree for display
  const rounded = Math.round(angle);
  return `${rounded}°`;
}

/**
 * Calculate rotation-aware resize keeping opposite anchor fixed
 * 
 * When resizing a rotated shape, the opposite corner/edge should stay fixed
 * and the dragged edge should follow the cursor. This requires transforming
 * coordinates between world space and the shape's local rotated space.
 * 
 * @param handleType - Which handle is being dragged
 * @param bounds - Current shape bounds (top-left x,y, width, height)
 * @param rotation - Current rotation in degrees
 * @param cursorX - Current cursor X in world space
 * @param cursorY - Current cursor Y in world space
 * @returns New bounds with anchor point preserved
 */
export function calculateRotationAwareResize(
  handleType: HandleType,
  bounds: Bounds,
  rotation: number,
  cursorX: number,
  cursorY: number,
  startCursorX: number,
  startCursorY: number
): Bounds {
  // Convert rotation to radians
  const rad = (rotation * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  
  // Calculate shape center (pivot point for rotation)
  const centerX = bounds.x + bounds.width / 2;
  const centerY = bounds.y + bounds.height / 2;
  
  // Determine anchor point in local space (opposite of dragged handle)
  const anchorLocal = getAnchorPoint(handleType);
  
  // Convert anchor from local space (-0.5 to 0.5) to world space
  const anchorWorldX = centerX + (anchorLocal.x * bounds.width * cos - anchorLocal.y * bounds.height * sin);
  const anchorWorldY = centerY + (anchorLocal.x * bounds.width * sin + anchorLocal.y * bounds.height * cos);
  
  // Calculate cursor delta in world space
  const deltaWorldX = cursorX - startCursorX;
  const deltaWorldY = cursorY - startCursorY;
  
  // Transform delta to local space
  const deltaLocalX = deltaWorldX * cos + deltaWorldY * sin;
  const deltaLocalY = -deltaWorldX * sin + deltaWorldY * cos;
  
  // Calculate new dimensions by applying delta (allow negative for mirroring)
  let newWidth = bounds.width;
  let newHeight = bounds.height;
  
  if (handleType === 'e' || handleType === 'ne' || handleType === 'se') {
    // Right edge: add delta to width
    newWidth = bounds.width + deltaLocalX;
  } else if (handleType === 'w' || handleType === 'nw' || handleType === 'sw') {
    // Left edge: subtract delta from width
    newWidth = bounds.width - deltaLocalX;
  }
  
  if (handleType === 's' || handleType === 'se' || handleType === 'sw') {
    // Bottom edge: add delta to height
    newHeight = bounds.height + deltaLocalY;
  } else if (handleType === 'n' || handleType === 'ne' || handleType === 'nw') {
    // Top edge: subtract delta from height
    newHeight = bounds.height - deltaLocalY;
  }
  
  // Calculate new center position that keeps anchor point fixed
  // New local anchor position (in new size)
  const newAnchorLocalX = anchorLocal.x * newWidth;
  const newAnchorLocalY = anchorLocal.y * newHeight;
  
  // New center = anchor world position - rotated anchor local position
  const newCenterX = anchorWorldX - (newAnchorLocalX * cos - newAnchorLocalY * sin);
  const newCenterY = anchorWorldY - (newAnchorLocalX * sin + newAnchorLocalY * cos);
  
  // Convert center to top-left
  const newX = newCenterX - newWidth / 2;
  const newY = newCenterY - newHeight / 2;
  
  return {
    x: newX,
    y: newY,
    width: newWidth,
    height: newHeight,
  };
}

/**
 * Get anchor point in local space for a given handle type
 * Returns coordinates in range [-0.5, 0.5] relative to shape center
 */
function getAnchorPoint(handleType: HandleType): { x: number; y: number } {
  const anchors: Record<HandleType, { x: number; y: number }> = {
    'nw': { x: 0.5, y: 0.5 },   // Opposite is SE (bottom-right)
    'n':  { x: 0, y: 0.5 },     // Opposite is S (bottom)
    'ne': { x: -0.5, y: 0.5 },  // Opposite is SW (bottom-left)
    'e':  { x: -0.5, y: 0 },    // Opposite is W (left)
    'se': { x: -0.5, y: -0.5 }, // Opposite is NW (top-left)
    's':  { x: 0, y: -0.5 },    // Opposite is N (top)
    'sw': { x: 0.5, y: -0.5 },  // Opposite is NE (top-right)
    'w':  { x: 0.5, y: 0 },     // Opposite is E (right)
    'rotate': { x: 0, y: 0 },   // Not used for resize
  };
  
  return anchors[handleType];
}

/**
 * Get handle position in local space for a given handle type
 * Returns coordinates in range [-0.5, 0.5] relative to shape center
 */
function getHandlePosition(handleType: HandleType): { x: number; y: number } {
  const positions: Record<HandleType, { x: number; y: number }> = {
    'nw': { x: -0.5, y: -0.5 },  // Top-left
    'n':  { x: 0, y: -0.5 },     // Top center
    'ne': { x: 0.5, y: -0.5 },   // Top-right
    'e':  { x: 0.5, y: 0 },      // Right center
    'se': { x: 0.5, y: 0.5 },    // Bottom-right
    's':  { x: 0, y: 0.5 },      // Bottom center
    'sw': { x: -0.5, y: 0.5 },   // Bottom-left
    'w':  { x: -0.5, y: 0 },     // Left center
    'rotate': { x: 0, y: -0.5 }, // Top center (same as N)
  };
  
  return positions[handleType];
}

/**
 * Normalize bounds to handle negative dimensions (mirroring/flipping)
 * 
 * When a user drags a resize handle past the opposite edge, the width or height
 * becomes negative. This function flips the dimension back to positive and adjusts
 * the position accordingly, creating a mirror effect.
 * 
 * @param bounds - Bounds that may have negative width or height
 * @returns Normalized bounds with positive dimensions
 */
export function normalizeBounds(bounds: Bounds): Bounds {
  const normalized = { ...bounds };
  
  // Handle negative width (horizontal flip)
  if (normalized.width < 0) {
    normalized.x = normalized.x + normalized.width; // Move x to the new left edge
    normalized.width = Math.abs(normalized.width);
  }
  
  // Handle negative height (vertical flip)
  if (normalized.height < 0) {
    normalized.y = normalized.y + normalized.height; // Move y to the new top edge
    normalized.height = Math.abs(normalized.height);
  }
  
  return normalized;
}

/**
 * Normalize bounds for Line/Arrow shapes, keeping anchor point fixed
 * 
 * For Line and Arrow shapes with only two endpoints (NW and SE handles),
 * the opposite endpoint (anchor) must remain absolutely fixed in world space
 * while the dragged endpoint always follows the cursor.
 * 
 * CRITICAL: We preserve the endpoint structure without swapping corners:
 * - NW handle is always at (x, y) - Endpoint 1
 * - SE handle is always at (x + width, y + height) - Endpoint 2
 * 
 * When dragging SE: x,y stays at anchor (NW from startBounds), width/height are deltas to cursor
 * When dragging NW: x,y follows cursor, width/height are deltas to anchor (SE from startBounds)
 * 
 * Width/height may be NEGATIVE after crossing - this is intentional!
 * Konva Line can handle negative points.
 * 
 * @param bounds - Current bounds (may have negative width/height after crossing anchor)
 * @param handleType - The handle being dragged ('nw' or 'se')
 * @param startBounds - Original bounds at the start of the drag (MUST be provided)
 * @returns Bounds preserving endpoint structure (may have negative dimensions)
 */
export function normalizeBoundsWithAnchor(bounds: Bounds, handleType: HandleType, startBounds: Bounds): Bounds {
  // Calculate anchor point from ORIGINAL startBounds (never changes during drag)
  // If dragging SE: anchor is NW corner (startBounds.x, startBounds.y)
  // If dragging NW: anchor is SE corner (startBounds.x + startBounds.width, startBounds.y + startBounds.height)
  const anchorX = handleType === 'se' ? startBounds.x : startBounds.x + startBounds.width;
  const anchorY = handleType === 'se' ? startBounds.y : startBounds.y + startBounds.height;
  
  // Calculate dragged point from CURRENT bounds
  // If dragging SE: dragged point is SE corner (bounds.x + bounds.width, bounds.y + bounds.height)
  // If dragging NW: dragged point is NW corner (bounds.x, bounds.y)
  const draggedX = handleType === 'se' ? bounds.x + bounds.width : bounds.x;
  const draggedY = handleType === 'se' ? bounds.y + bounds.height : bounds.y;
  
  // Build new bounds preserving endpoint structure:
  // - When dragging SE: NW (x,y) = anchor, SE (x+w, y+h) = dragged
  // - When dragging NW: NW (x,y) = dragged, SE (x+w, y+h) = anchor
  if (handleType === 'se') {
    // Dragging SE: anchor (NW) stays at (anchorX, anchorY)
    return {
      x: anchorX,
      y: anchorY,
      width: draggedX - anchorX,  // Can be negative
      height: draggedY - anchorY, // Can be negative
    };
  } else {
    // Dragging NW: dragged point at (draggedX, draggedY), anchor (SE) at (anchorX, anchorY)
    return {
      x: draggedX,
      y: draggedY,
      width: anchorX - draggedX,  // Can be negative
      height: anchorY - draggedY, // Can be negative
    };
  }
}
