import { Group, Arrow as KonvaArrow } from 'react-konva';
import React, { useRef, useState, useEffect } from 'react';
import type { Shape } from '../services/types';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../utils/helpers';
import TransformHandles, { type HandleType } from './TransformHandles';
import { type Bounds, isCornerHandle } from '../utils/transform';

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

    // Constrain position within canvas boundaries
    const constrained = {
      x: Math.max(0, Math.min(CANVAS_WIDTH - shape.width, rawX)),
      y: Math.max(0, Math.min(CANVAS_HEIGHT - shape.height, rawY)),
    };

    // Set the shape's position to constrained values
    e.target.x(constrained.x);
    e.target.y(constrained.y);

    // Update shape position with constrained coordinates
    onDragEnd(shape.id, constrained.x, constrained.y);
  };

  // Constrain arrow position during drag
  const handleDragBound = (pos: { x: number; y: number }) => {
    return {
      x: Math.max(0, Math.min(CANVAS_WIDTH - localBounds.width, pos.x)),
      y: Math.max(0, Math.min(CANVAS_HEIGHT - localBounds.height, pos.y)),
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

    // Apply delta based on handle type with proper anchor points (same as Rectangle)
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

  // Calculate arrow points relative to shape position (use local bounds for immediate feedback)
  // Arrow is drawn from top-left to bottom-right of bounding box
  // Konva Arrow automatically adds arrowhead at the end point
  const points = [0, 0, localBounds.width, localBounds.height];

  return (
    <Group>
      <KonvaArrow
        id={shape.id}
        x={localBounds.x}
        y={localBounds.y}
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
        visible={isSelected}
        onHandleDragStart={handleResizeDragStart}
        onHandleDragMove={handleResizeDragMove}
        onHandleDragEnd={handleResizeDragEnd}
      />
    </Group>
  );
};

export default Arrow;
