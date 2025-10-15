import { useEffect, useRef, useState } from 'react';
import { Text as KonvaText, Transformer } from 'react-konva';
import type { Shape } from '../services/types';
import { constrainShapePosition } from '../utils/helpers';

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
  onSelect: () => void;
  onDragStart: () => void;
  onDragEnd: (id: string, x: number, y: number) => void;
  onTextChange: (id: string, text: string) => void;
  onRightClick?: (e: any) => void;
}

const Text = ({ shape, isSelected, onSelect, onDragStart, onDragEnd, onTextChange, onRightClick }: TextProps) => {
  const textRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isSelected && transformerRef.current && textRef.current) {
      transformerRef.current.nodes([textRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

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

  const handleDragStart = (e: any) => {
    e.cancelBubble = true;
    onDragStart();
  };

  const handleDragEnd = (e: any) => {
    const rawX = e.target.x();
    const rawY = e.target.y();

    const constrained = constrainShapePosition(rawX, rawY, shape.width, shape.height);

    e.target.x(constrained.x);
    e.target.y(constrained.y);

    onDragEnd(shape.id, constrained.x, constrained.y);
  };

  const handleDragBound = (pos: { x: number; y: number }) => {
    return constrainShapePosition(pos.x, pos.y, shape.width, shape.height);
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
        x={shape.x}
        y={shape.y}
        text={shape.text || 'Double-click to edit'}
        fontSize={16}
        fontFamily="Arial"
        fill={shape.fill}
        width={shape.width}
        height={shape.height}
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
      {isSelected && !isEditing && (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            // Limit resize
            if (newBox.width < 50 || newBox.height < 30) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default Text;
