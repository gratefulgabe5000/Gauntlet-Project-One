import { Rect } from 'react-konva';
import { constrainShapePosition } from '../utils/helpers';

/**
 * Rectangle Component - Individual draggable rectangle shape
 *
 * PR3.2 & PR3.6: Local Canvas Functionality with utility helpers
 *
 * Features:
 * - Renders a single rectangle with Konva
 * - Click to select (Task 3.2.3)
 * - Drag to move (Task 3.2.4)
 * - Visual selection feedback (Task 3.2.2)
 * - Boundary validation (Task 3.6.3)
 */

export interface RectangleShape {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  createdBy?: string;
  createdAt?: number;
}

interface RectangleProps {
  shape: RectangleShape;
  isSelected: boolean;
  onSelect: () => void;
  onDragStart: () => void;
  onDragEnd: (id: string, x: number, y: number) => void;
}

/**
 * Task 3.2.1: Basic Rectangle component with Konva Rect
 */
const Rectangle = ({ shape, isSelected, onSelect, onDragStart, onDragEnd }: RectangleProps) => {
  const handleDragStart = (e: any) => {
    // Prevent event from bubbling to stage
    e.cancelBubble = true;
    // Notify parent that shape dragging started
    onDragStart();
  };

  const handleDragEnd = (e: any) => {
    const rawX = e.target.x();
    const rawY = e.target.y();

    // Task 3.6.3: Use helper to constrain position within canvas boundaries
    const constrained = constrainShapePosition(rawX, rawY, shape.width, shape.height);

    // Immediately set the shape's position to constrained values
    // This ensures Konva has the correct position before React re-renders
    e.target.x(constrained.x);
    e.target.y(constrained.y);

    // Update shape position with constrained coordinates
    onDragEnd(shape.id, constrained.x, constrained.y);
  };

  // Task 3.6.3: Constrain rectangle position during drag
  const handleDragBound = (pos: { x: number; y: number }) => {
    return constrainShapePosition(pos.x, pos.y, shape.width, shape.height);
  };

  return (
    <Rect
      id={shape.id}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      fill={shape.fill}
      // Task 3.2.2: Visual feedback for selection
      stroke={isSelected ? '#3b82f6' : '#94a3b8'}
      strokeWidth={isSelected ? 3 : 1}
      cornerRadius={4}
      // Task 3.2.4: Enable dragging
      draggable
      dragBoundFunc={handleDragBound}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      // Task 3.2.3: Click to select
      onClick={onSelect}
      onTap={onSelect}
      // Visual feedback on hover
      onMouseEnter={(e) => {
        const container = e.target.getStage()?.container();
        if (container) {
          container.style.cursor = 'move';
        }
      }}
      onMouseLeave={(e) => {
        const container = e.target.getStage()?.container();
        if (container) {
          container.style.cursor = 'default';
        }
      }}
    />
  );
};

export default Rectangle;
