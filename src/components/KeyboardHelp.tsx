/**
 * Keyboard Shortcuts Help Component
 *
 * PR6.4.3: Keyboard shortcuts help tooltip
 * PR6.6.3: Interactive shortcut buttons
 *
 * Displays available keyboard shortcuts with toggle button
 * Each shortcut can be clicked to perform its action
 */

import { useState } from 'react';

interface KeyboardHelpProps {
  onDeleteSelected: () => void;
  onClearAll: () => void;
  onDeselectAll: () => void;
}

const KeyboardHelp = ({ onDeleteSelected, onClearAll, onDeselectAll }: KeyboardHelpProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    {
      key: 'Delete',
      description: 'Delete selected shape',
      action: onDeleteSelected,
      actionLabel: 'Delete'
    },
    {
      key: 'Backspace',
      description: 'Delete selected shape',
      action: onDeleteSelected,
      actionLabel: 'Delete'
    },
    {
      key: 'Ctrl+Shift+Del',
      description: 'Clear all shapes',
      action: onClearAll,
      actionLabel: 'Clear All'
    },
    {
      key: 'Escape',
      description: 'Deselect all shapes',
      action: onDeselectAll,
      actionLabel: 'Deselect'
    },
    {
      key: 'Mouse Wheel',
      description: 'Zoom in/out',
      action: null,
      actionLabel: null
    },
    {
      key: 'Click + Drag',
      description: 'Pan canvas',
      action: null,
      actionLabel: null
    },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Help Button - PR6.6.2: Enhanced with animations */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg hover:border-gray-400 transition-smooth group button-lift"
        title="Keyboard shortcuts"
      >
        <svg
          className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-smooth icon-scale"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-smooth">Shortcuts</span>
      </button>

      {/* Help Panel */}
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-[380px] animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
            <h3 className="text-sm font-bold text-gray-900">Keyboard Shortcuts</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Shortcuts List */}
          <div className="space-y-2">
            {shortcuts.map((shortcut, index) => (
              <div key={index} className="flex items-center justify-between gap-2 text-xs">
                <span className="text-gray-600 flex-1">{shortcut.description}</span>
                <div className="flex items-center gap-2">
                  {shortcut.action ? (
                    <button
                      onClick={shortcut.action}
                      className="px-2 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 rounded text-xs font-medium transition-all duration-200 hover:shadow-sm active:scale-95 font-mono whitespace-nowrap"
                      title={`Click to ${shortcut.actionLabel?.toLowerCase()}`}
                    >
                      {shortcut.key}
                    </button>
                  ) : (
                    <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-gray-700 font-mono text-xs whitespace-nowrap">
                      {shortcut.key}
                    </kbd>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Tip */}
          <div className="mt-3 pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-500 italic">
              💡 Click the blue buttons to perform actions instantly!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default KeyboardHelp;
