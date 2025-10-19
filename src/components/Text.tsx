import React, { useEffect, useRef, useState } from 'react';
import { Group, Text as KonvaText } from 'react-konva';
import type { Shape } from '../services/types';
import { constrainShapePosition } from '../utils/helpers';
import TransformHandles, { type HandleType } from './TransformHandles';
import { type Bounds, isCornerHandle, calculateRotationAngle, snapRotationAngle, calculateRotationAwareResize, normalizeBounds } from '../utils/transform';

/**
 * Text Component - Individual editable text shape
 *
 * Features:
 * - Renders editable text with Konva
 * - Double-click to edit
 * - Click to select
 * - Drag to move
 * - Visual selection feedback
 * - Boundary validation
 */

interface TextProps {
  shape: Shape;
  isSelected: boolean;
  onSelect: (e?: any) => void; // PR8a: Pass event for shift-click detection
  onDragStart: (e?: any) => void; // PR8a: Pass event for shift-drag duplication
  onDragEnd: (id: string, x: number, y: number) => void;
  onTextChange: (id: string, text: string) => void;
  onUpdateShape?: (id: string, updates: Partial<Shape>) => void; // Phase 2b: Shape resize updates
  onRightClick?: (e: any) => void;
}

const Text = ({ shape, isSelected, onSelect, onDragStart, onDragEnd, onTextChange, onUpdateShape, onRightClick }: TextProps) => {
  const textRef = useRef<any>(null);
  // const transformerRef = useRef<any>(null); // Disabled in favor of TransformHandles
  const [isEditing, setIsEditing] = useState(false);
  
  // Phase 2b: Local state for immediate visual updates during resize (same pattern as Rectangle)
  const [localBounds, setLocalBounds] = useState<Bounds>({
    x: shape.x,
    y: shape.y,
    width: shape.width || 100,
    height: shape.height || 30,
  });

  // Task 8b.2.3: Local state for rotation (separate from resize)
  const [localRotation, setLocalRotation] = useState(shape.rotation || 0);

  // Phase 2b: Resize state for delta-based calculations and network update management
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

  // Track drag state to prevent bounds sync during drag
  const [isDragging, setIsDragging] = useState(false);

  // Disabled old Transformer setup in favor of unified TransformHandles
  // useEffect(() => {
  //   if (isSelected && transformerRef.current && textRef.current) {
  //     transformerRef.current.nodes([textRef.current]);
  //     transformerRef.current.getLayer().batchDraw();
  //   }
  // }, [isSelected]);

  // Force re-render when shape properties change
  useEffect(() => {
    if (textRef.current) {
      // Explicitly update the fill property on the Konva node
      textRef.current.fill(shape.fill);
      const layer = textRef.current.getLayer();
      if (layer) {
        layer.batchDraw();
      }
    }
  }, [shape.fill]);

  // Phase 2b: Sync local bounds with shape props (don't overwrite during active resize, drag, or pending network update)
  useEffect(() => {
    // Don't overwrite local visual state during resize, drag, or while waiting for network update
    if (resizeState.isResizing || resizeState.pendingNetworkUpdate || isDragging) {
      return;
    }
    
    setLocalBounds({
      x: shape.x,
      y: shape.y,
      width: shape.width || 100,
      height: shape.height || 30,
    });
    
    // Task 8b.2.3: Sync rotation from network updates
    setLocalRotation(shape.rotation || 0);
    
  }, [shape.x, shape.y, shape.width, shape.height, shape.rotation, resizeState.isResizing, resizeState.pendingNetworkUpdate, isDragging]);

  // Phase 2b: Clear pendingNetworkUpdate when shape props change (indicating network update completed)
  useEffect(() => {
    if (resizeState.pendingNetworkUpdate) {
      setResizeState(prev => ({ ...prev, pendingNetworkUpdate: false }));
    }
  }, [shape.x, shape.y, shape.width, shape.height]);

  const handleDragStart = (e: any) => {
    e.cancelBubble = true;
    setIsDragging(true);
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

    const constrained = constrainShapePosition(topLeftX, topLeftY, localBounds.width, localBounds.height);

    // Set the shape's position to constrained center values
    e.target.x(constrained.x + halfWidth);
    e.target.y(constrained.y + halfHeight);

    // Update local bounds to match the new position (stored as top-left)
    setLocalBounds(prev => ({
      ...prev,
      x: constrained.x,
      y: constrained.y,
    }));

    // Task 8b.2.3: Preserve rotation when dragging
    if (onUpdateShape) {
      onUpdateShape(shape.id, { x: constrained.x, y: constrained.y, rotation: localRotation });
    } else {
      onDragEnd(shape.id, constrained.x, constrained.y);
    }
    setIsDragging(false);
  };

  // Phase 2b: Resize handlers using Rectangle's exact delta calculation approach
  const handleResizeDragStart = (handleType: HandleType, e: any) => {
    // Prevent event bubbling to canvas
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

    setResizeState({
      isResizing: true,
      pendingNetworkUpdate: false,
      startBounds: { ...localBounds },
      startPointer: { x: pointerPos.x, y: pointerPos.y },
      handleType,
    });
  };

  const handleResizeDragMove = (handleType: HandleType, e: any) => {
    // Prevent event bubbling to canvas
    e.evt.stopPropagation();
    e.cancelBubble = true;
    
    if (!resizeState.isResizing || !resizeState.startBounds || !resizeState.startPointer) return;

    const stage = e.target.getStage();
    if (!stage) return;

    const scale = stage.scaleX() || 1;
    const pointerPos = stage.getPointerPosition();
    if (!pointerPos) return;

    // Task 8b.2.3: Handle rotation - ABSOLUTE ANGLE to align handle with cursor
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

  const handleDragBound = (pos: { x: number; y: number }) => {
    // Task 8b.2.3: Convert from center-pivot to top-left for constraint checking
    const halfWidth = localBounds.width / 2;
    const halfHeight = localBounds.height / 2;
    const topLeftX = pos.x - halfWidth;
    const topLeftY = pos.y - halfHeight;
    
    const constrained = constrainShapePosition(topLeftX, topLeftY, localBounds.width, localBounds.height);
    
    // Convert back to center-pivot
    return {
      x: constrained.x + halfWidth,
      y: constrained.y + halfHeight,
    };
  };

  const handleDblClick = () => {
    setIsEditing(true);

    // Create textarea for editing
    const textNode = textRef.current;
    const stage = textNode.getStage();
    const stageBox = stage.container().getBoundingClientRect();
    const textPosition = textNode.getAbsolutePosition();

    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);

    // Style textarea to match text
    textarea.value = shape.text || '';
    textarea.style.position = 'absolute';
    textarea.style.top = stageBox.top + textPosition.y + 'px';
    textarea.style.left = stageBox.left + textPosition.x + 'px';
    textarea.style.width = shape.width + 'px';
    textarea.style.height = shape.height + 'px';
    textarea.style.fontSize = '16px';
    textarea.style.fontFamily = 'Arial';
    textarea.style.border = '2px solid #ef4444';
    textarea.style.padding = '4px';
    textarea.style.margin = '0px';
    textarea.style.overflow = 'hidden';
    textarea.style.background = 'white';
    textarea.style.outline = 'none';
    textarea.style.resize = 'none';
    textarea.style.lineHeight = '1.2';
    textarea.style.transformOrigin = 'left top';
    textarea.style.textAlign = 'left';
    textarea.style.color = shape.fill;
    textarea.style.borderRadius = '4px';
    textarea.style.zIndex = '1000';

    textarea.focus();
    textarea.select();

    const removeTextarea = () => {
      textarea.parentNode?.removeChild(textarea);
      setIsEditing(false);
    };

    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        removeTextarea();
      } else if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onTextChange(shape.id, textarea.value);
        removeTextarea();
      }
    });

    textarea.addEventListener('blur', () => {
      onTextChange(shape.id, textarea.value);
      removeTextarea();
    });
  };

  return (
    <>
      <KonvaText
        ref={textRef}
        id={shape.id}
        x={localBounds.x + localBounds.width / 2}
        y={localBounds.y + localBounds.height / 2}
        offsetX={localBounds.width / 2}
        offsetY={localBounds.height / 2}
        rotation={localRotation}
        text={shape.text || 'Double-click to edit'}
        fontSize={shape.fontSize || 16}
        fontFamily="Arial"
        fill={shape.fill}
        width={localBounds.width}
        height={localBounds.height}
        padding={4}
        align="left"
        verticalAlign="top"
        // Visual selection feedback (no stroke for text, only shadow)
        shadowColor={isSelected ? '#ef4444' : 'transparent'}
        shadowBlur={isSelected ? 10 : 0}
        shadowOpacity={isSelected ? 0.4 : 0}
        // Enable dragging
        draggable
        dragBoundFunc={handleDragBound}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        // Click handlers
        onClick={onSelect}
        onTap={onSelect}
        onDblClick={handleDblClick}
        onDblTap={handleDblClick}
        // Right-click for context menu
        onContextMenu={onRightClick}
        // Hover feedback
        onMouseEnter={(e) => {
          const container = e.target.getStage()?.container();
          if (container) {
            container.style.cursor = isEditing ? 'text' : 'move';
          }
        }}
        onMouseLeave={(e) => {
          const container = e.target.getStage()?.container();
          if (container) {
            container.style.cursor = 'default';
          }
        }}
      />
      {/* Disabled old Transformer in favor of unified TransformHandles */}
      {/* 
      {isSelected && !isEditing && (
        <Transformer
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 50 || newBox.height < 30) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
      */}
      
      {/* Phase 2b: Transform handles for resize operations */}
      <TransformHandles
        bounds={{
          x: localBounds.x,
          y: localBounds.y,
          width: localBounds.width,
          height: localBounds.height,
        }}
        rotation={localRotation}
        visible={isSelected && !isEditing && !isDragging}
        onHandleDragStart={handleResizeDragStart}
        onHandleDragMove={handleResizeDragMove}
        onHandleDragEnd={handleResizeDragEnd}
      />
    </>
  );
};

// PR10a: Phase 4a Block 4 - Memoize to prevent unnecessary re-renders
export default React.memo(Text, (prevProps, nextProps) => {
  if (prevProps.isSelected !== nextProps.isSelected) return false;
  if (prevProps.shape === nextProps.shape) return true;
  
  return (
    prevProps.shape.id === nextProps.shape.id &&
    prevProps.shape.x === nextProps.shape.x &&
    prevProps.shape.y === nextProps.shape.y &&
    prevProps.shape.width === nextProps.shape.width &&
    prevProps.shape.height === nextProps.shape.height &&
    prevProps.shape.fill === nextProps.shape.fill &&
    prevProps.shape.rotation === nextProps.shape.rotation &&
    prevProps.shape.text === nextProps.shape.text &&
    prevProps.shape.fontSize === nextProps.shape.fontSize &&
    prevProps.shape.opacity === nextProps.shape.opacity &&
    prevProps.shape.locked === nextProps.shape.locked
  );
});
