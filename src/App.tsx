import { useEffect } from 'react'
import './App.css'
import { useAuth } from './auth/AuthContext'
import AuthGuard from './auth/AuthGuard'
import Canvas from './components/Canvas'
import Toolbar from './components/Toolbar'
import { useCanvas } from './hooks/useCanvas'
import { createRectangleShape } from './utils/helpers'

/**
 * CollabCanvas MVP - Main Application Component
 *
 * Sprint Status: PR3.4 - Toolbar and Shape Creation
 * - AuthGuard protects the entire canvas (Task 2.5.2)
 * - User display shows authenticated user info (Task 2.5.3)
 * - Logout button with confirmation (Task 2.5.4)
 * - Add Rectangle button creates shapes (Task 3.4.3)
 *
 * Architecture:
 * - Toolbar: Shape creation controls, user info, and logout
 * - Canvas: Konva.js rendering workspace (2000x2000px)
 * - useCanvas: Local state management for shapes
 * - Real-time: Firebase sync (coming in PR4)
 */
function App() {
  const { user, logout } = useAuth()
  const {
    shapes,
    selectedShapeId,
    addShape,
    selectShape,
    updateShapePosition,
    clearSelection,
    removeSelectedShape,
  } = useCanvas()

  // Ensure body has proper class for full-screen canvas
  useEffect(() => {
    document.body.classList.add('canvas-mode')
    return () => {
      document.body.classList.remove('canvas-mode')
    }
  }, [])

  // Task 3.5: Keyboard interactions (Delete & Escape keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Task 3.5.2: Delete key to remove selected shape
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedShapeId) {
          e.preventDefault()
          removeSelectedShape()
          console.log('🗑️ Deleted shape:', selectedShapeId)
        }
      }

      // Task 3.5.3: Escape key to deselect all shapes
      if (e.key === 'Escape') {
        if (selectedShapeId) {
          e.preventDefault()
          clearSelection()
          console.log('⭕ Deselected all shapes')
        }
      }
    }

    // Add keyboard event listener
    window.addEventListener('keydown', handleKeyDown)

    // Cleanup on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedShapeId, removeSelectedShape, clearSelection])

  // Task 3.4.3 & 3.6.2: Create rectangle at canvas center using helper
  const handleAddRectangle = () => {
    const newShape = createRectangleShape()
    const shapeId = addShape(newShape)
    console.log('✅ Rectangle created:', shapeId)
  }

  // Task 3.4.4: Zoom controls
  const handleZoomIn = () => {
    if ((window as any).__canvasZoomIn) {
      (window as any).__canvasZoomIn()
    }
  }

  const handleZoomOut = () => {
    if ((window as any).__canvasZoomOut) {
      (window as any).__canvasZoomOut()
    }
  }

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
        {/* Task 3.4.1-3.4.2: Toolbar Component */}
        <Toolbar
          onAddRectangle={handleAddRectangle}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          user={user}
          onLogout={handleLogout}
        />

        {/* Main Canvas Area - Konva Stage Component */}
        <div className="canvas-wrapper">
          <Canvas
            shapes={shapes}
            selectedShapeId={selectedShapeId}
            onSelectShape={selectShape}
            onUpdateShapePosition={updateShapePosition}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
          />
        </div>
      </div>
    </AuthGuard>
  )
}

export default App
