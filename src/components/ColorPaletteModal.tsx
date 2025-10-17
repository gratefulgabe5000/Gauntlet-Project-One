/**
 * ColorPaletteModal Component
 *
 * PR8a.2.1: Advanced color picker for shape fills (Phase 2a)
 *
 * Features:
 * - 20 preset colors in 5×4 grid
 * - Recent colors section (last 6 used)
 * - Custom hex color input
 * - Apply/Cancel buttons
 * - localStorage persistence for recent colors
 */

import { useEffect, useRef, useState } from 'react';
import {
    SHAPE_COLOR_PALETTE,
    addRecentColor,
    getRecentColors,
    isValidHexColor,
    normalizeHexColor,
} from '../utils/colorPalette';

interface ColorPaletteModalProps {
  currentColor: string;
  onSelectColor: (color: string) => void;
  onClose: () => void;
}

const ColorPaletteModal = ({ currentColor, onSelectColor, onClose }: ColorPaletteModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedColor, setSelectedColor] = useState(currentColor);
  const [customColor, setCustomColor] = useState('');
  const [recentColors, setRecentColors] = useState<string[]>([]);
  const [customColorError, setCustomColorError] = useState('');

  // Load recent colors on mount
  useEffect(() => {
    setRecentColors(getRecentColors());
  }, []);

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

  // Handle color selection from palette
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setCustomColorError('');
  };

  // Handle custom color input change
  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomColor(value);

    // Validate on each change
    if (value && !isValidHexColor(value)) {
      setCustomColorError('Invalid hex color (use #RGB or #RRGGBB)');
    } else {
      setCustomColorError('');
      if (value && isValidHexColor(value)) {
        const normalized = normalizeHexColor(value);
        setSelectedColor(normalized);
      }
    }
  };

  // Handle Apply button
  const handleApply = () => {
    // Use custom color if valid, otherwise use selected color
    const finalColor = customColor && isValidHexColor(customColor)
      ? normalizeHexColor(customColor)
      : selectedColor;

    // Add to recent colors
    addRecentColor(finalColor);

    // Apply color
    onSelectColor(finalColor);

    // Close modal
    onClose();
  };

  // Handle Cancel button
  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[200] animate-fade-in flex items-center justify-center"
        onClick={handleBackdropClick}
      >
        {/* Modal */}
        <div
          ref={modalRef}
          className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 animate-fade-in transform scale-100 max-w-md w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
            <h4 className="text-lg font-semibold text-gray-800">Choose Shape Color</h4>
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

          {/* Recent Colors Section */}
          {recentColors.length > 0 && (
            <div className="mb-4">
              <h5 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                Recent Colors
              </h5>
              <div className="flex gap-2 flex-wrap">
                {recentColors.map((color, index) => (
                  <button
                    key={`recent-${index}`}
                    onClick={() => handleColorSelect(color)}
                    className={`
                      w-10 h-10 rounded-lg transition-all duration-200 relative border-2
                      ${selectedColor.toLowerCase() === color.toLowerCase()
                        ? 'ring-4 ring-offset-1 ring-blue-500 scale-105 border-blue-500'
                        : 'border-gray-300 hover:scale-110 hover:shadow-lg cursor-pointer hover:border-blue-300'
                      }
                    `}
                    style={{ backgroundColor: color }}
                    title={color}
                  >
                    {/* Checkmark for selected color */}
                    {selectedColor.toLowerCase() === color.toLowerCase() && (
                      <svg
                        className="w-6 h-6 text-white absolute inset-0 m-auto drop-shadow-lg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Palette Grid (5 rows × 4 columns = 20 colors) */}
          <div className="mb-4">
            <h5 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
              Color Palette
            </h5>
            <div className="grid grid-cols-4 gap-2">
              {SHAPE_COLOR_PALETTE.map((color) => {
                const isSelected = selectedColor.toLowerCase() === color.hex.toLowerCase();

                return (
                  <button
                    key={color.hex}
                    onClick={() => handleColorSelect(color.hex)}
                    className={`
                      w-full aspect-square rounded-lg transition-all duration-200 relative border-2
                      ${isSelected
                        ? 'ring-4 ring-offset-1 ring-blue-500 scale-105 border-blue-500'
                        : 'border-gray-300 hover:scale-110 hover:shadow-lg cursor-pointer hover:border-blue-300'
                      }
                    `}
                    style={{
                      backgroundColor: color.hex,
                      // Add border for white color visibility
                      ...(color.hex === '#FFFFFF' ? { borderColor: '#D1D5DB' } : {})
                    }}
                    title={`${color.name} (${color.hex})`}
                  >
                    {/* Checkmark for selected color */}
                    {isSelected && (
                      <svg
                        className={`w-6 h-6 absolute inset-0 m-auto drop-shadow-lg ${
                          color.hex === '#FFFFFF' || color.hex === '#DBEAFE' || color.hex === '#D1FAE5' || color.hex === '#FEF3C7' || color.hex === '#F3E8FF'
                            ? 'text-gray-800'
                            : 'text-white'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Color Input */}
          <div className="mb-4">
            <label htmlFor="custom-color" className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
              Custom Color (Hex)
            </label>
            <div className="flex gap-2">
              <input
                id="custom-color"
                type="text"
                value={customColor}
                onChange={handleCustomColorChange}
                placeholder="#3B82F6"
                className={`
                  flex-1 px-3 py-2 border rounded-lg text-sm font-mono
                  ${customColorError
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                  }
                  focus:outline-none focus:ring-2
                `}
                maxLength={7}
              />
              {/* Color preview */}
              {customColor && isValidHexColor(customColor) && (
                <div
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 flex-shrink-0"
                  style={{ backgroundColor: normalizeHexColor(customColor) }}
                />
              )}
            </div>
            {customColorError && (
              <p className="text-xs text-red-600 mt-1">{customColorError}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Enter a hex color code like #3B82F6 or #F00
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-3 border-t border-gray-200">
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={customColorError !== ''}
              className={`
                flex-1 px-4 py-2 rounded-lg transition-colors font-medium text-sm
                ${customColorError
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                }
              `}
            >
              Apply Color
            </button>
          </div>

          {/* Footer Info */}
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Press <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 border border-gray-300 rounded">Esc</kbd> or click outside to close
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorPaletteModal;
