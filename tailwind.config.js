/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom colors for collaborative canvas
      colors: {
        'canvas-bg': '#f8f9fa',
        'canvas-border': '#dee2e6',
        'selection': '#007bff',
        'user-1': '#ff6b6b',
        'user-2': '#4ecdc4',
        'user-3': '#45b7d1',
        'user-4': '#96ceb4',
        'user-5': '#feca57',
      },
      // Canvas-specific spacing
      spacing: {
        'canvas': '2000px',
      },
      // Animation for smooth interactions
      animation: {
        'pulse-soft': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
