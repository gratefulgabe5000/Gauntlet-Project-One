import { Group, Arrow as KonvaArrow } from 'react-konva';
import React, { useRef, useState, useEffect } from 'react';
import type { Shape } from '../services/types';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../utils/helpers';
import TransformHandles, { type HandleType } from './TransformHandles';
import { type Bounds, snapRotationAngle, normalizeBoundsWithAnchor } from '../utils/transform';

/**
 * Arrow Component - Individual draggable arrow shape
 *
 * PR8a.1.2: Arrow shape component (Phase 2a)
 *
 * Features:
 * - Renders an arrow with Konva Arrow (includes arrowhead)
 * - Click to select
 * - Drag to move
 * - Visual selection feedback
 * - Boundary validation
 * - Default: 2px stroke, black color, 10px pointer length
 */

interface ArrowProps {
  shape: Shape;
  isSelected: boolean;
  onSelect: (e?: any) => void; // PR8a: Pass event for shift-click detection
  onDragStart: (e?: any) => void; // PR8a: Pass event for shift-drag duplication
  onDragEnd: (id: string, x: number, y: number) => void;
  onUpdateShape?: (id: string, updates: Partial<Shape>) => void; // Phase 2b: Shape resize updates
  onRightClick?: (e: any) => void;
}

const Arrow = ({ shape, isSelected, onSelect, onDragStart, onDragEnd, onUpdateShape, onRightClick }: ArrowProps) => {
  // Local state for visual updates during resize (real-time visual feedback)
  const [localBounds, setLocalBounds] = useState({
    x: shape.x,
    y: shape.y,
    width: shape.width,
    height: shape.height,
  });

  // Task 8b.2.3: Local state for rotation (separate from resize)
  const [localRotation, setLocalRotation] = useState(shape.rotation || 0);

  // Track drag state to hide handles during drag
  const [isDragging, setIsDragging] = useState(false);

  // State to track resize operation
  const [resizeState, setResizeState] = useState<{
    isResizing: boolean;
    pendingNetworkUpdate: boolean;
    startBounds: Bounds | null;
    startPointer: { x: number; y: number } | null;
    handleType: HandleType | null;
    startRotation?: number; // Task 8b.2.3: Store starting rotation for relative calculation
    startAngle?: number; // Task 8b.2.3: Store starting mouse angle for delta calculation
  }>({
    isResizing: false,
    pendingNetworkUpdate: false,
    startBounds: null,
    startPointer: null,
    handleType: null,
  });

  // Sync with shape prop changes (from network updates)
  // BUT NOT during active resize operations or pending network updates
  useEffect(() => {
    // Don't overwrite local visual state during resize or while waiting for network update
    if (resizeState.isResizing || resizeState.pendingNetworkUpdate) {
      return;
    }
    
    setLocalBounds({
      x: shape.x,
      y: shape.y,
      width: shape.width,
      height: shape.height,
    });
    
    // Task 8b.2.3: Sync rotation from network updates
    setLocalRotation(shape.rotation || 0);
    
  }, [shape.x, shape.y, shape.width, shape.height, shape.rotation, isSelected, resizeState.isResizing, resizeState.pendingNetworkUpdate]);

  // Clear pendingNetworkUpdate when shape props change (indicating network update completed)
  useEffect(() => {
    if (resizeState.pendingNetworkUpdate) {
      setResizeState(prev => ({ ...prev, pendingNetworkUpdate: false }));
    }
  }, [shape.x, shape.y, shape.width, shape.height]);
  const handleDragStart = (e: any) => {
    // Prevent event from bubbling to stage
    e.cancelBubble = true;
    // Hide handles during drag
    setIsDragging(true);
    // Notify parent that shape dragging started (pass event for shift-drag detection)
    onDragStart(e);
  };

  const handleDragEnd = (e: any) => {
    const centerX = e.target.x();
    const centerY = e.target.y();

    // Task 8b.2.3: Convert from center-pivot to top-left for storage
    const halfWidth = localBounds.width / 2;
    const halfHeight = localBounds.height / 2;
    const topLeftX = centerX - halfWidth;
    const topLeftY = centerY - halfHeight;

    // Constrain position within canvas boundaries (use localBounds for current size)
    const constrained = {
      x: Math.max(0, Math.min(CANVAS_WIDTH - localBounds.width, topLeftX)),
      y: Math.max(0, Math.min(CANVAS_HEIGHT - localBounds.height, topLeftY)),
    };

    // Set the shape's position to constrained center values
    e.target.x(constrained.x + halfWidth);
    e.target.y(constrained.y + halfHeight);

    // Task 8b.2.3: Preserve rotation when dragging
    if (onUpdateShape) {
      onUpdateShape(shape.id, { x: constrained.x, y: constrained.y, rotation: localRotation });
    } else {
      onDragEnd(shape.id, constrained.x, constrained.y);
    }
    
    // Show handles again after drag
    setIsDragging(false);
  };

  // Constrain arrow position during drag
  const handleDragBound = (pos: { x: number; y: number }) => {
    // Task 8b.2.3: Convert from center-pivot to top-left for constraint checking
    const halfWidth = localBounds.width / 2;
    const halfHeight = localBounds.height / 2;
    const topLeftX = pos.x - halfWidth;
    const topLeftY = pos.y - halfHeight;
    
    const constrained = {
      x: Math.max(0, Math.min(CANVAS_WIDTH - localBounds.width, topLeftX)),
      y: Math.max(0, Math.min(CANVAS_HEIGHT - localBounds.height, topLeftY)),
    };
    
    // Convert back to center-pivot
    return {
      x: constrained.x + halfWidth,
      y: constrained.y + halfHeight,
    };
  };

  // Phase 2b: Handle resize operations via transform handles
  const handleResizeDragStart = (handleType: HandleType, e: any) => {
    // Prevent event bubbling to canvas (stop pan)
    e.evt.stopPropagation();
    e.cancelBubble = true;

    const stage = e.target.getStage();
    if (!stage) return;

    const pointerPos = stage.getPointerPosition();
    if (!pointerPos) return;

    // Task 8b.2.3: Handle rotation separately
    if (handleType === 'rotate') {
      // Calculate shape center
      const centerX = localBounds.x + localBounds.width / 2;
      const centerY = localBounds.y + localBounds.height / 2;
      
      // Calculate starting angle from 12 o'clock (top), measured clockwise
      const dx = pointerPos.x - centerX;
      const dy = pointerPos.y - centerY;
      const startAngle = Math.atan2(dx, -dy) * (180 / Math.PI);
      
      // Record that we're rotating with starting angle and current rotation
      setResizeState({
        isResizing: true,
        pendingNetworkUpdate: false,
        startBounds: { ...localBounds },
        startPointer: { x: pointerPos.x, y: pointerPos.y },
        handleType: 'rotate',
        startRotation: localRotation, // Store current rotation
        startAngle: startAngle, // Store starting mouse angle
      });
      return;
    }

    // For Line/Arrow: If rotated, flatten rotation into endpoint positions before resize
    let boundsToUse = { ...localBounds };
    if (Math.abs(localRotation) > 1) {
      // Calculate shape center (current pivot)
      const centerX = localBounds.x + localBounds.width / 2;
      const centerY = localBounds.y + localBounds.height / 2;
      
      // Convert rotation to radians
      const rad = (localRotation * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      
      // Calculate endpoint positions in LOCAL space (relative to center, before rotation)
      const localNW_X = -localBounds.width / 2;
      const localNW_Y = -localBounds.height / 2;
      const localSE_X = localBounds.width / 2;
      const localSE_Y = localBounds.height / 2;
      
      // Rotate to get WORLD positions (where endpoints actually are after rotation)
      const worldNW_X = centerX + (localNW_X * cos - localNW_Y * sin);
      const worldNW_Y = centerY + (localNW_X * sin + localNW_Y * cos);
      const worldSE_X = centerX + (localSE_X * cos - localSE_Y * sin);
      const worldSE_Y = centerY + (localSE_X * sin + localSE_Y * cos);
      
      // Build new bounds from world endpoints with rotation = 0
      // NW at (x, y), SE at (x + width, y + height)
      boundsToUse = {
        x: worldNW_X,
        y: worldNW_Y,
        width: worldSE_X - worldNW_X,
        height: worldSE_Y - worldNW_Y,
      };
      
      // Reset rotation to 0 immediately
      setLocalRotation(0);
      setLocalBounds(boundsToUse);
    }

    // Record initial state for drag delta calculation
    setResizeState({
      isResizing: true,
      pendingNetworkUpdate: false,
      startBounds: boundsToUse,
      startPointer: { x: pointerPos.x, y: pointerPos.y },
      handleType: handleType,
    });
  };

  const handleResizeDragMove = (handleType: HandleType, e: any) => {
    // Prevent event bubbling to canvas (stop pan)
    e.evt.stopPropagation();
    e.cancelBubble = true;

    if (!onUpdateShape || !resizeState.isResizing || !resizeState.startBounds || !resizeState.startPointer) return;

    const stage = e.target.getStage();
    if (!stage) return;

    const scale = stage.scaleX() || 1;
    const pointerPos = stage.getPointerPosition();
    if (!pointerPos) return;

    // Task 8b.2.3: Handle rotation - ABSOLUTE ANGLE to align handle with cursor
    // For Arrow, rotation handle is at center
    if (handleType === 'rotate') {
      if (resizeState.startAngle === undefined || resizeState.startRotation === undefined) return;
      
      // Calculate shape center
      const centerX = localBounds.x + localBounds.width / 2;
      const centerY = localBounds.y + localBounds.height / 2;
      
      // Calculate current angle from 12 o'clock (top), measured clockwise
      const dx = pointerPos.x - centerX;
      const dy = pointerPos.y - centerY;
      const currentAngle = Math.atan2(dx, -dy) * (180 / Math.PI);
      
      // Calculate delta from starting angle
      let deltaAngle = currentAngle - resizeState.startAngle;
      
      // Normalize delta to -180 to 180 range
      while (deltaAngle > 180) deltaAngle -= 360;
      while (deltaAngle < -180) deltaAngle += 360;
      
      // Apply sensitivity based on zoom level
      const sensitivity = 1.75 / scale;
      const adjustedDelta = deltaAngle * sensitivity;
      
      // Calculate new rotation by adding delta to starting rotation
      let newRotation = resizeState.startRotation + adjustedDelta;
      
      // Normalize to 0-360 range
      while (newRotation < 0) newRotation += 360;
      while (newRotation >= 360) newRotation -= 360;
      
      // Snap to 15° increments if Shift is held
      if (e.evt?.shiftKey) {
        newRotation = snapRotationAngle(newRotation, 15);
      }
      
      // Update local rotation state for immediate feedback
      setLocalRotation(newRotation);
      return;
    }

    // Line/Arrow resize is now always in non-rotated space (rotation flattened on drag start)
    // Calculate drag delta from start position
    const deltaX = pointerPos.x - resizeState.startPointer.x;
    const deltaY = pointerPos.y - resizeState.startPointer.y;

    // Start with original bounds
    const startBounds = resizeState.startBounds;
    let newBounds: Bounds = { ...startBounds };

    // Apply delta based on handle type with proper anchor points (allow negative for mirroring)
    // Line/Arrow only use 'nw' and 'se' handles
    switch (handleType) {
    case 'se': // Bottom-right corner: expand right and down
      newBounds.width = startBounds.width + deltaX;
      newBounds.height = startBounds.height + deltaY;
      break;
      
    case 'nw': // Top-left corner: expand left and up
      const newWidthNW = startBounds.width - deltaX;
      const newHeightNW = startBounds.height - deltaY;
      newBounds.x = startBounds.x + startBounds.width - newWidthNW;
      newBounds.y = startBounds.y + startBounds.height - newHeightNW;
      newBounds.width = newWidthNW;
      newBounds.height = newHeightNW;
      break;
      
    default:
      return;
    }
    
    // Normalize bounds to handle negative dimensions (mirroring) with fixed anchor
    newBounds = normalizeBoundsWithAnchor(newBounds, handleType, resizeState.startBounds);

    // Update local bounds for immediate visual feedback
    setLocalBounds(newBounds);

    // NOTE: Don't call onUpdateShape here - save only at drag END to avoid race conditions
  };

  const handleResizeDragEnd = (handleType: HandleType, e: any) => {
    // Prevent event bubbling to canvas
    e.evt.stopPropagation();
    e.cancelBubble = true;
    
    if (!onUpdateShape) return;
    
    // Task 8b.2.3: Handle rotation end separately
    if (handleType === 'rotate') {
      // Save final rotation to Firestore
      setResizeState({
        isResizing: false,
        pendingNetworkUpdate: true,
        startBounds: null,
        startPointer: null,
        handleType: null,
      });
      
      onUpdateShape(shape.id, { rotation: localRotation });
      return;
    }
    
    // Save final bounds to Firestore (rotation is always 0 after flatten)
    const finalBounds = { ...localBounds };
    
    // Set pending network update to prevent visual blip
    setResizeState({
      isResizing: false,
      pendingNetworkUpdate: true,
      startBounds: null,
      startPointer: null,
      handleType: null,
    });
    
    // Now save the final result to Firestore with rotation: 0 (flattened)
    onUpdateShape(shape.id, { ...finalBounds, rotation: 0 });
  };

  // Calculate arrow points relative to shape position (use local bounds for immediate feedback)
  // Arrow is drawn from top-left to bottom-right of bounding box
  // Konva Arrow automatically adds arrowhead at the end point
  const points = [0, 0, localBounds.width, localBounds.height];

  return (
    <Group>
      <KonvaArrow
        id={shape.id}
        x={localBounds.x + localBounds.width / 2}
        y={localBounds.y + localBounds.height / 2}
        offsetX={localBounds.width / 2}
        offsetY={localBounds.height / 2}
        rotation={localRotation}
        points={points}
        // Arrow styling
        stroke={shape.fill || '#000000'}
        fill={shape.fill || '#000000'} // Fill for arrowhead
        strokeWidth={isSelected ? 4 : 2}
        lineCap="round"
        lineJoin="round"
        // Arrowhead properties
        pointerLength={10}
        pointerWidth={10}
        // Selection visual feedback
        shadowColor={isSelected ? '#8b5cf6' : 'transparent'}
        shadowBlur={isSelected ? 15 : 0}
        shadowOpacity={isSelected ? 0.6 : 0}
        // Make arrow easier to click/select with hit detection
        hitStrokeWidth={isSelected ? 12 : 8}
        // Enable dragging
        draggable
        dragBoundFunc={handleDragBound}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        // Click to select
        onClick={onSelect}
        onTap={onSelect}
        // Right-click for context menu
        onContextMenu={onRightClick}
        // Enhanced visual feedback on hover
        onMouseEnter={(e) => {
          const container = e.target.getStage()?.container();
          if (container) {
            container.style.cursor = 'move';
          }
          // Add thicker stroke on hover if not selected
          if (!isSelected) {
            e.target.strokeWidth(3);
          }
        }}
        onMouseLeave={(e) => {
          const container = e.target.getStage()?.container();
          if (container) {
            container.style.cursor = 'default';
          }
          // Reset to default state if not selected
          if (!isSelected) {
            e.target.strokeWidth(2);
          }
        }}
      />
      
      {/* Phase 2b: Transform handles for resize operations */}
      <TransformHandles
        bounds={{
          x: localBounds.x,
          y: localBounds.y,
          width: localBounds.width,
          height: localBounds.height,
        }}
        rotation={localRotation}
        visible={isSelected && !isDragging}
        visibleHandles={['nw', 'se', 'rotate']}
        rotationHandleAtCenter={true}
        onHandleDragStart={handleResizeDragStart}
        onHandleDragMove={handleResizeDragMove}
        onHandleDragEnd={handleResizeDragEnd}
      />
    </Group>
  );
};

export default Arrow;
