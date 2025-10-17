/**
 * useKeyboardShortcuts Hook
 *
 * PR8a.4: Enhanced keyboard shortcuts (Phase 2a)
 *
 * Features:
 * - Arrow keys: Move selected shape (10px or 1px with Shift)
 * - Cmd/Ctrl+D: Duplicate selected shape
 * - Tab: Cycle through shapes (select next)
 * - Cmd/Ctrl+A: Select all shapes
 */

import { useCallback, useEffect } from 'react';
import type { Shape } from '../services/types';

export interface UseKeyboardShortcutsOptions {
  /** Currently selected shape ID */
  selectedShapeId: string | null;

  /** All shapes on canvas */
  shapes: Shape[];

  /** Callback to move a shape */
  onMoveShape: (shapeId: string, deltaX: number, deltaY: number) => void;

  /** Callback to duplicate a shape */
  onDuplicateShape: (shapeId: string) => void;

  /** Callback to select a shape */
  onSelectShape: (shapeId: string | null) => void;

  /** Callback to toggle help panel */
  onToggleHelp?: () => void;

  /** Whether shortcuts are enabled */
  enabled?: boolean;
}

/**
 * Custom hook for advanced keyboard shortcuts
 */
export function useKeyboardShortcuts({
  selectedShapeId,
  shapes,
  onMoveShape,
  onDuplicateShape,
  onSelectShape,
  onToggleHelp,
  enabled = true,
}: UseKeyboardShortcutsOptions) {
  /**
   * Handle arrow key movement
   */
  const handleArrowKey = useCallback(
    (direction: 'up' | 'down' | 'left' | 'right', isShift: boolean) => {
      if (!selectedShapeId) return;

      // Shift key = 1px movement, otherwise 10px
      const step = isShift ? 1 : 10;

      let deltaX = 0;
      let deltaY = 0;

      switch (direction) {
        case 'up':
          deltaY = -step;
          break;
        case 'down':
          deltaY = step;
          break;
        case 'left':
          deltaX = -step;
          break;
        case 'right':
          deltaX = step;
          break;
      }

      onMoveShape(selectedShapeId, deltaX, deltaY);
    },
    [selectedShapeId, onMoveShape]
  );

  /**
   * Handle Tab key - cycle through shapes
   */
  const handleTabKey = useCallback(() => {
    if (shapes.length === 0) {
      console.log('🔄 Tab cycling: No shapes to cycle through');
      return;
    }

    if (!selectedShapeId) {
      // No selection, select first shape
      console.log('🔄 Tab cycling: No selection, selecting first shape:', shapes[0].id);
      onSelectShape(shapes[0].id);
      return;
    }

    // Find current index
    const currentIndex = shapes.findIndex((s) => s.id === selectedShapeId);
    if (currentIndex === -1) {
      // Current shape not found, select first
      console.log('🔄 Tab cycling: Current shape not found, selecting first shape:', shapes[0].id);
      onSelectShape(shapes[0].id);
      return;
    }

    // Select next shape (wrap around)
    const nextIndex = (currentIndex + 1) % shapes.length;
    console.log(`🔄 Tab cycling: ${currentIndex} → ${nextIndex} (${shapes[currentIndex].id} → ${shapes[nextIndex].id})`);
    onSelectShape(shapes[nextIndex].id);
  }, [shapes, selectedShapeId, onSelectShape]);

  // PR8a: Ctrl+A (Select All) is now handled at the App level with proper multi-select

  /**
   * Handle Cmd/Ctrl+D - duplicate selected shape
   */
  const handleDuplicate = useCallback(() => {
    if (!selectedShapeId) return;
    onDuplicateShape(selectedShapeId);
  }, [selectedShapeId, onDuplicateShape]);

  /**
   * Handle H and ? keys - toggle help panel
   */
  const handleToggleHelp = useCallback(() => {
    if (onToggleHelp) {
      console.log('🆘 Toggling help panel');
      onToggleHelp();
    }
  }, [onToggleHelp]);

  /**
   * Set up keyboard event listeners
   */
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't interfere with text input
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // Arrow keys - move selected shape
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        if (selectedShapeId) {
          e.preventDefault();
          const direction = e.key.replace('Arrow', '').toLowerCase() as 'up' | 'down' | 'left' | 'right';
          handleArrowKey(direction, e.shiftKey);
        }
        return;
      }

      // Tab - cycle through shapes
      if (e.key === 'Tab') {
        e.preventDefault();
        handleTabKey();
        return;
      }

      // Cmd/Ctrl+D - duplicate shape
      if (cmdOrCtrl && e.key === 'd') {
        e.preventDefault();
        handleDuplicate();
        return;
      }

      // H or ? - toggle help panel
      if (e.key === 'h' || e.key === 'H' || e.key === '?') {
        e.preventDefault();
        handleToggleHelp();
        return;
      }

      // PR8a: Ctrl+A is now handled at App level
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, selectedShapeId, handleArrowKey, handleTabKey, handleDuplicate, handleToggleHelp]);

  return {
    handleArrowKey,
    handleTabKey,
    handleDuplicate,
    handleToggleHelp,
  };
}
