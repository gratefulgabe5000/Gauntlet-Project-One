import { Rect } from 'react-konva';
import type { Shape } from '../services/types';
import { constrainShapePosition } from '../utils/helpers';

/**
 * Rectangle Component - Individual draggable rectangle shape
 *
 * PR3.2 & PR3.6 & PR4.5: Real-time collaborative rectangles
 *
 * Features:
 * - Renders a single rectangle with Konva
 * - Click to select (Task 3.2.3)
 * - Drag to move (Task 3.2.4)
 * - Visual selection feedback (Task 3.2.2)
 * - Boundary validation (Task 3.6.3)
 * - Lock indicators (Task 4.4)
 */

// Re-export Shape type as RectangleShape for backwards compatibility
export type RectangleShape = Shape;

interface RectangleProps {
  shape: Shape;
  isSelected: boolean;
  onSelect: (e?: any) => void; // PR8a: Pass event for shift-click detection
  onDragStart: (e?: any) => void; // PR8a: Pass event for shift-drag duplication
  onDragEnd: (id: string, x: number, y: number) => void;
  onRightClick?: (e: any) => void;
}

/**
 * Task 3.2.1: Basic Rectangle component with Konva Rect
 */
const Rectangle = ({ shape, isSelected, onSelect, onDragStart, onDragEnd, onRightClick }: RectangleProps) => {
  const handleDragStart = (e: any) => {
    // Prevent event from bubbling to stage
    e.cancelBubble = true;
    // Notify parent that shape dragging started (pass event for shift-drag detection)
    onDragStart(e);
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
      // Task 3.2.2 + PR6.4.2: Enhanced visual feedback for selection
      stroke={isSelected ? '#2563eb' : '#cbd5e1'}
      strokeWidth={isSelected ? 4 : 1}
      cornerRadius={6}
      shadowColor={isSelected ? '#2563eb' : 'transparent'}
      shadowBlur={isSelected ? 15 : 0}
      shadowOpacity={isSelected ? 0.4 : 0}
      shadowOffset={isSelected ? { x: 0, y: 0 } : { x: 0, y: 0 }}
      // Task 3.2.4: Enable dragging
      draggable
      dragBoundFunc={handleDragBound}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      // Task 3.2.3: Click to select
      onClick={onSelect}
      onTap={onSelect}
      // Right-click for context menu
      onContextMenu={onRightClick}
      // PR6.4.2: Enhanced visual feedback on hover
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
  );
};

export default Rectangle;
