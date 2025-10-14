import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

/**
 * Vitest Configuration for CollabCanvas MVP
 *
 * Test Strategy (PR1.6):
 * - Unit tests: Component rendering and logic
 * - Integration tests: Multi-component interactions
 * - Real-time tests: Firebase sync validation (PR4)
 *
 * Coverage Target: Focus on critical path (real-time sync)
 */
export default defineConfig({
  plugins: [react()],
  test: {
    // Use jsdom for browser environment simulation
    environment: 'jsdom',

    // Setup files to run before tests
    setupFiles: ['./src/__tests__/setup.ts'],

    // Coverage configuration (optional for MVP)
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        'node_modules/',
        'src/__tests__/',
        '*.config.ts',
        'dist/',
      ],
    },

    // Test file patterns
    include: ['src/**/*.{test,spec}.{ts,tsx}'],

    // Global test timeout (increase for Firebase operations)
    testTimeout: 10000,
  },

  // Path aliases matching tsconfig.json
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/services': path.resolve(__dirname, './src/services'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/auth': path.resolve(__dirname, './src/auth'),
    },
  },
});
