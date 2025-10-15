import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './auth/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'

/**
 * CollabCanvas MVP - Application Entry Point
 *
 * PR2.5.1: Wrapped with AuthProvider for global authentication state
 * PR7.2: Added ErrorBoundary for crash prevention
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>,
)
