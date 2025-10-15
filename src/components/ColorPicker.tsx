/**
 * ColorPicker Component
 *
 * PR6.6: Color picker for user cursor colors
 *
 * Displays an 8-color palette for users to choose their cursor color
 * Prevents selection of colors already in use by other users
 * Renders as a centered popup modal
 */

import { useEffect, useRef } from 'react';

interface ColorPickerProps {
  currentColor: string;
  usedColors: string[];
  onSelectColor: (color: string) => void;
  onClose: () => void;
}

// 8 distinct colors for user cursors
const AVAILABLE_COLORS = [
  { hex: '#ef4444', name: 'Red' },
  { hex: '#10b981', name: 'Green' },
  { hex: '#3b82f6', name: 'Blue' },
  { hex: '#f59e0b', name: 'Amber' },
  { hex: '#8b5cf6', name: 'Purple' },
  { hex: '#ec4899', name: 'Pink' },
  { hex: '#06b6d4', name: 'Cyan' },
  { hex: '#84cc16', name: 'Lime' },
];

const ColorPicker = ({ currentColor, usedColors, onSelectColor, onClose }: ColorPickerProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

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

  // Handle backdrop click
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-[100] animate-fade-in flex items-center justify-center"
        onClick={handleBackdropClick}
      >
        {/* Modal */}
        <div
          ref={modalRef}
          className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 animate-fade-in transform scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
            <h4 className="text-lg font-semibold text-gray-800">Choose Your Cursor Color</h4>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100 p-1"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Color Grid */}
          <div className="grid grid-cols-4 gap-3 mb-4">
        {AVAILABLE_COLORS.map((color) => {
          const isUsed = usedColors.includes(color.hex);
          const isCurrent = currentColor === color.hex;

          return (
            <button
              key={color.hex}
              onClick={() => !isUsed && onSelectColor(color.hex)}
              disabled={isUsed && !isCurrent}
              className={`
                w-14 h-14 rounded-xl transition-all duration-200 relative
                ${isCurrent
                  ? 'ring-4 ring-offset-2 ring-blue-500 scale-105'
                  : isUsed
                    ? 'opacity-30 cursor-not-allowed'
                    : 'hover:scale-110 hover:shadow-xl cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-gray-300'
                }
              `}
              style={{ backgroundColor: color.hex }}
              title={isUsed && !isCurrent ? `${color.name} (in use)` : color.name}
            >
              {/* Checkmark for current color */}
              {isCurrent && (
                <svg
                  className="w-7 h-7 text-white absolute inset-0 m-auto drop-shadow-lg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}

              {/* X mark for colors in use */}
              {isUsed && !isCurrent && (
                <svg
                  className="w-7 h-7 text-white absolute inset-0 m-auto drop-shadow-lg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          );
        })}
          </div>

          {/* Helper Text */}
          <div className="text-center pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              {usedColors.length > 0 ? (
                <>
                  <span className="font-semibold">✕</span> = Color already in use by another user
                </>
              ) : (
                'Click any color to select it as your cursor color'
              )}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Press <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 border border-gray-300 rounded">Esc</kbd> or click outside to close
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorPicker;
