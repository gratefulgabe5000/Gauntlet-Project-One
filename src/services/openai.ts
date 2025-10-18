/**
 * OpenAI Service
 * Phase 3: AI Canvas Agent Implementation
 * 
 * OpenAI client initialization and AI command execution with tool calling
 */

import OpenAI from 'openai';
import type {
  AICommandRequest,
  AICommandResponse,
  AIAgentConfig,
  ToolCallResult,
  AIServiceError,
} from '../types/ai.types';
import { CANVAS_TOOLS } from '../utils/aiCommands';

/**
 * Default AI Agent Configuration
 */
const DEFAULT_CONFIG: AIAgentConfig = {
  model: 'gpt-4o-mini',        // Fast and cost-effective
  maxRetries: 3,
  temperature: 0.7,             // Balanced creativity/consistency
  maxTokens: 1000,
};

/**
 * Initialize OpenAI Client
 * Note: dangerouslyAllowBrowser is true for MVP development
 * TODO: Move to backend API in production (Phase 5)
 */
let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (!apiKey || apiKey === 'your-openai-api-key-here') {
      throw new Error(
        'OpenAI API key not configured. Please add VITE_OPENAI_API_KEY to .env.local'
      );
    }

    openaiClient = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true, // For MVP development only
    });
  }

  return openaiClient;
}

/**
 * Execute AI Command with Tool Calling
 * 
 * @param request - AI command request with user input and context
 * @param config - Optional configuration overrides
 * @returns AI command response with tool calls and results
 */
export async function executeAICommand(
  request: AICommandRequest,
  config: Partial<AIAgentConfig> = {}
): Promise<AICommandResponse> {
  const startTime = Date.now();
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  
  try {
    const client = getOpenAIClient();
    
    // Build system prompt with canvas context
    const systemPrompt = buildSystemPrompt(request);
    
    // Call OpenAI with tool calling
    const completion = await client.chat.completions.create({
      model: finalConfig.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: request.userInput },
      ],
      tools: CANVAS_TOOLS as any,
      tool_choice: 'auto',
      temperature: finalConfig.temperature,
      max_tokens: finalConfig.maxTokens,
    });

    const duration = Date.now() - startTime;
    const message = completion.choices[0]?.message;

    // Check if AI wants to call tools
    if (!message?.tool_calls || message.tool_calls.length === 0) {
      // No tool calls - AI responded with text only
      return {
        success: false,
        result: {
          success: false,
          message: message?.content || 'No tools called',
          error: 'AI did not call any canvas tools. Try a more specific command.',
        },
        toolCalls: [],
        duration,
      };
    }

    // Parse tool calls
    const toolCalls: ToolCallResult[] = message.tool_calls.map(tc => ({
      function: tc.function.name,
      arguments: JSON.parse(tc.function.arguments),
      responseTime: duration,
      usage: {
        prompt_tokens: completion.usage?.prompt_tokens || 0,
        completion_tokens: completion.usage?.completion_tokens || 0,
        total_tokens: completion.usage?.total_tokens || 0,
      },
    }));

    // Tool execution happens in the calling code (Canvas component)
    // This service only handles AI communication
    return {
      success: true,
      result: {
        success: true,
        message: `AI called ${toolCalls.length} tool(s)`,
        shapesCreated: [], // Will be populated by tool execution
      },
      toolCalls,
      duration,
    };

  } catch (error: any) {
    const duration = Date.now() - startTime;
    
    // Handle specific OpenAI errors
    if (error.status === 401) {
      return {
        success: false,
        result: {
          success: false,
          error: 'Invalid API key. Please check your VITE_OPENAI_API_KEY in .env.local',
        },
        toolCalls: [],
        duration,
        error: 'Authentication failed',
      };
    }

    if (error.status === 429) {
      return {
        success: false,
        result: {
          success: false,
          error: 'Rate limit exceeded. Please wait a moment and try again.',
        },
        toolCalls: [],
        duration,
        error: 'Rate limit exceeded',
      };
    }

    if (error.status === 500 || error.status === 503) {
      return {
        success: false,
        result: {
          success: false,
          error: 'OpenAI service is temporarily unavailable. Please try again.',
        },
        toolCalls: [],
        duration,
        error: 'Service unavailable',
      };
    }

    // Generic error
    console.error('AI command error:', error);
    return {
      success: false,
      result: {
        success: false,
        error: error.message || 'Failed to execute AI command',
      },
      toolCalls: [],
      duration,
      error: error.message,
    };
  }
}

/**
 * Build System Prompt with Canvas Context
 */
function buildSystemPrompt(request: AICommandRequest): string {
  const basePrompt = `You are an AI assistant for a collaborative canvas application called CollabCanvas.
Your role is to help users create, modify, and arrange shapes on the canvas using natural language commands.

Available tools:
- create_shape: Create rectangles, circles, text, lines, or arrows
- create_text: Create text with specific content and formatting
- create_sized_shape: Create shapes with exact dimensions
- move_shape: Move shapes to new positions or directions
- resize_shape: Change shape dimensions
- change_color: Update shape colors
- arrange_shapes: Arrange multiple shapes in patterns
- align_shapes: Align shapes to each other

Canvas coordinate system:
- Origin (0,0) is at the top-left
- Canvas size is 2000x2000 pixels
- Center is at (1000, 1000)
- Positive X is right, positive Y is down

Color names: You can use CSS color names (red, blue, green, etc.) or hex codes (#FF0000).

When the user asks to create shapes:
1. Use sensible defaults for positions (near center if not specified)
2. Use reasonable sizes (100-200px for rectangles, 50-100px radius for circles)
3. Choose visually pleasing colors if not specified
4. Call the appropriate tools to fulfill the request

Be helpful and interpret vague requests intelligently.`;

  // Add context about selected shapes if available
  if (request.context?.selectedShapes && request.context.selectedShapes.length > 0) {
    return `${basePrompt}\n\nCurrently selected shapes: ${request.context.selectedShapes.length} shape(s). When the user says "the shape" or "it", they likely mean the selected shape.`;
  }

  return basePrompt;
}

/**
 * Retry helper with exponential backoff
 */
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      
      // Don't retry on authentication errors
      if (error.status === 401 || error.status === 403) {
        throw error;
      }

      // Don't retry on the last attempt
      if (attempt === maxRetries - 1) {
        break;
      }

      // Exponential backoff: 1s, 2s, 4s
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}

/**
 * Test OpenAI Connection
 * 
 * @returns True if connection successful, error message otherwise
 */
export async function testOpenAIConnection(): Promise<{ success: boolean; message: string }> {
  try {
    const client = getOpenAIClient();
    
    // Simple test request
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: 'Hello' }],
      max_tokens: 5,
    });

    if (response.choices[0]?.message) {
      return {
        success: true,
        message: 'OpenAI connection successful',
      };
    }

    return {
      success: false,
      message: 'Unexpected response from OpenAI',
    };

  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to connect to OpenAI',
    };
  }
}

/**
 * Get API Key Status
 * 
 * @returns Status of API key configuration
 */
export function getAPIKeyStatus(): {
  configured: boolean;
  masked?: string;
  message: string;
} {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    return {
      configured: false,
      message: 'API key not found in .env.local',
    };
  }

  if (apiKey === 'your-openai-api-key-here') {
    return {
      configured: false,
      message: 'Please replace placeholder with actual API key',
    };
  }

  if (!apiKey.startsWith('sk-')) {
    return {
      configured: false,
      message: 'Invalid API key format (should start with sk-)',
    };
  }

  // Mask the key for display (show first 7 and last 4 chars)
  const masked = `${apiKey.substring(0, 7)}...${apiKey.substring(apiKey.length - 4)}`;

  return {
    configured: true,
    masked,
    message: 'API key configured',
  };
}

