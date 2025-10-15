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
 * - Color picker for changing user color
 */

import { useRef, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { isUserOnline, updateUserColor, updateUserDisplayName } from '../services/realtime';
import type { UserPresence as UserPresenceType } from '../services/types';
import { getUserInitials } from '../utils/colors';
import ColorPicker from './ColorPicker';

interface UserPresenceProps {
  activeUsers: UserPresenceType[];
  currentUserColor: string;
  currentUserName: string | null;
  isConnected: boolean;
}

/**
 * Task 5.5.1: Render online users list
 */
const UserPresence = ({ activeUsers, currentUserColor, currentUserName, isConnected }: UserPresenceProps) => {
  const { user } = useAuth();

  // Count only online users (not offline)
  const onlineUsersCount = activeUsers.filter(u => isUserOnline(u)).length + 1; // +1 for current user
  const totalUsers = activeUsers.length + 1; // Total includes offline users
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(currentUserName || '');
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Get list of colors currently in use by other users
  const usedColors = activeUsers.map(u => u.cursorColor);

  // Handle color selection
  const handleColorSelect = async (newColor: string) => {
    if (user) {
      try {
        await updateUserColor(user.uid, newColor);
        setShowColorPicker(false);
      } catch (error) {
        console.error('Failed to update color:', error);
      }
    }
  };

  // Handle name editing
  const handleNameClick = () => {
    setIsEditingName(true);
    setEditedName(currentUserName || '');
    setTimeout(() => nameInputRef.current?.focus(), 0);
  };

  const handleNameSave = async () => {
    if (!user) return;

    const trimmedName = editedName.trim();
    if (trimmedName && trimmedName !== currentUserName) {
      try {
        await updateUserDisplayName(user.uid, trimmedName);
        console.log('✅ Display name updated');
      } catch (error) {
        console.error('Failed to update display name:', error);
      }
    }
    setIsEditingName(false);
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNameSave();
    } else if (e.key === 'Escape') {
      setIsEditingName(false);
      setEditedName(currentUserName || '');
    }
  };

  return (
    <div className="fixed top-20 right-6 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-64 z-50 animate-fade-in group hover:shadow-xl transition-all duration-300">
      {/* Header - Always visible */}
      <div className="flex items-center justify-between cursor-pointer">
        <h3 className="text-sm font-bold text-gray-900 transition-smooth">
          Online Users ({onlineUsersCount})
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-1 ${isConnected ? 'bg-green-500 pulse-ring' : 'bg-red-500'}`}></div>
            <span className={`text-xs ${isConnected ? 'text-gray-500' : 'text-red-600'}`}>
              {isConnected ? 'Live' : 'Offline'}
            </span>
          </div>
          {/* Expand indicator */}
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
              showColorPicker ? 'rotate-180' : 'group-hover:rotate-180'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* User List - Hidden by default, shown on hover OR when color picker is open */}
      <div className={`space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${
        showColorPicker
          ? 'opacity-100 max-h-64 mt-3'
          : 'opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-64 group-hover:mt-3'
      }`}>
        <div className="overflow-y-auto max-h-64 space-y-2">
        {/* Current User - PR6.6.2: Enhanced with animations + Color Picker + Name Editor */}
        <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-md transition-smooth relative">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold icon-scale cursor-pointer hover:ring-2 hover:ring-gray-400 transition-all flex-shrink-0"
            style={{ backgroundColor: currentUserColor }}
            onClick={(e) => {
              e.stopPropagation();
              setShowColorPicker(!showColorPicker);
            }}
            title="Click to change your cursor color"
          >
            {getUserInitials(currentUserName)}
          </div>
          <div className="flex-1 min-w-0">
            {isEditingName ? (
              <input
                ref={nameInputRef}
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onBlur={handleNameSave}
                onKeyDown={handleNameKeyDown}
                className="w-full text-sm font-medium text-gray-900 bg-white border border-blue-500 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={30}
                placeholder="Enter your name"
              />
            ) : (
              <div onClick={handleNameClick} className="cursor-pointer hover:bg-gray-100 rounded px-1 -mx-1 transition-colors">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {currentUserName || 'You'}
                  <span className="text-xs text-gray-500 ml-1">(You)</span>
                </p>
              </div>
            )}
            <p className="text-xs text-gray-400 italic mt-0.5">
              {isEditingName ? 'Press Enter to save, Esc to cancel' : 'Click name to edit, avatar for color'}
            </p>
          </div>

          {/* Color Picker Modal */}
          {showColorPicker && (
            <ColorPicker
              currentColor={currentUserColor}
              usedColors={usedColors}
              onSelectColor={handleColorSelect}
              onClose={() => setShowColorPicker(false)}
            />
          )}
        </div>

        {/* Other Users - PR6.6.2: Enhanced with animations */}
        {activeUsers.map((user) => {
          const userIsOnline = isUserOnline(user);
          return (
            <div
              key={user.userId}
              className={`flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md transition-smooth hover:shadow-sm ${
                !userIsOnline ? 'opacity-60' : ''
              }`}
            >
              <div className="relative">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold icon-scale cursor-pointer"
                  style={{ backgroundColor: user.cursorColor }}
                >
                  {getUserInitials(user.displayName)}
                </div>
                {/* Online/Offline indicator badge */}
                {!userIsOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gray-400 border-2 border-white rounded-full" title="Offline"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${userIsOnline ? 'text-gray-900' : 'text-gray-500'}`}>
                  {user.displayName}
                  {!userIsOnline && <span className="text-xs ml-1 italic">(offline)</span>}
                </p>
              </div>
              {/* Status indicator - green pulse for online, gray for offline */}
              <div className={`w-2 h-2 rounded-full ${userIsOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            </div>
          );
        })}

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
    </div>
  );
};

export default UserPresence;
