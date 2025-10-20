import React from 'react';
import { Group, Rect } from 'react-konva';
import type { Shape } from '../services/types';
import TransformHandles from './TransformHandles';
import { useShapeTransform } from '../hooks/useShapeTransform';

/**
 * Rectangle Component - Individual draggable rectangle shape
 *
 * PR3.2 & PR3.6 & PR4.5: Real-time collaborative rectangles
 * Phase 4a Block 3: Refactored to use useShapeTransform hook (DRY principle)
 *
 * Features:
 * - Renders a single rectangle with Konva
 * - Click to select (Task 3.2.3)
 * - Drag to move (Task 3.2.4)
 * - Visual selection feedback (Task 3.2.2)
 * - Boundary validation (Task 3.6.3)
 * - Lock indicators (Task 4.4)
 * 
 * Code Reduction: ~400 lines → ~120 lines (70% reduction)
 */

// Re-export Shape type as RectangleShape for backwards compatibility
export type RectangleShape = Shape;

interface RectangleProps {
  shape: Shape;
  isSelected: boolean;
  onSelect: (e?: any) => void;
  onDragStart: (e?: any) => void;
  onDragEnd: (id: string, x: number, y: number) => void;
  onUpdateShape?: (id: string, updates: Partial<Shape>) => void;
  onRightClick?: (e: any) => void;
}

const Rectangle = ({ 
  shape, 
  isSelected, 
  onSelect, 
  onDragStart, 
  onDragEnd, 
  onUpdateShape, 
  onRightClick 
}: RectangleProps) => {
  // Phase 4a Block 3: Use shared transform hook (replaces ~300 lines of code)
  const {
    localBounds,
    localRotation,
    isDragging,
    handleDragStart: onDragStartInternal,
    handleDragEnd: onDragEndInternal,
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
        // Visual selection feedback
        stroke={isSelected ? '#2563eb' : '#cbd5e1'}
        strokeWidth={isSelected ? 4 : 1}
        cornerRadius={6}
        shadowColor={isSelected ? '#2563eb' : 'transparent'}
        shadowBlur={isSelected ? 15 : 0}
        shadowOpacity={isSelected ? 0.4 : 0}
        shadowOffset={{ x: 0, y: 0 }}
        // Dragging
        draggable
        dragBoundFunc={handleDragBound}
        onDragStart={onDragStartInternal}
        onDragEnd={onDragEndInternal}
        // Selection
        onClick={onSelect}
        onTap={onSelect}
        onContextMenu={onRightClick}
        // Hover effects
        onMouseEnter={(e) => {
          const container = e.target.getStage()?.container();
          if (container) {
            container.style.cursor = 'move';
          }
          if (!isSelected && 'strokeWidth' in e.target && 'stroke' in e.target) {
            e.target.strokeWidth(2);
            e.target.stroke('#94a3b8');
          }
        }}
        onMouseLeave={(e) => {
          const container = e.target.getStage()?.container();
          if (container) {
            container.style.cursor = 'default';
          }
          if (!isSelected && 'strokeWidth' in e.target && 'stroke' in e.target) {
            e.target.strokeWidth(1);
            e.target.stroke('#cbd5e1');
          }
        }}
      />
      
      {/* Transform handles for resize/rotate operations */}
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

// Memoize to prevent unnecessary re-renders (Phase 4a Block 4)
export default React.memo(Rectangle, (prevProps, nextProps) => {
  if (prevProps.isSelected !== nextProps.isSelected) return false;
  if (prevProps.shape === nextProps.shape) return true;
  
  return (
    prevProps.shape.id === nextProps.shape.id &&
    prevProps.shape.x === nextProps.shape.x &&
    prevProps.shape.y === nextProps.shape.y &&
    prevProps.shape.width === nextProps.shape.width &&
    prevProps.shape.height === nextProps.shape.height &&
    prevProps.shape.fill === nextProps.shape.fill &&
    prevProps.shape.rotation === nextProps.shape.rotation
  );
});

