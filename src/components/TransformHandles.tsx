/**
 * Transform Handles Component
 * 
 * Phase 2b: Figma-Inspired Transform Operations
 * Task 8b.1.1: Professional 8-point resize handles
 * Task 8b.2: Rotation handle
 * 
 * Features:
 * - 8 resize handles: 4 corners + 4 edges
 * - Rotation handle with visual connection line
 * - Visual indicators: 8px × 8px squares, 6px radius circle for rotation
 * - Proper resize cursors for each direction
 * - Real-time positioning based on shape bounds
 * - Handles rotate with the shape
 */

import { Group, Rect, Circle, Line } from 'react-konva';
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

  /** Shape rotation in degrees (for rotating handles with shape) */
  rotation?: number;

  /** Which handles to show (defaults to all) */
  visibleHandles?: HandleType[];

  /** Position rotation handle at center (for Line/Arrow) */
  rotationHandleAtCenter?: boolean;

  /** Callback when handle drag starts */
  onHandleDragStart?: (handleType: HandleType, e: Konva.KonvaEventObject<DragEvent>) => void;

  /** Callback during handle dragging */
  onHandleDragMove?: (handleType: HandleType, e: Konva.KonvaEventObject<DragEvent>) => void;

  /** Callback when handle drag ends */
  onHandleDragEnd?: (handleType: HandleType, e: Konva.KonvaEventObject<DragEvent>) => void;
}

export type HandleType = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'rotate';

interface HandleConfig {
  type: HandleType;
  cursor: string;
  x: number;
  y: number;
}

const HANDLE_SIZE = 8;
const HANDLE_HALF = HANDLE_SIZE / 2;
const ROTATION_HANDLE_RADIUS = 6;
const ROTATION_HANDLE_OFFSET = 20;

const TransformHandles = ({
  bounds,
  visible,
  rotation = 0,
  visibleHandles,
  rotationHandleAtCenter = false,
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

  // Calculate shape center and rotation handle position
  const centerX = bounds.x + bounds.width / 2;
  const centerY = bounds.y + bounds.height / 2;
  
  // Rotation handle position
  const rotationHandleX = rotationHandleAtCenter ? 0 : 0;
  const rotationHandleY = rotationHandleAtCenter ? 0 : -(bounds.height / 2 + ROTATION_HANDLE_OFFSET);
  
  // Connection line from shape to rotation handle (only if not at center)
  const connectionLinePoints = !rotationHandleAtCenter 
    ? [0, -bounds.height / 2, 0, rotationHandleY]
    : null;

  // Filter handles if visibleHandles is specified
  const filteredHandles = visibleHandles 
    ? handleConfigs.filter(config => visibleHandles.includes(config.type))
    : handleConfigs;

  // Helper to get cursor for handle type
  const getCursorForHandle = (handleType: HandleType, isDragging: boolean): string => {
    if (handleType === 'rotate') {
      return isDragging ? 'grabbing' : 'grab';
    }
    const config = handleConfigs.find(h => h.type === handleType);
    return config?.cursor || 'default';
  };

  return (
    <Group
      x={centerX}
      y={centerY}
      offsetX={0}
      offsetY={0}
      rotation={rotation}
    >
      {/* Rotation handle connection line (rendered first for z-order) */}
      {connectionLinePoints && (
        <Line
          points={connectionLinePoints}
          stroke="#666666"
          strokeWidth={1}
          listening={false}
        />
      )}

      {/* Rotation handle (rendered second for z-order) */}
      {(!visibleHandles || visibleHandles.includes('rotate')) && (
        <Circle
          x={rotationHandleX}
          y={rotationHandleY}
          radius={ROTATION_HANDLE_RADIUS}
          fill="white"
          stroke="#666666"
          strokeWidth={1}
          draggable={true}
          onMouseEnter={(e) => {
            const container = e.target.getStage()?.container();
            if (container) {
              container.style.cursor = 'grab';
            }
          }}
          onMouseLeave={(e) => {
            const container = e.target.getStage()?.container();
            if (container) {
              container.style.cursor = 'default';
            }
          }}
          onDragStart={(e) => {
            // Lock position
            e.target.x(rotationHandleX);
            e.target.y(rotationHandleY);
            
            // Set grabbing cursor
            const container = e.target.getStage()?.container();
            if (container) {
              container.style.cursor = 'grabbing';
            }
            
            if (onHandleDragStart) {
              onHandleDragStart('rotate', e);
            }
          }}
          onDragMove={(e) => {
            // Lock position
            e.target.x(rotationHandleX);
            e.target.y(rotationHandleY);
            
            if (onHandleDragMove) {
              onHandleDragMove('rotate', e);
            }
          }}
          onDragEnd={(e) => {
            // Lock position
            e.target.x(rotationHandleX);
            e.target.y(rotationHandleY);
            
            // Reset cursor
            const container = e.target.getStage()?.container();
            if (container) {
              container.style.cursor = 'grab';
            }
            
            if (onHandleDragEnd) {
              onHandleDragEnd('rotate', e);
            }
          }}
        />
      )}

      {/* Resize handles (rendered last for z-order - on top) */}
      {filteredHandles.map((config) => (
        <Rect
          key={config.type}
          x={config.x - centerX}
          y={config.y - centerY}
          width={HANDLE_SIZE}
          height={HANDLE_SIZE}
          fill="white"
          stroke="#666666"
          strokeWidth={1}
          draggable={true}
          onMouseEnter={(e) => {
            const container = e.target.getStage()?.container();
            if (container) {
              container.style.cursor = config.cursor;
            }
          }}
          onMouseLeave={(e) => {
            const container = e.target.getStage()?.container();
            if (container) {
              container.style.cursor = 'default';
            }
          }}
          onDragStart={(e) => {
            // Lock position
            e.target.x(config.x - centerX);
            e.target.y(config.y - centerY);
            
            if (onHandleDragStart) {
              onHandleDragStart(config.type, e);
            }
          }}
          onDragMove={(e) => {
            // Lock position
            e.target.x(config.x - centerX);
            e.target.y(config.y - centerY);
            
            if (onHandleDragMove) {
              onHandleDragMove(config.type, e);
            }
          }}
          onDragEnd={(e) => {
            // Lock position
            e.target.x(config.x - centerX);
            e.target.y(config.y - centerY);
            
            if (onHandleDragEnd) {
              onHandleDragEnd(config.type, e);
            }
            
            // Reset cursor
            const container = e.target.getStage()?.container();
            if (container) {
              container.style.cursor = 'default';
            }
          }}
        />
      ))}
    </Group>
  );
};

export default TransformHandles;
