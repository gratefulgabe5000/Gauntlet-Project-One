/**
 * Toolbar Component - Canvas controls and user interface
 *
 * PR3.4: Toolbar Component
 *
 * Features:
 * - Add Rectangle button (Task 3.4.2)
 * - Zoom controls (Task 3.4.4)
 * - User display and logout
 */

interface ToolbarProps {
  onAddRectangle: () => void;
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
  onZoomIn,
  onZoomOut,
  user,
  onLogout,
}: ToolbarProps) => {
  return (
    <div className="toolbar">
      <h1 className="text-2xl font-bold text-gray-800 flex-shrink-0">
        CollabCanvas MVP
      </h1>

      {/* Task 3.4.2: Shape creation controls */}
      <div className="flex gap-2 flex-shrink-0">
        <button
          className="toolbar-button"
          onClick={onAddRectangle}
          title="Add Rectangle (100x100px)"
        >
          ➕ Add Rectangle
        </button>

        {/* Task 3.4.4: Zoom controls */}
        {onZoomIn && onZoomOut && (
          <div className="flex gap-1">
            <button
              className="px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors font-medium"
              onClick={onZoomIn}
              title="Zoom In"
            >
              🔍+
            </button>
            <button
              className="px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors font-medium"
              onClick={onZoomOut}
              title="Zoom Out"
            >
              🔍-
            </button>
          </div>
        )}
      </div>

      {/* Spacer to push user info to the right */}
      <div className="flex-1"></div>

      {/* User Display and Logout */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* User Info */}
        <div className="flex items-center gap-2">
          <div className="user-avatar bg-blue-500 flex items-center justify-center text-white font-semibold">
            {user?.displayName?.charAt(0).toUpperCase() ||
              user?.email?.charAt(0).toUpperCase() ||
              'U'}
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium text-gray-800">
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
          className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium"
          title="Log out"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
