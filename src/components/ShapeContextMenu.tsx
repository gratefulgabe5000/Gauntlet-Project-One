/**
 * ShapeContextMenu Component
 *
 * Right-click context menu for shapes
 * Allows changing shape colors
 */

import { useEffect, useRef } from 'react';

interface ShapeContextMenuProps {
  x: number;
  y: number;
  currentColor: string;
  onSelectColor: (color: string) => void;
  onClose: () => void;
}

// Color palette for shapes (similar to cursor colors but more shape-appropriate)
const SHAPE_COLORS = [
  { hex: '#ef4444', name: 'Red' },
  { hex: '#f59e0b', name: 'Orange' },
  { hex: '#eab308', name: 'Yellow' },
  { hex: '#10b981', name: 'Green' },
  { hex: '#06b6d4', name: 'Cyan' },
  { hex: '#3b82f6', name: 'Blue' },
  { hex: '#8b5cf6', name: 'Purple' },
  { hex: '#ec4899', name: 'Pink' },
  { hex: '#6b7280', name: 'Gray' },
  { hex: '#cccccc', name: 'Light Gray' },
  { hex: '#000000', name: 'Black' },
  { hex: '#ffffff', name: 'White' },
];

const ShapeContextMenu = ({ x, y, currentColor, onSelectColor, onClose }: ShapeContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Delay adding the listener to prevent immediate close
    setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Adjust position to keep menu on screen
  const adjustedX = Math.min(x, window.innerWidth - 250);
  const adjustedY = Math.min(y, window.innerHeight - 200);

  return (
    <div
      ref={menuRef}
      className="fixed bg-white rounded-lg shadow-xl border border-gray-200 p-3 z-[200] animate-fade-in"
      style={{
        left: `${adjustedX}px`,
        top: `${adjustedY}px`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200">
        <h4 className="text-xs font-semibold text-gray-700">Change Color</h4>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Color Grid */}
      <div className="grid grid-cols-4 gap-2">
        {SHAPE_COLORS.map((color) => {
          const isCurrent = currentColor.toLowerCase() === color.hex.toLowerCase();

          return (
            <button
              key={color.hex}
              onClick={() => {
                onSelectColor(color.hex);
                onClose();
              }}
              className={`
                w-12 h-12 rounded-lg transition-all duration-200 relative
                ${isCurrent
                  ? 'ring-2 ring-offset-2 ring-blue-500 scale-105'
                  : 'hover:scale-110 hover:shadow-lg cursor-pointer'
                }
              `}
              style={{
                backgroundColor: color.hex,
                border: color.hex === '#ffffff' ? '1px solid #e5e7eb' : 'none'
              }}
              title={color.name}
            >
              {/* Checkmark for current color */}
              {isCurrent && (
                <svg
                  className="w-5 h-5 absolute inset-0 m-auto drop-shadow-md"
                  fill={color.hex === '#000000' || color.hex === '#6b7280' ? 'white' : 'black'}
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {/* Helper Text */}
      <p className="text-xs text-gray-500 mt-2 text-center">
        Right-click shape to change color
      </p>
    </div>
  );
};

export default ShapeContextMenu;
