import { useState, useEffect } from 'react';
import type { Shape } from '../services/types';
import type { HandleType } from '../components/TransformHandles';
import type { Bounds } from '../utils/transform';
import { constrainShapePosition } from '../utils/helpers';
import { 
  isCornerHandle,
  calculateRotationAwareResize,
  snapRotationAngle
} from '../utils/transform';

/**
 * Phase 4a Block 3: Code Refactoring
 * 
 * Custom hook for shape transformation logic (drag, resize, rotate)
 * Consolidates duplicate code across all 5 shape components:
 * - Rectangle, Circle, Text, Line, Arrow
 * 
 * This hook encapsulates:
 * - Local state management for transforms
 * - Drag handlers with boundary constraints
 * - Resize handlers with rotation-aware calculations
 * - Rotation handlers with snap-to-angle
 * - Network sync coordination
 */

interface UseShapeTransformProps {
  shape: Shape;
  isSelected: boolean;
  onDragStart: (e?: any) => void;
  onDragEnd: (id: string, x: number, y: number) => void;
  onUpdateShape?: (id: string, updates: Partial<Shape>) => void;
}

interface UseShapeTransformReturn {
  // State
  localBounds: { x: number; y: number; width: number; height: number };
  localRotation: number;
  isDragging: boolean;
  isResizing: boolean;
  
  // Drag handlers
  handleDragStart: (e: any) => void;
  handleDragEnd: (e: any) => void;
  handleDragBound: (pos: { x: number; y: number }) => { x: number; y: number };
  
  // Resize handlers
  handleResizeDragStart: (handleType: HandleType, e: any) => void;
  handleResizeDragMove: (handleType: HandleType, e: any) => void;
  handleResizeDragEnd: (handleType: HandleType, e: any) => void;
}

export const useShapeTransform = ({
  shape,
  isSelected,
  onDragStart,
  onDragEnd,
  onUpdateShape,
}: UseShapeTransformProps): UseShapeTransformReturn => {
  // Local state for visual updates during transforms
  const [localBounds, setLocalBounds] = useState({
    x: shape.x,
    y: shape.y,
    width: shape.width,
    height: shape.height,
  });

  // Local state for rotation
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
    startRotation?: number;
    startAngle?: number;
  }>({
    isResizing: false,
    pendingNetworkUpdate: false,
    startBounds: null,
    startPointer: null,
    handleType: null,
  });

  // Sync with shape prop changes (from network updates)
  // BUT NOT during active operations or pending network updates
  useEffect(() => {
    if (resizeState.isResizing || resizeState.pendingNetworkUpdate) {
      return;
    }
    
    setLocalBounds({
      x: shape.x,
      y: shape.y,
      width: shape.width,
      height: shape.height,
    });
    
    const newRotation = shape.rotation || 0;
    setLocalRotation(newRotation);
  }, [shape.x, shape.y, shape.width, shape.height, shape.rotation, resizeState.isResizing, resizeState.pendingNetworkUpdate]);

  // Clear pendingNetworkUpdate when shape props change
  useEffect(() => {
    if (resizeState.pendingNetworkUpdate) {
      setResizeState(prev => ({ ...prev, pendingNetworkUpdate: false }));
    }
  }, [shape.x, shape.y, shape.width, shape.height]);

  // Drag start handler
  const handleDragStart = (e: any) => {
    e.cancelBubble = true;
    setIsDragging(true);
    onDragStart(e);
  };

  // Drag end handler
  const handleDragEnd = (e: any) => {
    // Convert center point to top-left for storage
    const centerX = e.target.x();
    const centerY = e.target.y();
    const rawX = centerX - localBounds.width / 2;
    const rawY = centerY - localBounds.height / 2;

    // Constrain position within canvas boundaries
    const constrained = constrainShapePosition(rawX, rawY, localBounds.width, localBounds.height);

    // Update Konva position to constrained values
    e.target.x(constrained.x + localBounds.width / 2);
    e.target.y(constrained.y + localBounds.height / 2);

    // Update local bounds
    setLocalBounds(prev => ({ ...prev, x: constrained.x, y: constrained.y }));
    
    // Save position with rotation to prevent reset
    if (onUpdateShape) {
      onUpdateShape(shape.id, { x: constrained.x, y: constrained.y, rotation: localRotation });
    } else {
      onDragEnd(shape.id, constrained.x, constrained.y);
    }
    
    setIsDragging(false);
  };

  // Drag boundary function
  const handleDragBound = (pos: { x: number; y: number }) => {
    // Convert center point to top-left
    const topLeftX = pos.x - localBounds.width / 2;
    const topLeftY = pos.y - localBounds.height / 2;
    const constrained = constrainShapePosition(topLeftX, topLeftY, localBounds.width, localBounds.height);
    // Convert back to center point
    return {
      x: constrained.x + localBounds.width / 2,
      y: constrained.y + localBounds.height / 2,
    };
  };

  // Resize drag start handler
  const handleResizeDragStart = (handleType: HandleType, e: any) => {
    e.evt.stopPropagation();
    e.cancelBubble = true;

    const stage = e.target.getStage();
    if (!stage) return;

    const pointerPos = stage.getPointerPosition();
    if (!pointerPos) return;

    // Handle rotation separately
    if (handleType === 'rotate') {
      const centerX = localBounds.x + localBounds.width / 2;
      const centerY = localBounds.y + localBounds.height / 2;
      
      const dx = pointerPos.x - centerX;
      const dy = pointerPos.y - centerY;
      const startAngle = Math.atan2(dx, -dy) * (180 / Math.PI);
      
      setResizeState({
        isResizing: true,
        pendingNetworkUpdate: false,
        startBounds: { ...localBounds },
        startPointer: { x: pointerPos.x, y: pointerPos.y },
        handleType: 'rotate',
        startRotation: localRotation,
        startAngle: startAngle,
      });
      return;
    }

    // Record initial state for resize
    setResizeState({
      isResizing: true,
      pendingNetworkUpdate: false,
      startBounds: { ...localBounds },
      startPointer: { x: pointerPos.x, y: pointerPos.y },
      handleType: handleType,
    });
  };

  // Resize drag move handler
  const handleResizeDragMove = (handleType: HandleType, e: any) => {
    e.evt.stopPropagation();
    e.cancelBubble = true;

    if (!onUpdateShape || !resizeState.isResizing || !resizeState.startBounds || !resizeState.startPointer) return;

    const stage = e.target.getStage();
    if (!stage) return;

    const scale = stage.scaleX() || 1;
    const pointerPos = stage.getPointerPosition();
    if (!pointerPos) return;

    // Handle rotation
    if (handleType === 'rotate') {
      const centerX = localBounds.x + localBounds.width / 2;
      const centerY = localBounds.y + localBounds.height / 2;
      
      const dx = pointerPos.x - centerX;
      const dy = pointerPos.y - centerY;
      const currentAngle = Math.atan2(dx, -dy) * (180 / Math.PI);
      
      let deltaAngle = currentAngle - (resizeState.startAngle || 0);
      
      // Normalize delta
      while (deltaAngle > 180) deltaAngle -= 360;
      while (deltaAngle < -180) deltaAngle += 360;
      
      // Apply sensitivity based on zoom
      const sensitivity = 1.75 / scale;
      const adjustedDelta = deltaAngle * sensitivity;
      
      let newRotation = (resizeState.startRotation || 0) + adjustedDelta;
      
      // Normalize to 0-360
      while (newRotation < 0) newRotation += 360;
      while (newRotation >= 360) newRotation -= 360;
      
      // Snap to 15° if Shift held
      if (e.evt?.shiftKey) {
        newRotation = snapRotationAngle(newRotation, 15);
      }
      
      setLocalRotation(newRotation);
      return;
    }

    // Handle resize with rotation awareness
    let newBounds: Bounds;
    
    if (Math.abs(localRotation) > 1) {
      // Rotation-aware resize
      newBounds = calculateRotationAwareResize(
        handleType,
        resizeState.startBounds,
        localRotation,
        pointerPos.x,
        pointerPos.y,
        resizeState.startPointer.x,
        resizeState.startPointer.y
      );
      
      // Apply aspect ratio locking for rotated shapes if Shift is held on corner handles
      if (e.evt?.shiftKey && isCornerHandle(handleType)) {
        const startBounds = resizeState.startBounds;
        const aspectRatio = startBounds.width / startBounds.height;
        
        // Determine which dimension changed more (ratio-based)
        const widthRatio = newBounds.width / startBounds.width;
        const heightRatio = newBounds.height / startBounds.height;
        
        if (Math.abs(widthRatio - 1) > Math.abs(heightRatio - 1)) {
          // Width changed more, constrain height to maintain aspect ratio
          newBounds.height = newBounds.width / aspectRatio;
          
          // Adjust position for top corners (NW, NE)
          if (handleType === 'nw' || handleType === 'ne') {
            newBounds.y = startBounds.y + startBounds.height - newBounds.height;
          }
        } else {
          // Height changed more, constrain width to maintain aspect ratio
          newBounds.width = newBounds.height * aspectRatio;
          
          // Adjust position for left corners (NW, SW)
          if (handleType === 'nw' || handleType === 'sw') {
            newBounds.x = startBounds.x + startBounds.width - newBounds.width;
          }
        }
      }
    } else {
      // Standard axis-aligned resize
      const deltaX = pointerPos.x - resizeState.startPointer.x;
      const deltaY = pointerPos.y - resizeState.startPointer.y;
      const startBounds = resizeState.startBounds;
      newBounds = { ...startBounds };

      // Apply delta based on handle type
      switch (handleType) {
        case 'se':
          newBounds.width = startBounds.width + deltaX;
          newBounds.height = startBounds.height + deltaY;
          break;
        case 'sw':
          const newWidthSW = startBounds.width - deltaX;
          newBounds.x = startBounds.x + startBounds.width - newWidthSW;
          newBounds.width = newWidthSW;
          newBounds.height = startBounds.height + deltaY;
          break;
        case 'ne':
          newBounds.width = startBounds.width + deltaX;
          const newHeightNE = startBounds.height - deltaY;
          newBounds.y = startBounds.y + startBounds.height - newHeightNE;
          newBounds.height = newHeightNE;
          break;
        case 'nw':
          const newWidthNW = startBounds.width - deltaX;
          const newHeightNW = startBounds.height - deltaY;
          newBounds.x = startBounds.x + startBounds.width - newWidthNW;
          newBounds.y = startBounds.y + startBounds.height - newHeightNW;
          newBounds.width = newWidthNW;
          newBounds.height = newHeightNW;
          break;
        case 'n':
          const newHeightN = startBounds.height - deltaY;
          newBounds.y = startBounds.y + startBounds.height - newHeightN;
          newBounds.height = newHeightN;
          break;
        case 's':
          newBounds.height = startBounds.height + deltaY;
          break;
        case 'e':
          newBounds.width = startBounds.width + deltaX;
          break;
        case 'w':
          const newWidthW = startBounds.width - deltaX;
          newBounds.x = startBounds.x + startBounds.width - newWidthW;
          newBounds.width = newWidthW;
          break;
      }

      // Apply aspect ratio locking if Shift is held for corner handles (non-rotated only)
      if (e.evt?.shiftKey && isCornerHandle(handleType)) {
        const aspectRatio = startBounds.width / startBounds.height;
        
        // Determine which dimension to constrain based on which moved more (ratio-based)
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
  };

  // Resize drag end handler
  const handleResizeDragEnd = (handleType: HandleType, e: any) => {
    e.evt.stopPropagation();
    e.cancelBubble = true;
    
    if (!onUpdateShape) return;
    
    // Handle rotation end
    if (handleType === 'rotate') {
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
    
    // Save final bounds
    setResizeState({
      isResizing: false,
      pendingNetworkUpdate: true,
      startBounds: null,
      startPointer: null,
      handleType: null,
    });
    
    onUpdateShape(shape.id, { ...localBounds });
  };

  return {
    // State
    localBounds,
    localRotation,
    isDragging,
    isResizing: resizeState.isResizing,
    
    // Handlers
    handleDragStart,
    handleDragEnd,
    handleDragBound,
    handleResizeDragStart,
    handleResizeDragMove,
    handleResizeDragEnd,
  };
};

