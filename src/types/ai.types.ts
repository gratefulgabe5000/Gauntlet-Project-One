/**
 * AI Canvas Agent Types
 * Phase 3: AI Canvas Agent Implementation
 * 
 * Type definitions for OpenAI tool calling and AI command execution
 */

import type { Shape } from '../services/types';

/**
 * Tool Call Result from OpenAI
 */
export interface ToolCallResult {
  function: string;                    // Tool name (e.g., "create_shape")
  arguments: Record<string, any>;      // Parsed arguments from AI
  responseTime: number;                // API response time in ms
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Command Execution Result
 */
export interface CommandResult {
  success: boolean;
  shapesCreated?: string[];            // IDs of shapes created
  shapesModified?: string[];           // IDs of shapes modified
  message?: string;                    // Success/error message
  error?: string;                      // Detailed error if failed
}

/**
 * AI Command History Entry
 */
export interface CommandHistoryEntry {
  id: string;
  timestamp: number;
  userInput: string;
  result: CommandResult;
  toolCalls?: ToolCallResult[];
  userId: string;
}

/**
 * Canvas Tool Definition (OpenAI Function Schema)
 */
export interface CanvasTool {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: {
      type: 'object';
      properties: Record<string, any>;
      required?: string[];
    };
  };
}

/**
 * Tool Execution Context
 */
export interface ToolExecutionContext {
  userId: string;
  canvasId: string;
  existingShapes: Shape[];
  createShape: (shapeData: Partial<Shape>) => Promise<string>;
  updateShape: (shapeId: string, updates: Partial<Shape>) => Promise<void>;
  deleteShape: (shapeId: string) => Promise<void>;
}

/**
 * AI Agent Configuration
 */
export interface AIAgentConfig {
  model: string;                       // OpenAI model (e.g., "gpt-4o-mini")
  maxRetries: number;                  // Max retry attempts on failure
  temperature: number;                 // Response randomness (0-1)
  maxTokens?: number;                  // Max tokens in response
}

/**
 * AI Command Request
 */
export interface AICommandRequest {
  userInput: string;
  userId: string;
  canvasId: string;
  context?: {
    selectedShapes?: string[];
    recentShapes?: string[];
  };
}

/**
 * AI Command Response
 */
export interface AICommandResponse {
  success: boolean;
  result: CommandResult;
  toolCalls: ToolCallResult[];
  duration: number;                    // Total execution time in ms
  error?: string;
}

/**
 * Tool Call Arguments - Type Guards
 */
export interface CreateShapeArgs {
  shape: 'rectangle' | 'circle' | 'text' | 'line' | 'arrow';
  color: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  text?: string;
  fontSize?: number;
}

export interface MoveShapeArgs {
  shapeId?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  x?: number;
  y?: number;
  distance?: number;
}

export interface ResizeShapeArgs {
  shapeId?: string;
  width?: number;
  height?: number;
  scale?: number;
}

export interface ChangeColorArgs {
  shapeId?: string;
  color: string;
}

export interface ArrangeShapesArgs {
  pattern: 'horizontal' | 'vertical' | 'grid';
  spacing?: number;
  columns?: number;
}

export interface AlignShapesArgs {
  alignment: 'left' | 'right' | 'center' | 'top' | 'middle' | 'bottom';
  shapeIds?: string[];
}

/**
 * Error Types
 */
export class AIServiceError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = 'AIServiceError';
  }
}

export class ToolExecutionError extends Error {
  constructor(
    message: string,
    public toolName: string,
    public arguments: any
  ) {
    super(message);
    this.name = 'ToolExecutionError';
  }
}


