import { Line as KonvaLine } from 'react-konva';
import type { Shape } from '../services/types';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../utils/helpers';

/**
 * Line Component - Individual draggable line shape
 *
 * PR8a.1.1: Line shape component (Phase 2a)
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
  onSelect: (e?: any) => void; // PR8a: Pass event for shift-click detection
  onDragStart: (e?: any) => void; // PR8a: Pass event for shift-drag duplication
  onDragEnd: (id: string, x: number, y: number) => void;
  onRightClick?: (e: any) => void;
}

const Line = ({ shape, isSelected, onSelect, onDragStart, onDragEnd, onRightClick }: LineProps) => {
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

  // Constrain line position during drag
  const handleDragBound = (pos: { x: number; y: number }) => {
    return {
      x: Math.max(0, Math.min(CANVAS_WIDTH - shape.width, pos.x)),
      y: Math.max(0, Math.min(CANVAS_HEIGHT - shape.height, pos.y)),
    };
  };

  // Calculate line points relative to shape position
  // Shape stores top-left bounding box (x, y) and dimensions (width, height)
  // Line is drawn from top-left to bottom-right of bounding box
  const points = [0, 0, shape.width, shape.height];

  return (
    <KonvaLine
      id={shape.id}
      x={shape.x}
      y={shape.y}
      points={points}
      // Line styling
      stroke={shape.fill || '#333333'}
      strokeWidth={isSelected ? 4 : 2}
      lineCap="round"
      lineJoin="round"
      // Selection visual feedback
      shadowColor={isSelected ? '#f59e0b' : 'transparent'}
      shadowBlur={isSelected ? 15 : 0}
      shadowOpacity={isSelected ? 0.6 : 0}
      // Make line easier to click/select with hit detection
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

export default Line;
