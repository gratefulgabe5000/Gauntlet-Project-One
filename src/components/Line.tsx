import { Group, Line as KonvaLine } from 'react-konva';
import React from 'react';
import type { Shape } from '../services/types';
import TransformHandles from './TransformHandles';
import { useShapeTransform } from '../hooks/useShapeTransform';

/**
 * Line Component - Individual draggable line shape
 *
 * Phase 4a Block 3: Refactored to use useShapeTransform hook (DRY principle)
 *
 * Features:
 * - Renders a line with Konva Line
 * - Click to select
 * - Drag to move
 * - Visual selection feedback
 * - Boundary validation
 * - Default stroke: 2px, #333333
 */

interface LineProps {
  shape: Shape;
  isSelected: boolean;
  onSelect: (e?: any) => void;
  onDragStart: (e?: any) => void;
  onDragEnd: (id: string, x: number, y: number) => void;
  onUpdateShape?: (id: string, updates: Partial<Shape>) => void;
  onRightClick?: (e: any) => void;
}

const Line = ({ shape, isSelected, onSelect, onDragStart, onDragEnd, onUpdateShape, onRightClick }: LineProps) => {
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

  // Calculate line points from bounds (handles negative dimensions for mirroring)
  const points = [0, 0, localBounds.width, localBounds.height];

  return (
    <Group>
      <KonvaLine
        id={shape.id}
        x={localBounds.x + localBounds.width / 2}
        y={localBounds.y + localBounds.height / 2}
        offsetX={localBounds.width / 2}
        offsetY={localBounds.height / 2}
        rotation={localRotation}
        points={points}
        stroke={shape.stroke || '#333333'}
        strokeWidth={shape.strokeWidth || 2}
        lineCap="round"
        lineJoin="round"
        // Enhanced visual feedback for selection
        shadowColor={isSelected ? '#8b5cf6' : 'transparent'}
        shadowBlur={isSelected ? 15 : 0}
        shadowOpacity={isSelected ? 0.6 : 0}
        shadowOffset={isSelected ? { x: 0, y: 0 } : { x: 0, y: 0 }}
        // Make KonvaLine itself draggable (allows both click and drag)
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
          // Highlight on hover if not selected
          if (!isSelected) {
            e.target.strokeWidth((shape.strokeWidth || 2) + 1);
          }
        }}
        onMouseLeave={(e) => {
          const container = e.target.getStage()?.container();
          if (container) {
            container.style.cursor = 'default';
          }
          // Reset to default state if not selected
          if (!isSelected) {
            e.target.strokeWidth(shape.strokeWidth || 2);
          }
        }}
      />
      
      {/* Transform handles for resize and rotation */}
      <TransformHandles
        bounds={localBounds}
        rotation={localRotation}
        visible={isSelected && !isDragging}
        onHandleDragStart={handleResizeDragStart}
        onHandleDragMove={handleResizeDragMove}
        onHandleDragEnd={handleResizeDragEnd}
      />
    </Group>
  );
};

// PR10a: Phase 4a Block 4 - Memoize to prevent unnecessary re-renders
export default React.memo(Line, (prevProps, nextProps) => {
  if (prevProps.isSelected !== nextProps.isSelected) return false;
  if (prevProps.shape === nextProps.shape) return true;
  
  return (
    prevProps.shape.id === nextProps.shape.id &&
    prevProps.shape.x === nextProps.shape.x &&
    prevProps.shape.y === nextProps.shape.y &&
    prevProps.shape.width === nextProps.shape.width &&
    prevProps.shape.height === nextProps.shape.height &&
    prevProps.shape.stroke === nextProps.shape.stroke &&
    prevProps.shape.strokeWidth === nextProps.shape.strokeWidth &&
    prevProps.shape.rotation === nextProps.shape.rotation &&
    prevProps.shape.opacity === nextProps.shape.opacity &&
    prevProps.shape.locked === nextProps.shape.locked
  );
});
