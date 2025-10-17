import { Group, Ellipse as KonvaEllipse } from 'react-konva';
import React, { useRef, useState, useEffect } from 'react';
import type { Shape } from '../services/types';
import { constrainShapePosition } from '../utils/helpers';
import TransformHandles, { type HandleType } from './TransformHandles';
import { type Bounds, isCornerHandle } from '../utils/transform';

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

  // State to track resize operation
  const [resizeState, setResizeState] = useState<{
    isResizing: boolean;
    pendingNetworkUpdate: boolean;
    startBounds: Bounds | null;
    startPointer: { x: number; y: number } | null;
    handleType: HandleType | null;
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
    
  }, [shape.x, shape.y, shape.width, shape.height, isSelected, resizeState.isResizing, resizeState.pendingNetworkUpdate]);

  // Clear pendingNetworkUpdate when shape props change (indicating network update completed)
  useEffect(() => {
    if (resizeState.pendingNetworkUpdate) {
      setResizeState(prev => ({ ...prev, pendingNetworkUpdate: false }));
    }
  }, [shape.x, shape.y, shape.width, shape.height]);
  const handleDragStart = (e: any) => {
    // Prevent event from bubbling to stage
    e.cancelBubble = true;
    // Notify parent that shape dragging started (pass event for shift-drag detection)
    onDragStart(e);
  };

  const handleDragEnd = (e: any) => {
    const rawX = e.target.x();
    const rawY = e.target.y();

    // Get the top-left corner position from center position
    const radius = shape.width / 2;
    const topLeftX = rawX - radius;
    const topLeftY = rawY - radius;

    // Constrain position within canvas boundaries
    const constrained = constrainShapePosition(topLeftX, topLeftY, shape.width, shape.height);

    // Convert back to center position
    const centerX = constrained.x + radius;
    const centerY = constrained.y + radius;

    // Set the shape's position to constrained center values
    e.target.x(centerX);
    e.target.y(centerY);

    // Update shape position with constrained top-left coordinates
    onDragEnd(shape.id, constrained.x, constrained.y);
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

    const pointerPos = stage.getPointerPosition();
    if (!pointerPos) return;

    // Calculate drag delta from start position
    const deltaX = pointerPos.x - resizeState.startPointer.x;
    const deltaY = pointerPos.y - resizeState.startPointer.y;

    // Start with original bounds
    const startBounds = resizeState.startBounds;
    let newBounds: Bounds = { ...startBounds };

    // Apply delta based on handle type with proper anchor points (exactly like Rectangle)
    switch (handleType) {
      case 'se': // Bottom-right corner: expand right and down
        newBounds.width = Math.max(10, startBounds.width + deltaX);
        newBounds.height = Math.max(10, startBounds.height + deltaY);
        break;
        
      case 'sw': // Bottom-left corner: expand left and down
        const newWidthSW = Math.max(10, startBounds.width - deltaX);
        newBounds.x = startBounds.x + startBounds.width - newWidthSW;
        newBounds.width = newWidthSW;
        newBounds.height = Math.max(10, startBounds.height + deltaY);
        break;
        
      case 'ne': // Top-right corner: expand right and up
        newBounds.width = Math.max(10, startBounds.width + deltaX);
        const newHeightNE = Math.max(10, startBounds.height - deltaY);
        newBounds.y = startBounds.y + startBounds.height - newHeightNE;
        newBounds.height = newHeightNE;
        break;
        
      case 'nw': // Top-left corner: expand left and up
        const newWidthNW = Math.max(10, startBounds.width - deltaX);
        const newHeightNW = Math.max(10, startBounds.height - deltaY);
        newBounds.x = startBounds.x + startBounds.width - newWidthNW;
        newBounds.y = startBounds.y + startBounds.height - newHeightNW;
        newBounds.width = newWidthNW;
        newBounds.height = newHeightNW;
        break;
        
      case 'e': // Right edge: expand right only
        newBounds.width = Math.max(10, startBounds.width + deltaX);
        break;
        
      case 'w': // Left edge: expand left only
        const newWidthW = Math.max(10, startBounds.width - deltaX);
        newBounds.x = startBounds.x + startBounds.width - newWidthW;
        newBounds.width = newWidthW;
        break;
        
      case 'n': // Top edge: expand up only
        const newHeightN = Math.max(10, startBounds.height - deltaY);
        newBounds.y = startBounds.y + startBounds.height - newHeightN;
        newBounds.height = newHeightN;
        break;
        
      case 's': // Bottom edge: expand down only
        newBounds.height = Math.max(10, startBounds.height + deltaY);
        break;
        
      default:
        return;
    }

    // Apply aspect ratio locking if Shift is held for corner handles (exactly like Rectangle)
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

    // Update local bounds for immediate visual feedback
    setLocalBounds(newBounds);

    // NOTE: Don't call onUpdateShape here - save only at drag END to avoid race conditions
  };

  const handleResizeDragEnd = (handleType: HandleType, e: any) => {
    // Prevent event bubbling to canvas
    e.evt.stopPropagation();
    e.cancelBubble = true;
    
    if (!onUpdateShape) return;
    
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
        visible={isSelected}
        onHandleDragStart={handleResizeDragStart}
        onHandleDragMove={handleResizeDragMove}
        onHandleDragEnd={handleResizeDragEnd}
      />
    </Group>
  );
};

export default Circle;
