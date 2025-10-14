/**
 * UserPresence Component - Online Users List
 *
 * PR5.5: User Presence UI
 *
 * Displays a list of currently online users with:
 * - User avatars with color indicators
 * - User names
 * - Online status
 * - User count
 */

import type { UserPresence as UserPresenceType } from '../services/types';
import { getUserInitials } from '../utils/colors';

interface UserPresenceProps {
  activeUsers: UserPresenceType[];
  currentUserColor: string;
  currentUserName: string | null;
}

/**
 * Task 5.5.1: Render online users list
 */
const UserPresence = ({ activeUsers, currentUserColor, currentUserName }: UserPresenceProps) => {
  const totalUsers = activeUsers.length + 1; // +1 for current user

  return (
    <div className="fixed top-20 right-4 bg-white rounded-lg shadow-lg p-4 w-64 z-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">
          Online Users ({totalUsers})
        </h3>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
          <span className="text-xs text-gray-500">Live</span>
        </div>
      </div>

      {/* User List */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {/* Current User */}
        <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-md">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: currentUserColor }}
          >
            {getUserInitials(currentUserName)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {currentUserName || 'You'}
              <span className="text-xs text-gray-500 ml-1">(You)</span>
            </p>
          </div>
        </div>

        {/* Other Users */}
        {activeUsers.map((user) => (
          <div
            key={user.userId}
            className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md transition-colors"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: user.cursorColor }}
            >
              {getUserInitials(user.displayName)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.displayName}
              </p>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        ))}

        {/* Empty State */}
        {activeUsers.length === 0 && (
          <div className="text-center py-4 text-gray-500 text-sm">
            No other users online
          </div>
        )}
      </div>

      {/* Footer Hint */}
      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          💡 Open another tab to see real-time collaboration
        </p>
      </div>
    </div>
  );
};

export default UserPresence;
