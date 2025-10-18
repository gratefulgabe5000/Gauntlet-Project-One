import { Group, Ellipse as KonvaEllipse } from 'react-konva';
import React, { useRef, useState, useEffect } from 'react';
import type { Shape } from '../services/types';
import { constrainShapePosition } from '../utils/helpers';
import TransformHandles, { type HandleType } from './TransformHandles';
import { type Bounds, isCornerHandle, calculateRotationAngle, snapRotationAngle, calculateRotationAwareResize, normalizeBounds } from '../utils/transform';

/**
 * Circle Component - Individual draggable circle shape
 *
 * Features:
 * - Renders a single circle with Konva
 * - Click to select
 * - Drag to move
 * - Visual selection feedback
 * - Boundary validation
 */

interface CircleProps {
  shape: Shape;
  isSelected: boolean;
  onSelect: (e?: any) => void; // PR8a: Pass event for shift-click detection
  onDragStart: (e?: any) => void; // PR8a: Pass event for shift-drag duplication
  onDragEnd: (id: string, x: number, y: number) => void;
  onUpdateShape?: (id: string, updates: Partial<Shape>) => void; // Phase 2b: Shape resize updates
  onRightClick?: (e: any) => void;
}

const Circle = ({ shape, isSelected, onSelect, onDragStart, onDragEnd, onUpdateShape, onRightClick }: CircleProps) => {
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
    const rawX = e.target.x();
    const rawY = e.target.y();

    // Get the top-left corner position from center position (use localBounds for current size)
    const radiusX = localBounds.width / 2;
    const radiusY = localBounds.height / 2;
    const topLeftX = rawX - radiusX;
    const topLeftY = rawY - radiusY;

    // Constrain position within canvas boundaries
    const constrained = constrainShapePosition(topLeftX, topLeftY, localBounds.width, localBounds.height);

    // Convert back to center position
    const centerX = constrained.x + radiusX;
    const centerY = constrained.y + radiusY;

    // Set the shape's position to constrained center values
    e.target.x(centerX);
    e.target.y(centerY);

    // Task 8b.2.3: Preserve rotation when dragging
    if (onUpdateShape) {
      onUpdateShape(shape.id, { x: constrained.x, y: constrained.y, rotation: localRotation });
    } else {
      onDragEnd(shape.id, constrained.x, constrained.y);
    }
    
    // Show handles again after drag
    setIsDragging(false);
  };

  // Constrain circle position during drag
  const handleDragBound = (pos: { x: number; y: number }) => {
    const radius = localBounds.width / 2;
    const topLeftX = pos.x - radius;
    const topLeftY = pos.y - radius;
    const constrained = constrainShapePosition(topLeftX, topLeftY, localBounds.width, localBounds.height);

    // Return center position
    return {
      x: constrained.x + radius,
      y: constrained.y + radius,
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

    // Record initial state for drag delta calculation
    setResizeState({
      isResizing: true,
      pendingNetworkUpdate: false,
      startBounds: { ...localBounds },
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

    // Task 8b.2.3: Handle rotation - DELTA from starting angle
    if (handleType === 'rotate') {
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

    // For rotated shapes, use rotation-aware resize to keep anchor fixed
    let newBounds: Bounds;
    
    if (Math.abs(localRotation) > 1) {
      // Rotation-aware resize: keeps opposite corner/edge fixed in world space
      newBounds = calculateRotationAwareResize(
        handleType,
        resizeState.startBounds,
        localRotation,
        pointerPos.x,
        pointerPos.y,
        resizeState.startPointer.x,
        resizeState.startPointer.y
      );
      // Normalize bounds to handle negative dimensions (mirroring)
      newBounds = normalizeBounds(newBounds);
    } else {
      // Standard axis-aligned resize for non-rotated shapes
      // Calculate drag delta from start position
      const deltaX = pointerPos.x - resizeState.startPointer.x;
      const deltaY = pointerPos.y - resizeState.startPointer.y;

      // Start with original bounds
      const startBounds = resizeState.startBounds;
      newBounds = { ...startBounds };

      // Apply delta based on handle type with proper anchor points (allow negative for mirroring)
      switch (handleType) {
      case 'se': // Bottom-right corner: expand right and down
        newBounds.width = startBounds.width + deltaX;
        newBounds.height = startBounds.height + deltaY;
        break;
        
      case 'sw': // Bottom-left corner: expand left and down
        const newWidthSW = startBounds.width - deltaX;
        newBounds.x = startBounds.x + startBounds.width - newWidthSW;
        newBounds.width = newWidthSW;
        newBounds.height = startBounds.height + deltaY;
        break;
        
      case 'ne': // Top-right corner: expand right and up
        newBounds.width = startBounds.width + deltaX;
        const newHeightNE = startBounds.height - deltaY;
        newBounds.y = startBounds.y + startBounds.height - newHeightNE;
        newBounds.height = newHeightNE;
        break;
        
      case 'nw': // Top-left corner: expand left and up
        const newWidthNW = startBounds.width - deltaX;
        const newHeightNW = startBounds.height - deltaY;
        newBounds.x = startBounds.x + startBounds.width - newWidthNW;
        newBounds.y = startBounds.y + startBounds.height - newHeightNW;
        newBounds.width = newWidthNW;
        newBounds.height = newHeightNW;
        break;
        
      case 'e': // Right edge: expand right only
        newBounds.width = startBounds.width + deltaX;
        break;
        
      case 'w': // Left edge: expand left only
        const newWidthW = startBounds.width - deltaX;
        newBounds.x = startBounds.x + startBounds.width - newWidthW;
        newBounds.width = newWidthW;
        break;
        
      case 'n': // Top edge: expand up only
        const newHeightN = startBounds.height - deltaY;
        newBounds.y = startBounds.y + startBounds.height - newHeightN;
        newBounds.height = newHeightN;
        break;
        
      case 's': // Bottom edge: expand down only
        newBounds.height = startBounds.height + deltaY;
        break;
        
      default:
        return;
    }
      
      // Normalize bounds to handle negative dimensions (mirroring)
      newBounds = normalizeBounds(newBounds);

      // Apply aspect ratio locking if Shift is held for corner handles (non-rotated only)
      if (e.evt?.shiftKey && isCornerHandle(handleType)) {
        const aspectRatio = startBounds.width / startBounds.height;
        
        // Determine which dimension to constrain based on which moved more
        const widthRatio = newBounds.width / startBounds.width;
        const heightRatio = newBounds.height / startBounds.height;
        
        if (Math.abs(widthRatio - 1) > Math.abs(heightRatio - 1)) {
          // Width changed more, constrain height
          newBounds.height = newBounds.width / aspectRatio;
          
          // Adjust position for top corners
          if (handleType === 'nw' || handleType === 'ne') {
            newBounds.y = startBounds.y + startBounds.height - newBounds.height;
          }
        } else {
          // Height changed more, constrain width
          newBounds.width = newBounds.height * aspectRatio;
          
          // Adjust position for left corners
          if (handleType === 'nw' || handleType === 'sw') {
            newBounds.x = startBounds.x + startBounds.width - newBounds.width;
          }
        }
      }
    }

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
    
    // Save final bounds to Firestore
    const finalBounds = { ...localBounds };
    
    // Set pending network update to prevent visual blip
    setResizeState({
      isResizing: false,
      pendingNetworkUpdate: true,
      startBounds: null,
      startPointer: null,
      handleType: null,
    });
    
    // Now save the final result to Firestore
    onUpdateShape(shape.id, finalBounds);
  };

  // Calculate center position and radius from bounding box (use local bounds for immediate feedback)
  const radiusX = localBounds.width / 2;
  const radiusY = localBounds.height / 2;
  const centerX = localBounds.x + radiusX;
  const centerY = localBounds.y + radiusY;

  return (
    <Group>
    <KonvaEllipse
      id={shape.id}
      x={centerX}
      y={centerY}
      radiusX={radiusX}
      radiusY={radiusY}
      rotation={localRotation}
      fill={shape.fill}
      // Enhanced visual feedback for selection
      stroke={isSelected ? '#10b981' : '#cbd5e1'}
      strokeWidth={isSelected ? 4 : 1}
      shadowColor={isSelected ? '#10b981' : 'transparent'}
      shadowBlur={isSelected ? 15 : 0}
      shadowOpacity={isSelected ? 0.4 : 0}
      shadowOffset={isSelected ? { x: 0, y: 0 } : { x: 0, y: 0 }}
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
        // Add subtle shadow on hover if not selected
        if (!isSelected) {
          e.target.strokeWidth(2);
          e.target.stroke('#94a3b8');
        }
      }}
      onMouseLeave={(e) => {
        const container = e.target.getStage()?.container();
        if (container) {
          container.style.cursor = 'default';
        }
        // Reset to default state if not selected
        if (!isSelected) {
          e.target.strokeWidth(1);
          e.target.stroke('#cbd5e1');
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
        onHandleDragStart={handleResizeDragStart}
        onHandleDragMove={handleResizeDragMove}
        onHandleDragEnd={handleResizeDragEnd}
      />
    </Group>
  );
};

export default Circle;
