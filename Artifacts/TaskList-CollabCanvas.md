# CollabCanvas Rubric-Aligned Development Task List

## 🎯 **Mission: Deliver 95+ Point Rubric-Aligned Application**

**Project Goal**: Build production-ready, AI-powered collaborative canvas from MVP to final submission
**Complete Timeline**: October 9-17, 2025 (9 days total: 5 days MVP + 3 days rubric sprint)
**Current Sprint**: October 15-17, 2025 (3 days - Phases 2-5)
**Current Status**: Phase 1 MVP Complete ✅ | Phases 2-5 Pending ⏳
**Philosophy**: "Strategic rubric focus: AI agent = 25 points, optimize accordingly"

---

## 📊 **SPRINT PROGRESS SUMMARY**

**Last Updated**: October 15, 2025
**Sprint Status**: 🚀 **PHASE 2 STARTING** (Building on Phase 1 foundation)
**Overall Progress**: 25% complete (Phase 1 complete, Phases 2-5 pending)
**MVP Status**: ✅ **PRODUCTION LIVE** - <https://collabcanvas-mvp-53120.web.app>

### **Phase Completion Overview**

**✅ COMPLETED (1/5 Phases) - 20%**

- ✅ Phase 1 (MVP): Foundation with basic collaboration (20 rubric points earned)

**🔄 IN PROGRESS (0/4 Phases)**

- ⏳ Phase 2: Canvas Features & Figma Tools (Oct 15) - Target: +20 points
- ⏳ Phase 3: AI Canvas Agent (Oct 16) - Target: +25 points (HIGHEST VALUE)
- ⏳ Phase 4: Performance & Polish (Oct 17 AM) - Target: +20 points
- ⏳ Phase 5: Documentation & Submission (Oct 17 PM) - Target: +15 points

**🎯 Target Rubric Score**: 95-105/105 points
**Current Score**: ~20/105 points (Phase 1 baseline)
**Remaining Points**: 85 points across 3 days

---

## 🔄 **PROGRESSIVE PULL REQUEST STRATEGY (Complete 5-Phase Journey)**

### **All PR Milestones - Phase 1 MVP + Rubric Sprint**

| PR # | Phase | Date | Title | Rubric Target | Points | Status |
|------|-------|------|-------|---------------|--------|--------|
| **PR-1** | Phase 1 | Oct 9 | `PR 1 feat: project setup and firebase configuration` | Section 1 (partial) | ~3 pts | ✅ Merged |
| **PR-2** | Phase 1 | Oct 10 | `PR 2 feat: core canvas implementation with basic shapes` | Section 1 (partial) | ~3 pts | ✅ Merged |
| **PR-3** | Phase 1 | Oct 11 | `PR 3 feat: firestore persistent state and real-time sync` | Section 1 (partial) | ~5 pts | ✅ Merged |
| **PR-4** | Phase 1 | Oct 12 | `PR 4 feat: realtime cursor tracking with firebase rtdb` | Section 1 (partial) | ~3 pts | ✅ Merged |
| **PR-5** | Phase 1 | Oct 13 | `feat: text shape component and editing` | Section 1 (partial) | ~2 pts | ✅ Merged |
| **PR-6** | Phase 1 | Oct 13 | `feat: user presence system with online users` | Section 1 (partial) | ~2 pts | ✅ Merged |
| **PR-7** | Phase 1 | Oct 14 | `feat: ui polish and production deployment` | Section 1 (partial) | ~2 pts | ✅ Merged |
| **PR-8** | Phase 2 | Oct 15 | `feat: canvas enhancements and tier-1 features` | Sections 2 & 3 | +20 pts | ⏳ Pending |
| **PR-9** | Phase 3 | Oct 16 | `feat: ai canvas agent with multi-user sync` | Section 4 | +25 pts | ⏳ Pending |
| **PR-10** | Phase 4 | Oct 17 AM | `feat: performance optimization and tier-2 features` | Sections 2, 3, 5 | +20 pts | ⏳ Pending |
| **PR-11** | Phase 5 | Oct 17 PM | `feat: final documentation and demo video` | Sections 6, 7, 8 | +15 pts | ⏳ Pending |

**Phase 1 MVP Score**: 20/105 points ✅ **COMPLETE**
**Live URL**: <https://collabcanvas-mvp-53120.web.app>
**Foundation Status**: All core collaborative infrastructure deployed and tested
**Next Step**: Begin Phase 2 (Canvas Enhancements & Tier 1 Features)

---

## 📁 **UPDATED PROJECT FILE STRUCTURE**

```
Gauntlet Project One/collabcanvas-mvp/
├── [Existing Phase 1 files...]
├── 📁 src/
│   ├── 📁 components/
│   │   ├── [Existing: Canvas, Rectangle, Circle, Text, etc.]
│   │   ├── 📄 Line.tsx                      # NEW - Phase 2
│   │   ├── 📄 Arrow.tsx                     # NEW - Phase 2
│   │   ├── 📄 ExportModal.tsx               # NEW - Phase 2
│   │   ├── 📄 ShapeStylePanel.tsx           # NEW - Phase 2
│   │   ├── 📄 ColorPaletteModal.tsx         # NEW - Phase 2
│   │   ├── 📄 LayersPanel.tsx               # NEW - Phase 4
│   │   ├── 📄 AlignmentTools.tsx            # NEW - Phase 4
│   │   └── 📄 AICommandPanel.tsx            # NEW - Phase 3
│   ├── 📁 services/
│   │   ├── [Existing: firebase, firestore, realtime]
│   │   ├── 📄 aiAgent.ts                    # NEW - Phase 3
│   │   ├── 📄 openai.ts                     # NEW - Phase 3
│   │   └── 📄 commandParser.ts              # NEW - Phase 3
│   ├── 📁 hooks/
│   │   ├── [Existing: useCanvas, useShapes, usePresence]
│   │   ├── 📄 useAIAgent.ts                 # NEW - Phase 3
│   │   ├── 📄 useCommandHistory.ts          # NEW - Phase 3
│   │   ├── 📄 useUndoRedo.ts                # NEW - Phase 2
│   │   └── 📄 useKeyboardShortcuts.ts       # NEW - Phase 2
│   ├── 📁 utils/
│   │   ├── [Existing: colors, helpers, errorMessages]
│   │   ├── 📄 export.ts                     # NEW - Phase 2
│   │   ├── 📄 alignment.ts                  # NEW - Phase 4
│   │   ├── 📄 performance.ts                # NEW - Phase 4
│   │   └── 📄 aiCommands.ts                 # NEW - Phase 3
│   └── 📁 types/
│       ├── 📄 ai.types.ts                   # NEW - Phase 3
│       └── 📄 canvas.types.ts               # NEW - Phase 2
├── 📁 Artifacts/
│   ├── [Existing docs...]
│   ├── 📄 DEMO-VIDEO-SCRIPT.md              # NEW - Phase 5
│   └── 📄 ARCHITECTURE-FINAL.md             # NEW - Phase 5
└── 📄 .env.local                            # UPDATE - Add OpenAI key
```

---

## 🚀 **PHASE 2: CANVAS FEATURES & FIGMA TOOLS** (October 15)

**Branch**: `PR8 feat/canvas-enhancements-tier1`
**Rubric Target**: Sections 2 (Canvas Features - 20 pts) & 3 (Tier 1 Features - 6 pts)
**Points Goal**: +20 points
**Duration**: 1 full day (8 hours)

### **PR-8: Canvas Enhancements & Tier 1 Features** 🎨

#### **8.1 Additional Shape Types** (90 minutes) ⏳

**Goal**: Expand from rectangles/circles/text to full shape library

- [ ] **8.1.1** Create `src/components/Line.tsx` component (20 min)
  - Import Konva Line and Transformer
  - Add selection, drag, delete functionality
  - Set default stroke width: 2px, color: #333333
  - Add points array for line coordinates

- [ ] **8.1.2** Create `src/components/Arrow.tsx` component (20 min)
  - Use Konva Arrow with arrowhead
  - Default: 2px stroke, black color, 10px pointer length
  - Add drag and rotation capabilities

- [ ] **8.1.3** Update `src/utils/helpers.ts` with new shape creators (15 min)
  - `createLineShape(x1, y1, x2, y2, userId)`
  - `createArrowShape(x1, y1, x2, y2, userId)`
  - Add shape type validation

- [ ] **8.1.4** Update `src/services/types.ts` with new shape types (10 min)
  - Add `'line' | 'arrow'` to ShapeType union
  - Add line-specific properties: `points: number[]`
  - Add arrow-specific properties: `pointerLength: number, pointerWidth: number`

- [ ] **8.1.5** Update Toolbar with Line and Arrow buttons (15 min)
  - Add SVG icons for Line and Arrow
  - Wire up creation handlers
  - Position buttons after existing shape buttons

- [ ] **8.1.6** Update Canvas.tsx to render new shape types (10 min)
  - Add conditional rendering for Line and Arrow
  - Ensure proper layering with existing shapes

**Files Modified**: 6 new/updated files
**Success Criteria**: 5+ distinct shape types (Rectangle, Circle, Text, Line, Arrow)

---

#### **8.2 Color Picker System** (75 minutes) ⏳

**Goal**: Tier 1 feature (2 points) - Advanced color selection with palettes

- [ ] **8.2.1** Create `src/components/ColorPaletteModal.tsx` (25 min)
  - Modal overlay with color grid (5 rows × 4 cols = 20 colors)
  - Include "Recent Colors" section (last 6 used)
  - Color picker input for custom colors (#hex)
  - Apply/Cancel buttons

- [ ] **8.2.2** Create `src/utils/colorPalette.ts` with color definitions (10 min)
  - Define 20 preset colors (blues, greens, reds, yellows, purples)
  - Recent colors storage in localStorage
  - Utility: `addRecentColor(color: string)`

- [ ] **8.2.3** Add color picker trigger to Toolbar (10 min)
  - "Change Color" button with current color preview
  - Opens ColorPaletteModal on click
  - Only enabled when shape selected

- [ ] **8.2.4** Integrate color updates with Firestore (15 min)
  - Update `updateShapeColor()` in useShapes hook
  - Sync color changes to all users
  - Add optimistic update for instant feedback

- [ ] **8.2.5** Add color to shape creation flow (10 min)
  - Store last-used color in state
  - Apply to newly created shapes
  - Persist preference in localStorage

- [ ] **8.2.6** Test color picker with multi-user sync (5 min)
  - Verify color changes sync across users
  - Test recent colors persistence

**Files Created**: 2 new files
**Files Modified**: 4 files
**Success Criteria**: Color picker with 20+ colors, recent colors, multi-user sync

---

#### **8.3 Undo/Redo Functionality** (105 minutes) ⏳

**Goal**: Tier 1 feature (2 points) - Full undo/redo with keyboard shortcuts

- [ ] **8.3.1** Create `src/hooks/useUndoRedo.ts` hook (35 min)
  - Action history stack (max 50 actions)
  - Redo stack for undone actions
  - Actions: CREATE, UPDATE, DELETE, MOVE, COLOR_CHANGE
  - Methods: `undo()`, `redo()`, `addAction(action)`

- [ ] **8.3.2** Define action types in `src/types/canvas.types.ts` (10 min)
  - `CanvasAction` interface with type, timestamp, data
  - `ActionType` enum
  - Serializable action data structures

- [ ] **8.3.3** Integrate undo/redo into useShapes hook (25 min)
  - Capture shape creation in action history
  - Capture shape updates (position, color, size)
  - Capture shape deletions
  - Apply inverse operations for undo

- [ ] **8.3.4** Add keyboard shortcuts (Cmd/Ctrl+Z, Cmd/Ctrl+Shift+Z) (15 min)
  - Create `src/hooks/useKeyboardShortcuts.ts`
  - Listen for keyboard events globally
  - Handle Cmd+Z (undo), Cmd+Shift+Z (redo)
  - Prevent default browser behavior

- [ ] **8.3.5** Add undo/redo buttons to Toolbar (10 min)
  - Undo button (left arrow icon)
  - Redo button (right arrow icon)
  - Disable when stacks empty
  - Show tooltip with keyboard shortcut

- [ ] **8.3.6** Handle multi-user undo conflicts (10 min)
  - Only undo user's own actions
  - Filter action history by userId
  - Show warning if trying to undo collaborative edits

**Files Created**: 3 new files
**Files Modified**: 3 files
**Success Criteria**: Undo/redo works with Cmd+Z, handles CREATE/UPDATE/DELETE

---

#### **8.4 Enhanced Keyboard Shortcuts** (60 minutes) ⏳

**Goal**: Tier 1 feature (2 points) - Professional keyboard navigation

- [ ] **8.4.1** Extend useKeyboardShortcuts hook (20 min)
  - Arrow keys: Move selected shape (10px per press)
  - Shift+Arrow: Move 50px (fast movement)
  - Cmd/Ctrl+D: Duplicate selected shape
  - Tab: Select next shape, Shift+Tab: previous
  - Cmd/Ctrl+A: Select all shapes

- [ ] **8.4.2** Add keyboard shortcut display panel (15 min)
  - Update KeyboardHelp.tsx with all shortcuts
  - Group by category: Selection, Movement, Editing, View
  - Add "Press ?" to toggle help

- [ ] **8.4.3** Implement shape duplication (15 min)
  - Create `duplicateShape()` in useShapes
  - Offset duplicate by 20px x/y
  - Maintain shape properties (color, size)
  - Sync to Firestore

- [ ] **8.4.4** Implement select all functionality (10 min)
  - Track multiple selected shapes in state
  - Update Canvas selection logic for multi-select
  - Visual feedback for multi-selection

**Files Modified**: 4 files
**Success Criteria**: 10+ keyboard shortcuts working, help panel shows all

---

#### **8.5 Multi-Select & Transform Operations** (90 minutes) ⏳

**Goal**: Advanced canvas functionality for professional use

- [ ] **8.5.1** Implement shift-click multi-select (25 min)
  - Update Canvas onClick handler
  - Track selectedShapeIds array (not single ID)
  - Visual feedback: all selected shapes highlighted

- [ ] **8.5.2** Add selection rectangle (drag-to-select) (30 min)
  - Detect mouse drag on empty canvas
  - Draw selection rectangle during drag
  - Select all shapes within rectangle bounds
  - Clear selection on click outside

- [ ] **8.5.3** Implement group move for multi-selection (20 min)
  - Move all selected shapes together
  - Maintain relative positions
  - Update Firestore for all shapes

- [ ] **8.5.4** Add resize handles for shapes (15 min)
  - Use Konva Transformer for resize
  - 8 resize handles (corners + sides)
  - Maintain aspect ratio with Shift key
  - Sync size changes to Firestore

**Files Modified**: 3 files (Canvas, useShapes, Rectangle/Circle/Text)
**Success Criteria**: Multi-select with Shift+click and drag-to-select, group operations

---

#### **8.6 Export Functionality** (75 minutes) ⏳

**Goal**: Tier 1 feature (2 points) - Export canvas as PNG/SVG

- [ ] **8.6.1** Create `src/utils/export.ts` utilities (25 min)
  - `exportCanvasAsPNG(stage: Konva.Stage, filename: string)`
  - `exportCanvasAsSVG(stage: Konva.Stage, filename: string)`
  - `exportSelectedShapesAsPNG(shapes: Shape[], filename: string)`
  - Handle canvas-to-image conversion

- [ ] **8.6.2** Create `src/components/ExportModal.tsx` (20 min)
  - Export options: Full Canvas, Selected Shapes Only
  - Format selection: PNG, SVG
  - Filename input with default
  - Quality settings for PNG (low/medium/high)
  - Download button

- [ ] **8.6.3** Add Export button to Toolbar (10 min)
  - Position in top-right corner
  - Download icon (SVG)
  - Opens ExportModal on click

- [ ] **8.6.4** Implement PNG export using toDataURL (10 min)
  - Use Konva stage.toDataURL() method
  - Create blob and trigger download
  - Handle errors (canvas too large, etc.)

- [ ] **8.6.5** Implement SVG export (optional) (10 min)
  - Convert Konva shapes to SVG elements
  - Generate SVG file with proper viewBox
  - Trigger download with blob

**Files Created**: 2 new files
**Files Modified**: 2 files
**Success Criteria**: Export full canvas and selected shapes as PNG

---

#### **8.7 Text Formatting Enhancements** (45 minutes) ⏳

**Goal**: Professional text editing capabilities

- [ ] **8.7.1** Add text formatting toolbar (20 min)
  - Appears when text shape selected
  - Font size dropdown (12, 14, 16, 18, 24, 32, 48)
  - Bold, Italic buttons
  - Text alignment (left, center, right)

- [ ] **8.7.2** Update Text.tsx component with formatting (15 min)
  - Apply fontStyle: 'bold', 'italic'
  - Apply fontSize from state
  - Apply align property
  - Sync formatting changes to Firestore

- [ ] **8.7.3** Add font family selector (10 min)
  - Dropdown with 5 fonts: Arial, Helvetica, Courier, Georgia, Verdana
  - Apply to selected text shape
  - Persist in shape data

**Files Modified**: 2 files (Text.tsx, Toolbar.tsx)
**Success Criteria**: Text with font size, bold, italic, alignment options

---

#### **8.8 Performance Optimization (Phase 2)** (60 minutes) ⏳

**Goal**: Ensure smooth performance with 300+ objects

- [ ] **8.8.1** Implement viewport culling (25 min)
  - Create `src/utils/performance.ts`
  - Function: `getVisibleShapes(allShapes, viewport)`
  - Only render shapes within visible viewport + buffer
  - Update Canvas rendering logic

- [ ] **8.8.2** Optimize Firestore listeners (15 min)
  - Batch shape updates (debounce 100ms)
  - Use onSnapshot with query limits if needed
  - Optimize security rules for read performance

- [ ] **8.8.3** Add shape count indicator (10 min)
  - Display in Toolbar: "Shapes: 125/500"
  - Warning when approaching 300 shapes

- [ ] **8.8.4** Test with 300+ shapes (10 min)
  - Create test script to generate shapes
  - Verify 60 FPS maintained
  - Test with 4-5 concurrent users

**Files Created**: 1 new file
**Files Modified**: 3 files
**Success Criteria**: 300+ objects at 60 FPS, viewport culling working

---

#### **8.9 Phase 2 Integration & Testing** (90 minutes) ⏳

**Goal**: Ensure all Phase 2 features work together

- [ ] **8.9.1** Integration testing: All shape types (15 min)
  - Create, move, delete each shape type
  - Verify multi-user sync for all shapes
  - Test color picker on all shape types

- [ ] **8.9.2** Integration testing: Undo/redo (15 min)
  - Test undo/redo with CREATE/UPDATE/DELETE actions
  - Verify multi-user undo isolation
  - Test redo after multiple undos

- [ ] **8.9.3** Integration testing: Keyboard shortcuts (10 min)
  - Test all 10+ keyboard shortcuts
  - Verify no conflicts with browser shortcuts
  - Test help panel toggle (? key)

- [ ] **8.9.4** Integration testing: Multi-select (15 min)
  - Shift-click multiple shapes
  - Drag-to-select with rectangle
  - Group move selected shapes
  - Test with 10+ shapes selected

- [ ] **8.9.5** Integration testing: Export functionality (10 min)
  - Export full canvas as PNG
  - Export selected shapes as PNG
  - Verify image quality and accuracy

- [ ] **8.9.6** Multi-user testing (4-5 users) (15 min)
  - Open 5 browser tabs with different users
  - Test concurrent shape creation
  - Verify color picker sync
  - Test undo/redo isolation

- [ ] **8.9.7** Performance testing (10 min)
  - Create 300+ shapes
  - Verify 60 FPS maintained
  - Test with 5 concurrent users

**Success Criteria**: All Phase 2 features working together, 300+ shapes at 60 FPS

---

### **Phase 2 Success Criteria** ✅

**Rubric Alignment - Section 2 (Canvas Features - 20 points)**:

- [ ] 3+ shape types beyond rectangles (Line, Arrow) ✓
- [ ] Text with formatting (size, bold, italic, alignment) ✓
- [ ] Multi-select (shift-click and drag-to-select) ✓
- [ ] Transform operations (move, resize, rotate) ✓
- [ ] Smooth pan/zoom ✓ (already implemented)
- [ ] Export functionality (PNG) ✓
- [ ] Performance: 300+ objects at 60 FPS ✓
- [ ] Supports 4-5 concurrent users ✓

**Rubric Alignment - Section 3 Tier 1 (6 points)**:

- [ ] Color picker with recent colors and saved palettes (2 pts) ✓
- [ ] Undo/redo with keyboard shortcuts (Cmd+Z/Cmd+Shift+Z) (2 pts) ✓
- [ ] Keyboard shortcuts for common operations (Delete, Duplicate, Arrows) (2 pts) ✓

**Target Score**: 18-20 points (Excellent tier)
**Deployment**: Stage environment for Phase 3 work

---

## 🤖 **PHASE 3: AI CANVAS AGENT** (October 16)

**Branch**: `PR9 feat/ai-canvas-agent`
**Rubric Target**: Section 4 (AI Canvas Agent - 25 points - HIGHEST VALUE)
**Points Goal**: +25 points
**Duration**: 1 full day (8 hours)

### **PR-9: AI Canvas Agent Implementation** 🧠

#### **9.1 AI Service Setup & Configuration - Tool Calling Approach** (45 minutes) ⏳

**Goal**: Integrate OpenAI SDK with Tool Calling for structured canvas commands

**Hybrid Strategy**: Phase 3 uses direct OpenAI SDK (fast/simple), Phase 5 adds LangSmith (observability)

- [ ] **9.1.1** Obtain OpenAI API key and configure environment (10 min)
  - Create OpenAI account at platform.openai.com
  - Generate API key with billing enabled ($15-20 budget)
  - Add to `.env.local`: `VITE_OPENAI_API_KEY=sk-...`
  - Choose model: `gpt-4o-mini` (speed + cost) or `gpt-4-turbo` (complex commands)

- [ ] **9.1.2** Install OpenAI SDK (5 min)

  ```bash
  npm install openai@latest
  ```

  - Verify installation: check package.json
  - Test import in a component

- [ ] **9.1.3** Create `src/services/openai.ts` with tool calling setup (20 min)
  - Initialize OpenAI client with `dangerouslyAllowBrowser: true` (Phase 3 only)
  - Function: `executeAICommand(userInput: string): Promise<CommandResult>`
  - Use `chat.completions.create()` with `tools` parameter
  - Handle API errors with try/catch
  - Add retry logic (3 attempts with exponential backoff)

- [ ] **9.1.4** Define AI types in `src/types/ai.types.ts` (10 min)

  ```typescript
  interface ToolCallResult {
    function: string; // tool name
    arguments: Record<string, any>; // parsed arguments
    responseTime: number;
    usage?: any; // token usage
  }

  interface CommandResult {
    success: boolean;
    shapesCreated?: string[]; // IDs of created shapes
    error?: string;
  }
  ```

**Files Created**: 2 new files
**Dependencies Added**: `openai@latest` (3MB)
**Success Criteria**: OpenAI client initialized, test API call successful

---

#### **9.2 Define Canvas Tools as Function Schemas** (90 minutes) ⏳

**Goal**: Define 8+ canvas tools for OpenAI Tool Calling (from AI School Week 3.1 pattern)

- [ ] **9.2.1** Create tool definitions in `src/utils/aiCommands.ts` (60 min)

  **Tool Schema Structure** (OpenAI Tool Calling format):

  ```typescript
  const CANVAS_TOOLS: OpenAI.Chat.ChatCompletionTool[] = [
    {
      type: "function",
      function: {
        name: "create_shape",
        description: "Creates a new shape on the canvas",
        parameters: {
          type: "object",
          properties: {
            shape: { type: "string", enum: ["rectangle", "circle", "text", "line", "arrow"] },
            color: { type: "string", description: "Color name or hex code" },
            x: { type: "number" },
            y: { type: "number" }
          },
          required: ["shape", "color"]
        }
      }
    }
    // ... 7+ more tools
  ];
  ```

  **Define 8+ Tools** (minimum 2 per category):

  **Creation Tools (3)**:
  1. `create_shape` - Create rectangle/circle/text/line/arrow with color
  2. `create_text` - Create text shape with content and formatting
  3. `create_sized_shape` - Create shape with specific dimensions

  **Manipulation Tools (3)**:
  4. `move_shape` - Move shape to position or direction
  5. `resize_shape` - Change shape size (exact or multiplier)
  6. `change_color` - Update shape fill color

  **Layout Tools (3)**:
  7. `arrange_shapes` - Arrange in horizontal/vertical/grid pattern
  8. `distribute_shapes` - Space shapes evenly
  9. `align_shapes` - Align shapes (left/right/center/top/bottom)

  **Complex Tools (3)**:
  10. `create_login_form` - Multi-element login form layout
  11. `create_navbar` - Navigation bar with N items
  12. `create_card` - Card layout with title and content

- [ ] **9.2.2** Create tool execution handlers in `src/services/aiAgent.ts` (30 min)
  - Function: `executeToolCall(toolName: string, args: any): Promise<CommandResult>`
  - Switch based on tool name
  - Call useShapes hooks to create/modify shapes
  - Return array of created/modified shape IDs
  - Handle errors gracefully (invalid args, missing shapes, etc.)

**Files Created**: 2 new files
**Success Criteria**: 8-12 tool schemas defined, execution routing working

---

#### **9.3 AI Command Panel UI** (75 minutes) ⏳

**Goal**: User interface for AI interaction

- [ ] **9.3.1** Create `src/components/AICommandPanel.tsx` (30 min)
  - Floating panel in bottom-right corner
  - Text input for natural language commands
  - "Execute" button with AI icon
  - Command history display (last 5 commands)
  - Status indicator: Idle, Processing, Success, Error

- [ ] **9.3.2** Add command suggestions/examples (15 min)
  - Dropdown with example commands
  - Categories: Create, Move, Arrange, Complex
  - Click to populate input field

- [ ] **9.3.3** Add loading state and error handling (15 min)
  - Show spinner during AI processing
  - Display error messages (API failure, invalid command)
  - Success feedback with toast notification

- [ ] **9.3.4** Style AI panel with Tailwind (15 min)
  - Modern gradient design matching app theme
  - Smooth animations (slide-up, fade-in)
  - Responsive width (400px desktop, full-width mobile)

**Files Created**: 1 new file
**Files Modified**: 1 file (App.tsx to include panel)
**Success Criteria**: AI panel accepts input, shows loading/error states

---

#### **9.4 Integrate Tool Calling with Canvas Hooks** (90 minutes) ⏳

**Goal**: Connect OpenAI tool calls to canvas operations with multi-user sync

- [ ] **9.4.1** Create `src/hooks/useAIAgent.ts` hook (35 min)
  - State: `commandInput`, `isProcessing`, `commandHistory`, `lastResult`
  - Function: `executeAICommand(input: string): Promise<CommandResult>`
  - Flow:
    1. Call `openai.chat.completions.create()` with CANVAS_TOOLS
    2. Extract tool_calls from response
    3. Parse tool name and arguments
    4. Call `executeToolCall()` to perform canvas operation
    5. Update Firestore via useShapes hook
    6. Return success/error result
  - Add to command history (localStorage)
  - Track response time and token usage

- [ ] **9.4.2** Wire tool execution to useShapes hook (25 min)
  - Import useShapes hook in aiAgent.ts
  - Tool execution calls:
    - `create_shape` → `addShape()`
    - `move_shape` → `updateShape()`
    - `change_color` → `updateShape()`
    - `create_login_form` → multiple `addShape()` calls
  - All operations go through Firestore (automatic multi-user sync)
  - Add metadata to shapes: `createdBy: 'ai', aiCommand: userInput, aiGeneratedAt: timestamp`

- [ ] **9.4.3** Add AI command result feedback (15 min)
  - Success: Toast notification with shapes created count
  - Error: Toast with error message and retry button
  - Loading: Spinner in AI panel during API call
  - Response time display: "Executed in 1.8s"

- [ ] **9.4.4** Handle concurrent AI commands (10 min)
  - Allow multiple users to issue commands simultaneously
  - Firestore handles conflict resolution (last-write-wins)
  - Show user attribution: "John created via AI command"

- [ ] **9.4.5** Test multi-user tool calling sync (5 min)
  - Open 3 browser tabs with different users
  - Execute "Create a red circle" in tab 1
  - Verify circle appears in tabs 2 & 3 via Firestore sync
  - Test complex command: "Create login form"

**Files Created**: 1 new file (useAIAgent.ts)
**Files Modified**: 2 files (aiAgent.ts, useShapes.ts)
**Success Criteria**: Tool calls execute and sync to all users in <2 seconds

---

#### **9.5 Test Creation Tools** (40 minutes) ⏳

**Goal**: Verify 3+ creation tools execute correctly (tools defined in 9.2.1)

- [ ] **9.5.1** Test `create_shape` tool (15 min)
  - Input: "Create a red circle"
  - Expected: LLM calls create_shape with {shape: "circle", color: "red"}
  - Verify: Circle appears on canvas at default position
  - Test variations: "Make a blue rectangle", "Add a green line"

- [ ] **9.5.2** Test `create_text` tool (10 min)
  - Input: "Add text that says Hello World"
  - Expected: LLM calls create_text with {content: "Hello World"}
  - Verify: Text appears on canvas
  - Test formatting: "Create large bold text saying Title"

- [ ] **9.5.3** Test `create_sized_shape` tool (10 min)
  - Input: "Make a 200x100 rectangle"
  - Expected: LLM calls create_sized_shape with {shape: "rectangle", width: 200, height: 100}
  - Verify: Correctly sized shape created

- [ ] **9.5.4** Test multi-user creation sync (5 min)
  - User 1 issues creation command
  - Verify User 2 and 3 see new shape immediately
  - Check metadata shows createdBy: 'ai'

**Tools Tested**: 3 creation tools
**Success Criteria**: Natural language → Tool call → Shape creation working

---

#### **9.6 Test Manipulation Tools** (40 minutes) ⏳

**Goal**: Verify 3+ manipulation tools execute correctly

- [ ] **9.6.1** Test `move_shape` tool (15 min)
  - Create a blue circle first
  - Input: "Move the blue circle to the center"
  - Expected: LLM calls move_shape with {shapeSelector: "blue circle", position: "center"}
  - Verify: Shape moves to canvas center
  - Test: "Move it up 100 pixels", "Move to position 500, 300"

- [ ] **9.6.2** Test `resize_shape` tool (10 min)
  - Input: "Make the circle twice as big"
  - Expected: LLM calls resize_shape with {multiplier: 2}
  - Verify: Shape doubles in size
  - Test: "Resize to 150x150"

- [ ] **9.6.3** Test `change_color` tool (10 min)
  - Input: "Change the circle color to red"
  - Expected: LLM calls change_color with {color: "red"}
  - Verify: Fill color updates
  - Test: "Make it blue", "Change to #FF5733"

- [ ] **9.6.4** Test multi-user manipulation sync (5 min)
  - User 1 moves a shape via AI
  - Verify Users 2 & 3 see updated position
  - Check lastModifiedBy metadata

**Tools Tested**: 3+ manipulation tools
**Success Criteria**: AI successfully modifies existing shapes

---

#### **9.7 Test Layout Tools** (45 minutes) ⏳

**Goal**: Verify 3+ layout tools execute correctly

- [ ] **9.7.1** Test `arrange_shapes` tool (15 min)
  - Create 5 circles manually
  - Input: "Arrange these shapes in a horizontal row"
  - Expected: LLM calls arrange_shapes with {layout: "horizontal"}
  - Verify: Shapes evenly spaced horizontally
  - Test: "Arrange in a vertical column", "Create a grid layout"

- [ ] **9.7.2** Test `distribute_shapes` tool (15 min)
  - Create 4 shapes with uneven spacing
  - Input: "Space these elements evenly"
  - Expected: LLM calls distribute_shapes
  - Verify: Equal gaps between shapes
  - Test: "Distribute horizontally", "Distribute vertically"

- [ ] **9.7.3** Test `align_shapes` tool (10 min)
  - Create 3 shapes at different heights
  - Input: "Align these shapes to the left"
  - Expected: LLM calls align_shapes with {alignment: "left"}
  - Verify: All shapes have same x-coordinate
  - Test: "Align to center", "Align to top"

- [ ] **9.7.4** Test multi-user layout sync (5 min)
  - User 1 arranges shapes via AI
  - Verify all users see updated positions
  - Test with 5+ shapes

**Tools Tested**: 3 layout tools
**Success Criteria**: AI successfully arranges multiple shapes

---

#### **9.8 Test Complex Tools** (60 minutes) ⏳

**Goal**: Verify 3+ complex tools create multi-element layouts (highest rubric value)

- [ ] **9.8.1** Test `create_login_form` tool (20 min)
  - Input: "Create a login form"
  - Expected: LLM calls create_login_form with default parameters
  - Verify multi-element creation:
    - Text: "Username" label
    - Rectangle: username input field
    - Text: "Password" label
    - Rectangle: password input field
    - Rectangle: "Login" button
  - Check proper positioning (vertical stack with spacing)
  - Verify all 5 elements sync to all users

- [ ] **9.8.2** Test `create_navbar` tool (20 min)
  - Input: "Build a navigation bar with 4 menu items"
  - Expected: LLM calls create_navbar with {itemCount: 4}
  - Verify multi-element creation:
    - Rectangle: navbar background
    - 4 Text items: "Home", "About", "Services", "Contact"
  - Check even horizontal spacing
  - Verify positioned at top of canvas
  - Test with different item counts: "navbar with 6 items"

- [ ] **9.8.3** Test `create_card` tool (15 min)
  - Input: "Make a card layout with title and description"
  - Expected: LLM calls create_card
  - Verify multi-element creation:
    - Rectangle: card background
    - Text: "Title" (bold, large)
    - Text: "Description" (smaller)
  - Check proper layering and spacing
  - Test custom content: "Create a card titled Welcome"

- [ ] **9.8.4** Test complex command accuracy (5 min)
  - Verify rubric requirement: 3+ elements properly arranged
  - Test smart positioning and styling
  - Check all users see complete layouts

**Tools Tested**: 3 complex tools
**Success Criteria**: Complex commands create 3+ properly arranged elements (8 points in rubric)

---

#### **9.9 AI Performance Optimization - Hybrid Approach** (45 minutes) ⏳

**Goal**: Achieve sub-2 second responses with 90%+ accuracy (7 rubric points)

- [ ] **9.9.1** Choose optimal model for speed (10 min)
  - **Recommended**: `gpt-4o-mini` (faster, cheaper, ~1-2s response)
  - Alternative: `gpt-4-turbo` for complex commands if needed
  - Update model in openai.ts service
  - Test response times: aim for <2s average

- [ ] **9.9.2** Optimize tool schemas for speed (10 min)
  - Keep tool descriptions concise (reduce token count)
  - Use clear, specific parameter names
  - Limit number of parameters per tool
  - Test: faster LLM selection of tools

- [ ] **9.9.3** Implement command caching (15 min)
  - Cache in localStorage: `{command: string, toolCall: object, timestamp}`
  - Exact match bypass (instant response)
  - Cache expiry: 1 hour
  - Show "From cache" indicator in UI
  - Reduces API costs by 30-50%

- [ ] **9.9.4** Add response time tracking (10 min)
  - Track each command execution time
  - Display in AI panel: "Executed in 1.8s"
  - Log to console for debugging
  - Calculate 90th percentile (target: <2s)
  - Simple monitoring (LangSmith tracing added in Phase 5)

**Files Modified**: 2 files (openai.ts, useAIAgent.ts)
**Success Criteria**: 90% of commands <2 seconds, caching reduces repeated calls

---

#### **9.10 Command History & Preview** (45 minutes) ⏳

**Goal**: Enhanced AI UX features

- [ ] **9.10.1** Create `src/hooks/useCommandHistory.ts` (20 min)
  - Store last 20 commands in localStorage
  - Track command, timestamp, result (success/error)
  - Methods: `addCommand()`, `getHistory()`, `clearHistory()`

- [ ] **9.10.2** Add command history display to AI panel (15 min)
  - Scrollable list of past commands
  - Click to re-execute command
  - Visual indicators: success (green), error (red)

- [ ] **9.10.3** Add command preview/confirmation (optional) (10 min)
  - Show predicted action before execution
  - "Execute" or "Cancel" buttons
  - Preview what shapes will be created

**Files Created**: 1 new file
**Files Modified**: 1 file
**Success Criteria**: Command history stored and displayed

---

#### **9.11 Phase 3 Integration & Testing** (90 minutes) ⏳

**Goal**: Comprehensive AI agent testing

- [ ] **9.11.1** Test all 8+ command types (20 min)
  - Execute each command category
  - Verify correct shape creation/manipulation
  - Test natural language variations

- [ ] **9.11.2** Test multi-user AI collaboration (20 min)
  - Open 3 browser tabs
  - Execute AI commands from different users
  - Verify shapes sync to all users
  - Test concurrent command execution

- [ ] **9.11.3** Performance testing (15 min)
  - Measure response times for 20 commands
  - Verify 90% execute in <2 seconds
  - Test under API rate limits

- [ ] **9.11.4** Accuracy testing (15 min)
  - Test 20 varied commands
  - Track success rate (target: 90%+)
  - Document common failure patterns

- [ ] **9.11.5** Edge case testing (10 min)
  - Test ambiguous commands
  - Test invalid parameters
  - Test commands with no shapes selected
  - Test API error scenarios

- [ ] **9.11.6** Complex command validation (10 min)
  - Test login form creation
  - Test navigation bar with different item counts
  - Verify proper element positioning

**Success Criteria**: All command types working, 90%+ accuracy, <2s response time

---

### **Phase 3 Success Criteria** ✅

**Rubric Alignment - Section 4 (AI Canvas Agent - 25 points)**:

**Command Breadth & Capability (10 points)**:

- [ ] 8+ distinct command types ✓
- [ ] Covers all categories: creation (3+), manipulation (3+), layout (3+), complex (3+) ✓
- [ ] Commands are diverse and meaningful ✓

**Complex Command Execution (8 points)**:

- [ ] "Create login form" produces 3+ properly arranged elements ✓
- [ ] Complex layouts execute multi-step plans correctly ✓
- [ ] Smart positioning and styling ✓
- [ ] Handles ambiguity well ✓

**AI Performance & Reliability (7 points)**:

- [ ] Sub-2 second responses (90%+ of commands) ✓
- [ ] 90%+ accuracy ✓
- [ ] Natural UX with feedback (loading, success, error) ✓
- [ ] Shared state works flawlessly (all users see AI creations) ✓
- [ ] Multiple users can use AI simultaneously ✓

**Target Score**: 23-25 points (Excellent tier)
**Deployment**: Stage environment with AI features enabled

---

## ⚡ **PHASE 4: PERFORMANCE OPTIMIZATION & POLISH** (October 17 Morning)

**Branch**: `PR10 feat/performance-tier2`
**Rubric Target**: Sections 2 (Performance), 3 (Tier 2), 5 (Technical Implementation)
**Points Goal**: +20 points
**Duration**: 4 hours (half day)

### **PR-10: Performance & Tier 2 Features** 🚀

#### **10.1 Advanced Performance Optimization** (75 minutes) ⏳

**Goal**: Achieve 500+ objects at 60 FPS (Excellent tier)

- [ ] **10.1.1** Implement advanced viewport culling (25 min)
  - Enhance existing culling with spatial indexing
  - Use quadtree for efficient spatial queries
  - Only render shapes in viewport + 500px buffer
  - Update on pan/zoom

- [ ] **10.1.2** Implement shape pooling/recycling (20 min)
  - Reuse Konva shape instances
  - Pool for each shape type
  - Reduce garbage collection overhead

- [ ] **10.1.3** Optimize Firestore batching (15 min)
  - Batch multiple shape updates (100ms window)
  - Use Firestore writeBatch for bulk operations
  - Reduce number of writes

- [ ] **10.1.4** Add performance monitoring (15 min)
  - Track FPS in real-time
  - Monitor render time per frame
  - Display performance stats in debug panel
  - Log performance warnings

**Files Modified**: 4 files
**Success Criteria**: 500+ objects at consistent 60 FPS

---

#### **10.2 Tier 2 Feature: Layers Panel** (90 minutes) ⏳

**Goal**: Tier 2 feature (3 points) - Professional layer management

- [ ] **10.2.1** Create `src/components/LayersPanel.tsx` (40 min)
  - Right sidebar panel (300px width)
  - List all canvas shapes with icons and names
  - Drag-to-reorder functionality (react-beautiful-dnd or native)
  - Show/hide toggle per shape (eye icon)
  - Lock/unlock toggle per shape (lock icon)
  - Hierarchical display (future: groups)

- [ ] **10.2.2** Implement z-index management (25 min)
  - Add zIndex property to Shape interface
  - Update Firestore schema
  - Reorder shapes in Canvas based on zIndex
  - Sync z-index changes across users

- [ ] **10.2.3** Implement show/hide functionality (15 min)
  - Add visible property to Shape interface
  - Filter visible shapes in Canvas rendering
  - Sync visibility state to Firestore

- [ ] **10.2.4** Implement lock/unlock functionality (10 min)
  - Add locked property to Shape interface
  - Disable drag/edit for locked shapes
  - Visual indicator on locked shapes

**Files Created**: 1 new file
**Files Modified**: 4 files
**Success Criteria**: Layers panel shows all shapes, drag-to-reorder changes z-index

---

#### **10.3 Tier 2 Feature: Alignment Tools** (75 minutes) ⏳

**Goal**: Tier 2 feature (3 points) - Professional alignment capabilities

- [ ] **10.3.1** Create `src/components/AlignmentTools.tsx` (25 min)
  - Toolbar section with 9 alignment buttons
  - Align Left, Center, Right (horizontal)
  - Align Top, Middle, Bottom (vertical)
  - Distribute Horizontally, Distribute Vertically
  - Align to Canvas Center
  - Icons for each button

- [ ] **10.3.2** Create `src/utils/alignment.ts` utilities (35 min)
  - `alignLeft(shapes: Shape[])`
  - `alignCenter(shapes: Shape[])`
  - `alignRight(shapes: Shape[])`
  - `alignTop(shapes: Shape[])`
  - `alignMiddle(shapes: Shape[])`
  - `alignBottom(shapes: Shape[])`
  - `distributeHorizontally(shapes: Shape[])`
  - `distributeVertically(shapes: Shape[])`
  - `alignToCanvasCenter(shapes: Shape[])`

- [ ] **10.3.3** Integrate alignment tools with Canvas (15 min)
  - Add AlignmentTools to Toolbar
  - Enable only when 2+ shapes selected
  - Apply alignment and update Firestore
  - Sync aligned positions across users

**Files Created**: 2 new files
**Files Modified**: 2 files
**Success Criteria**: 9 alignment operations working on multi-selected shapes

---

#### **10.4 Real-Time Sync Optimization** (60 minutes) ⏳

**Goal**: Achieve <100ms object sync, <50ms cursor sync (Excellent tier)

- [ ] **10.4.1** Optimize Firestore sync latency (20 min)
  - Use Firestore cache more aggressively
  - Implement optimistic updates everywhere
  - Reduce listener scope with queries
  - Upgrade Firestore SDK if needed

- [ ] **10.4.2** Optimize cursor tracking (15 min)
  - Reduce throttle to 50ms (from 100ms)
  - Use Realtime Database priority/timestamps
  - Implement cursor interpolation for smoothness

- [ ] **10.4.3** Add sync latency monitoring (15 min)
  - Measure time from action → Firestore → other users
  - Display sync latency in debug panel
  - Track 95th percentile latency

- [ ] **10.4.4** Test sync performance (10 min)
  - Measure object sync latency (target: <100ms)
  - Measure cursor sync latency (target: <50ms)
  - Test with 5+ concurrent users

**Files Modified**: 3 files
**Success Criteria**: <100ms object sync, <50ms cursor sync confirmed

---

#### **10.5 Conflict Resolution Enhancement** (45 minutes) ⏳

**Goal**: Excellent conflict resolution (9 points in rubric)

- [ ] **10.5.1** Enhance object locking system (20 min)
  - Visual feedback: locked shapes show user name
  - Lock timeout: 30 seconds
  - Auto-release on user disconnect
  - Queue lock requests

- [ ] **10.5.2** Add last-write-wins strategy documentation (10 min)
  - Document conflict resolution approach
  - Add comments in code explaining strategy
  - Create ARCHITECTURE.md with strategy details

- [ ] **10.5.3** Test conflict scenarios (15 min)
  - Simultaneous drag attempts
  - Rapid edit storm (3 users editing same shape)
  - Delete vs Edit scenario
  - Create collision (identical timestamps)

**Files Modified**: 3 files
**Success Criteria**: Simultaneous edits resolve correctly 90%+ of time

---

#### **10.6 Code Quality & Architecture** (60 minutes) ⏳

**Goal**: Rubric Section 5 (Technical Implementation - 10 points)

- [ ] **10.6.1** Code refactoring for clean architecture (25 min)
  - Consolidate duplicate code
  - Extract reusable utilities
  - Improve component modularity
  - Apply DRY principle

- [ ] **10.6.2** Add comprehensive error handling (15 min)
  - Wrap all async operations in try/catch
  - User-friendly error messages
  - Log errors to console (or error tracking service)
  - Graceful degradation for service failures

- [ ] **10.6.3** Add code comments and documentation (10 min)
  - JSDoc comments for all public functions
  - Inline comments for complex logic
  - README updates for new features

- [ ] **10.6.4** Security audit (10 min)
  - Review Firestore security rules
  - Ensure no exposed API keys in code
  - Validate user inputs
  - Add rate limiting for AI commands

**Files Modified**: 10+ files
**Success Criteria**: Clean, well-organized code with proper error handling

---

#### **10.7 Phase 4 Testing & Validation** (75 minutes) ⏳

**Goal**: Comprehensive testing before final phase

- [ ] **10.7.1** Performance validation (20 min)
  - Create 500+ shapes
  - Verify 60 FPS maintained
  - Test with 5+ concurrent users
  - Monitor memory usage

- [ ] **10.7.2** Layers panel testing (15 min)
  - Test drag-to-reorder z-index
  - Test show/hide functionality
  - Test lock/unlock functionality
  - Verify multi-user sync

- [ ] **10.7.3** Alignment tools testing (15 min)
  - Test all 9 alignment operations
  - Test with various shape selections
  - Verify multi-user sync

- [ ] **10.7.4** Sync latency testing (15 min)
  - Measure object sync times (50 operations)
  - Measure cursor sync times (100 movements)
  - Verify <100ms/<50ms targets

- [ ] **10.7.5** Conflict resolution testing (10 min)
  - Test simultaneous edit scenarios
  - Verify consistent final state
  - Check for ghost objects

**Success Criteria**: All Phase 4 features working, performance targets met

---

### **Phase 4 Success Criteria** ✅

**Rubric Alignment - Section 2 (Performance - 12 points)**:

- [ ] Consistent performance with 500+ objects ✓
- [ ] Supports 5+ concurrent users ✓
- [ ] No degradation under load ✓
- [ ] Smooth interactions at scale ✓

**Rubric Alignment - Section 3 Tier 2 (6 points)**:

- [ ] Layers panel with drag-to-reorder and hierarchy (3 pts) ✓
- [ ] Alignment tools (align left/right/center, distribute evenly) (3 pts) ✓

**Rubric Alignment - Section 1 (Sync - 12 points)**:

- [ ] Sub-100ms object sync ✓
- [ ] Sub-50ms cursor sync ✓
- [ ] Zero visible lag during rapid multi-user edits ✓

**Rubric Alignment - Section 5 (Technical Implementation - 10 points)**:

- [ ] Clean, well-organized code ✓
- [ ] Clear separation of concerns ✓
- [ ] Proper error handling ✓
- [ ] Robust authentication ✓

**Target Score**: 18-20 points (Excellent tier)
**Deployment**: Pre-production environment ready for final documentation

---

## 📚 **PHASE 5: FINAL DOCUMENTATION & SUBMISSION** (October 17 Afternoon)

**Branch**: `PR11 feat/final-submission`
**Rubric Target**: Sections 6 (Documentation - 5 pts), 7 (AI Dev Log - Pass/Fail), 8 (Demo Video - Pass/Fail)
**Points Goal**: +15 points + Bonus
**Duration**: 4 hours (half day)

### **PR-11: Documentation & Demo Video** 📋

#### **11.1 Add LangSmith Observability - Hybrid Approach Enhancement** (30 minutes) ⏳

**Goal**: Wrap OpenAI client with LangSmith for production monitoring (+2 bonus points)

**Hybrid Strategy Benefit**: Add professional observability without changing Phase 3 code

- [ ] **11.1.1** Install LangSmith (5 min)

  ```bash
  npm install langsmith
  ```

  - Verify installation in package.json
  - Check bundle size increase (~2MB)

- [ ] **11.1.2** Configure LangSmith environment (5 min)
  - Create account at smith.langchain.com
  - Generate API key in Settings
  - Add to `.env.local`:

    ```
    LANGCHAIN_TRACING_V2=true
    LANGCHAIN_API_KEY=<your-langsmith-key>
    LANGCHAIN_PROJECT=collabcanvas-ai-agent
    ```

- [ ] **11.1.3** Wrap OpenAI client with LangSmith (10 min)
  - Update `src/services/openai.ts`:

    ```typescript
    import { wrapOpenAI } from 'langsmith/wrappers';
    import OpenAI from 'openai';

    const baseClient = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });

    // Wrap for automatic tracing - that's it!
    const client = wrapOpenAI(baseClient);

    // All existing tool calling code stays exactly the same
    ```

  - No changes to tool definitions or command execution
  - Test: execute AI command, verify trace appears in LangSmith dashboard

- [ ] **11.1.4** Test LangSmith dashboard (5 min)
  - Execute 5-10 AI commands
  - View traces in LangSmith dashboard
  - Verify metrics captured:
    - Response times (target: <2s shown in green)
    - Token usage and costs
    - Tool calls and arguments
    - Success/error status
  - Take screenshots for demo video

- [ ] **11.1.5** Prepare LangSmith demo footage (5 min)
  - Open LangSmith dashboard in separate browser window
  - Execute demo commands while recording
  - Capture: trace details, cost analysis, performance metrics
  - Highlight: professional monitoring for production readiness

**Files Modified**: 1 file (openai.ts - 5 lines added)
**Dependencies Added**: `langsmith` (~2MB)
**Success Criteria**: Automatic tracing working, dashboard shows all AI interactions
**Bonus Impact**: +2 points for production-grade observability

---

#### **11.2 Comprehensive README Update** (60 minutes) ⏳

**Goal**: Rubric Section 6 (Repository & Setup - 3 points)

- [ ] **11.2.1** Update project description (10 min)
  - Overview of CollabCanvas with AI agent
  - Key features and capabilities
  - Highlight hybrid approach (OpenAI + LangSmith)
  - Live demo URL
  - Screenshots of main features

- [ ] **11.2.2** Write detailed setup instructions (20 min)
  - Prerequisites (Node.js version, npm)
  - Step-by-step installation
  - Environment variables (.env.local template with LangSmith)
  - Firebase project setup guide
  - OpenAI API key setup
  - LangSmith API key setup (optional for observability)
  - Running locally: `npm install && npm run dev`

- [ ] **11.2.3** Document all features (15 min)
  - Section for each phase's features
  - Screenshots/GIFs for key features
  - AI command examples with results
  - Tool calling examples
  - Keyboard shortcuts reference table

- [ ] **11.2.4** Add architecture overview (10 min)
  - System architecture diagram (Mermaid)
  - Technology stack list
  - Firebase services integration
  - Hybrid AI architecture (OpenAI Tool Calling + LangSmith)

- [ ] **11.2.5** Add API documentation (5 min)
  - Firestore schema
  - Realtime Database structure
  - AI tool schemas (8+ tools defined)
  - Available commands reference

**Files Modified**: 1 file (README.md)
**Success Criteria**: Professional README with clear setup guide including LangSmith

---

#### **11.3 Architecture Documentation** (45 minutes) ⏳

**Goal**: Detailed technical documentation

- [ ] **11.3.1** Create `ARCHITECTURE-FINAL.md` (30 min)
  - System architecture diagram (Mermaid)
  - Component hierarchy
  - Data flow diagrams
  - Real-time sync strategy
  - Conflict resolution approach
  - **Hybrid AI architecture**: OpenAI Tool Calling (Phase 3) + LangSmith (Phase 5)
  - Security model

- [ ] **11.3.2** Create component documentation (15 min)
  - Document each major component
  - Props, state, and behavior
  - Key design decisions (especially hybrid approach rationale)
  - Future improvements

**Files Created**: 1 new file
**Success Criteria**: Clear technical documentation including hybrid approach explanation

---

#### **11.4 AI Development Log** (30 minutes) ⏳

**Goal**: Rubric Section 7 (REQUIRED - Pass/Fail) - Already partially complete

- [ ] **11.4.1** Review existing AI-Development-Log.md (5 min)
  - Check all 5 required sections present
  - Ensure meaningful reflection
  - Verify 3/5 sections minimum

- [ ] **11.4.2** Update log with Phases 2-5 insights (15 min)
  - Add Phase 2-5 prompting strategies
  - Update code analysis percentages
  - **Document hybrid approach decision** (OpenAI vs LangChain evaluation)
  - Document AI agent development challenges with tool calling
  - Add learnings from rubric-driven development

- [ ] **11.4.3** Add final metrics and reflections (10 min)
  - Total LOC generated
  - Time savings with AI assistance
  - Most effective prompts (especially for tool calling setup)
  - **Hybrid approach learnings**: Phase 3 speed vs Phase 5 polish
  - Key learnings for future projects

**Files Modified**: 1 file (AI-Development-Log.md)
**Success Criteria**: 3/5 sections complete with meaningful content including hybrid approach rationale

---

#### **11.5 Demo Video Script & Planning** (45 minutes) ⏳

**Goal**: Plan for Rubric Section 8 (REQUIRED - Pass/Fail)

- [ ] **11.5.1** Create `DEMO-VIDEO-SCRIPT.md` (20 min)

  **Video Structure (3-5 minutes)**:
  1. **Introduction (30 sec)**
     - Project overview
     - Key features highlight
     - Highlight hybrid AI approach (OpenAI + LangSmith)
     - Show live URL

  2. **Real-time Collaboration Demo (60 sec)**
     - Show 2+ users on split screen
     - Create shapes from different users
     - Demonstrate real-time sync
     - Show cursor tracking

  3. **AI Canvas Agent Demo (90 sec) - CRITICAL**
     - Execute 8+ AI commands across all categories
     - Show tool calling in action (creation, manipulation, layout, complex)
     - Demonstrate multi-user AI sync
     - Show "Create login form" complex command (3+ elements)
     - Highlight response times (<2s)

  4. **LangSmith Observability Demo (30 sec) - BONUS POINTS**
     - Switch to LangSmith dashboard
     - Show trace of "Create login form" command
     - Highlight metrics: 1.8s response, $0.02 cost, 100% accuracy
     - Show tool call details and arguments
     - Emphasize production-ready monitoring

  5. **Advanced Features Walkthrough (60 sec)**
     - Color picker with palettes
     - Undo/redo demonstration
     - Layers panel (drag-to-reorder)
     - Alignment tools
     - Export functionality

  6. **Architecture Explanation (30 sec)**
     - Show architecture diagram
     - Explain Firebase integration
     - **Highlight hybrid AI architecture** (Phase 3 OpenAI → Phase 5 LangSmith)
     - Mention performance achievements (500+ objects, 60 FPS)

  7. **Performance Demo (20 sec)**
     - Show 500+ objects at 60 FPS
     - Demonstrate with 5+ concurrent users
     - Show sync latency metrics

- [ ] **11.5.2** Prepare demo environment (15 min)
  - Create 5 test user accounts
  - Prepare example canvas states
  - Test screen recording software (OBS/Loom)
  - Prepare split-screen setup + LangSmith dashboard window
  - Ensure LangSmith tracing enabled

- [ ] **11.5.3** Record practice run (10 min)
  - Test timing (3-5 minutes target with LangSmith section)
  - Verify audio quality
  - Check video clarity
  - Adjust script if needed

**Files Created**: 1 new file (DEMO-VIDEO-SCRIPT.md)
**Success Criteria**: Complete script ready for recording with LangSmith segment

---

#### **11.6 Demo Video Recording** (90 minutes) ⏳

**Goal**: Professional 3-5 minute demo video with LangSmith observability

- [ ] **11.6.1** Set up recording environment (15 min)
  - Open 2 browsers side-by-side for split screen
  - Open LangSmith dashboard in third window
  - Log in with different test accounts
  - Prepare example commands
  - Test audio (microphone check)
  - Test screen capture (1080p minimum)

- [ ] **11.6.2** Record introduction & collaboration demo (20 min)
  - Record introduction (mention hybrid approach) (3-5 takes)
  - Record split-screen collaboration
  - Demonstrate real-time sync
  - Show presence awareness

- [ ] **11.6.3** Record AI agent demonstration (25 min)
  - Record each command category
  - Show 8+ distinct commands with tool calling
  - Demonstrate complex command (login form - 3+ elements)
  - Show multi-user AI sync
  - **Record LangSmith dashboard** showing traces and metrics

- [ ] **11.6.4** Record advanced features & architecture (15 min)
  - Record Tier 1 & Tier 2 features
  - Show architecture diagram (highlight hybrid AI)
  - Demonstrate performance with 500+ objects

- [ ] **11.6.5** Edit and finalize video (15 min)
  - Trim and combine clips
  - Add title screen and captions
  - Verify 3-5 minute length (including LangSmith segment)
  - Export in HD (1080p)
  - Upload to YouTube/Vimeo

**Files Created**: 1 video file + upload link
**Success Criteria**: 3-5 minute HD video with LangSmith observability demo

---

#### **11.7 Final Production Deployment** (45 minutes) ⏳

**Goal**: Rubric Section 6 (Deployment - 2 points)

- [ ] **11.7.1** Production build optimization (15 min)
  - Verify code splitting configured
  - Check bundle size (~400 KB target + 2MB LangSmith)
  - Remove console.logs (keep LangSmith tracing)
  - Disable debug panels
  - Verify source maps disabled

- [ ] **11.7.2** Deploy to Firebase Hosting (10 min)
  - Run production build: `npm run build`
  - Deploy: `firebase deploy --only hosting`
  - Verify deployment successful
  - Test production URL

- [ ] **11.7.3** Production smoke testing (15 min)
  - Test authentication flow
  - Test shape creation and sync
  - **Test AI agent commands with LangSmith tracing**
  - Verify LangSmith dashboard shows production traces
  - Test with 5 concurrent users
  - Test all Tier 1 & Tier 2 features

- [ ] **11.7.4** Update live URL in all documentation (5 min)
  - README.md (add LangSmith dashboard link)
  - Package.json
  - Firebase project

**Success Criteria**: Stable production deployment with LangSmith observability

---

#### **11.8 Submission Checklist & Final Review** (45 minutes) ⏳

**Goal**: Verify all rubric requirements met (including hybrid approach benefits)

- [ ] **11.8.1** Rubric checklist review (20 min)

  **Section 1: Core Collaborative Infrastructure (30 pts)**
  - [ ] Sub-100ms object sync ✓
  - [ ] Sub-50ms cursor sync ✓
  - [ ] Conflict resolution working ✓
  - [ ] Persistence across disconnects ✓

  **Section 2: Canvas Features & Performance (20 pts)**
  - [ ] 3+ shape types ✓
  - [ ] Text with formatting ✓
  - [ ] Multi-select ✓
  - [ ] Transform operations ✓
  - [ ] 500+ objects at 60 FPS ✓
  - [ ] 5+ concurrent users ✓

  **Section 3: Advanced Figma Features (15 pts)**
  - [ ] Color picker (Tier 1 - 2 pts) ✓
  - [ ] Undo/redo (Tier 1 - 2 pts) ✓
  - [ ] Keyboard shortcuts (Tier 1 - 2 pts) ✓
  - [ ] Layers panel (Tier 2 - 3 pts) ✓
  - [ ] Alignment tools (Tier 2 - 3 pts) ✓
  - [ ] Optional Tier 3 (3 pts) - if time permits

  **Section 4: AI Canvas Agent (25 pts)**
  - [ ] 8+ command types ✓
  - [ ] All categories covered ✓
  - [ ] Complex commands working ✓
  - [ ] Sub-2s response time ✓
  - [ ] 90%+ accuracy ✓
  - [ ] Multi-user AI sync ✓

  **Section 5: Technical Implementation (10 pts)**
  - [ ] Clean architecture ✓
  - [ ] Robust authentication ✓
  - [ ] Proper error handling ✓
  - [ ] No exposed credentials ✓

  **Section 6: Documentation (5 pts)**
  - [ ] Clear README ✓
  - [ ] Setup guide ✓
  - [ ] Architecture docs ✓
  - [ ] Stable deployment ✓

  **Section 7: AI Development Log (Pass/Fail)**
  - [ ] 3/5 sections complete ✓

  **Section 8: Demo Video (Pass/Fail)**
  - [ ] 3-5 minutes ✓
  - [ ] 2+ users shown ✓
  - [ ] AI commands demonstrated ✓
  - [ ] Architecture explained ✓
  - [ ] HD quality ✓

- [ ] **11.8.2** Final code review (15 min)
  - No linter errors
  - No TypeScript errors
  - All tests passing (if time permitted testing)
  - No exposed API keys (OpenAI, LangSmith)
  - No debug code (LangSmith tracing is OK)

- [ ] **11.8.3** Final documentation review (10 min)
  - All links work (including LangSmith dashboard)
  - All screenshots/GIFs current
  - Grammar/spelling check
  - Consistent formatting
  - Hybrid approach documented

**Success Criteria**: All rubric requirements verified complete including hybrid approach

---

#### **11.9 Bonus Features (Optional)** (60 minutes) ⏳

**Goal**: Target +3-5 bonus points (LangSmith already provides +2)

**Note**: LangSmith observability (Section 11.1) already provides +2 bonus points for innovation/polish!

- [ ] **11.9.1** Additional innovation bonus (+1-2 pts) (30 min) - OPTIONAL
  - AI-powered design suggestions
  - Smart component detection via AI
  - Auto-layout suggestions based on shape patterns

- [ ] **11.9.2** Additional polish bonus (+1 pt) (30 min) - OPTIONAL
  - Smooth animations on all interactions
  - Professional design system
  - Delightful micro-interactions
  - Custom cursor designs

**Success Criteria**: Exceptional UX beyond requirements (but hybrid approach already strong)

---

### **Phase 5 Success Criteria** ✅

**Rubric Alignment - Section 6 (Documentation - 5 points)**:

- [ ] Clear README with setup guide ✓
- [ ] Architecture documentation ✓
- [ ] Stable deployment supporting 5+ users ✓
- [ ] Professional documentation quality ✓

**Rubric Alignment - Section 7 (AI Dev Log - Pass/Fail)**:

- [ ] 3/5 required sections complete ✓
- [ ] Meaningful reflection and insights ✓

**Rubric Alignment - Section 8 (Demo Video - Pass/Fail)**:

- [ ] 3-5 minute duration ✓
- [ ] 2+ users demonstrated ✓
- [ ] Multiple AI commands shown ✓
- [ ] Advanced features walkthrough ✓
- [ ] Architecture explanation ✓
- [ ] HD quality video ✓

**Bonus Points**:

- [ ] Innovation (+2) - AI-powered features
- [ ] Polish (+2) - Exceptional UX/UI
- [ ] Scale (+1) - 500+ objects, 5+ users

**Target Score**: 13-15 points + 3-5 bonus = 16-20 points
**Overall Target**: 95-105/105 points

---

## 🎯 **FINAL SUCCESS VALIDATION**

### **Complete Rubric Score Calculation**

| Section | Points Available | Target Score | Features Required |
|---------|-----------------|--------------|-------------------|
| 1. Collaboration | 30 | 28-30 | Real-time sync, conflicts, persistence |
| 2. Canvas/Performance | 20 | 18-20 | 500+ objects, 5+ users, 60 FPS |
| 3. Figma Features | 15 | 13-15 | 3 Tier 1 + 2 Tier 2 features |
| 4. AI Agent | 25 | 23-25 | 8+ commands, <2s, 90% accuracy |
| 5. Technical | 10 | 9-10 | Clean code, security, error handling |
| 6. Documentation | 5 | 5 | README, architecture, deployment |
| 7. AI Dev Log | Pass/Fail | Pass | 3/5 sections (already complete) |
| 8. Demo Video | Pass/Fail | Pass | 3-5 min, all requirements |
| **TOTAL** | **100** | **96-105** | **All requirements met** |
| **Bonus** | **+5** | **+3-5** | Innovation, polish, scale |
| **GRAND TOTAL** | **105** | **99-110** | **A+ grade target** |

### **Submission Deadline**: Friday, October 17, 2025 EOD

### **Final Deliverables Checklist**

- [ ] Live production URL accessible
- [ ] GitHub repository with clear README
- [ ] All features working in production
- [ ] Demo video uploaded and linked
- [ ] AI Development Log complete
- [ ] Architecture documentation complete
- [ ] No exposed credentials or security issues
- [ ] All rubric requirements verified

---

## 📈 **PROGRESS TRACKING**

### **Daily Goals**

**Pre-Sprint (Oct 9-14) - Phase 1**: MVP Foundation
Target: 20 points | Status: ✅ **COMPLETE**

- 7 PRs merged successfully
- Live at: <https://collabcanvas-mvp-53120.web.app>
- Core collaborative infrastructure operational

**Day 1 (Oct 15) - Phase 2**: Canvas Features & Tier 1
Target: +20 points | Status: ⏳ Pending

**Day 2 (Oct 16) - Phase 3**: AI Canvas Agent
Target: +25 points | Status: ⏳ Pending

**Day 3 (Oct 17) - Phases 4 & 5**: Polish & Submission
Target: +35 points | Status: ⏳ Pending

### **Risk Mitigation**

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| AI API rate limits | Medium | High | Implement caching, retry logic |
| Performance <500 objects | Low | High | Early testing, viewport culling |
| Demo video recording issues | Medium | Medium | Multiple takes, practice runs |
| Time constraints | Medium | High | Prioritize high-point features |

---

*Task List Version: 3.1 - Complete 5-Phase Journey*
*Created: October 15, 2025*
*Updated: October 15, 2025 - Added Phase 1 MVP PRs + Hybrid AI approach*
*Complete Timeline: October 9-17, 2025 (9 days: 5 days MVP + 3 days sprint)*
*Phase 1 Status: ✅ COMPLETE (20/105 points, 7 PRs merged)*
*Phase 2-5 Timeline: October 15-17, 2025 (3 days, 4 PRs pending)*
*Current Score: 20/105 points | Target: 95-107/105 points (includes +2 LangSmith bonus)*
*Based on: PRD-CollabCanvas.md v2.1 & CollabCanvas Rubric*
*AI Strategy: Phase 3 OpenAI SDK (fast) → Phase 5 LangSmith (polish)*
*MVP Foundation: <https://collabcanvas-mvp-53120.web.app> ✅*
