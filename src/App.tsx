import type Konva from 'konva'
import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import { useAuth } from './auth/AuthContext'
import AuthGuard from './auth/AuthGuard'
import { AICommandPanel } from './components/AICommandPanel'
import Canvas from './components/Canvas'
import ColorPaletteModal from './components/ColorPaletteModal'
import EmptyState from './components/EmptyState'
import ExportModal from './components/ExportModal'
import KeyboardHelp from './components/KeyboardHelp'
import MobileWarning from './components/MobileWarning'
import { PerformanceStats } from './components/PerformanceStats'
import ToastContainer from './components/ToastContainer'
import Toolbar from './components/Toolbar'
import UserPresence from './components/UserPresence'
import { useAICommands } from './hooks/useAICommands'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { usePresence } from './hooks/usePresence'
import { useShapes } from './hooks/useShapes'
import { useToast } from './hooks/useToast'
import { getAPIKeyStatus } from './services/openai'
import { getFriendlyErrorMessage, getSuccessMessage } from './utils/errorMessages'
import { createArrowShape, createCircleShape, createLineShape, createRectangleShape, createTextShape } from './utils/helpers'
import { validateShapeData, sanitizeShapeData } from './utils/validation'
import { checkRateLimit, RATE_LIMITS } from './utils/rateLimiter'

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
    selectedShapeIds, // PR8a: Multi-select
    isLoading,
    error,
    addShape,
    selectShape,
    selectAllShapes, // PR8a: Select all at once
    updateShapePosition,
    updateShapeDimensions,
    updateShapePositionAndDimensions,
    updateShapeText,
    updateShapeColor,
    updateShapeFontSize,
    updateShapeProperties, // Task 8b.2.3: Generic property update (rotation, etc.)
    updateMultipleShapeColors, // PR8a: Multi-select color change
    clearSelection,
    removeSelectedShape,
    removeSelectedShapes, // PR8a: Multi-select
    clearAllShapes,
    // PR8a.3.4: Undo/Redo functionality
    undo,
    redo,
    canUndo,
    canRedo,
    // PR8a.4: Enhanced keyboard shortcuts
    moveShapeByDelta,
    duplicateShape,
  } = useShapes()

  // PR5: User presence and cursor tracking
  const { activeUsers, currentUserColor, currentUserName, updateCursor } = usePresence()

  // PR9: AI Canvas Agent (Phase 3)
  const apiKeyStatus = getAPIKeyStatus()
  const { executeCommand: executeAICommand, isExecuting: isAIExecuting } = useAICommands({
    userId: user?.uid || null,
    canvasId: 'default', // Using default canvas for MVP
    shapes,
    addShape,
    updateShapePosition,
    updateShapeColor,
    updateShapeDimensions,
    updateShapeProperties,
  })

  // PR9: AI Command Panel state
  const [isAICommandPanelOpen, setIsAICommandPanelOpen] = useState(false)

  // PR10a: Performance Stats Panel state (Phase 4a Block 2)
  const [isPerformanceStatsOpen, setIsPerformanceStatsOpen] = useState(false)
  const togglePerformanceStats = useCallback(() => {
    setIsPerformanceStatsOpen(!isPerformanceStatsOpen)
  }, [isPerformanceStatsOpen])

  // Help panel state for H and ? key shortcuts (must be declared before useKeyboardShortcuts)
  const [isHelpPanelOpen, setIsHelpPanelOpen] = useState(false)
  const toggleHelpPanel = useCallback(() => {
    setIsHelpPanelOpen(!isHelpPanelOpen)
  }, [isHelpPanelOpen])

  // PR10a: Performance Investigation - Track App.tsx render count (DISABLED - useMemo fix confirmed working)
  // const renderCountRef = useRef(0)
  // useEffect(() => {
  //   renderCountRef.current++
  //   console.log(`🏠 App render #${renderCountRef.current}`, {
  //     shapesCount: shapes.length,
  //     selectedCount: selectedShapeIds.size,
  //     timestamp: Date.now()
  //   })
  // })

  // PR8a.4: Enhanced keyboard shortcuts
  useKeyboardShortcuts({
    selectedShapeId,
    shapes,
    onMoveShape: moveShapeByDelta,
    onDuplicateShape: duplicateShape,
    onSelectShape: selectShape,
    onToggleHelp: toggleHelpPanel,
    onTogglePerformanceStats: togglePerformanceStats, // PR10a: Phase 4a Block 2
    enabled: true,
  })

  // PR6.2: Loading state for shape creation
  const [isCreatingShape, setIsCreatingShape] = useState(false)

  // PR6.2: Connection status tracking
  const [isConnected, setIsConnected] = useState(true)

  // PR8a.2.4: Color picker modal state (Phase 2a)
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)

  // PR8a.5: Export modal state (Phase 2a)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)

  const [canvasStage, setCanvasStage] = useState<Konva.Stage | null>(null)

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
  // PR8a.3.4: Undo/Redo keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey

      // PR8a.3.4: Undo (Cmd/Ctrl+Z)
      if (cmdOrCtrl && e.key === 'z' && !e.shiftKey) {
        if (canUndo) {
          e.preventDefault()
          undo()
          console.log('↶ Undo action')
          return
        }
      }

      // PR8a.3.4: Redo (Cmd/Ctrl+Shift+Z)
      if (cmdOrCtrl && e.shiftKey && (e.key === 'z' || e.key === 'Z')) {
        if (canRedo) {
          e.preventDefault()
          redo()
          console.log('↷ Redo action')
          return
        }
      }

      // PR8a: Select All (Cmd/Ctrl+A)
      if (cmdOrCtrl && e.key === 'a') {
        if (shapes.length > 0) {
          e.preventDefault()
          selectAllShapes()
          return
        }
      }

      // Clear Canvas: Ctrl+Shift+Delete
      if (e.ctrlKey && e.shiftKey && (e.key === 'Delete' || e.key === 'Backspace')) {
        e.preventDefault()
        handleClearCanvas()
        return
      }

      // Task 3.5.2: Delete key to remove selected shape(s) - PR8a: Multi-select support
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedShapeIds.size > 1) {
          e.preventDefault()
          removeSelectedShapes()
          console.log('🗑️ Deleted ' + selectedShapeIds.size + ' shapes')
        } else if (selectedShapeId) {
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
  }, [selectedShapeId, selectedShapeIds, removeSelectedShape, removeSelectedShapes, clearSelection, handleClearCanvas, selectAllShapes, undo, redo, canUndo, canRedo, shapes])

  // Task 3.4.3 & 3.6.2 & 4.5 + PR6.2.1 + PR6.3.2: Create rectangle with loading state and toast feedback
  // Phase 4a Block 3 - Task 2: Added input validation
  const handleAddRectangle = async () => {
    setIsCreatingShape(true)
    try {
      const newShape = createRectangleShape()
      const shapeData = { ...newShape, type: 'rectangle' as const }
      
      // Validate shape data
      const validation = validateShapeData(shapeData)
      if (!validation.isValid) {
        showError(validation.errors.join('; '), 5000)
        setIsCreatingShape(false)
        return
      }
      
      // Show warnings if any
      if (validation.warnings.length > 0) {
        console.warn('⚠️ Shape warnings:', validation.warnings)
      }
      
      // Sanitize data before creation
      const sanitizedData = sanitizeShapeData(shapeData)
      const shapeId = await addShape(sanitizedData)
      
      if (shapeId) {
        console.log('✅ Rectangle created (Firestore):', shapeId)
        showSuccess(getSuccessMessage('shape-created'), 3000)
      } else {
        showError('Failed to create rectangle. Please try again', 5000)
      }
    } catch (error) {
      console.error('❌ Error creating rectangle:', error)
      showError('An error occurred while creating the rectangle', 5000)
    } finally {
      setIsCreatingShape(false)
    }
  }

  // Phase 4a Block 3 - Task 2: Added input validation
  const handleAddCircle = async () => {
    setIsCreatingShape(true)
    try {
      const newShape = createCircleShape()
      const shapeData = { ...newShape, type: 'circle' as const }
      
      const validation = validateShapeData(shapeData)
      if (!validation.isValid) {
        showError(validation.errors.join('; '), 5000)
        setIsCreatingShape(false)
        return
      }
      
      if (validation.warnings.length > 0) {
        console.warn('⚠️ Shape warnings:', validation.warnings)
      }
      
      const sanitizedData = sanitizeShapeData(shapeData)
      const shapeId = await addShape(sanitizedData)
      
      if (shapeId) {
        console.log('✅ Circle created (Firestore):', shapeId)
        showSuccess('Circle created successfully!', 3000)
      } else {
        showError('Failed to create circle. Please try again', 5000)
      }
    } catch (error) {
      console.error('❌ Error creating circle:', error)
      showError('An error occurred while creating the circle', 5000)
    } finally {
      setIsCreatingShape(false)
    }
  }

  // Phase 4a Block 3 - Task 2: Added input validation
  const handleAddText = async () => {
    setIsCreatingShape(true)
    try {
      const newShape = createTextShape()
      const shapeData = { ...newShape, type: 'text' as const, text: 'Double-click to edit' }
      
      const validation = validateShapeData(shapeData)
      if (!validation.isValid) {
        showError(validation.errors.join('; '), 5000)
        setIsCreatingShape(false)
        return
      }
      
      if (validation.warnings.length > 0) {
        console.warn('⚠️ Shape warnings:', validation.warnings)
      }
      
      const sanitizedData = sanitizeShapeData(shapeData)
      const shapeId = await addShape(sanitizedData)
      
      if (shapeId) {
        console.log('✅ Text created (Firestore):', shapeId)
        showSuccess('Text created successfully!', 3000)
      } else {
        showError('Failed to create text. Please try again', 5000)
      }
    } catch (error) {
      console.error('❌ Error creating text:', error)
      showError('An error occurred while creating the text', 5000)
    } finally {
      setIsCreatingShape(false)
    }
  }

  // PR8a.1.6: Line shape creation handler (Phase 2a)
  // Phase 4a Block 3 - Task 2: Added input validation
  const handleAddLine = async () => {
    setIsCreatingShape(true)
    try {
      const newShape = createLineShape()
      const shapeData = { ...newShape, type: 'line' as const }
      
      const validation = validateShapeData(shapeData)
      if (!validation.isValid) {
        showError(validation.errors.join('; '), 5000)
        setIsCreatingShape(false)
        return
      }
      
      if (validation.warnings.length > 0) {
        console.warn('⚠️ Shape warnings:', validation.warnings)
      }
      
      const sanitizedData = sanitizeShapeData(shapeData)
      const shapeId = await addShape(sanitizedData)
      
      if (shapeId) {
        console.log('✅ Line created (Firestore):', shapeId)
        showSuccess('Line created successfully!', 3000)
      } else {
        showError('Failed to create line. Please try again', 5000)
      }
    } catch (error) {
      console.error('❌ Error creating line:', error)
      showError('An error occurred while creating the line', 5000)
    } finally {
      setIsCreatingShape(false)
    }
  }

  // PR8a.1.6: Arrow shape creation handler (Phase 2a)
  // Phase 4a Block 3 - Task 2: Added input validation
  const handleAddArrow = async () => {
    setIsCreatingShape(true)
    try {
      const newShape = createArrowShape()
      const shapeData = { ...newShape, type: 'arrow' as const }
      
      const validation = validateShapeData(shapeData)
      if (!validation.isValid) {
        showError(validation.errors.join('; '), 5000)
        setIsCreatingShape(false)
        return
      }
      
      if (validation.warnings.length > 0) {
        console.warn('⚠️ Shape warnings:', validation.warnings)
      }
      
      const sanitizedData = sanitizeShapeData(shapeData)
      const shapeId = await addShape(sanitizedData)
      
      if (shapeId) {
        console.log('✅ Arrow created (Firestore):', shapeId)
        showSuccess('Arrow created successfully!', 3000)
      } else {
        showError('Failed to create arrow. Please try again', 5000)
      }
    } catch (error) {
      console.error('❌ Error creating arrow:', error)
      showError('An error occurred while creating the arrow', 5000)
    } finally {
      setIsCreatingShape(false)
    }
  }

  // PR8a.2.4: Open color picker modal for selected shape (Phase 2a)
  const handleOpenColorPicker = () => {
    if (selectedShapeId) {
      setIsColorPickerOpen(true)
    }
  }

  // PR8a.2.4: Apply color from color picker modal to selected shape(s) (Phase 2a)
  const handleColorPickerApply = async (color: string) => {
    if (!selectedShapeId) return

    // PR8a: Handle multi-select - update all selected shapes
    if (selectedShapeIds.size > 1) {
      // Use dedicated multi-update function to avoid race conditions
      const result = await updateMultipleShapeColors(Array.from(selectedShapeIds), color)

      if (result.successCount === result.totalCount) {
        console.log(`✅ ${result.successCount} shape colors updated:`, color)
        showSuccess(`Color changed for ${result.successCount} shapes`, 2000)
      } else if (result.successCount > 0) {
        console.warn(`⚠️ Only ${result.successCount}/${result.totalCount} shapes updated`)
        showError(`Only updated ${result.successCount} of ${result.totalCount} shapes`, 5000)
      } else {
        console.error('❌ Failed to update any shape colors')
        showError('Failed to change color. Please try again', 5000)
      }
    } else {
      // Single shape update
      const success = await updateShapeColor(selectedShapeId, color)
      if (success) {
        console.log('✅ Shape color updated:', selectedShapeId, color)
        showSuccess(`Color changed to ${color}`, 2000)
      } else {
        console.error('❌ Failed to update shape color')
        showError('Failed to change color. Please try again', 5000)
      }
    }
  }

  // PR8a.5: Export modal handlers (Phase 2a)
  const handleOpenExportModal = () => {
    setIsExportModalOpen(true)
  }

  const handleExportSuccess = () => {
    showSuccess('Canvas exported successfully!', 3000)
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

  const handleFontSizeChange = async (shapeId: string, fontSize: number) => {
    const success = await updateShapeFontSize(shapeId, fontSize)
    if (success) {
      console.log('✅ Font size updated:', shapeId, fontSize)
      showSuccess(`Font size updated to ${fontSize}px!`, 2000)
    } else {
      console.error('❌ Failed to update font size')
      showError('Failed to update font size. Please try again', 3000)
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

  // PR9: AI Command execution with toast feedback
  // Phase 4a Block 3 - Task 3: Added rate limiting
  const handleAICommandExecution = async (userInput: string) => {
    // Check rate limit
    const rateLimitKey = `ai-command:${user?.uid || 'anonymous'}`
    const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMITS.AI_COMMANDS)
    
    if (!rateLimit.allowed) {
      showError(
        `Rate limit exceeded. Please wait ${rateLimit.retryAfter} seconds before trying again.`,
        5000
      )
      return {
        success: false,
        result: {
          success: false,
          error: `Rate limit exceeded. Retry after ${rateLimit.retryAfter}s`,
        },
        toolCalls: [],
        duration: 0,
      }
    }
    
    try {
      const result = await executeAICommand(userInput)
      
      if (result.success && result.result.success) {
        showSuccess(
          result.result.message || `AI executed ${result.toolCalls.length} command(s)`,
          3000
        )
        console.log('✨ AI command executed:', result)
      } else {
        showError(
          result.result.error || 'AI command failed',
          5000
        )
        console.error('❌ AI command error:', result)
      }
      
      return result
    } catch (error) {
      showError('Failed to execute AI command', 5000)
      console.error('❌ AI command exception:', error)
      throw error
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
          onAddLine={handleAddLine}
          onAddArrow={handleAddArrow}
          onClearCanvas={handleClearCanvas}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          selectedShapeColor={shapes.find(s => s.id === selectedShapeId)?.fill || null}
          onChangeColor={handleOpenColorPicker}
          onUndo={undo}
          onRedo={redo}
          canUndo={canUndo}
          canRedo={canRedo}
          onExport={handleOpenExportModal}
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
            selectedShapeIds={selectedShapeIds}
            onSelectShape={selectShape}
            onUpdateShapePosition={updateShapePosition}
            onUpdateShapeDimensions={updateShapeDimensions}
            onUpdateShapePositionAndDimensions={updateShapePositionAndDimensions}
            onUpdateShapeProperties={updateShapeProperties}
            onTextChange={handleTextChange}
            onColorChange={handleColorChange}
            onFontSizeChange={handleFontSizeChange}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onDuplicateShape={duplicateShape}
            activeUsers={activeUsers}
            onCursorMove={updateCursor}
            onStageReady={setCanvasStage}
          />
        </div>

        {/* PR6.4.3: Keyboard shortcuts help with interactive buttons */}
        <KeyboardHelp
          onDeleteSelected={removeSelectedShape}
          onClearAll={handleClearCanvas}
          onDeselectAll={clearSelection}
          onSelectAll={selectAllShapes}
          onUndo={undo}
          onRedo={redo}
          isOpen={isHelpPanelOpen}
          onToggle={toggleHelpPanel}
        />

        {/* PR8a.2.4: Color picker modal for shape colors (Phase 2a) */}
        {isColorPickerOpen && selectedShapeId && (
          <ColorPaletteModal
            currentColor={shapes.find(s => s.id === selectedShapeId)?.fill || '#CCCCCC'}
            onSelectColor={handleColorPickerApply}
            onClose={() => setIsColorPickerOpen(false)}
          />
        )}

        {/* PR8a.5: Export modal (Phase 2a) */}
        {isExportModalOpen && (
          <ExportModal
            stage={canvasStage}
            onClose={() => setIsExportModalOpen(false)}
            onSuccess={handleExportSuccess}
          />
        )}

        {/* PR9: AI Command Panel (Phase 3) */}
        <div className="ai-command-panel-container">
          <AICommandPanel
            onExecuteCommand={handleAICommandExecution}
            isDisabled={!apiKeyStatus.configured}
          />
        </div>

        {/* PR10a: Performance Stats Panel (Phase 4a Block 2) */}
        <PerformanceStats
          show={isPerformanceStatsOpen}
          onClose={() => setIsPerformanceStatsOpen(false)}
        />
      </div>
    </AuthGuard>
  )
}

export default App
