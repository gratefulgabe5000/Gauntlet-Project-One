/**
 * TypeScript Type Definitions for CollabCanvas MVP
 *
 * PR2.1.4: User interface definitions
 *
 * This file contains all TypeScript interfaces and types used throughout
 * the application for type safety and better developer experience.
 */

// ============================================================================
// Authentication Types (PR2)
// ============================================================================

/**
 * User Interface
 *
 * Represents an authenticated user in the application
 * Maps to Firebase Auth User with simplified properties
 */
export interface User {
  /** Unique user identifier from Firebase Auth */
  uid: string;

  /** User's email address */
  email: string | null;

  /** Display name (from Google profile or email prefix) */
  displayName: string | null;

  /** User's photo URL (from social login providers) */
  photoURL: string | null;

  /** Email verification status */
  emailVerified: boolean;

  /** Timestamp of account creation */
  createdAt?: string | undefined;
}

/**
 * Authentication State
 *
 * Represents the current authentication status of the application
 */
export interface AuthState {
  /** Currently authenticated user (null if not logged in) */
  user: User | null;

  /** Loading state during auth initialization or operations */
  loading: boolean;

  /** Error message if authentication fails */
  error: string | null;
}

/**
 * Login Credentials
 *
 * Email and password for authentication
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Signup Data
 *
 * User registration information
 */
export interface SignupData extends LoginCredentials {
  displayName?: string;
}

// ============================================================================
// Canvas & Shape Types (PR3/PR4)
// ============================================================================

/**
 * Shape Type Enumeration
 *
 * PR8a.1.4: Added line and arrow shape types (Phase 2a)
 * Supports rectangles, circles, text, lines, and arrows
 */
export type ShapeType = 'rectangle' | 'circle' | 'text' | 'line' | 'arrow';

/**
 * Shape Interface
 *
 * Represents a drawable shape on the canvas
 * Used for both local state and Firestore persistence
 */
export interface Shape {
  /** Unique shape identifier */
  id: string;

  /** Shape type (rectangle only for MVP) */
  type: ShapeType;

  /** X coordinate position */
  x: number;

  /** Y coordinate position */
  y: number;

  /** Shape width in pixels */
  width: number;

  /** Shape height in pixels */
  height: number;

  /** Fill color (fixed #cccccc for MVP) */
  fill: string;

  /** Text content (only for text shapes) */
  text?: string;

  /** Font size in pixels (only for text shapes) */
  fontSize?: number;

  /** Line points array (only for line/arrow shapes) - PR8a.1.4 */
  points?: number[];

  /** Arrow pointer length (only for arrow shapes) - PR8a.1.4 */
  pointerLength?: number;

  /** Arrow pointer width (only for arrow shapes) - PR8a.1.4 */
  pointerWidth?: number;

  /** User ID who created this shape */
  createdBy: string;

  /** Timestamp of creation */
  createdAt: number;

  /** User ID who last modified this shape */
  lastModifiedBy: string;

  /** Timestamp of last modification */
  lastModifiedAt: number;

  /** Whether shape is currently locked by a user */
  isLocked: boolean;

  /** User ID of who has the lock (null if unlocked) */
  lockedBy: string | null;

  /** Timestamp when lock was acquired */
  lockedAt: number | null;
}

/**
 * Shape Creation Data
 *
 * Minimal data needed to create a new shape
 */
export interface CreateShapeData {
  type: ShapeType;
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
  text?: string;
  fontSize?: number;
}

/**
 * Shape Update Data
 *
 * Partial shape data for updates (only changed fields)
 */
export interface UpdateShapeData {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  text?: string;
  fontSize?: number;
}

// ============================================================================
// Firestore Document Types (PR4)
// ============================================================================

/**
 * Canvas Document
 *
 * Represents the Firestore document structure for a canvas session
 * Path: /canvases/{canvasId}
 */
export interface CanvasDocument {
  /** Canvas ID (e.g., "global-canvas-v1") */
  canvasId: string;

  /** Array of all shapes on this canvas */
  shapes: Shape[];

  /** Canvas metadata */
  metadata: {
    /** When canvas was created */
    createdAt: number;

    /** Last update timestamp */
    lastModifiedAt: number;

    /** Number of active users */
    activeUsers: number;

    /** Total shape count */
    shapeCount: number;
  };
}

/**
 * Firestore Shape Data
 *
 * Shape data as stored in Firestore (within shapes array)
 */
export type FirestoreShape = Shape;

/**
 * Shape Lock Status
 *
 * Represents the locking state of a shape
 */
export interface LockStatus {
  /** Whether shape is locked */
  isLocked: boolean;

  /** User ID who holds the lock */
  lockedBy: string | null;

  /** When lock was acquired */
  lockedAt: number | null;
}

/**
 * Shape Operation Result
 *
 * Result of a shape create/update/delete operation
 */
export interface ShapeOperationResult {
  /** Whether operation succeeded */
  success: boolean;

  /** Shape ID (for create operations) */
  shapeId?: string;

  /** Error message if failed */
  error?: string;
}

// ============================================================================
// User Presence Types (PR5)
// ============================================================================

/**
 * User Presence
 *
 * Represents a user's real-time presence in a canvas session
 */
export interface UserPresence {
  /** User ID */
  userId: string;

  /** Display name */
  displayName: string;

  /** Assigned color for cursor and identification */
  cursorColor: string;

  /** Current cursor X position */
  cursorX: number;

  /** Current cursor Y position */
  cursorY: number;

  /** Last activity timestamp */
  lastSeen: number;

  /** Whether user is currently online */
  isOnline: boolean;
}

/**
 * Cursor Data
 *
 * Simplified cursor position for real-time updates
 */
export interface CursorData {
  userId: string;
  x: number;
  y: number;
  color: string;
  displayName: string;
}

// ============================================================================
// Canvas State Types (PR3)
// ============================================================================

/**
 * Canvas State
 *
 * Represents the complete state of the canvas
 */
export interface CanvasState {
  /** All shapes on the canvas */
  shapes: Shape[];

  /** Currently selected shape ID (null if none selected) */
  selectedShapeId: string | null;

  /** Canvas pan offset X */
  offsetX: number;

  /** Canvas pan offset Y */
  offsetY: number;

  /** Zoom level (1 = 100%) */
  scale: number;

  /** Canvas dimensions */
  dimensions: {
    width: number;
    height: number;
  };
}

/**
 * Canvas Bounds
 *
 * Canvas size limits (2000x2000px for MVP)
 */
export interface CanvasBounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

// ============================================================================
// API Response Types
// ============================================================================

/**
 * API Error Response
 *
 * Standard error format for Firebase operations
 */
export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

/**
 * API Success Response
 *
 * Generic success response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Point
 *
 * Simple 2D coordinate
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Size
 *
 * Width and height dimensions
 */
export interface Size {
  width: number;
  height: number;
}

/**
 * Rectangle Bounds
 *
 * Complete rectangle definition with position and size
 */
export interface Rectangle extends Point, Size {}

// ============================================================================
// Constants Export
// ============================================================================

/**
 * Application Constants
 */
export const CONSTANTS = {
  /** Canvas dimensions (MVP limit) */
  CANVAS_WIDTH: 2000,
  CANVAS_HEIGHT: 2000,

  /** Default shape properties */
  DEFAULT_SHAPE_WIDTH: 100,
  DEFAULT_SHAPE_HEIGHT: 100,
  DEFAULT_SHAPE_FILL: '#cccccc',

  /** Lock timeout (30 seconds) */
  LOCK_TIMEOUT_MS: 30000,

  /** Cursor update throttle (100ms) */
  CURSOR_UPDATE_THROTTLE_MS: 100,

  /** Sync timeout threshold (500ms) */
  SYNC_TIMEOUT_MS: 500,

  /** Maximum shapes on canvas (MVP limit) */
  MAX_SHAPES: 25,

  /** Maximum concurrent users (MVP limit) */
  MAX_USERS: 3,

  /** Global canvas ID (MVP uses single shared canvas) */
  GLOBAL_CANVAS_ID: 'global-canvas-v1',

  /** Firestore collection names */
  COLLECTIONS: {
    CANVASES: 'canvases',
    SESSIONS: 'sessions',
  },
} as const;

/**
 * Type helper to extract shape IDs
 */
export type ShapeId = string;

/**
 * Type helper to extract user IDs
 */
export type UserId = string;

/**
 * Type helper for timestamp values
 */
export type Timestamp = number;
