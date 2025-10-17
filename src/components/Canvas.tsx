import type Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import type { UserPresence } from '../services/types';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../utils/helpers';
import Arrow from './Arrow';
import Circle from './Circle';
import Cursor from './Cursor';
import Line from './Line';
import Rectangle, { type RectangleShape } from './Rectangle';
import ShapeContextMenu from './ShapeContextMenu';
import Text from './Text';

/**
 * Canvas Component - Main collaborative canvas workspace
 *
 * MVP Specifications:
 * - Canvas size: 2000x2000px (bounded)
 * - Viewport: Full browser window minus toolbar
 * - Rendering: Konva.js for high-performance canvas operations
 *
 * Current Status: PR5.7 - Real-time cursor tracking and user presence
 * Features: Shapes, pan/zoom, multi-user cursors, presence tracking
 */

// Zoom configuration constants
const MIN_SCALE = 0.1;
const MAX_SCALE = 3;

interface CanvasProps {
  shapes: RectangleShape[];
  selectedShapeId: string | null;
  selectedShapeIds?: string[]; // PR8a: Multi-select support
  onSelectShape: (shapeId: string | null, addToSelection?: boolean) => void;
  onUpdateShapePosition: (shapeId: string, x: number, y: number) => void;
  onTextChange: (shapeId: string, text: string) => void;
  onColorChange: (shapeId: string, color: string) => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onShapeDragStart?: () => void;
  onShapeDragEnd?: () => void;
  // PR8a: Shift-drag to duplicate
  onDuplicateShape?: (shapeId: string) => Promise<string | null>;
  // PR5: User presence
  activeUsers?: UserPresence[];
  onCursorMove?: (x: number, y: number) => void;
  // PR8a.5: Stage reference callback for export
  onStageReady?: (stage: Konva.Stage | null) => void;
}

const Canvas = ({
  shapes,
  selectedShapeId,
  selectedShapeIds = [], // PR8a: Multi-select
  onSelectShape,
  onUpdateShapePosition,
  onTextChange,
  onColorChange,
  onZoomIn,
  onZoomOut,
  onShapeDragStart,
  onShapeDragEnd,
  onDuplicateShape,
  activeUsers = [],
  onCursorMove,
  onStageReady,
}: CanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);

  // Viewport dimensions (browser window size)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // PR8a.5: Notify parent when stage is ready
  useEffect(() => {
    if (onStageReady && stageRef.current) {
      onStageReady(stageRef.current);
    }
  }, [onStageReady]);

  // Stage position and scale for pan/zoom (Task 3.1.1)
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const [stageScale, setStageScale] = useState(1);

  // Track if a shape is currently being dragged (use ref for synchronous access)
  const isShapeDraggingRef = useRef(false);

  // Context menu state for shape color changing
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    shapeId: string;
    currentColor: string;
  } | null>(null);

  // Task 3.4.4: Zoom in/out from toolbar buttons
  useEffect(() => {
    if (onZoomIn) {
      // Expose zoom in function
      (window as any).__canvasZoomIn = () => {
        const stage = stageRef.current;
        if (!stage) return;

        const center = {
          x: dimensions.width / 2,
          y: dimensions.height / 2,
        };

        const oldScale = stageScale;
        const newScale = Math.min(MAX_SCALE, oldScale * 1.2);

        const mousePointTo = {
          x: (center.x - stage.x()) / oldScale,
          y: (center.y - stage.y()) / oldScale,
        };

        const newPos = constrainStagePosition({
          x: center.x - mousePointTo.x * newScale,
          y: center.y - mousePointTo.y * newScale,
        }, newScale);

        setStageScale(newScale);
        setStagePos(newPos);
      };
    }

    if (onZoomOut) {
      // Expose zoom out function
      (window as any).__canvasZoomOut = () => {
        const stage = stageRef.current;
        if (!stage) return;

        const center = {
          x: dimensions.width / 2,
          y: dimensions.height / 2,
        };

        const oldScale = stageScale;
        const newScale = Math.max(MIN_SCALE, oldScale / 1.2);

        const mousePointTo = {
          x: (center.x - stage.x()) / oldScale,
          y: (center.y - stage.y()) / oldScale,
        };

        const newPos = constrainStagePosition({
          x: center.x - mousePointTo.x * newScale,
          y: center.y - mousePointTo.y * newScale,
        }, newScale);

        setStageScale(newScale);
        setStagePos(newPos);
      };
    }
  }, [stageScale, stagePos, dimensions, onZoomIn, onZoomOut]);

  // Responsive canvas sizing based on container dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    // Initial size calculation
    updateDimensions();

    // Update on window resize
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Center canvas on initial load
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      // Center the 2000x2000 canvas in the viewport
      setStagePos({
        x: (dimensions.width - CANVAS_WIDTH) / 2,
        y: (dimensions.height - CANVAS_HEIGHT) / 2,
      });
    }
  }, [dimensions.width, dimensions.height]);

  // Task 3.1.5: Constrain stage position to prevent infinite panning
  const constrainStagePosition = (pos: { x: number; y: number }, scale: number) => {
    const scaledCanvasWidth = CANVAS_WIDTH * scale;
    const scaledCanvasHeight = CANVAS_HEIGHT * scale;

    // Allow some margin (25% of canvas) to be outside viewport
    const margin = 0.25;

    // Calculate boundaries for X axis
    let constrainedX = pos.x;
    if (scaledCanvasWidth > dimensions.width) {
      // Canvas is wider than viewport - constrain with margin
      const minX = -(scaledCanvasWidth * (1 + margin)) + dimensions.width;
      const maxX = scaledCanvasWidth * margin;
      constrainedX = Math.max(minX, Math.min(maxX, pos.x));
    } else {
      // Canvas fits within viewport horizontally - center it
      constrainedX = (dimensions.width - scaledCanvasWidth) / 2;
    }

    // Calculate boundaries for Y axis
    let constrainedY = pos.y;
    if (scaledCanvasHeight > dimensions.height) {
      // Canvas is taller than viewport - constrain with margin
      const minY = -(scaledCanvasHeight * (1 + margin)) + dimensions.height;
      const maxY = scaledCanvasHeight * margin;
      constrainedY = Math.max(minY, Math.min(maxY, pos.y));
    } else {
      // Canvas fits within viewport vertically - center it
      constrainedY = (dimensions.height - scaledCanvasHeight) / 2;
    }

    return {
      x: constrainedX,
      y: constrainedY,
    };
  };

  // Task 3.1.5: Constrain drag position in real-time during dragging
  const handleDragBound = (pos: { x: number; y: number }) => {
    // If a shape is being dragged, prevent stage from moving
    if (isShapeDraggingRef.current) {
      return { x: stagePos.x, y: stagePos.y };
    }
    return constrainStagePosition(pos, stageScale);
  };

  // Task 3.1.3: Handle canvas panning with mouse drag
  const handleStageDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    // Don't update stage position if a shape was being dragged
    if (isShapeDraggingRef.current) {
      // Reset the flag after shape drag completes
      isShapeDraggingRef.current = false;
      return;
    }
    // Update state with final constrained position
    setStagePos({
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  // Task 3.1.4: Handle zoom with mouse wheel
  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    const stage = stageRef.current;
    if (!stage) return;

    const oldScale = stageScale;
    const pointer = stage.getPointerPosition();
    if (!pointer) return;

    // Calculate zoom direction and factor
    const scaleBy = 1.1;
    const direction = e.evt.deltaY > 0 ? -1 : 1;
    const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    // Clamp scale between MIN_SCALE and MAX_SCALE
    const clampedScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));

    // Calculate new position to zoom toward cursor
    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const newPos = {
      x: pointer.x - mousePointTo.x * clampedScale,
      y: pointer.y - mousePointTo.y * clampedScale,
    };

    // Apply boundary constraints to zoom position
    const constrainedPos = constrainStagePosition(newPos, clampedScale);

    setStageScale(clampedScale);
    setStagePos(constrainedPos);
  };

  // Task 5.3: Handle mouse movement for cursor tracking
  const handleMouseMove = () => {
    if (!onCursorMove) return;

    const stage = stageRef.current;
    if (!stage) return;

    const pointer = stage.getPointerPosition();
    if (!pointer) return;

    // Convert viewport coordinates to canvas coordinates
    const canvasX = (pointer.x - stagePos.x) / stageScale;
    const canvasY = (pointer.y - stagePos.y) / stageScale;

    // Only update if within canvas bounds
    if (canvasX >= 0 && canvasX <= CANVAS_WIDTH && canvasY >= 0 && canvasY <= CANVAS_HEIGHT) {
      onCursorMove(canvasX, canvasY);
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-gray-50 overflow-hidden relative"
      style={{ cursor: 'grab' }}
    >
      {/* Konva Stage - 2000x2000px canvas space with pan/zoom capability */}
      <Stage
        ref={stageRef}
        width={dimensions.width}
        height={dimensions.height}
        x={stagePos.x}
        y={stagePos.y}
        scaleX={stageScale}
        scaleY={stageScale}
        draggable={true}
        dragBoundFunc={handleDragBound}
        onDragEnd={handleStageDragEnd}
        onWheel={handleWheel}
        onMouseMove={handleMouseMove}
        onClick={(e) => {
          // Deselect shapes when clicking on empty canvas
          if (e.target === e.target.getStage()) {
            onSelectShape(null);
          }
        }}
        className="konva-stage"
      >
        {/* Background Layer - Non-interactive canvas background */}
        <Layer>
          <Rect
            x={0}
            y={0}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            fill="#ffffff"
            stroke="#e5e7eb"
            strokeWidth={2}
            listening={false}
          />
        </Layer>

        {/* Shapes Layer - User-created shapes (PR3.2, PR8a.1.6) */}
        <Layer>
          {shapes.map((shape) => {
            const shapeProps = {
              key: shape.id,
              shape: shape,
              isSelected: selectedShapeIds.includes(shape.id), // PR8a: Multi-select check
              onSelect: (e?: any) => {
                // PR8a: Multi-select with Shift key
                const shiftKey = e?.evt?.shiftKey || false;
                onSelectShape(shape.id, shiftKey);
              },
              onDragStart: async (e?: any) => {
                isShapeDraggingRef.current = true;
                onShapeDragStart?.();

                // PR8a: Shift-drag to duplicate
                if (e?.evt?.shiftKey && onDuplicateShape) {
                  const duplicateId = await onDuplicateShape(shape.id);
                  if (duplicateId) {
                    // Select the duplicate so it becomes the one being dragged
                    onSelectShape(duplicateId);
                    console.log('🔄 Shift-drag: Created duplicate', duplicateId);
                  }
                }
              },
              onDragEnd: (id: string, x: number, y: number) => {
                // Note: Reset flag in handleStageDragEnd to ensure it runs first
                onUpdateShapePosition(id, x, y);
                onShapeDragEnd?.();
              },
              onRightClick: (e: any) => {
                e.evt.preventDefault();
                const stage = e.target.getStage();
                if (stage) {
                  const pointerPosition = stage.getPointerPosition();
                  if (pointerPosition) {
                    setContextMenu({
                      visible: true,
                      x: pointerPosition.x + stage.container().offsetLeft,
                      y: pointerPosition.y + stage.container().offsetTop,
                      shapeId: shape.id,
                      currentColor: shape.fill,
                    });
                  }
                }
              },
            };

            if (shape.type === 'circle') {
              return <Circle {...shapeProps} />;
            } else if (shape.type === 'text') {
              return (
                <Text
                  {...shapeProps}
                  onTextChange={onTextChange}
                />
              );
            } else if (shape.type === 'line') {
              // PR8a.1.6: Line shape rendering (Phase 2a)
              return <Line {...shapeProps} />;
            } else if (shape.type === 'arrow') {
              // PR8a.1.6: Arrow shape rendering (Phase 2a)
              return <Arrow {...shapeProps} />;
            } else {
              return <Rectangle {...shapeProps} />;
            }
          })}
        </Layer>

        {/* Cursors Layer - Other users' cursors (PR5.6) */}
        <Layer listening={false}>
          {activeUsers.map((user) => (
            <Cursor key={user.userId} user={user} />
          ))}
        </Layer>
      </Stage>

      {/* Canvas info overlay - for development debugging */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg shadow-md border border-gray-200 text-xs text-gray-600">
        <div className="font-bold text-gray-900 mb-2 text-sm">Canvas Info</div>
        <div className="space-y-1">
          <div><span className="font-medium text-gray-700">Canvas:</span> {CANVAS_WIDTH}×{CANVAS_HEIGHT}px</div>
          <div><span className="font-medium text-gray-700">Viewport:</span> {dimensions.width}×{dimensions.height}px</div>
          <div><span className="font-medium text-gray-700">Position:</span> ({Math.round(stagePos.x)}, {Math.round(stagePos.y)})</div>
          <div><span className="font-medium text-gray-700">Scale:</span> {stageScale.toFixed(2)}x</div>
          <div><span className="font-medium text-gray-700">Shapes:</span> {shapes.length}</div>
        </div>
      </div>

      {/* Context Menu for color changes */}
      {contextMenu && (
        <ShapeContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          currentColor={contextMenu.currentColor}
          onSelectColor={(color) => {
            onColorChange(contextMenu.shapeId, color);
          }}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
};

export default Canvas;
