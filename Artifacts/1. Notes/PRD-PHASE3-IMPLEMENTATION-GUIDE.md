# Phase 3 Implementation Guide: AI Canvas Agent (Hybrid Approach)

## 🎯 **Objective**

Deliver 25 rubric points in 1 day (October 16) using OpenAI Tool Calling

**Strategy**: Direct OpenAI SDK for speed + simplicity, add LangSmith observability in Phase 5

---

## 📚 **Prerequisites**

Before starting Phase 3:
- ✅ Phase 1 (MVP) deployed and working
- ✅ Phase 2 features complete (shapes, color picker, undo/redo)
- ✅ Node.js 18+ and npm 11+ installed
- ✅ OpenAI account with billing enabled
- ✅ $15-20 budget allocated for API usage

---

## 🚀 **Quick Start (30 Minutes)**

### **Step 1: Install OpenAI SDK (5 min)**

```bash
cd collabcanvas-mvp
npm install openai@latest
```

Verify installation in `package.json`:
```json
{
  "dependencies": {
    "openai": "^4.x.x"
  }
}
```

### **Step 2: Get OpenAI API Key (10 min)**

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Navigate to **API keys** section
4. Click **Create new secret key**
5. Copy the key (starts with `sk-...`)
6. Set up billing (required for API access)
   - Add credit card
   - Set budget alert at $15

### **Step 3: Configure Environment (5 min)**

Create/update `.env.local` in project root:

```bash
# Existing Firebase vars...
VITE_FIREBASE_API_KEY=...

# Add OpenAI configuration
VITE_OPENAI_API_KEY=sk-your-key-here
```

**Security Note**: `.env.local` is in `.gitignore` - never commit API keys!

### **Step 4: Test API Connection (10 min)**

Create test file `src/services/openaiTest.ts`:

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Phase 3 only - remove in production
});

export async function testOpenAI() {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: "Say 'API Connected'" }
      ]
    });
    console.log("✅ OpenAI connected:", response.choices[0].message.content);
    return true;
  } catch (error) {
    console.error("❌ OpenAI error:", error);
    return false;
  }
}
```

Run test in browser console:
```javascript
import { testOpenAI } from './services/openaiTest';
testOpenAI(); // Should log "✅ OpenAI connected: API Connected"
```

**If successful**: API is working! Proceed to implementation.

---

## 🛠️ **Implementation Steps**

### **Phase 3.1: Define Canvas Tools (90 minutes)**

#### **Create Tool Schemas File**

**File**: `src/utils/aiCommands.ts`

This defines all 8+ canvas tools using OpenAI Tool Calling format (from AI School Week 3.1).

```typescript
import type OpenAI from 'openai';

/**
 * Canvas Tools for OpenAI Tool Calling
 * Based on AI School Week 3.1 Tool Calling pattern
 * Each tool defines:
 * - name: function identifier
 * - description: what the tool does (helps LLM choose)
 * - parameters: JSON schema for arguments
 */

export const CANVAS_TOOLS: OpenAI.Chat.ChatCompletionTool[] = [
  // ========== CREATION TOOLS (3) ==========
  {
    type: "function",
    function: {
      name: "create_shape",
      description: "Creates a new shape on the canvas (rectangle, circle, line, arrow, or text)",
      parameters: {
        type: "object",
        properties: {
          shape: {
            type: "string",
            enum: ["rectangle", "circle", "line", "arrow", "text"],
            description: "Type of shape to create"
          },
          color: {
            type: "string",
            description: "Color name (e.g. 'red', 'blue') or hex code (e.g. '#FF5733')"
          },
          x: {
            type: "number",
            description: "X coordinate (optional, defaults to center)"
          },
          y: {
            type: "number",
            description: "Y coordinate (optional, defaults to center)"
          },
          width: {
            type: "number",
            description: "Width in pixels (optional, defaults based on shape type)"
          },
          height: {
            type: "number",
            description: "Height in pixels (optional, defaults based on shape type)"
          }
        },
        required: ["shape", "color"]
      }
    }
  },

  {
    type: "function",
    function: {
      name: "create_text",
      description: "Creates a text element on the canvas",
      parameters: {
        type: "object",
        properties: {
          content: {
            type: "string",
            description: "The text content to display"
          },
          fontSize: {
            type: "number",
            description: "Font size in pixels (default: 24)"
          },
          color: {
            type: "string",
            description: "Text color (default: black)"
          },
          x: {
            type: "number",
            description: "X coordinate (optional)"
          },
          y: {
            type: "number",
            description: "Y coordinate (optional)"
          }
        },
        required: ["content"]
      }
    }
  },

  {
    type: "function",
    function: {
      name: "create_sized_shape",
      description: "Creates a shape with specific dimensions",
      parameters: {
        type: "object",
        properties: {
          shape: {
            type: "string",
            enum: ["rectangle", "circle"],
            description: "Shape type"
          },
          width: {
            type: "number",
            description: "Width in pixels"
          },
          height: {
            type: "number",
            description: "Height in pixels"
          },
          color: {
            type: "string",
            description: "Shape color (default: gray)"
          }
        },
        required: ["shape", "width", "height"]
      }
    }
  },

  // ========== MANIPULATION TOOLS (3) ==========
  {
    type: "function",
    function: {
      name: "move_shape",
      description: "Moves an existing shape to a new position",
      parameters: {
        type: "object",
        properties: {
          shapeSelector: {
            type: "string",
            description: "How to identify the shape: color (e.g. 'red circle'), type (e.g. 'the rectangle'), or 'selected'"
          },
          position: {
            type: "string",
            description: "Target position: 'center', direction (e.g. 'up 100px'), or 'coordinates'"
          },
          x: {
            type: "number",
            description: "X coordinate if position is 'coordinates'"
          },
          y: {
            type: "number",
            description: "Y coordinate if position is 'coordinates'"
          }
        },
        required: ["shapeSelector"]
      }
    }
  },

  {
    type: "function",
    function: {
      name: "resize_shape",
      description: "Changes the size of an existing shape",
      parameters: {
        type: "object",
        properties: {
          shapeSelector: {
            type: "string",
            description: "Shape identifier (color, type, or 'selected')"
          },
          operation: {
            type: "string",
            enum: ["multiply", "exact"],
            description: "Type of resize: multiply (e.g. 2x bigger) or exact dimensions"
          },
          multiplier: {
            type: "number",
            description: "Size multiplier if operation is 'multiply' (e.g. 2 for twice as big)"
          },
          width: {
            type: "number",
            description: "Exact width if operation is 'exact'"
          },
          height: {
            type: "number",
            description: "Exact height if operation is 'exact'"
          }
        },
        required: ["shapeSelector", "operation"]
      }
    }
  },

  {
    type: "function",
    function: {
      name: "change_color",
      description: "Changes the color of an existing shape",
      parameters: {
        type: "object",
        properties: {
          shapeSelector: {
            type: "string",
            description: "Shape identifier"
          },
          newColor: {
            type: "string",
            description: "New color (name or hex code)"
          }
        },
        required: ["shapeSelector", "newColor"]
      }
    }
  },

  // ========== LAYOUT TOOLS (3) ==========
  {
    type: "function",
    function: {
      name: "arrange_shapes",
      description: "Arranges multiple shapes in a layout pattern",
      parameters: {
        type: "object",
        properties: {
          layout: {
            type: "string",
            enum: ["horizontal", "vertical", "grid"],
            description: "Layout pattern"
          },
          spacing: {
            type: "number",
            description: "Space between shapes in pixels (default: 50)"
          }
        },
        required: ["layout"]
      }
    }
  },

  {
    type: "function",
    function: {
      name: "distribute_shapes",
      description: "Distributes shapes with equal spacing",
      parameters: {
        type: "object",
        properties: {
          direction: {
            type: "string",
            enum: ["horizontal", "vertical"],
            description: "Distribution direction"
          }
        },
        required: ["direction"]
      }
    }
  },

  {
    type: "function",
    function: {
      name: "align_shapes",
      description: "Aligns multiple shapes",
      parameters: {
        type: "object",
        properties: {
          alignment: {
            type: "string",
            enum: ["left", "right", "center", "top", "bottom", "middle"],
            description: "Alignment type"
          }
        },
        required: ["alignment"]
      }
    }
  },

  // ========== COMPLEX TOOLS (3) ==========
  {
    type: "function",
    function: {
      name: "create_login_form",
      description: "Creates a complete login form with username, password fields, and button",
      parameters: {
        type: "object",
        properties: {
          x: {
            type: "number",
            description: "X position of form (optional, defaults to center)"
          },
          y: {
            type: "number",
            description: "Y position of form (optional, defaults to center)"
          }
        }
      }
    }
  },

  {
    type: "function",
    function: {
      name: "create_navbar",
      description: "Creates a navigation bar with menu items",
      parameters: {
        type: "object",
        properties: {
          itemCount: {
            type: "number",
            description: "Number of menu items (default: 4)"
          }
        }
      }
    }
  },

  {
    type: "function",
    function: {
      name: "create_card",
      description: "Creates a card layout with title and description",
      parameters: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "Card title (default: 'Title')"
          },
          description: {
            type: "string",
            description: "Card description (default: 'Description')"
          }
        }
      }
    }
  }
];

/**
 * System prompt for the AI Canvas Agent
 * Instructs the LLM on how to use the tools
 */
export const AI_SYSTEM_PROMPT = `You are a canvas command interpreter.
Your job is to understand natural language requests and select the appropriate tool to execute canvas operations.

Available tools:
- create_shape: Create basic shapes (rectangle, circle, line, arrow, text)
- create_text: Create text elements
- create_sized_shape: Create shapes with specific dimensions
- move_shape: Move existing shapes
- resize_shape: Change shape sizes
- change_color: Update shape colors
- arrange_shapes: Layout shapes in patterns
- distribute_shapes: Space shapes evenly
- align_shapes: Align shapes together
- create_login_form: Create a complete login form (3+ elements)
- create_navbar: Create a navigation bar
- create_card: Create a card layout

Always choose the most appropriate tool for the user's request.
For ambiguous commands, make reasonable assumptions.
Return only tool calls, no additional explanation.`;
```

**Key Points**:
- 12 tools total (exceeds 8+ requirement)
- 4 categories: Creation (3), Manipulation (3), Layout (3), Complex (3)
- Clear descriptions help LLM choose correctly
- Required vs optional parameters marked

---

### **Phase 3.2: Create OpenAI Service (60 minutes)**

#### **OpenAI Client Setup**

**File**: `src/services/openai.ts`

```typescript
import OpenAI from 'openai';
import { CANVAS_TOOLS, AI_SYSTEM_PROMPT } from '../utils/aiCommands';

/**
 * OpenAI client for AI Canvas Agent
 * Using gpt-4o-mini for speed and cost efficiency
 */
const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // OK for Phase 3 demo, migrate to Cloud Functions for production
});

/**
 * Execute an AI canvas command using tool calling
 * @param userInput - Natural language command from user
 * @returns Tool call result with function name and arguments
 */
export async function executeAICommand(userInput: string) {
  const startTime = performance.now();

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // Fast and cheap (~1-2s response, $0.02/command)
      messages: [
        {
          role: "system",
          content: AI_SYSTEM_PROMPT
        },
        {
          role: "user",
          content: userInput
        }
      ],
      tools: CANVAS_TOOLS,
      tool_choice: "auto", // Let LLM decide which tool to use
      temperature: 0.3 // Lower temperature = more deterministic
    });

    const responseTime = performance.now() - startTime;

    const message = response.choices[0].message;

    // Check if LLM made a tool call
    if (message.tool_calls && message.tool_calls.length > 0) {
      const toolCall = message.tool_calls[0];

      return {
        success: true,
        function: toolCall.function.name,
        arguments: JSON.parse(toolCall.function.arguments),
        responseTime,
        usage: response.usage // Token counts for monitoring
      };
    }

    // No tool call made (shouldn't happen with good prompts)
    throw new Error("No tool call generated");

  } catch (error: any) {
    console.error("OpenAI API error:", error);
    throw new Error(error.message || "AI command failed");
  }
}

/**
 * Retry logic for API failures
 * Exponential backoff: 1s, 2s, 4s
 */
export async function executeAICommandWithRetry(
  userInput: string,
  maxRetries = 3
) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await executeAICommand(userInput);
    } catch (error: any) {
      if (attempt === maxRetries) throw error;

      // Exponential backoff
      const delay = Math.pow(2, attempt - 1) * 1000;
      console.log(`Retry attempt ${attempt}/${maxRetries} after ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

**Key Features**:
- Uses `gpt-4o-mini` for speed (<2s response time)
- Tool calling with `tools` and `tool_choice` parameters
- Response time tracking for performance monitoring
- Retry logic with exponential backoff
- Error handling

---

### **Phase 3.3: Tool Execution Handlers (90 minutes)**

#### **AI Agent Service**

**File**: `src/services/aiAgent.ts`

```typescript
import { executeAICommandWithRetry } from './openai';
import type { Shape } from './types';

/**
 * Execute a tool call by routing to the appropriate handler
 * @param toolName - Name of the tool from OpenAI
 * @param args - Parsed arguments from OpenAI
 * @param hooks - Canvas manipulation hooks from React
 * @returns Result with created/modified shape IDs
 */
export async function executeToolCall(
  toolName: string,
  args: any,
  hooks: {
    addShape: (shape: Partial<Shape>) => Promise<string>;
    updateShape: (id: string, updates: Partial<Shape>) => Promise<void>;
    getShapes: () => Shape[];
  }
) {
  const { addShape, updateShape, getShapes } = hooks;

  switch (toolName) {
    // ========== CREATION HANDLERS ==========
    case "create_shape": {
      const { shape, color, x, y, width, height } = args;
      const shapeId = await addShape({
        type: shape,
        fill: parseColor(color),
        x: x ?? 500, // Default to center
        y: y ?? 400,
        width: width ?? getDefaultSize(shape).width,
        height: height ?? getDefaultSize(shape).height,
        createdBy: 'ai',
        aiCommand: `create_shape(${shape}, ${color})`
      });
      return { success: true, shapesCreated: [shapeId] };
    }

    case "create_text": {
      const { content, fontSize = 24, color = 'black', x, y } = args;
      const shapeId = await addShape({
        type: 'text',
        text: content,
        fontSize,
        fill: parseColor(color),
        x: x ?? 500,
        y: y ?? 400,
        createdBy: 'ai',
        aiCommand: `create_text("${content}")`
      });
      return { success: true, shapesCreated: [shapeId] };
    }

    case "create_sized_shape": {
      const { shape, width, height, color = 'gray' } = args;
      const shapeId = await addShape({
        type: shape,
        width,
        height,
        fill: parseColor(color),
        x: 500,
        y: 400,
        createdBy: 'ai',
        aiCommand: `create_sized_shape(${shape}, ${width}x${height})`
      });
      return { success: true, shapesCreated: [shapeId] };
    }

    // ========== MANIPULATION HANDLERS ==========
    case "move_shape": {
      const { shapeSelector, position, x, y } = args;
      const shape = findShape(getShapes(), shapeSelector);
      if (!shape) throw new Error(`Shape not found: ${shapeSelector}`);

      const newPosition = calculatePosition(position, x, y, shape);
      await updateShape(shape.id, newPosition);
      return { success: true, shapesModified: [shape.id] };
    }

    case "resize_shape": {
      const { shapeSelector, operation, multiplier, width, height } = args;
      const shape = findShape(getShapes(), shapeSelector);
      if (!shape) throw new Error(`Shape not found: ${shapeSelector}`);

      let newSize;
      if (operation === "multiply") {
        newSize = {
          width: shape.width * multiplier,
          height: shape.height * multiplier
        };
      } else {
        newSize = { width, height };
      }

      await updateShape(shape.id, newSize);
      return { success: true, shapesModified: [shape.id] };
    }

    case "change_color": {
      const { shapeSelector, newColor } = args;
      const shape = findShape(getShapes(), shapeSelector);
      if (!shape) throw new Error(`Shape not found: ${shapeSelector}`);

      await updateShape(shape.id, { fill: parseColor(newColor) });
      return { success: true, shapesModified: [shape.id] };
    }

    // ========== LAYOUT HANDLERS ==========
    case "arrange_shapes": {
      const { layout, spacing = 50 } = args;
      const shapes = getShapes();
      const positions = calculateLayout(shapes, layout, spacing);

      const updates = shapes.map((shape, i) =>
        updateShape(shape.id, positions[i])
      );
      await Promise.all(updates);

      return { success: true, shapesModified: shapes.map(s => s.id) };
    }

    case "distribute_shapes": {
      const { direction } = args;
      const shapes = getShapes().sort((a, b) =>
        direction === 'horizontal' ? a.x - b.x : a.y - b.y
      );

      const positions = calculateDistribution(shapes, direction);
      const updates = shapes.map((shape, i) =>
        updateShape(shape.id, positions[i])
      );
      await Promise.all(updates);

      return { success: true, shapesModified: shapes.map(s => s.id) };
    }

    case "align_shapes": {
      const { alignment } = args;
      const shapes = getShapes();
      const alignedPositions = calculateAlignment(shapes, alignment);

      const updates = shapes.map((shape, i) =>
        updateShape(shape.id, alignedPositions[i])
      );
      await Promise.all(updates);

      return { success: true, shapesModified: shapes.map(s => s.id) };
    }

    // ========== COMPLEX HANDLERS ==========
    case "create_login_form": {
      const { x = 500, y = 300 } = args;
      const createdIds: string[] = [];

      // Username label
      createdIds.push(await addShape({
        type: 'text',
        text: 'Username',
        x: x - 100,
        y: y,
        fontSize: 18,
        fill: 'black',
        createdBy: 'ai'
      }));

      // Username input
      createdIds.push(await addShape({
        type: 'rectangle',
        x: x - 100,
        y: y + 30,
        width: 200,
        height: 40,
        fill: '#f0f0f0',
        stroke: '#999',
        createdBy: 'ai'
      }));

      // Password label
      createdIds.push(await addShape({
        type: 'text',
        text: 'Password',
        x: x - 100,
        y: y + 90,
        fontSize: 18,
        fill: 'black',
        createdBy: 'ai'
      }));

      // Password input
      createdIds.push(await addShape({
        type: 'rectangle',
        x: x - 100,
        y: y + 120,
        width: 200,
        height: 40,
        fill: '#f0f0f0',
        stroke: '#999',
        createdBy: 'ai'
      }));

      // Login button
      createdIds.push(await addShape({
        type: 'rectangle',
        x: x - 50,
        y: y + 180,
        width: 100,
        height: 40,
        fill: '#4CAF50',
        createdBy: 'ai'
      }));

      // Button text
      createdIds.push(await addShape({
        type: 'text',
        text: 'Login',
        x: x - 20,
        y: y + 195,
        fontSize: 16,
        fill: 'white',
        createdBy: 'ai'
      }));

      return { success: true, shapesCreated: createdIds };
    }

    case "create_navbar": {
      const { itemCount = 4 } = args;
      const createdIds: string[] = [];

      // Navbar background
      createdIds.push(await addShape({
        type: 'rectangle',
        x: 0,
        y: 0,
        width: 1000,
        height: 60,
        fill: '#2196F3',
        createdBy: 'ai'
      }));

      // Menu items
      const itemWidth = 1000 / itemCount;
      const menuItems = ['Home', 'About', 'Services', 'Contact', 'Blog', 'Careers'];

      for (let i = 0; i < itemCount; i++) {
        createdIds.push(await addShape({
          type: 'text',
          text: menuItems[i] || `Item ${i + 1}`,
          x: (i * itemWidth) + (itemWidth / 2) - 30,
          y: 25,
          fontSize: 18,
          fill: 'white',
          createdBy: 'ai'
        }));
      }

      return { success: true, shapesCreated: createdIds };
    }

    case "create_card": {
      const { title = 'Title', description = 'Description' } = args;
      const createdIds: string[] = [];

      // Card background
      createdIds.push(await addShape({
        type: 'rectangle',
        x: 400,
        y: 300,
        width: 300,
        height: 200,
        fill: 'white',
        stroke: '#ddd',
        shadowBlur: 10,
        createdBy: 'ai'
      }));

      // Title
      createdIds.push(await addShape({
        type: 'text',
        text: title,
        x: 420,
        y: 330,
        fontSize: 24,
        fontStyle: 'bold',
        fill: 'black',
        createdBy: 'ai'
      }));

      // Description
      createdIds.push(await addShape({
        type: 'text',
        text: description,
        x: 420,
        y: 370,
        fontSize: 16,
        fill: '#666',
        createdBy: 'ai'
      }));

      return { success: true, shapesCreated: createdIds };
    }

    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}

// ========== HELPER FUNCTIONS ==========

function parseColor(color: string): string {
  // Convert color names to hex or return hex as-is
  const colorMap: Record<string, string> = {
    red: '#FF0000',
    blue: '#0000FF',
    green: '#00FF00',
    yellow: '#FFFF00',
    black: '#000000',
    white: '#FFFFFF',
    gray: '#808080',
    purple: '#800080',
    orange: '#FFA500'
  };

  return colorMap[color.toLowerCase()] || color;
}

function getDefaultSize(shape: string) {
  const sizes: Record<string, {width: number, height: number}> = {
    rectangle: { width: 150, height: 100 },
    circle: { width: 100, height: 100 },
    line: { width: 200, height: 2 },
    arrow: { width: 200, height: 10 }
  };
  return sizes[shape] || { width: 100, height: 100 };
}

function findShape(shapes: Shape[], selector: string): Shape | undefined {
  // Find by color
  if (selector.includes('red') || selector.includes('blue') || selector.includes('green')) {
    const color = selector.split(' ')[0];
    return shapes.find(s => s.fill?.toLowerCase().includes(color));
  }

  // Find by type
  if (selector.includes('rectangle') || selector.includes('circle')) {
    const type = selector.split(' ')[selector.split(' ').length - 1];
    return shapes.find(s => s.type === type);
  }

  // Find selected (first shape for now)
  if (selector === 'selected') {
    return shapes[0];
  }

  return shapes[0]; // Fallback
}

function calculatePosition(
  position: string,
  x?: number,
  y?: number,
  shape?: Shape
) {
  if (position === 'center') {
    return { x: 500, y: 400 };
  }

  if (position === 'coordinates' && x !== undefined && y !== undefined) {
    return { x, y };
  }

  // Direction-based movement
  if (position.includes('up') && shape) {
    const pixels = parseInt(position.match(/\d+/)?.[0] || '50');
    return { y: shape.y - pixels };
  }

  if (position.includes('down') && shape) {
    const pixels = parseInt(position.match(/\d+/)?.[0] || '50');
    return { y: shape.y + pixels };
  }

  return { x: x ?? 500, y: y ?? 400 };
}

function calculateLayout(
  shapes: Shape[],
  layout: string,
  spacing: number
) {
  // Simplified layout logic
  return shapes.map((_, i) => {
    if (layout === 'horizontal') {
      return { x: 100 + (i * spacing), y: 400 };
    }
    if (layout === 'vertical') {
      return { x: 500, y: 100 + (i * spacing) };
    }
    // Grid layout
    const cols = Math.ceil(Math.sqrt(shapes.length));
    const row = Math.floor(i / cols);
    const col = i % cols;
    return { x: 100 + (col * spacing), y: 100 + (row * spacing) };
  });
}

function calculateDistribution(shapes: Shape[], direction: string) {
  if (shapes.length < 2) return shapes.map(s => ({ x: s.x, y: s.y }));

  const sorted = [...shapes].sort((a, b) =>
    direction === 'horizontal' ? a.x - b.x : a.y - b.y
  );

  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  const totalSpace = direction === 'horizontal'
    ? last.x - first.x
    : last.y - first.y;
  const spacing = totalSpace / (shapes.length - 1);

  return sorted.map((shape, i) => ({
    [direction === 'horizontal' ? 'x' : 'y']:
      (direction === 'horizontal' ? first.x : first.y) + (i * spacing)
  }));
}

function calculateAlignment(shapes: Shape[], alignment: string) {
  if (shapes.length === 0) return [];

  switch (alignment) {
    case 'left': {
      const minX = Math.min(...shapes.map(s => s.x));
      return shapes.map(() => ({ x: minX }));
    }
    case 'right': {
      const maxX = Math.max(...shapes.map(s => s.x + s.width));
      return shapes.map(s => ({ x: maxX - s.width }));
    }
    case 'center': {
      const avgX = shapes.reduce((sum, s) => sum + s.x, 0) / shapes.length;
      return shapes.map(() => ({ x: avgX }));
    }
    case 'top': {
      const minY = Math.min(...shapes.map(s => s.y));
      return shapes.map(() => ({ y: minY }));
    }
    case 'bottom': {
      const maxY = Math.max(...shapes.map(s => s.y + s.height));
      return shapes.map(s => ({ y: maxY - s.height }));
    }
    case 'middle': {
      const avgY = shapes.reduce((sum, s) => sum + s.y, 0) / shapes.length;
      return shapes.map(() => ({ y: avgY }));
    }
    default:
      return shapes.map(s => ({ x: s.x, y: s.y }));
  }
}
```

**Key Features**:
- Comprehensive handlers for all 12 tools
- Shape finding logic (by color, type, selection)
- Position calculation helpers
- Layout algorithms
- Complex multi-element creation (login form: 6 elements!)

---

### **Phase 3.4: React Integration (90 minutes)**

#### **AI Agent Hook**

**File**: `src/hooks/useAIAgent.ts`

```typescript
import { useState } from 'react';
import { executeAICommandWithRetry } from '../services/openai';
import { executeToolCall } from '../services/aiAgent';
import { useShapes } from './useShapes';

interface CommandResult {
  success: boolean;
  shapesCreated?: string[];
  shapesModified?: string[];
  error?: string;
  responseTime?: number;
}

export function useAIAgent() {
  const [commandInput, setCommandInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResult, setLastResult] = useState<CommandResult | null>(null);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  const { addShape, updateShape, shapes } = useShapes();

  const executeCommand = async (input: string) => {
    setIsProcessing(true);
    setLastResult(null);

    try {
      // Step 1: Get tool call from OpenAI
      const toolCallResult = await executeAICommandWithRetry(input);

      console.log("Tool call:", toolCallResult);

      // Step 2: Execute the tool
      const executionResult = await executeToolCall(
        toolCallResult.function,
        toolCallResult.arguments,
        {
          addShape,
          updateShape,
          getShapes: () => shapes
        }
      );

      // Step 3: Update history and result
      setCommandHistory(prev => [input, ...prev.slice(0, 19)]); // Keep last 20
      setLastResult({
        ...executionResult,
        responseTime: toolCallResult.responseTime
      });

      setCommandInput('');
      setIsProcessing(false);

      return executionResult;

    } catch (error: any) {
      const errorResult = {
        success: false,
        error: error.message || 'AI command failed'
      };

      setLastResult(errorResult);
      setIsProcessing(false);

      throw error;
    }
  };

  return {
    commandInput,
    setCommandInput,
    isProcessing,
    lastResult,
    commandHistory,
    executeCommand
  };
}
```

#### **AI Command Panel Component**

**File**: `src/components/AICommandPanel.tsx`

```typescript
import React, { useState } from 'react';
import { useAIAgent } from '../hooks/useAIAgent';
import { useToast } from '../hooks/useToast';

export function AICommandPanel() {
  const { commandInput, setCommandInput, isProcessing, lastResult, commandHistory, executeCommand } = useAIAgent();
  const { showToast } = useToast();
  const [showHistory, setShowHistory] = useState(false);

  const handleExecute = async () => {
    if (!commandInput.trim() || isProcessing) return;

    try {
      const result = await executeCommand(commandInput);

      if (result.success) {
        const count = result.shapesCreated?.length || result.shapesModified?.length || 0;
        showToast({
          message: `Success! ${count} shape(s) ${result.shapesCreated ? 'created' : 'modified'}`,
          type: 'success',
          duration: 3000
        });
      }
    } catch (error: any) {
      showToast({
        message: `Error: ${error.message}`,
        type: 'error',
        duration: 5000
      });
    }
  };

  const exampleCommands = [
    "Create a red circle",
    "Move the blue rectangle to the center",
    "Arrange these shapes in a horizontal row",
    "Create a login form"
  ];

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-2xl border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-t-lg">
        <h3 className="font-bold text-lg flex items-center">
          <span className="mr-2">🤖</span>
          AI Canvas Agent
        </h3>
        <p className="text-xs opacity-90">Natural language canvas commands</p>
      </div>

      {/* Input Area */}
      <div className="p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleExecute()}
            placeholder="e.g., Create a red circle"
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isProcessing}
          />
          <button
            onClick={handleExecute}
            disabled={isProcessing || !commandInput.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isProcessing ? '⏳' : '▶️'}
          </button>
        </div>

        {/* Result Display */}
        {lastResult && (
          <div className={`mt-3 p-3 rounded ${
            lastResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            {lastResult.success ? (
              <div className="text-sm">
                <span className="text-green-700">✓ Success!</span>
                {lastResult.responseTime && (
                  <span className="text-gray-600 ml-2">
                    {lastResult.responseTime.toFixed(0)}ms
                  </span>
                )}
              </div>
            ) : (
              <div className="text-sm text-red-700">
                ✗ {lastResult.error}
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {isProcessing && (
          <div className="mt-3 text-center text-gray-600">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <p className="text-sm mt-2">Processing command...</p>
          </div>
        )}

        {/* Example Commands */}
        <div className="mt-4">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-sm text-blue-600 hover:underline"
          >
            {showHistory ? 'Hide' : 'Show'} {showHistory ? 'History' : 'Examples'}
          </button>

          {!showHistory && (
            <div className="mt-2 space-y-1">
              {exampleCommands.map((cmd, i) => (
                <div
                  key={i}
                  onClick={() => setCommandInput(cmd)}
                  className="text-xs text-gray-600 cursor-pointer hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded"
                >
                  💡 {cmd}
                </div>
              ))}
            </div>
          )}

          {showHistory && commandHistory.length > 0 && (
            <div className="mt-2 space-y-1 max-h-40 overflow-y-auto">
              {commandHistory.map((cmd, i) => (
                <div
                  key={i}
                  onClick={() => setCommandInput(cmd)}
                  className="text-xs text-gray-600 cursor-pointer hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded"
                >
                  🕒 {cmd}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

**Add to App.tsx**:

```typescript
import { AICommandPanel } from './components/AICommandPanel';

function App() {
  return (
    <>
      {/* Existing components... */}
      <AICommandPanel />
    </>
  );
}
```

---

## ✅ **Testing Strategy**

### **Test Each Category (60 minutes)**

#### **Creation Tools** (15 min)
```
1. "Create a red circle"
   ✓ Circle appears in center, red color

2. "Add text that says Hello World"
   ✓ Text appears with correct content

3. "Make a 300x200 blue rectangle"
   ✓ Rectangle with exact dimensions
```

#### **Manipulation Tools** (15 min)
```
4. "Move the red circle to the center"
   ✓ Shape moves to (500, 400)

5. "Make the blue rectangle twice as big"
   ✓ Width and height doubled

6. "Change the circle color to green"
   ✓ Fill color updates
```

#### **Layout Tools** (15 min)
```
7. "Arrange these shapes in a horizontal row"
   ✓ All shapes aligned horizontally with spacing

8. "Distribute shapes evenly"
   ✓ Equal gaps between shapes

9. "Align shapes to the left"
   ✓ All shapes share same x-coordinate
```

#### **Complex Tools** (15 min)
```
10. "Create a login form"
    ✓ 6 elements created (2 labels, 2 inputs, button, button text)
    ✓ Properly positioned in vertical stack

11. "Build a navigation bar with 5 items"
    ✓ Background bar + 5 menu items evenly spaced

12. "Make a card layout with title and description"
    ✓ 3 elements (background, title, description)
```

### **Multi-User Testing** (15 min)
```
1. Open 3 browser tabs
2. Execute "Create a red circle" in tab 1
3. Verify circle appears in tabs 2 & 3 within <2s
4. Check metadata shows createdBy: 'ai'
```

### **Performance Testing** (10 min)
```
1. Execute 20 commands
2. Measure response times
3. Verify 90%+ under 2 seconds
4. Check cost in OpenAI dashboard (~$0.40 total)
```

---

## 🚀 **Deployment Checklist**

### **Before Deployment**

- [ ] All 12 tools defined in `aiCommands.ts`
- [ ] OpenAI service working with retry logic
- [ ] Tool execution handlers complete
- [ ] AI panel integrated into App.tsx
- [ ] .env.local with OpenAI key (not committed!)
- [ ] All tests passing (creation, manipulation, layout, complex)
- [ ] Multi-user sync verified
- [ ] Response times <2s for 90%+ commands

### **Phase 3 Complete When**:
- [ ] 8+ command types working across 4 categories ✓
- [ ] Complex commands create 3+ elements ✓
- [ ] Sub-2 second response time ✓
- [ ] 90%+ accuracy tested ✓
- [ ] Multi-user AI sync working ✓

---

## 📊 **Expected Results**

### **Rubric Section 4: AI Canvas Agent (25 points)**

**Command Breadth & Capability (10 pts)**:
- ✅ 12 distinct command types (exceeds 8+ requirement)
- ✅ All 4 categories covered (creation, manipulation, layout, complex)

**Complex Command Execution (8 pts)**:
- ✅ Login form: 6 elements properly arranged
- ✅ Navbar: N items with dynamic layout
- ✅ Card: 3 elements with styling

**AI Performance & Reliability (7 pts)**:
- ✅ Sub-2 second responses (gpt-4o-mini)
- ✅ 90%+ accuracy (tool calling enforces schema)
- ✅ Multi-user shared state via Firestore
- ✅ Natural UX with loading/error states

**Total**: 23-25 points (Excellent tier)

---

## 🔧 **Troubleshooting**

### **Common Issues**

**Issue**: API returns 401 Unauthorized
- **Fix**: Check API key in `.env.local`, verify billing enabled

**Issue**: Response time >3 seconds
- **Fix**: Switch to `gpt-4o-mini`, reduce tool description lengths

**Issue**: LLM not calling tools
- **Fix**: Improve system prompt, make tool descriptions clearer

**Issue**: Tool calls with invalid arguments
- **Fix**: Add required parameters, make enums more specific

**Issue**: Shapes not syncing across users
- **Fix**: Verify Firestore listeners working, check `createdBy` metadata

**Issue**: "dangerouslyAllowBrowser" warning
- **Fix**: This is OK for Phase 3, will migrate to Cloud Functions in production

---

## 📈 **Next Steps: Phase 5 Enhancement**

After Phase 3 is complete and working, Phase 5 adds LangSmith observability in 15 minutes:

1. Install LangSmith: `npm install langsmith`
2. Wrap OpenAI client:
   ```typescript
   import { wrapOpenAI } from 'langsmith/wrappers';
   const client = wrapOpenAI(new OpenAI({...}));
   ```
3. No other code changes!
4. Get automatic tracing for demo video

---

## 🎯 **Success Metrics**

Phase 3 succeeds when:
- ✅ 12 tools defined and working
- ✅ All categories tested (creation, manipulation, layout, complex)
- ✅ "Create login form" produces 3+ properly positioned elements
- ✅ 90% of commands execute in <2 seconds
- ✅ AI-generated shapes sync to all users
- ✅ Natural UX with feedback (loading, success, error)
- ✅ 25 rubric points achieved

**Total Development Time**: 6-8 hours (fits 1-day timeline)
**Expected Score**: 23-25 / 25 points (Excellent tier)

---

*Phase 3 Implementation Guide v1.0*
*Created: October 15, 2025*
*Strategy: OpenAI Tool Calling (Week 3.1 pattern) for 25-point AI agent*
*Phase 5 Enhancement: Add LangSmith wrapper for +2 bonus points*
