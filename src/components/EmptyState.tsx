/**
 * Empty State Component
 *
 * PR6.4: User Experience Improvements
 *
 * Displays helpful onboarding text when the canvas is empty
 */

interface EmptyStateProps {
  onAddRectangle: () => void;
}

const EmptyState = ({ onAddRectangle }: EmptyStateProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-dashed border-blue-300 p-8 max-w-md text-center pointer-events-auto">
        {/* Icon */}
        <div className="mb-4">
          <svg
            className="w-16 h-16 mx-auto text-blue-500 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
            />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome to CollabCanvas!
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Your canvas is empty. Get started by adding your first rectangle.
        </p>

        {/* Call to Action Button */}
        <button
          onClick={onAddRectangle}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all duration-200 font-semibold shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Rectangle</span>
        </button>

        {/* Helper Text */}
        <p className="text-xs text-gray-500 mt-4">
          Tip: Click on shapes to select them, drag to move
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
