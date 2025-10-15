import { Circle as KonvaCircle } from 'react-konva';
import type { Shape } from '../services/types';
import { constrainShapePosition } from '../utils/helpers';

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
  onSelect: () => void;
  onDragStart: () => void;
  onDragEnd: (id: string, x: number, y: number) => void;
  onRightClick?: (e: any) => void;
}

const Circle = ({ shape, isSelected, onSelect, onDragStart, onDragEnd, onRightClick }: CircleProps) => {
  const handleDragStart = (e: any) => {
    // Prevent event from bubbling to stage
    e.cancelBubble = true;
    // Notify parent that shape dragging started
    onDragStart();
  };

  const handleDragEnd = (e: any) => {
    const rawX = e.target.x();
    const rawY = e.target.y();

    // Get the top-left corner position from center position
    const radius = shape.width / 2;
    const topLeftX = rawX - radius;
    const topLeftY = rawY - radius;

    // Constrain position within canvas boundaries
    const constrained = constrainShapePosition(topLeftX, topLeftY, shape.width, shape.height);

    // Convert back to center position
    const centerX = constrained.x + radius;
    const centerY = constrained.y + radius;

    // Set the shape's position to constrained center values
    e.target.x(centerX);
    e.target.y(centerY);

    // Update shape position with constrained top-left coordinates
    onDragEnd(shape.id, constrained.x, constrained.y);
  };

  // Constrain circle position during drag
  const handleDragBound = (pos: { x: number; y: number }) => {
    const radius = shape.width / 2;
    const topLeftX = pos.x - radius;
    const topLeftY = pos.y - radius;
    const constrained = constrainShapePosition(topLeftX, topLeftY, shape.width, shape.height);

    // Return center position
    return {
      x: constrained.x + radius,
      y: constrained.y + radius,
    };
  };

  // Calculate center position and radius from bounding box
  const radius = shape.width / 2;
  const centerX = shape.x + radius;
  const centerY = shape.y + radius;

  return (
    <KonvaCircle
      id={shape.id}
      x={centerX}
      y={centerY}
      radius={radius}
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
  );
};

export default Circle;
