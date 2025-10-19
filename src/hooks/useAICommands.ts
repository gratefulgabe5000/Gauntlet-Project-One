/**
 * useAICommands Hook
 * Phase 3: AI Canvas Agent Implementation
 * 
 * Integrates OpenAI service with canvas operations to execute AI-driven commands
 */

import { useCallback, useState, useRef } from 'react';
import type { AICommandResponse, ToolCallResult } from '../types/ai.types';
import { executeAICommand } from '../services/openai';
import { TOOL_NAMES } from '../utils/aiCommands';
import type { Shape } from '../services/types';

interface UseAICommandsProps {
  userId: string | null;
  canvasId: string;
  shapes: Shape[];
  // Canvas operation functions from useShapes
  addShape: (shapeData: any) => Promise<string | null>;
  updateShapePosition: (shapeId: string, x: number, y: number) => Promise<boolean>;
  updateShapeColor: (shapeId: string, color: string) => Promise<boolean>;
  updateShapeDimensions: (shapeId: string, width: number, height: number) => Promise<boolean>;
  updateShapeProperties: (shapeId: string, updates: Partial<Shape>) => Promise<boolean>;
}

interface UseAICommandsReturn {
  executeCommand: (userInput: string) => Promise<AICommandResponse>;
  isExecuting: boolean;
  lastCreatedShapeIds: string[];
}

/**
 * Hook for AI canvas command execution with tool calling
 */
export function useAICommands({
  userId,
  canvasId,
  shapes,
  addShape,
  updateShapePosition,
  updateShapeColor,
  updateShapeDimensions,
  updateShapeProperties,
}: UseAICommandsProps): UseAICommandsReturn {
  const [isExecuting, setIsExecuting] = useState(false);
  const lastCreatedShapeIdsRef = useRef<string[]>([]);

  /**
   * Resolve shape ID (supports "last" keyword for most recent shape)
   */
  const resolveShapeId = useCallback((shapeId?: string): string | null => {
    if (!shapeId) return null;
    
    if (shapeId === 'last') {
      // Get most recently created shape from our tracking ref
      if (lastCreatedShapeIdsRef.current.length > 0) {
        return lastCreatedShapeIdsRef.current[lastCreatedShapeIdsRef.current.length - 1];
      }
      // Fallback: Get most recent shape by createdAt
      const sortedShapes = [...shapes].sort((a, b) => b.createdAt - a.createdAt);
      return sortedShapes[0]?.id || null;
    }
    
    return shapeId;
  }, [shapes]);

  /**
   * Execute a single tool call
   */
  const executeTool = useCallback(async (
    toolCall: ToolCallResult
  ): Promise<{ success: boolean; shapesCreated?: string[]; shapesModified?: string[]; error?: string }> => {
    const { function: toolName, arguments: args } = toolCall;

    try {
      switch (toolName) {
        // ========================================
        // CREATION TOOLS
        // ========================================
        
        case TOOL_NAMES.CREATE_SHAPE: {
          const { shape, color, x, y, text } = args;
          
          // Default positions near center with randomization
          const defaultX = x ?? 900 + Math.floor(Math.random() * 200);
          const defaultY = y ?? 900 + Math.floor(Math.random() * 200);
          
          // Default dimensions based on shape type
          const defaultDimensions: Record<string, { width: number; height: number }> = {
            rectangle: { width: 150, height: 100 },
            circle: { width: 100, height: 100 }, // radius
            text: { width: 200, height: 50 },
            line: { width: 200, height: 0 },
            arrow: { width: 200, height: 0 },
          };
          
          const dims = defaultDimensions[shape] || { width: 100, height: 100 };
          
          const shapeData: any = {
            type: shape,
            x: defaultX,
            y: defaultY,
            width: dims.width,
            height: dims.height,
            fill: color,
          };
          
          // Add text if it's a text shape
          if (shape === 'text') {
            shapeData.text = text || 'Text';
            shapeData.fontSize = 24;
          }
          
          // Add points for line/arrow shapes
          if (shape === 'line' || shape === 'arrow') {
            shapeData.points = [0, 0, dims.width, 0]; // Horizontal line
            if (shape === 'arrow') {
              shapeData.pointerLength = 20;
              shapeData.pointerWidth = 20;
            }
          }
          
          const shapeId = await addShape(shapeData);
          
          if (shapeId) {
            lastCreatedShapeIdsRef.current.push(shapeId);
            return { success: true, shapesCreated: [shapeId] };
          } else {
            return { success: false, error: 'Failed to create shape' };
          }
        }
        
        case TOOL_NAMES.CREATE_TEXT: {
          const { text, x, y, fontSize, color } = args;
          
          const defaultX = x ?? 1000;
          const defaultY = y ?? 1000;
          
          const shapeData = {
            type: 'text',
            x: defaultX,
            y: defaultY,
            width: 200,
            height: 50,
            fill: color || 'black',
            text: text || 'Text',
            fontSize: fontSize || 24,
          };
          
          const shapeId = await addShape(shapeData);
          
          if (shapeId) {
            lastCreatedShapeIdsRef.current.push(shapeId);
            return { success: true, shapesCreated: [shapeId] };
          } else {
            return { success: false, error: 'Failed to create text' };
          }
        }
        
        case TOOL_NAMES.CREATE_SIZED_SHAPE: {
          const { shape, color, x, y, width, height } = args;
          
          const defaultX = x ?? 900 + Math.floor(Math.random() * 200);
          const defaultY = y ?? 900 + Math.floor(Math.random() * 200);
          
          const shapeData = {
            type: shape,
            x: defaultX,
            y: defaultY,
            width: width,
            height: height,
            fill: color,
          };
          
          const shapeId = await addShape(shapeData);
          
          if (shapeId) {
            lastCreatedShapeIdsRef.current.push(shapeId);
            return { success: true, shapesCreated: [shapeId] };
          } else {
            return { success: false, error: 'Failed to create sized shape' };
          }
        }
        
        // ========================================
        // MANIPULATION TOOLS
        // ========================================
        
        case TOOL_NAMES.MOVE_SHAPE: {
          const { shapeId, x, y, direction, distance } = args;
          
          const resolvedId = resolveShapeId(shapeId);
          if (!resolvedId) {
            return { success: false, error: 'No shape to move' };
          }
          
          const shape = shapes.find(s => s.id === resolvedId);
          if (!shape) {
            return { success: false, error: `Shape not found: ${resolvedId}` };
          }
          
          let newX = shape.x;
          let newY = shape.y;
          
          // Use absolute coordinates if provided
          if (x !== undefined) newX = x;
          if (y !== undefined) newY = y;
          
          // Or use directional movement
          if (direction) {
            const dist = distance || 100;
            switch (direction) {
              case 'left': newX -= dist; break;
              case 'right': newX += dist; break;
              case 'up': newY -= dist; break;
              case 'down': newY += dist; break;
            }
          }
          
          const success = await updateShapePosition(resolvedId, newX, newY);
          return success 
            ? { success: true, shapesModified: [resolvedId] }
            : { success: false, error: 'Failed to move shape' };
        }
        
        case TOOL_NAMES.RESIZE_SHAPE: {
          const { shapeId, width, height, scale } = args;
          
          const resolvedId = resolveShapeId(shapeId);
          if (!resolvedId) {
            return { success: false, error: 'No shape to resize' };
          }
          
          const shape = shapes.find(s => s.id === resolvedId);
          if (!shape) {
            return { success: false, error: `Shape not found: ${resolvedId}` };
          }
          
          let newWidth = shape.width;
          let newHeight = shape.height;
          
          if (scale !== undefined) {
            newWidth *= scale;
            newHeight *= scale;
          } else {
            if (width !== undefined) newWidth = width;
            if (height !== undefined) newHeight = height;
          }
          
          const success = await updateShapeDimensions(resolvedId, newWidth, newHeight);
          return success
            ? { success: true, shapesModified: [resolvedId] }
            : { success: false, error: 'Failed to resize shape' };
        }
        
        case TOOL_NAMES.CHANGE_COLOR: {
          const { shapeId, color } = args;
          
          const resolvedId = resolveShapeId(shapeId);
          if (!resolvedId) {
            return { success: false, error: 'No shape to recolor' };
          }
          
          const success = await updateShapeColor(resolvedId, color);
          return success
            ? { success: true, shapesModified: [resolvedId] }
            : { success: false, error: 'Failed to change color' };
        }
        
        case TOOL_NAMES.ROTATE_SHAPE: {
          const { shapeId, rotation } = args;
          
          const resolvedId = resolveShapeId(shapeId);
          if (!resolvedId) {
            return { success: false, error: 'No shape to rotate' };
          }
          
          const success = await updateShapeProperties(resolvedId, { rotation });
          return success
            ? { success: true, shapesModified: [resolvedId] }
            : { success: false, error: 'Failed to rotate shape' };
        }
        
        // ========================================
        // LAYOUT TOOLS
        // ========================================
        
        case TOOL_NAMES.ARRANGE_SHAPES: {
          const { pattern, spacing, columns, shapeIds } = args;
          
          const targetShapes = shapeIds && shapeIds.length > 0
            ? shapes.filter(s => shapeIds.includes(s.id))
            : [...shapes]; // All shapes
          
          if (targetShapes.length === 0) {
            return { success: false, error: 'No shapes to arrange' };
          }
          
          const space = spacing || 50;
          const modifiedIds: string[] = [];
          
          // Calculate starting position (centered)
          const startX = 400;
          const startY = 400;
          
          if (pattern === 'horizontal') {
            let currentX = startX;
            for (const shape of targetShapes) {
              await updateShapePosition(shape.id, currentX, startY);
              modifiedIds.push(shape.id);
              currentX += shape.width + space;
            }
          } else if (pattern === 'vertical') {
            let currentY = startY;
            for (const shape of targetShapes) {
              await updateShapePosition(shape.id, startX, currentY);
              modifiedIds.push(shape.id);
              currentY += shape.height + space;
            }
          } else if (pattern === 'grid') {
            const cols = columns || Math.ceil(Math.sqrt(targetShapes.length));
            let currentX = startX;
            let currentY = startY;
            let col = 0;
            
            for (const shape of targetShapes) {
              await updateShapePosition(shape.id, currentX, currentY);
              modifiedIds.push(shape.id);
              
              col++;
              if (col >= cols) {
                // Move to next row
                col = 0;
                currentX = startX;
                currentY += 150; // Fixed row height
              } else {
                currentX += 150; // Fixed column width
              }
            }
          }
          
          return { success: true, shapesModified: modifiedIds };
        }
        
        case TOOL_NAMES.ALIGN_SHAPES: {
          const { alignment, shapeIds } = args;
          
          const targetShapes = shapeIds && shapeIds.length > 0
            ? shapes.filter(s => shapeIds.includes(s.id))
            : [...shapes];
          
          if (targetShapes.length === 0) {
            return { success: false, error: 'No shapes to align' };
          }
          
          const modifiedIds: string[] = [];
          
          // Calculate alignment reference point
          if (alignment === 'left') {
            const minX = Math.min(...targetShapes.map(s => s.x));
            for (const shape of targetShapes) {
              await updateShapePosition(shape.id, minX, shape.y);
              modifiedIds.push(shape.id);
            }
          } else if (alignment === 'right') {
            const maxX = Math.max(...targetShapes.map(s => s.x + s.width));
            for (const shape of targetShapes) {
              await updateShapePosition(shape.id, maxX - shape.width, shape.y);
              modifiedIds.push(shape.id);
            }
          } else if (alignment === 'center') {
            const avgX = targetShapes.reduce((sum, s) => sum + (s.x + s.width / 2), 0) / targetShapes.length;
            for (const shape of targetShapes) {
              await updateShapePosition(shape.id, avgX - shape.width / 2, shape.y);
              modifiedIds.push(shape.id);
            }
          } else if (alignment === 'top') {
            const minY = Math.min(...targetShapes.map(s => s.y));
            for (const shape of targetShapes) {
              await updateShapePosition(shape.id, shape.x, minY);
              modifiedIds.push(shape.id);
            }
          } else if (alignment === 'bottom') {
            const maxY = Math.max(...targetShapes.map(s => s.y + s.height));
            for (const shape of targetShapes) {
              await updateShapePosition(shape.id, shape.x, maxY - shape.height);
              modifiedIds.push(shape.id);
            }
          } else if (alignment === 'middle') {
            const avgY = targetShapes.reduce((sum, s) => sum + (s.y + s.height / 2), 0) / targetShapes.length;
            for (const shape of targetShapes) {
              await updateShapePosition(shape.id, shape.x, avgY - shape.height / 2);
              modifiedIds.push(shape.id);
            }
          }
          
          return { success: true, shapesModified: modifiedIds };
        }
        
        case TOOL_NAMES.DISTRIBUTE_SHAPES: {
          const { direction, shapeIds } = args;
          
          const targetShapes = shapeIds && shapeIds.length > 0
            ? shapes.filter(s => shapeIds.includes(s.id))
            : [...shapes];
          
          if (targetShapes.length < 3) {
            return { success: false, error: 'Need at least 3 shapes to distribute' };
          }
          
          const modifiedIds: string[] = [];
          
          if (direction === 'horizontal') {
            // Sort by X position
            const sorted = [...targetShapes].sort((a, b) => a.x - b.x);
            const minX = sorted[0].x;
            const maxX = sorted[sorted.length - 1].x;
            const spacing = (maxX - minX) / (sorted.length - 1);
            
            for (let i = 0; i < sorted.length; i++) {
              const newX = minX + (i * spacing);
              await updateShapePosition(sorted[i].id, newX, sorted[i].y);
              modifiedIds.push(sorted[i].id);
            }
          } else if (direction === 'vertical') {
            // Sort by Y position
            const sorted = [...targetShapes].sort((a, b) => a.y - b.y);
            const minY = sorted[0].y;
            const maxY = sorted[sorted.length - 1].y;
            const spacing = (maxY - minY) / (sorted.length - 1);
            
            for (let i = 0; i < sorted.length; i++) {
              const newY = minY + (i * spacing);
              await updateShapePosition(sorted[i].id, sorted[i].x, newY);
              modifiedIds.push(sorted[i].id);
            }
          }
          
          return { success: true, shapesModified: modifiedIds };
        }
        
        default:
          return { success: false, error: `Unknown tool: ${toolName}` };
      }
    } catch (error) {
      console.error(`❌ Tool execution error (${toolName}):`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }, [shapes, resolveShapeId, addShape, updateShapePosition, updateShapeColor, updateShapeDimensions, updateShapeProperties]);

  /**
   * Execute AI command with tool calling
   */
  const executeCommand = useCallback(async (userInput: string): Promise<AICommandResponse> => {
    if (!userId) {
      return {
        success: false,
        result: {
          success: false,
          error: 'Not authenticated',
        },
        toolCalls: [],
        duration: 0,
        error: 'User not authenticated',
      };
    }

    setIsExecuting(true);
    lastCreatedShapeIdsRef.current = []; // Reset tracking

    try {
      // Step 1: Call OpenAI to get tool calls
      const aiResponse = await executeAICommand({
        userInput,
        userId,
        canvasId,
      });

      if (!aiResponse.success) {
        return aiResponse;
      }

      // Step 2: Execute all tool calls
      const executionResults = await Promise.all(
        aiResponse.toolCalls.map(toolCall => executeTool(toolCall))
      );

      // Step 3: Aggregate results
      const allShapesCreated: string[] = [];
      const allShapesModified: string[] = [];
      const errors: string[] = [];

      for (const result of executionResults) {
        if (result.success) {
          if (result.shapesCreated) allShapesCreated.push(...result.shapesCreated);
          if (result.shapesModified) allShapesModified.push(...result.shapesModified);
        } else {
          errors.push(result.error || 'Unknown error');
        }
      }

      const allSucceeded = errors.length === 0;

      return {
        ...aiResponse,
        result: {
          success: allSucceeded,
          shapesCreated: allShapesCreated,
          shapesModified: allShapesModified,
          message: allSucceeded
            ? `✓ ${aiResponse.toolCalls.length} command(s) executed successfully`
            : `⚠ ${executionResults.filter(r => r.success).length}/${executionResults.length} commands succeeded`,
          error: errors.length > 0 ? errors.join('; ') : undefined,
        },
      };

    } catch (error) {
      console.error('❌ AI command execution error:', error);
      return {
        success: false,
        result: {
          success: false,
          error: error instanceof Error ? error.message : 'Command execution failed',
        },
        toolCalls: [],
        duration: 0,
        error: 'Execution error',
      };
    } finally {
      setIsExecuting(false);
    }
  }, [userId, canvasId, executeTool]);

  return {
    executeCommand,
    isExecuting,
    lastCreatedShapeIds: lastCreatedShapeIdsRef.current,
  };
}


