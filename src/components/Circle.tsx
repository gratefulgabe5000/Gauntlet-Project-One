import { Group, Ellipse as KonvaEllipse } from 'react-konva';
import React from 'react';
import type { Shape } from '../services/types';
import TransformHandles from './TransformHandles';
import { useShapeTransform } from '../hooks/useShapeTransform';

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
      rotation={localRotation}
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
export default React.memo(Circle, (prevProps, nextProps) => {
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
    prevProps.shape.stroke === nextProps.shape.stroke &&
    prevProps.shape.strokeWidth === nextProps.shape.strokeWidth &&
    prevProps.shape.opacity === nextProps.shape.opacity &&
    prevProps.shape.locked === nextProps.shape.locked
  );
});
