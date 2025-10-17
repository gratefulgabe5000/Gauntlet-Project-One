/**
 * Canvas Action Types for Undo/Redo System
 *
 * PR8a.3.2: Action types and interfaces (Phase 2a)
 *
 * Features:
 * - Serializable action data structures
 * - Support for CREATE, UPDATE, DELETE, MOVE, COLOR_CHANGE actions
 * - User ID tracking for multi-user undo isolation
 */

import type { Shape } from '../services/types';

// ============================================================================
// Action Type Enumeration
// ============================================================================

/**
 * Types of actions that can be undone/redone
 */
export enum ActionType {
  CREATE = 'CREATE',
  DELETE = 'DELETE',
  MOVE = 'MOVE',
  UPDATE = 'UPDATE',
  COLOR_CHANGE = 'COLOR_CHANGE',
  TEXT_CHANGE = 'TEXT_CHANGE',
}

// ============================================================================
// Action Data Interfaces
// ============================================================================

/**
 * Base action interface with common properties
 */
export interface BaseAction {
  /** Action type */
  type: ActionType;

  /** User ID who performed the action */
  userId: string;

  /** Timestamp when action was performed */
  timestamp: number;

  /** Shape ID affected by this action */
  shapeId: string;
}

/**
 * CREATE action data
 * Records a shape creation for undo
 */
export interface CreateAction extends BaseAction {
  type: ActionType.CREATE;

  /** The shape that was created */
  shape: Shape;
}

/**
 * DELETE action data
 * Records a shape deletion for undo
 */
export interface DeleteAction extends BaseAction {
  type: ActionType.DELETE;

  /** The shape that was deleted (for redo) */
  shape: Shape;
}

/**
 * MOVE action data
 * Records a shape position change for undo
 */
export interface MoveAction extends BaseAction {
  type: ActionType.MOVE;

  /** Previous position */
  oldPosition: { x: number; y: number };

  /** New position */
  newPosition: { x: number; y: number };
}

/**
 * UPDATE action data
 * Records generic shape property updates for undo
 */
export interface UpdateAction extends BaseAction {
  type: ActionType.UPDATE;

  /** Previous shape state */
  oldState: Partial<Shape>;

  /** New shape state */
  newState: Partial<Shape>;
}

/**
 * COLOR_CHANGE action data
 * Records a shape color change for undo
 */
export interface ColorChangeAction extends BaseAction {
  type: ActionType.COLOR_CHANGE;

  /** Previous color */
  oldColor: string;

  /** New color */
  newColor: string;
}

/**
 * TEXT_CHANGE action data
 * Records a text shape content change for undo
 */
export interface TextChangeAction extends BaseAction {
  type: ActionType.TEXT_CHANGE;

  /** Previous text content */
  oldText: string;

  /** New text content */
  newText: string;
}

/**
 * Union type for all possible actions
 */
export type CanvasAction =
  | CreateAction
  | DeleteAction
  | MoveAction
  | UpdateAction
  | ColorChangeAction
  | TextChangeAction;

// ============================================================================
// Action History Configuration
// ============================================================================

/**
 * Configuration for action history
 */
export const ACTION_HISTORY_CONFIG = {
  /** Maximum number of actions to store in history */
  MAX_HISTORY_SIZE: 50,

  /** Maximum number of actions in redo stack */
  MAX_REDO_SIZE: 50,

  /** Time threshold for grouping rapid actions (ms) */
  ACTION_GROUP_THRESHOLD: 1000,
} as const;

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Action creator helper type
 */
export type ActionCreator<T extends CanvasAction> = (
  data: Omit<T, 'timestamp'>
) => T;

/**
 * Action handler helper type
 */
export type ActionHandler = (action: CanvasAction) => Promise<boolean>;

/**
 * Undo/Redo result
 */
export interface UndoRedoResult {
  /** Whether the operation succeeded */
  success: boolean;

  /** The action that was undone/redone */
  action?: CanvasAction;

  /** Error message if failed */
  error?: string;
}
