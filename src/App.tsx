import { useEffect, useState } from 'react'
import './App.css'
import { useAuth } from './auth/AuthContext'
import AuthGuard from './auth/AuthGuard'
import Canvas from './components/Canvas'

/**
 * CollabCanvas MVP - Main Application Component
 *
 * Sprint Status: PR2.5 - App Integration Complete
 * - AuthGuard protects the entire canvas (Task 2.5.2)
 * - User display shows authenticated user info (Task 2.5.3)
 * - Logout button with confirmation (Task 2.5.4)
 *
 * Architecture:
 * - Toolbar: Shape creation controls, user info, and logout
 * - Canvas: Konva.js rendering workspace (2000x2000px)
 * - Real-time: Firebase sync (coming in PR4)
 */
function App() {
  const [count, setCount] = useState(0)
  const { user, logout } = useAuth()

  // Ensure body has proper class for full-screen canvas
  useEffect(() => {
    document.body.classList.add('canvas-mode')
    return () => {
      document.body.classList.remove('canvas-mode')
    }
  }, [])

  // Task 2.5.4: Logout button with confirmation
  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      try {
        await logout()
        console.log('👋 User logged out successfully')
      } catch (error) {
        console.error('❌ Logout error:', error)
      }
    }
  }

  // Task 2.5.2: Wrap entire canvas content with AuthGuard
  return (
    <AuthGuard>
      <div className="app-container">
        {/* Header/Toolbar */}
        <div className="toolbar">
          <h1 className="text-2xl font-bold text-gray-800 flex-shrink-0">CollabCanvas MVP</h1>
          <div className="flex gap-2 flex-shrink-0">
            <button
              className="toolbar-button"
              onClick={() => setCount((count) => count + 1)}
            >
              Add Rectangle ({count})
            </button>
            <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors">
              Clear Canvas
            </button>
          </div>

          {/* Spacer to push user info to the right */}
          <div className="flex-1"></div>

          {/* Task 2.5.3: User Display with Name/Email */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* User Info */}
            <div className="flex items-center gap-2">
              <div className="user-avatar bg-blue-500 flex items-center justify-center text-white font-semibold">
                {user?.displayName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
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

            {/* Task 2.5.4: Logout Button */}
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium"
              title="Log out"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Canvas Area - Konva Stage Component */}
        <div className="canvas-wrapper">
          <Canvas />
        </div>
      </div>
    </AuthGuard>
  )
}

export default App
