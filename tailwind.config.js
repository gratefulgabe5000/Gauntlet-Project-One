/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // PR6.6.1: Enhanced color scheme and consistency
      colors: {
        // Canvas colors
        'canvas-bg': '#f9fafb',
        'canvas-border': '#e5e7eb',
        'selection': '#2563eb',

        // Brand colors - consistent blue palette
        'brand': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },

        // User presence colors (vibrant and distinct)
        'user-1': '#ef4444',  // Red
        'user-2': '#10b981',  // Green
        'user-3': '#3b82f6',  // Blue
        'user-4': '#f59e0b',  // Amber
        'user-5': '#8b5cf6',  // Purple
        'user-6': '#ec4899',  // Pink
        'user-7': '#06b6d4',  // Cyan
        'user-8': '#84cc16',  // Lime
      },

      // Canvas-specific spacing
      spacing: {
        'canvas': '2000px',
      },

      // PR6.6.1: Consistent border radius
      borderRadius: {
        'card': '0.75rem',
        'button': '0.5rem',
      },

      // PR6.6.1: Consistent shadows
      boxShadow: {
        'button': '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
        'button-hover': '0 4px 12px 0 rgba(0, 0, 0, 0.15)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },

      // PR6.6.2: Animation for smooth interactions
      animation: {
        'pulse-soft': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounce 1s ease-in-out 3',
      },

      // PR6.6.2: Transitions
      transitionDuration: {
        '400': '400ms',
      }
    },
  },
  plugins: [],
}
