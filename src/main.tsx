import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './auth/AuthContext'
import './index.css'

/**
 * CollabCanvas MVP - Application Entry Point
 *
 * PR2.5.1: Wrapped with AuthProvider for global authentication state
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
