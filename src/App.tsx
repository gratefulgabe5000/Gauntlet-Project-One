import { useState } from 'react'
import './App.css'

// Import Firebase to test connection

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100">
      {/* Header/Toolbar */}
      <div className="toolbar">
        <h1 className="text-2xl font-bold text-gray-800">CollabCanvas MVP</h1>
        <div className="flex gap-2">
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

        {/* User Presence Indicator */}
        <div className="user-presence ml-auto">
          <div className="user-avatar bg-blue-500"></div>
          <span className="text-gray-700">You</span>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="canvas-wrapper">
        <div className="flex items-center justify-center h-full">
          <div className="text-center space-y-4">
            <div className="loading-spinner mx-auto"></div>
            <h2 className="text-xl text-gray-600">Canvas Loading...</h2>
            <p className="text-gray-500 max-w-md">
              This is a test of Tailwind CSS utility classes. The canvas component will replace this content.
            </p>
            <div className="flex gap-2 justify-center">
              <div className="w-4 h-4 bg-user-1 rounded-full"></div>
              <div className="w-4 h-4 bg-user-2 rounded-full"></div>
              <div className="w-4 h-4 bg-user-3 rounded-full"></div>
              <div className="w-4 h-4 bg-user-4 rounded-full"></div>
              <div className="w-4 h-4 bg-user-5 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-400">Custom user colors from Tailwind config</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
