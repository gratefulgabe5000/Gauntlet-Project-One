import { Arrow as KonvaArrow } from 'react-konva';
import type { Shape } from '../services/types';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../utils/helpers';

/**
 * Arrow Component - Individual draggable arrow shape
 *
 * PR8a.1.2: Arrow shape component (Phase 2a)
 *
 * Features:
 * - Renders an arrow with Konva Arrow (includes arrowhead)
 * - Click to select
 * - Drag to move
 * - Visual selection feedback
 * - Boundary validation
 * - Default: 2px stroke, black color, 10px pointer length
 */

interface ArrowProps {
  shape: Shape;
  isSelected: boolean;
  onSelect: (e?: any) => void; // PR8a: Pass event for shift-click detection
  onDragStart: (e?: any) => void; // PR8a: Pass event for shift-drag duplication
  onDragEnd: (id: string, x: number, y: number) => void;
  onRightClick?: (e: any) => void;
}

const Arrow = ({ shape, isSelected, onSelect, onDragStart, onDragEnd, onRightClick }: ArrowProps) => {
  const handleDragStart = (e: any) => {
    // Prevent event from bubbling to stage
    e.cancelBubble = true;
    // Notify parent that shape dragging started (pass event for shift-drag detection)
    onDragStart(e);
  };

  const handleDragEnd = (e: any) => {
    const rawX = e.target.x();
    const rawY = e.target.y();

    // Constrain position within canvas boundaries
    const constrained = {
      x: Math.max(0, Math.min(CANVAS_WIDTH - shape.width, rawX)),
      y: Math.max(0, Math.min(CANVAS_HEIGHT - shape.height, rawY)),
    };

    // Set the shape's position to constrained values
    e.target.x(constrained.x);
    e.target.y(constrained.y);

    // Update shape position with constrained coordinates
    onDragEnd(shape.id, constrained.x, constrained.y);
  };

  // Constrain arrow position during drag
  const handleDragBound = (pos: { x: number; y: number }) => {
    return {
      x: Math.max(0, Math.min(CANVAS_WIDTH - shape.width, pos.x)),
      y: Math.max(0, Math.min(CANVAS_HEIGHT - shape.height, pos.y)),
    };
  };

  // Calculate arrow points relative to shape position
  // Arrow is drawn from top-left to bottom-right of bounding box
  // Konva Arrow automatically adds arrowhead at the end point
  const points = [0, 0, shape.width, shape.height];

  return (
    <KonvaArrow
      id={shape.id}
      x={shape.x}
      y={shape.y}
      points={points}
      // Arrow styling
      stroke={shape.fill || '#000000'}
      fill={shape.fill || '#000000'} // Fill for arrowhead
      strokeWidth={isSelected ? 4 : 2}
      lineCap="round"
      lineJoin="round"
      // Arrowhead properties
      pointerLength={10}
      pointerWidth={10}
      // Selection visual feedback
      shadowColor={isSelected ? '#8b5cf6' : 'transparent'}
      shadowBlur={isSelected ? 15 : 0}
      shadowOpacity={isSelected ? 0.6 : 0}
      // Make arrow easier to click/select with hit detection
      hitStrokeWidth={isSelected ? 12 : 8}
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
        // Add thicker stroke on hover if not selected
        if (!isSelected) {
          e.target.strokeWidth(3);
        }
      }}
      onMouseLeave={(e) => {
        const container = e.target.getStage()?.container();
        if (container) {
          container.style.cursor = 'default';
        }
        // Reset to default state if not selected
        if (!isSelected) {
          e.target.strokeWidth(2);
        }
      }}
    />
  );
};

export default Arrow;
