import { useCallback, useState } from 'react';
import type { RectangleShape } from '../components/Rectangle';

/**
 * useCanvas Hook - Local state management for canvas shapes
 *
 * PR3.3: Canvas State Management
 *
 * Manages:
 * - Shapes array (create, update, delete)
 * - Selected shape tracking
 * - Shape ID generation
 *
 * Note: This is LOCAL state only. PR4 will replace with Firebase sync.
 */

/**
 * Task 3.3.4: Generate unique shape IDs
 */
const generateShapeId = (): string => {
  return `shape_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const useCanvas = () => {
  // Task 3.3.2: Shapes array state with add/remove functions
  const [shapes, setShapes] = useState<RectangleShape[]>([]);

  // Task 3.3.3: Selected shape state management
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);

  /**
   * Task 3.3.2: Add a new shape to the canvas
   */
  const addShape = useCallback((shape: Omit<RectangleShape, 'id'>) => {
    const newShape: RectangleShape = {
      ...shape,
      id: generateShapeId(),
    };
    setShapes((prev) => [...prev, newShape]);
    return newShape.id;
  }, []);

  /**
   * Task 3.3.2: Remove a shape by ID
   */
  const removeShape = useCallback((shapeId: string) => {
    setShapes((prev) => prev.filter((s) => s.id !== shapeId));
    // Clear selection if deleted shape was selected
    setSelectedShapeId((prev) => (prev === shapeId ? null : prev));
  }, []);

  /**
   * Update shape position after dragging
   */
  const updateShapePosition = useCallback((shapeId: string, x: number, y: number) => {
    setShapes((prev) =>
      prev.map((shape) =>
        shape.id === shapeId ? { ...shape, x, y } : shape
      )
    );
  }, []);

  /**
   * Task 3.3.3: Select a shape by ID
   */
  const selectShape = useCallback((shapeId: string | null) => {
    setSelectedShapeId(shapeId);
  }, []);

  /**
   * Clear selection (deselect all shapes)
   */
  const clearSelection = useCallback(() => {
    setSelectedShapeId(null);
  }, []);

  /**
   * Get the currently selected shape object
   */
  const getSelectedShape = useCallback(() => {
    if (!selectedShapeId) return null;
    return shapes.find((s) => s.id === selectedShapeId) || null;
  }, [selectedShapeId, shapes]);

  /**
   * Remove the currently selected shape
   */
  const removeSelectedShape = useCallback(() => {
    if (selectedShapeId) {
      removeShape(selectedShapeId);
    }
  }, [selectedShapeId, removeShape]);

  return {
    // State
    shapes,
    selectedShapeId,

    // Shape management
    addShape,
    removeShape,
    updateShapePosition,

    // Selection management
    selectShape,
    clearSelection,
    getSelectedShape,
    removeSelectedShape,
  };
};
