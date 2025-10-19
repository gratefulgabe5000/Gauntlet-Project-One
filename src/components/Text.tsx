import React, { useEffect, useRef, useState } from 'react';
import { Group, Text as KonvaText } from 'react-konva';
import type { Shape } from '../services/types';
import TransformHandles from './TransformHandles';
import { useShapeTransform } from '../hooks/useShapeTransform';

/**
 * Text Component - Individual editable text shape
 *
 * Phase 4a Block 3: Refactored to use useShapeTransform hook (DRY principle)
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
  onSelect: (e?: any) => void;
  onDragStart: (e?: any) => void;
  onDragEnd: (id: string, x: number, y: number) => void;
  onTextChange: (id: string, text: string) => void;
  onUpdateShape?: (id: string, updates: Partial<Shape>) => void;
  onRightClick?: (e: any) => void;
}

const Text = ({ shape, isSelected, onSelect, onDragStart, onDragEnd, onTextChange, onUpdateShape, onRightClick }: TextProps) => {
  const textRef = useRef<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Phase 4a Block 3: Use shared transformation hook (DRY principle)
  const {
    localBounds,
    localRotation,
    isDragging,
    handleDragStart,
    handleDragEnd,
    handleDragBound,
    handleResizeDragStart,
    handleResizeDragMove,
    handleResizeDragEnd,
  } = useShapeTransform({
    shape,
    isSelected,
    onDragStart,
    onDragEnd,
    onUpdateShape,
  });

  // Force re-render when shape properties change (text fill color)
  useEffect(() => {
    if (textRef.current) {
      textRef.current.fill(shape.fill);
      const layer = textRef.current.getLayer();
      if (layer) {
        layer.batchDraw();
      }
    }
  }, [shape.fill]);

  // Text editing: Double-click to edit
  const handleDblClick = () => {
    setIsEditing(true);

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
    <Group>
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
        // Visual selection feedback
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
      
      {/* Transform handles for resize operations */}
      <TransformHandles
        bounds={localBounds}
        rotation={localRotation}
        visible={isSelected && !isDragging && !isEditing}
        onHandleDragStart={handleResizeDragStart}
        onHandleDragMove={handleResizeDragMove}
        onHandleDragEnd={handleResizeDragEnd}
      />
    </Group>
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
    prevProps.shape.locked === nextProps.shape.locked
  );
});
