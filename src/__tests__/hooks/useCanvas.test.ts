import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useCanvas } from '../../hooks/useCanvas';

/**
 * useCanvas Hook Tests
 *
 * PR3.7: Integration & Testing
 *
 * Tests for:
 * - Shape management (add, remove, update)
 * - Selection state
 * - ID generation
 */

describe('useCanvas Hook', () => {
  it('should initialize with empty shapes array', () => {
    const { result } = renderHook(() => useCanvas());

    expect(result.current.shapes).toEqual([]);
    expect(result.current.selectedShapeId).toBeNull();
  });

  it('should add a new shape', () => {
    const { result } = renderHook(() => useCanvas());

    const newShape = {
      x: 100,
      y: 200,
      width: 100,
      height: 100,
      fill: '#cccccc',
    };

    act(() => {
      result.current.addShape(newShape);
    });

    expect(result.current.shapes).toHaveLength(1);
    expect(result.current.shapes[0]).toMatchObject(newShape);
    expect(result.current.shapes[0].id).toBeTruthy();
  });

  it('should generate unique IDs for shapes', () => {
    const { result } = renderHook(() => useCanvas());

    const shape = { x: 0, y: 0, width: 100, height: 100, fill: '#ccc' };

    let id1: string;
    let id2: string;

    act(() => {
      id1 = result.current.addShape(shape);
      id2 = result.current.addShape(shape);
    });

    expect(id1).not.toBe(id2);
    expect(result.current.shapes).toHaveLength(2);
  });

  it('should select a shape by ID', () => {
    const { result } = renderHook(() => useCanvas());

    const shape = { x: 0, y: 0, width: 100, height: 100, fill: '#ccc' };
    let shapeId: string;

    act(() => {
      shapeId = result.current.addShape(shape);
    });

    act(() => {
      result.current.selectShape(shapeId);
    });

    expect(result.current.selectedShapeId).toBe(shapeId);
  });

  it('should clear selection', () => {
    const { result } = renderHook(() => useCanvas());

    const shape = { x: 0, y: 0, width: 100, height: 100, fill: '#ccc' };

    act(() => {
      const shapeId = result.current.addShape(shape);
      result.current.selectShape(shapeId);
    });

    expect(result.current.selectedShapeId).toBeTruthy();

    act(() => {
      result.current.clearSelection();
    });

    expect(result.current.selectedShapeId).toBeNull();
  });

  it('should remove a shape by ID', () => {
    const { result } = renderHook(() => useCanvas());

    const shape = { x: 0, y: 0, width: 100, height: 100, fill: '#ccc' };
    let shapeId: string;

    act(() => {
      shapeId = result.current.addShape(shape);
    });

    expect(result.current.shapes).toHaveLength(1);

    act(() => {
      result.current.removeShape(shapeId);
    });

    expect(result.current.shapes).toHaveLength(0);
  });

  it('should clear selection when removing selected shape', () => {
    const { result } = renderHook(() => useCanvas());

    const shape = { x: 0, y: 0, width: 100, height: 100, fill: '#ccc' };
    let shapeId: string;

    act(() => {
      shapeId = result.current.addShape(shape);
      result.current.selectShape(shapeId);
    });

    expect(result.current.selectedShapeId).toBe(shapeId);

    act(() => {
      result.current.removeShape(shapeId);
    });

    expect(result.current.selectedShapeId).toBeNull();
  });

  it('should update shape position', () => {
    const { result } = renderHook(() => useCanvas());

    const shape = { x: 100, y: 200, width: 100, height: 100, fill: '#ccc' };
    let shapeId: string;

    act(() => {
      shapeId = result.current.addShape(shape);
    });

    act(() => {
      result.current.updateShapePosition(shapeId, 300, 400);
    });

    expect(result.current.shapes[0].x).toBe(300);
    expect(result.current.shapes[0].y).toBe(400);
  });

  it('should remove selected shape', () => {
    const { result } = renderHook(() => useCanvas());

    const shape = { x: 0, y: 0, width: 100, height: 100, fill: '#ccc' };

    act(() => {
      const shapeId = result.current.addShape(shape);
      result.current.selectShape(shapeId);
    });

    expect(result.current.shapes).toHaveLength(1);

    act(() => {
      result.current.removeSelectedShape();
    });

    expect(result.current.shapes).toHaveLength(0);
    expect(result.current.selectedShapeId).toBeNull();
  });

  it('should get selected shape object', () => {
    const { result } = renderHook(() => useCanvas());

    const shape = { x: 100, y: 200, width: 100, height: 100, fill: '#ccc' };

    act(() => {
      const shapeId = result.current.addShape(shape);
      result.current.selectShape(shapeId);
    });

    const selectedShape = result.current.getSelectedShape();

    expect(selectedShape).toBeTruthy();
    expect(selectedShape?.x).toBe(100);
    expect(selectedShape?.y).toBe(200);
  });
});
