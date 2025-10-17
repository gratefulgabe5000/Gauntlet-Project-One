import { useEffect, useRef, useState } from 'react';
import { Group, Text as KonvaText } from 'react-konva';
import type { Shape } from '../services/types';
import { constrainShapePosition } from '../utils/helpers';
import TransformHandles, { type HandleType } from './TransformHandles';
import { type Bounds, isCornerHandle } from '../utils/transform';

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

  // Phase 2b: Resize state for delta-based calculations and network update management
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
    
  }, [shape.x, shape.y, shape.width, shape.height, resizeState.isResizing, resizeState.pendingNetworkUpdate, isDragging]);

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
    const rawX = e.target.x();
    const rawY = e.target.y();

    const constrained = constrainShapePosition(rawX, rawY, localBounds.width, localBounds.height);

    e.target.x(constrained.x);
    e.target.y(constrained.y);

    // Update local bounds to match the new position
    setLocalBounds(prev => ({
      ...prev,
      x: constrained.x,
      y: constrained.y,
    }));

    onDragEnd(shape.id, constrained.x, constrained.y);
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
        newBounds.width = Math.max(50, startBounds.width + deltaX); // Min width 50 for text
        newBounds.height = Math.max(20, startBounds.height + deltaY); // Min height 20 for text
        break;
        
      case 'sw': // Bottom-left corner: expand left and down
        const newWidthSW = Math.max(50, startBounds.width - deltaX);
        newBounds.x = startBounds.x + startBounds.width - newWidthSW;
        newBounds.width = newWidthSW;
        newBounds.height = Math.max(20, startBounds.height + deltaY);
        break;
        
      case 'ne': // Top-right corner: expand right and up
        newBounds.width = Math.max(50, startBounds.width + deltaX);
        const newHeightNE = Math.max(20, startBounds.height - deltaY);
        newBounds.y = startBounds.y + startBounds.height - newHeightNE;
        newBounds.height = newHeightNE;
        break;
        
      case 'nw': // Top-left corner: expand left and up
        const newWidthNW = Math.max(50, startBounds.width - deltaX);
        const newHeightNW = Math.max(20, startBounds.height - deltaY);
        newBounds.x = startBounds.x + startBounds.width - newWidthNW;
        newBounds.y = startBounds.y + startBounds.height - newHeightNW;
        newBounds.width = newWidthNW;
        newBounds.height = newHeightNW;
        break;
        
      case 'e': // Right edge: expand right only
        newBounds.width = Math.max(50, startBounds.width + deltaX);
        break;
        
      case 'w': // Left edge: expand left only
        const newWidthW = Math.max(50, startBounds.width - deltaX);
        newBounds.x = startBounds.x + startBounds.width - newWidthW;
        newBounds.width = newWidthW;
        break;
        
      case 'n': // Top edge: expand up only
        const newHeightN = Math.max(20, startBounds.height - deltaY);
        newBounds.y = startBounds.y + startBounds.height - newHeightN;
        newBounds.height = newHeightN;
        break;
        
      case 's': // Bottom edge: expand down only
        newBounds.height = Math.max(20, startBounds.height + deltaY);
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

  const handleDragBound = (pos: { x: number; y: number }) => {
    return constrainShapePosition(pos.x, pos.y, localBounds.width, localBounds.height);
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
        x={localBounds.x}
        y={localBounds.y}
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
        visible={isSelected && !isEditing}
        onHandleDragStart={handleResizeDragStart}
        onHandleDragMove={handleResizeDragMove}
        onHandleDragEnd={handleResizeDragEnd}
      />
    </>
  );
};

export default Text;
