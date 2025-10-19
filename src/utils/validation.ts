/**
 * Phase 4a Block 3 - Task 2: Comprehensive Input Validation
 * 
 * Validates user inputs and shape data to prevent errors and ensure data quality
 */

import { CANVAS_WIDTH, CANVAS_HEIGHT } from './helpers';
import type { CreateShapeData } from '../services/types';

// Validation constants
export const VALIDATION_RULES = {
  MIN_SHAPE_SIZE: 10,
  MAX_SHAPE_SIZE: 2000,
  MIN_TEXT_SIZE: 8,
  MAX_TEXT_SIZE: 200,
  MIN_STROKE_WIDTH: 1,
  MAX_STROKE_WIDTH: 50,
} as const;

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate shape dimensions
 */
export function validateShapeDimensions(
  width: number,
  height: number,
  shapeType: string
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check minimum size
  if (width < VALIDATION_RULES.MIN_SHAPE_SIZE || height < VALIDATION_RULES.MIN_SHAPE_SIZE) {
    errors.push(`Shape dimensions must be at least ${VALIDATION_RULES.MIN_SHAPE_SIZE}px`);
  }

  // Check maximum size
  if (width > VALIDATION_RULES.MAX_SHAPE_SIZE || height > VALIDATION_RULES.MAX_SHAPE_SIZE) {
    errors.push(`Shape dimensions cannot exceed ${VALIDATION_RULES.MAX_SHAPE_SIZE}px`);
  }

  // Warn if shape is very large
  if (width > CANVAS_WIDTH / 2 || height > CANVAS_HEIGHT / 2) {
    warnings.push('Shape is quite large - consider making it smaller for better collaboration');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate shape position
 */
export function validateShapePosition(
  x: number,
  y: number,
  width: number,
  height: number
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if completely outside canvas
  if (x + width < 0 || x > CANVAS_WIDTH || y + height < 0 || y > CANVAS_HEIGHT) {
    errors.push('Shape is completely outside the canvas bounds');
  }

  // Warn if partially outside canvas
  if (x < 0 || y < 0 || x + width > CANVAS_WIDTH || y + height > CANVAS_HEIGHT) {
    warnings.push('Shape extends beyond canvas boundaries');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate color value
 */
export function validateColor(color: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Allow hex colors
  const hexPattern = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
  if (hexPattern.test(color)) {
    return { isValid: true, errors, warnings };
  }

  // Allow rgb/rgba
  const rgbPattern = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\)$/;
  if (rgbPattern.test(color)) {
    return { isValid: true, errors, warnings };
  }

  // Allow common CSS color names
  const cssColors = [
    'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown',
    'black', 'white', 'gray', 'grey', 'cyan', 'magenta', 'lime', 'navy',
    'teal', 'aqua', 'maroon', 'olive', 'silver', 'fuchsia', 'transparent'
  ];
  
  if (cssColors.includes(color.toLowerCase())) {
    return { isValid: true, errors, warnings };
  }

  errors.push(`Invalid color format: "${color}". Use hex (#FF0000), rgb(255,0,0), or CSS color names.`);

  return {
    isValid: false,
    errors,
    warnings,
  };
}

/**
 * Validate text content
 */
export function validateTextContent(text: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (text.length === 0) {
    warnings.push('Text is empty');
  }

  if (text.length > 1000) {
    warnings.push('Text is very long - consider splitting into multiple text boxes');
  }

  return {
    isValid: true, // Text can be empty
    errors,
    warnings,
  };
}

/**
 * Validate font size
 */
export function validateFontSize(fontSize: number): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (fontSize < VALIDATION_RULES.MIN_TEXT_SIZE) {
    errors.push(`Font size must be at least ${VALIDATION_RULES.MIN_TEXT_SIZE}px`);
  }

  if (fontSize > VALIDATION_RULES.MAX_TEXT_SIZE) {
    errors.push(`Font size cannot exceed ${VALIDATION_RULES.MAX_TEXT_SIZE}px`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate stroke width
 */
export function validateStrokeWidth(strokeWidth: number): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (strokeWidth < VALIDATION_RULES.MIN_STROKE_WIDTH) {
    errors.push(`Stroke width must be at least ${VALIDATION_RULES.MIN_STROKE_WIDTH}px`);
  }

  if (strokeWidth > VALIDATION_RULES.MAX_STROKE_WIDTH) {
    errors.push(`Stroke width cannot exceed ${VALIDATION_RULES.MAX_STROKE_WIDTH}px`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate complete shape data before creation
 */
export function validateShapeData(shapeData: CreateShapeData): ValidationResult {
  const allErrors: string[] = [];
  const allWarnings: string[] = [];

  // Validate dimensions
  const dimResult = validateShapeDimensions(shapeData.width, shapeData.height, shapeData.type);
  allErrors.push(...dimResult.errors);
  allWarnings.push(...dimResult.warnings);

  // Validate position
  const posResult = validateShapePosition(shapeData.x, shapeData.y, shapeData.width, shapeData.height);
  allErrors.push(...posResult.errors);
  allWarnings.push(...posResult.warnings);

  // Validate color if provided
  if (shapeData.fill) {
    const colorResult = validateColor(shapeData.fill);
    allErrors.push(...colorResult.errors);
    allWarnings.push(...colorResult.warnings);
  }

  // Validate text-specific properties
  if (shapeData.type === 'text') {
    if (shapeData.text) {
      const textResult = validateTextContent(shapeData.text);
      allErrors.push(...textResult.errors);
      allWarnings.push(...textResult.warnings);
    }

    if (shapeData.fontSize) {
      const fontResult = validateFontSize(shapeData.fontSize);
      allErrors.push(...fontResult.errors);
      allWarnings.push(...fontResult.warnings);
    }
  }

  // Validate stroke properties for line/arrow
  if ((shapeData.type === 'line' || shapeData.type === 'arrow') && shapeData.strokeWidth) {
    const strokeResult = validateStrokeWidth(shapeData.strokeWidth);
    allErrors.push(...strokeResult.errors);
    allWarnings.push(...strokeResult.warnings);
  }

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings,
  };
}

/**
 * Sanitize shape data by applying constraints
 */
export function sanitizeShapeData(shapeData: CreateShapeData): CreateShapeData {
  return {
    ...shapeData,
    // Clamp dimensions
    width: Math.max(VALIDATION_RULES.MIN_SHAPE_SIZE, Math.min(VALIDATION_RULES.MAX_SHAPE_SIZE, shapeData.width)),
    height: Math.max(VALIDATION_RULES.MIN_SHAPE_SIZE, Math.min(VALIDATION_RULES.MAX_SHAPE_SIZE, shapeData.height)),
    // Clamp position to canvas bounds
    x: Math.max(0, Math.min(CANVAS_WIDTH - shapeData.width, shapeData.x)),
    y: Math.max(0, Math.min(CANVAS_HEIGHT - shapeData.height, shapeData.y)),
    // Clamp optional properties
    fontSize: shapeData.fontSize 
      ? Math.max(VALIDATION_RULES.MIN_TEXT_SIZE, Math.min(VALIDATION_RULES.MAX_TEXT_SIZE, shapeData.fontSize))
      : undefined,
    strokeWidth: shapeData.strokeWidth
      ? Math.max(VALIDATION_RULES.MIN_STROKE_WIDTH, Math.min(VALIDATION_RULES.MAX_STROKE_WIDTH, shapeData.strokeWidth))
      : undefined,
  };
}

