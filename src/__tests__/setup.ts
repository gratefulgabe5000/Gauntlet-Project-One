/**
 * Vitest Global Setup
 *
 * Runs before all tests to configure the testing environment
 * PR1.6 - Basic Testing Setup
 */

import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Mock window.matchMedia (required for responsive components)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock HTMLCanvasElement for Konva.js
(HTMLCanvasElement.prototype.getContext as any) = () => {
  return {
    fillRect: () => {},
    clearRect: () => {},
    getImageData: () => ({
      data: new Uint8ClampedArray(4),
    }),
    putImageData: () => {},
    createImageData: () => [],
    setTransform: () => {},
    drawImage: () => {},
    save: () => {},
    fillText: () => {},
    restore: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    closePath: () => {},
    stroke: () => {},
    translate: () => {},
    scale: () => {},
    rotate: () => {},
    arc: () => {},
    fill: () => {},
    measureText: () => ({
      width: 0,
    }),
    transform: () => {},
    rect: () => {},
    clip: () => {},
  };
};

console.log('✓ Vitest setup complete - Testing environment initialized');
