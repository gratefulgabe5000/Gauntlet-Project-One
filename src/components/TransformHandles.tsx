/**
 * Transform Handles Component
 * 
 * Phase 2b: Figma-Inspired Transform Operations
 * Task 8b.1.1: Professional 8-point resize handles
 * 
 * Features:
 * - 8 resize handles: 4 corners + 4 edges
 * - Visual indicators: 8px × 8px squares
 * - Proper resize cursors for each direction
 * - Real-time positioning based on shape bounds
 */

import { Rect } from 'react-konva';
import type Konva from 'konva';

interface TransformHandlesProps {
  /** Shape bounds for handle positioning */
  bounds: {
    x: number;
    y: number;
    width: number;  
    height: number;
  };

  /** Whether handles are visible */
  visible: boolean;

  /** Callback when handle drag starts */
  onHandleDragStart?: (handleType: HandleType, e: Konva.KonvaEventObject<DragEvent>) => void;

  /** Callback during handle dragging */
  onHandleDragMove?: (handleType: HandleType, e: Konva.KonvaEventObject<DragEvent>) => void;

  /** Callback when handle drag ends */
  onHandleDragEnd?: (handleType: HandleType, e: Konva.KonvaEventObject<DragEvent>) => void;
}

export type HandleType = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w';

interface HandleConfig {
  type: HandleType;
  cursor: string;
  x: number;
  y: number;
}

const HANDLE_SIZE = 8;
const HANDLE_HALF = HANDLE_SIZE / 2;

const TransformHandles = ({
  bounds,
  visible,
  onHandleDragStart,
  onHandleDragMove,
  onHandleDragEnd,
}: TransformHandlesProps) => {
  if (!visible) return null;


  // Calculate handle positions based on shape bounds
  const handleConfigs: HandleConfig[] = [
    // Corner handles
    {
      type: 'nw',
      cursor: 'nw-resize',
      x: bounds.x - HANDLE_HALF,
      y: bounds.y - HANDLE_HALF,
    },
    {
      type: 'ne', 
      cursor: 'ne-resize',
      x: bounds.x + bounds.width - HANDLE_HALF,
      y: bounds.y - HANDLE_HALF,
    },
    {
      type: 'se',
      cursor: 'se-resize', 
      x: bounds.x + bounds.width - HANDLE_HALF,
      y: bounds.y + bounds.height - HANDLE_HALF,
    },
    {
      type: 'sw',
      cursor: 'sw-resize',
      x: bounds.x - HANDLE_HALF,
      y: bounds.y + bounds.height - HANDLE_HALF,
    },
    // Edge handles
    {
      type: 'n',
      cursor: 'n-resize',
      x: bounds.x + bounds.width / 2 - HANDLE_HALF,
      y: bounds.y - HANDLE_HALF,
    },
    {
      type: 'e',
      cursor: 'e-resize',
      x: bounds.x + bounds.width - HANDLE_HALF,
      y: bounds.y + bounds.height / 2 - HANDLE_HALF,
    },
    {
      type: 's',
      cursor: 's-resize',
      x: bounds.x + bounds.width / 2 - HANDLE_HALF,
      y: bounds.y + bounds.height - HANDLE_HALF,
    },
    {
      type: 'w',
      cursor: 'w-resize',
      x: bounds.x - HANDLE_HALF,
      y: bounds.y + bounds.height / 2 - HANDLE_HALF,
    },
  ];

  return (
    <>
      {handleConfigs.map((config) => (
        <Rect
          key={config.type}
          x={config.x}
          y={config.y}
          width={HANDLE_SIZE}
          height={HANDLE_SIZE}
          fill="white"
          stroke="#666666"
          strokeWidth={1}
          draggable={true}
          onMouseEnter={(e) => {
            // Set cursor for resize direction
            const container = e.target.getStage()?.container();
            if (container) {
              container.style.cursor = config.cursor;
            }
          }}
          onMouseLeave={(e) => {
            // Reset cursor
            const container = e.target.getStage()?.container();
            if (container) {
              container.style.cursor = 'default';
            }
          }}
          onDragStart={(e) => {
            // Prevent handle from actually moving - reset position immediately
            e.target.x(config.x);
            e.target.y(config.y);
            
            if (onHandleDragStart) {
              onHandleDragStart(config.type, e);
            }
          }}
          onDragMove={(e) => {
            // Keep handle locked to its calculated position
            e.target.x(config.x);
            e.target.y(config.y);
            
            if (onHandleDragMove) {
              onHandleDragMove(config.type, e);
            }
          }}
          onDragEnd={(e) => {
            // Ensure handle stays at correct position
            e.target.x(config.x);
            e.target.y(config.y);
            
            if (onHandleDragEnd) {
              onHandleDragEnd(config.type, e);
            }
            // Reset cursor after drag
            const container = e.target.getStage()?.container();
            if (container) {
              container.style.cursor = 'default';
            }
          }}
        />
      ))}
    </>
  );
};

export default TransformHandles;
