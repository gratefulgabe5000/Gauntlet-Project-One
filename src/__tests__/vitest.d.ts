/**
 * Vitest Type Declarations
 *
 * Extends Vitest's expect with jest-dom matchers
 */

import '@testing-library/jest-dom';
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare global {
  namespace Vi {
    interface Assertion<T = any> extends jest.Matchers<void, T>, TestingLibraryMatchers<T, void> {}
    interface AsymmetricMatchersContaining extends jest.Matchers<void, any> {}
  }
}
