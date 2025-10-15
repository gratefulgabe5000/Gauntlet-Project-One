/**
 * Toolbar Component - Canvas controls and user interface
 *
 * PR3.4: Toolbar Component
 * PR6.1: Toolbar Enhancement (Modern styling + icons + hover states)
 *
 * Features:
 * - Add Rectangle button (Task 3.4.2)
 * - Zoom controls (Task 3.4.4)
 * - User display and logout
 * - Modern UI with SVG icons (Task 6.1.2)
 * - Enhanced hover states and feedback (Task 6.1.3)
 */

interface ToolbarProps {
  onAddRectangle: () => void;
  onAddCircle: () => void;
  onAddText: () => void;
  onClearCanvas: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  user: {
    displayName?: string | null;
    email?: string | null;
  } | null;
  onLogout: () => void;
}

const Toolbar = ({
  onAddRectangle,
  onAddCircle,
  onAddText,
  onClearCanvas,
  onZoomIn,
  onZoomOut,
  user,
  onLogout,
}: ToolbarProps) => {
  return (
    <div className="flex items-center gap-3 md:gap-6 px-3 md:px-6 py-3 md:py-4 bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-200 shadow-md flex-wrap md:flex-nowrap">
      <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex-shrink-0">
        CollabCanvas
      </h1>

      {/* Task 3.4.2 + PR6.5.1: Responsive shape creation controls */}
      <div className="flex gap-2 md:gap-3 flex-shrink-0">
        <button
          className="relative p-2 md:p-2.5 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg active:scale-95 transition-all duration-200 group"
          onClick={onAddRectangle}
          title="Add Rectangle (100x100px)"
        >
          {/* Rectangle Icon with Plus Overlay */}
          <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 48 48" fill="none">
            {/* Main Rectangle */}
            <rect
              x="8"
              y="12"
              width="32"
              height="24"
              rx="2"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-gray-700 group-hover:text-blue-600 transition-colors"
              fill="none"
            />
            {/* Plus Circle Overlay */}
            <circle
              cx="14"
              cy="20"
              r="8"
              className="fill-blue-600 group-hover:fill-blue-700 transition-colors"
            />
            {/* Plus Sign */}
            <path
              d="M14 16v8M10 20h8"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <button
          className="relative p-2 md:p-2.5 bg-white border-2 border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 hover:shadow-lg active:scale-95 transition-all duration-200 group"
          onClick={onAddCircle}
          title="Add Circle (100x100px)"
        >
          {/* Circle Icon with Plus Overlay */}
          <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 48 48" fill="none">
            {/* Main Circle */}
            <circle
              cx="24"
              cy="24"
              r="14"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-gray-700 group-hover:text-green-600 transition-colors"
              fill="none"
            />
            {/* Plus Circle Overlay */}
            <circle
              cx="16"
              cy="20"
              r="8"
              className="fill-green-600 group-hover:fill-green-700 transition-colors"
            />
            {/* Plus Sign */}
            <path
              d="M16 16v8M12 20h8"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <button
          className="relative p-2 md:p-2.5 bg-white border-2 border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 hover:shadow-lg active:scale-95 transition-all duration-200 group"
          onClick={onAddText}
          title="Add Text"
        >
          {/* Text Lines Icon with Plus Overlay */}
          <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 48 48" fill="none">
            {/* Horizontal text lines */}
            <path
              d="M12 14h24M12 20h24M12 26h24M12 32h18"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="text-gray-700 group-hover:text-red-600 transition-colors"
            />
            {/* Plus Circle Overlay */}
            <circle
              cx="16"
              cy="20"
              r="8"
              className="fill-red-600 group-hover:fill-red-700 transition-colors"
            />
            {/* Plus Sign */}
            <path
              d="M16 16v8M12 20h8"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <button
          className="flex items-center gap-1 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 hover:shadow-lg active:scale-95 transition-all duration-200 font-semibold text-xs md:text-sm shadow-md hover:-translate-y-0.5"
          onClick={onClearCanvas}
          title="Clear all shapes (Ctrl+Shift+Delete)"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span className="hidden sm:inline">Clear Canvas</span>
          <span className="sm:hidden">Clear</span>
        </button>

        {/* Task 3.4.4: Zoom controls */}
        {onZoomIn && onZoomOut && (
          <div className="flex gap-2 border-l border-gray-300 pl-3">
            <button
              className="p-2.5 bg-white text-gray-700 rounded-lg hover:bg-gray-100 hover:shadow-md active:scale-95 transition-all duration-200 border border-gray-300 hover:-translate-y-0.5"
              onClick={onZoomIn}
              title="Zoom In"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
            </button>
            <button
              className="p-2.5 bg-white text-gray-700 rounded-lg hover:bg-gray-100 hover:shadow-md active:scale-95 transition-all duration-200 border border-gray-300 hover:-translate-y-0.5"
              onClick={onZoomOut}
              title="Zoom Out"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Spacer to push user info to the right */}
      <div className="flex-1"></div>

      {/* PR6.5.1: Responsive User Display and Logout */}
      <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
        {/* User Info */}
        <div className="flex items-center gap-2 md:gap-3 bg-white px-2 md:px-4 py-1.5 md:py-2 rounded-lg shadow-sm border border-gray-200">
          <div className="user-avatar bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
            {user?.displayName?.charAt(0).toUpperCase() ||
              user?.email?.charAt(0).toUpperCase() ||
              'U'}
          </div>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-semibold text-gray-800">
              {user?.displayName || 'User'}
            </span>
            <span className="text-xs text-gray-500">
              {user?.email || 'No email'}
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 hover:shadow-lg active:scale-95 transition-all duration-200 font-semibold shadow-md hover:-translate-y-0.5"
          title="Log out"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
