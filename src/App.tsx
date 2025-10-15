import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { useAuth } from './auth/AuthContext'
import AuthGuard from './auth/AuthGuard'
import Canvas from './components/Canvas'
import EmptyState from './components/EmptyState'
import KeyboardHelp from './components/KeyboardHelp'
import MobileWarning from './components/MobileWarning'
import ToastContainer from './components/ToastContainer'
import Toolbar from './components/Toolbar'
import UserPresence from './components/UserPresence'
import { usePresence } from './hooks/usePresence'
import { useShapes } from './hooks/useShapes'
import { useToast } from './hooks/useToast'
import { getFriendlyErrorMessage, getSuccessMessage } from './utils/errorMessages'
import { createCircleShape, createRectangleShape, createTextShape } from './utils/helpers'

/**
 * CollabCanvas MVP - Main Application Component
 *
 * Sprint Status: PR5.7 - User Presence & Cursor Tracking
 * - AuthGuard protects the entire canvas (Task 2.5.2)
 * - User display shows authenticated user info (Task 2.5.3)
 * - Logout button with confirmation (Task 2.5.4)
 * - Add Rectangle button creates shapes (Task 3.4.3)
 * - Real-time Firestore sync (Task 4.5)
 * - User presence and cursor tracking (Task 5.7)
 *
 * Architecture:
 * - Toolbar: Shape creation controls, user info, and logout
 * - Canvas: Konva.js rendering workspace (2000x2000px)
 * - useShapes: Real-time Firestore state management
 * - usePresence: Real-time cursor tracking and user presence
 * - Multi-user: Changes sync between all connected clients
 */
function App() {
  const { user, logout } = useAuth()
  const {
    shapes,
    selectedShapeId,
    isLoading,
    error,
    addShape,
    selectShape,
    updateShapePosition,
    updateShapeText,
    updateShapeColor,
    clearSelection,
    removeSelectedShape,
    clearAllShapes,
  } = useShapes()

  // PR5: User presence and cursor tracking
  const { activeUsers, currentUserColor, currentUserName, updateCursor } = usePresence()

  // PR6.2: Loading state for shape creation
  const [isCreatingShape, setIsCreatingShape] = useState(false)

  // PR6.2: Connection status tracking
  const [isConnected, setIsConnected] = useState(true)

  // PR6.3: Toast notification system
  const { toasts, showSuccess, showError, dismissToast } = useToast()

  // PR6.2.2: Monitor real-time Firebase connection status
  useEffect(() => {
    // Import monitorConnectionStatus dynamically to avoid circular deps
    import('./services/realtime').then(({ monitorConnectionStatus }) => {
      const unsubscribe = monitorConnectionStatus((connected) => {
        setIsConnected(connected)
        if (!connected) {
          showError('Connection lost. Changes may not sync until reconnected.', 5000)
        }
      })
      return () => unsubscribe()
    })
  }, [showError])

  // PR6.3.2: Show error toasts for Firestore errors
  useEffect(() => {
    if (error) {
      showError(getFriendlyErrorMessage(error), 7000)
    }
  }, [error, showError])

  // Ensure body has proper class for full-screen canvas
  useEffect(() => {
    document.body.classList.add('canvas-mode')
    return () => {
      document.body.classList.remove('canvas-mode')
    }
  }, [])

  // Clear Canvas: Remove all shapes with confirmation (defined before keyboard handler)
  const handleClearCanvas = useCallback(async () => {
    if (shapes.length === 0) {
      showError('Canvas is already empty', 3000)
      return
    }

    const confirmed = window.confirm(
      `Are you sure you want to clear all ${shapes.length} shape(s) from the canvas? This action cannot be undone.`
    )

    if (confirmed) {
      const success = await clearAllShapes()
      if (success) {
        showSuccess('Canvas cleared successfully!', 3000)
        console.log('✅ Canvas cleared')
      } else {
        showError('Failed to clear canvas. Please try again', 5000)
        console.error('❌ Failed to clear canvas')
      }
    }
  }, [shapes, clearAllShapes, showError, showSuccess])

  // Task 3.5: Keyboard interactions (Delete, Escape, Clear Canvas keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Clear Canvas: Ctrl+Shift+Delete
      if (e.ctrlKey && e.shiftKey && (e.key === 'Delete' || e.key === 'Backspace')) {
        e.preventDefault()
        handleClearCanvas()
        return
      }

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
  }, [selectedShapeId, removeSelectedShape, clearSelection, handleClearCanvas])

  // Task 3.4.3 & 3.6.2 & 4.5 + PR6.2.1 + PR6.3.2: Create rectangle with loading state and toast feedback
  const handleAddRectangle = async () => {
    setIsCreatingShape(true)
    const newShape = createRectangleShape()
    const shapeId = await addShape({ ...newShape, type: 'rectangle' })
    if (shapeId) {
      console.log('✅ Rectangle created (Firestore):', shapeId)
      showSuccess(getSuccessMessage('shape-created'), 3000)
    } else {
      console.error('❌ Failed to create rectangle')
      showError('Failed to create rectangle. Please try again', 5000)
    }
    setIsCreatingShape(false)
  }

  const handleAddCircle = async () => {
    setIsCreatingShape(true)
    const newShape = createCircleShape()
    const shapeId = await addShape({ ...newShape, type: 'circle' })
    if (shapeId) {
      console.log('✅ Circle created (Firestore):', shapeId)
      showSuccess('Circle created successfully!', 3000)
    } else {
      console.error('❌ Failed to create circle')
      showError('Failed to create circle. Please try again', 5000)
    }
    setIsCreatingShape(false)
  }

  const handleAddText = async () => {
    setIsCreatingShape(true)
    const newShape = createTextShape()
    const shapeId = await addShape({ ...newShape, type: 'text', text: 'Double-click to edit' })
    if (shapeId) {
      console.log('✅ Text created (Firestore):', shapeId)
      showSuccess('Text created successfully!', 3000)
    } else {
      console.error('❌ Failed to create text')
      showError('Failed to create text. Please try again', 5000)
    }
    setIsCreatingShape(false)
  }

  const handleTextChange = async (shapeId: string, text: string) => {
    const success = await updateShapeText(shapeId, text)
    if (success) {
      console.log('✅ Text updated:', shapeId)
    } else {
      console.error('❌ Failed to update text')
      showError('Failed to update text. Please try again', 3000)
    }
  }

  const handleColorChange = async (shapeId: string, color: string) => {
    const success = await updateShapeColor(shapeId, color)
    if (success) {
      console.log('✅ Color updated:', shapeId, color)
      showSuccess('Shape color updated!', 2000)
    } else {
      console.error('❌ Failed to update color')
      showError('Failed to update color. Please try again', 3000)
    }
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
      {/* PR6.5.2: Mobile detection warning */}
      <MobileWarning />

      <div className="app-container">
        {/* Task 3.4.1-3.4.2: Toolbar Component */}
        <Toolbar
          onAddRectangle={handleAddRectangle}
          onAddCircle={handleAddCircle}
          onAddText={handleAddText}
          onClearCanvas={handleClearCanvas}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          user={user}
          onLogout={handleLogout}
        />

        {/* PR6.3: Toast Notification System */}
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />

        {/* PR6.2: Enhanced Loading States */}
        {isLoading && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white border border-blue-200 shadow-lg rounded-lg px-5 py-3 flex items-center gap-3 z-50 animate-fade-in">
            <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-sm font-medium text-gray-700">Loading canvas...</span>
          </div>
        )}

        {/* PR6.2.1: Shape Creation Loading Indicator */}
        {isCreatingShape && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white border border-green-200 shadow-lg rounded-lg px-5 py-3 flex items-center gap-3 z-50 animate-fade-in">
            <svg className="animate-spin h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-sm font-medium text-gray-700">Creating rectangle...</span>
          </div>
        )}

        {/* PR5: User Presence List (includes connection status) */}
        <UserPresence
          activeUsers={activeUsers}
          currentUserColor={currentUserColor}
          currentUserName={currentUserName}
          isConnected={isConnected}
        />

        {/* Main Canvas Area - Konva Stage Component */}
        <div className="canvas-wrapper">
          {/* PR6.4.4 & PR6.4.1: Empty state with onboarding text */}
          {!isLoading && shapes.length === 0 && (
            <EmptyState onAddRectangle={handleAddRectangle} />
          )}

          <Canvas
            shapes={shapes}
            selectedShapeId={selectedShapeId}
            onSelectShape={selectShape}
            onUpdateShapePosition={updateShapePosition}
            onTextChange={handleTextChange}
            onColorChange={handleColorChange}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            activeUsers={activeUsers}
            onCursorMove={updateCursor}
          />
        </div>

        {/* PR6.4.3: Keyboard shortcuts help with interactive buttons */}
        <KeyboardHelp
          onDeleteSelected={removeSelectedShape}
          onClearAll={handleClearCanvas}
          onDeselectAll={clearSelection}
        />
      </div>
    </AuthGuard>
  )
}

export default App
