import { useState, useEffect } from 'react';
import { Group, Rect } from 'react-konva';
import type { Shape } from '../services/types';
import { constrainShapePosition } from '../utils/helpers';
import TransformHandles, { type HandleType } from './TransformHandles';
import { calculateCornerResize, calculateEdgeResize, isCornerHandle, isEdgeHandle, type Bounds, calculateRotationAngle, snapRotationAngle, calculateRotationAwareResize, normalizeBounds } from '../utils/transform';

/**
 * Rectangle Component - Individual draggable rectangle shape
 *
 * PR3.2 & PR3.6 & PR4.5: Real-time collaborative rectangles
 *
 * Features:
 * - Renders a single rectangle with Konva
 * - Click to select (Task 3.2.3)
 * - Drag to move (Task 3.2.4)
 * - Visual selection feedback (Task 3.2.2)
 * - Boundary validation (Task 3.6.3)
 * - Lock indicators (Task 4.4)
 */

// Re-export Shape type as RectangleShape for backwards compatibility
export type RectangleShape = Shape;

interface RectangleProps {
  shape: Shape;
  isSelected: boolean;
  onSelect: (e?: any) => void; // PR8a: Pass event for shift-click detection
  onDragStart: (e?: any) => void; // PR8a: Pass event for shift-drag duplication
  onDragEnd: (id: string, x: number, y: number) => void;
  onUpdateShape?: (id: string, updates: Partial<Shape>) => void; // Phase 2b: Shape resize updates
  onRightClick?: (e: any) => void;
}

/**
 * Task 3.2.1: Basic Rectangle component with Konva Rect
 */
const Rectangle = ({ shape, isSelected, onSelect, onDragStart, onDragEnd, onUpdateShape, onRightClick }: RectangleProps) => {
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
    const newRotation = shape.rotation || 0;
    if (newRotation !== localRotation) {
      console.log('Syncing rotation from network:', newRotation.toFixed(1), '° (was', localRotation.toFixed(1), '°)');
    }
    setLocalRotation(newRotation);
    
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
    // Task 8b.2.3: x/y now represent center point due to offset, convert to top-left
    const centerX = e.target.x();
    const centerY = e.target.y();
    const rawX = centerX - localBounds.width / 2;
    const rawY = centerY - localBounds.height / 2;


    // Task 3.6.3: Use helper to constrain position within canvas boundaries
    const constrained = constrainShapePosition(rawX, rawY, localBounds.width, localBounds.height);

    // Immediately set the shape's position to constrained values (center point)
    // This ensures Konva has the correct position before React re-renders
    e.target.x(constrained.x + localBounds.width / 2);
    e.target.y(constrained.y + localBounds.height / 2);

    // Update local bounds and notify parent (using top-left coordinates)
    setLocalBounds(prev => ({ ...prev, x: constrained.x, y: constrained.y }));
    
    // Task 8b.2.3: Always save rotation along with position to prevent reset
    // Use onUpdateShape if available to preserve rotation, fallback to onDragEnd
    if (onUpdateShape) {
      console.log('Drag end - saving position with rotation:', localRotation.toFixed(1), '°');
      onUpdateShape(shape.id, { x: constrained.x, y: constrained.y, rotation: localRotation });
    } else {
      onDragEnd(shape.id, constrained.x, constrained.y);
    }
    
    // Show handles again after drag
    setIsDragging(false);
  };

  // Task 3.6.3: Constrain rectangle position during drag
  const handleDragBound = (pos: { x: number; y: number }) => {
    // Task 8b.2.3: pos represents center point due to offset, convert to top-left
    const topLeftX = pos.x - localBounds.width / 2;
    const topLeftY = pos.y - localBounds.height / 2;
    const constrained = constrainShapePosition(topLeftX, topLeftY, localBounds.width, localBounds.height);
    // Convert back to center point
    return {
      x: constrained.x + localBounds.width / 2,
      y: constrained.y + localBounds.height / 2,
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
      // 12 o'clock = 0°, 3 o'clock = 90°, 6 o'clock = 180°, 9 o'clock = 270°
      const dx = pointerPos.x - centerX;
      const dy = pointerPos.y - centerY;
      const startAngle = Math.atan2(dx, -dy) * (180 / Math.PI);
      
      console.log('Rotation drag START - Current rotation:', localRotation.toFixed(1), '° | Starting angle:', startAngle.toFixed(1), '°');
      
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
        
      case 's': // Bottom edge: expand down only
        newBounds.height = startBounds.height + deltaY;
        break;
        
      case 'n': // Top edge: expand up only
        const newHeightN = startBounds.height - deltaY;
        newBounds.y = startBounds.y + startBounds.height - newHeightN;
        newBounds.height = newHeightN;
        break;
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

    // Update local state for immediate visual feedback
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
      console.log('Saving rotation to Firestore:', localRotation.toFixed(1), '°');
      
      // Save final rotation to Firestore
      setResizeState({
        isResizing: false,
        pendingNetworkUpdate: true,
        startBounds: null,
        startPointer: null,
        handleType: null,
      });
      
      onUpdateShape(shape.id, { rotation: localRotation });
      console.log('Called onUpdateShape with rotation:', localRotation);
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

  return (
    <Group>
      <Rect
        id={shape.id}
        x={localBounds.x + localBounds.width / 2}
        y={localBounds.y + localBounds.height / 2}
        width={localBounds.width}
        height={localBounds.height}
        offsetX={localBounds.width / 2}
        offsetY={localBounds.height / 2}
        rotation={localRotation}
        fill={shape.fill}
        // Task 3.2.2 + PR6.4.2: Enhanced visual feedback for selection
        stroke={isSelected ? '#2563eb' : '#cbd5e1'}
        strokeWidth={isSelected ? 4 : 1}
        cornerRadius={6}
        shadowColor={isSelected ? '#2563eb' : 'transparent'}
        shadowBlur={isSelected ? 15 : 0}
        shadowOpacity={isSelected ? 0.4 : 0}
        shadowOffset={isSelected ? { x: 0, y: 0 } : { x: 0, y: 0 }}
        // Task 3.2.4: Enable dragging
        draggable
        dragBoundFunc={handleDragBound}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        // Task 3.2.3: Click to select
        onClick={onSelect}
        onTap={onSelect}
        // Right-click for context menu
        onContextMenu={onRightClick}
        // PR6.4.2: Enhanced visual feedback on hover
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
        bounds={localBounds}
        visible={isSelected && !isDragging}
        rotation={localRotation}
        onHandleDragStart={handleResizeDragStart}
        onHandleDragMove={handleResizeDragMove}
        onHandleDragEnd={handleResizeDragEnd}
      />
    </Group>
  );
};

export default Rectangle;
