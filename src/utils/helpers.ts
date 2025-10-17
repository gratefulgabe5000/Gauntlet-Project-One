/**
 * Shape Management Utilities
 *
 * PR3.6: Shape Management Logic
 *
 * Utility functions for shape positioning, validation, and manipulation
 */

import type { RectangleShape } from '../components/Rectangle';

// Canvas constants
export const CANVAS_WIDTH = 2000;
export const CANVAS_HEIGHT = 2000;

// Default shape dimensions
export const DEFAULT_RECT_WIDTH = 100;
export const DEFAULT_RECT_HEIGHT = 100;
export const DEFAULT_RECT_FILL = '#cccccc';

/**
 * Task 3.6.2: Center shape positioning helper
 *
 * Calculates the position to center a shape on the canvas
 */
export const getCenteredPosition = (
  width: number = DEFAULT_RECT_WIDTH,
  height: number = DEFAULT_RECT_HEIGHT
): { x: number; y: number } => {
  return {
    x: CANVAS_WIDTH / 2 - width / 2,
    y: CANVAS_HEIGHT / 2 - height / 2,
  };
};

/**
 * Task 3.6.3: Shape boundary validation helper
 *
 * Ensures a shape's position stays within canvas boundaries
 */
export const constrainShapePosition = (
  x: number,
  y: number,
  width: number,
  height: number
): { x: number; y: number } => {
  const minX = 0;
  const maxX = CANVAS_WIDTH - width;
  const minY = 0;
  const maxY = CANVAS_HEIGHT - height;

  return {
    x: Math.max(minX, Math.min(maxX, x)),
    y: Math.max(minY, Math.min(maxY, y)),
  };
};

/**
 * Check if a shape is within canvas boundaries
 */
export const isShapeInBounds = (shape: RectangleShape): boolean => {
  return (
    shape.x >= 0 &&
    shape.y >= 0 &&
    shape.x + shape.width <= CANVAS_WIDTH &&
    shape.y + shape.height <= CANVAS_HEIGHT
  );
};

/**
 * Create a new rectangle shape with default properties
 */
export const createRectangleShape = (
  overrides?: Partial<Omit<RectangleShape, 'id'>>
): Omit<RectangleShape, 'id'> => {
  const centeredPos = getCenteredPosition();

  return {
    x: centeredPos.x,
    y: centeredPos.y,
    width: DEFAULT_RECT_WIDTH,
    height: DEFAULT_RECT_HEIGHT,
    fill: DEFAULT_RECT_FILL,
    ...overrides,
  };
};

/**
 * Create a new circle shape with default properties
 * Circle is represented as a square bounding box with width = height = diameter
 */
export const createCircleShape = (
  overrides?: Partial<Omit<RectangleShape, 'id'>>
): Omit<RectangleShape, 'id'> => {
  const centeredPos = getCenteredPosition();

  return {
    x: centeredPos.x,
    y: centeredPos.y,
    width: DEFAULT_RECT_WIDTH,
    height: DEFAULT_RECT_HEIGHT,
    fill: DEFAULT_RECT_FILL,
    ...overrides,
  };
};

/**
 * Create a new text shape with default properties
 */
export const createTextShape = (
  overrides?: Partial<Omit<RectangleShape, 'id'>>
): Omit<RectangleShape, 'id'> => {
  const centeredPos = getCenteredPosition(200, 50);

  return {
    x: centeredPos.x,
    y: centeredPos.y,
    width: 200,
    height: 50,
    fill: '#000000',
    ...overrides,
  };
};

/**
 * Create a new line shape with default properties
 * PR8a.1.3: Line shape creator (Phase 2a)
 *
 * @param x1 - Starting X coordinate (optional, defaults to centered)
 * @param y1 - Starting Y coordinate (optional, defaults to centered)
 * @param x2 - Ending X coordinate (optional, defaults to centered + 150px)
 * @param y2 - Ending Y coordinate (optional, defaults to centered + 150px)
 * @param overrides - Additional properties to override defaults
 */
export const createLineShape = (
  x1?: number,
  y1?: number,
  x2?: number,
  y2?: number,
  overrides?: Partial<Omit<RectangleShape, 'id'>>
): Omit<RectangleShape, 'id'> => {
  // Default to diagonal line from center
  const centeredPos = getCenteredPosition(150, 150);
  const startX = x1 ?? centeredPos.x;
  const startY = y1 ?? centeredPos.y;
  const endX = x2 ?? (startX + 150);
  const endY = y2 ?? (startY + 150);

  // Calculate bounding box
  const width = Math.abs(endX - startX);
  const height = Math.abs(endY - startY);

  return {
    x: startX,
    y: startY,
    width: width,
    height: height,
    fill: '#333333', // Default dark gray stroke
    ...overrides,
  };
};

/**
 * Create a new arrow shape with default properties
 * PR8a.1.3: Arrow shape creator (Phase 2a)
 *
 * @param x1 - Starting X coordinate (optional, defaults to centered)
 * @param y1 - Starting Y coordinate (optional, defaults to centered)
 * @param x2 - Ending X coordinate (optional, defaults to centered + 150px)
 * @param y2 - Ending Y coordinate (optional, defaults to centered + 150px)
 * @param overrides - Additional properties to override defaults
 */
export const createArrowShape = (
  x1?: number,
  y1?: number,
  x2?: number,
  y2?: number,
  overrides?: Partial<Omit<RectangleShape, 'id'>>
): Omit<RectangleShape, 'id'> => {
  // Default to diagonal arrow from center
  const centeredPos = getCenteredPosition(150, 150);
  const startX = x1 ?? centeredPos.x;
  const startY = y1 ?? centeredPos.y;
  const endX = x2 ?? (startX + 150);
  const endY = y2 ?? (startY + 150);

  // Calculate bounding box
  const width = Math.abs(endX - startX);
  const height = Math.abs(endY - startY);

  return {
    x: startX,
    y: startY,
    width: width,
    height: height,
    fill: '#000000', // Default black color
    pointerLength: 10,
    pointerWidth: 10,
    ...overrides,
  };
};

/**
 * Calculate the center point of a shape
 */
export const getShapeCenter = (shape: RectangleShape): { x: number; y: number } => {
  return {
    x: shape.x + shape.width / 2,
    y: shape.y + shape.height / 2,
  };
};

/**
 * Check if a point is inside a shape
 */
export const isPointInShape = (
  pointX: number,
  pointY: number,
  shape: RectangleShape
): boolean => {
  return (
    pointX >= shape.x &&
    pointX <= shape.x + shape.width &&
    pointY >= shape.y &&
    pointY <= shape.y + shape.height
  );
};
