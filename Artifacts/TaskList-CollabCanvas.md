# CollabCanvas Rubric-Aligned Development Task List

## 🎯 **Mission: Deliver 95+ Point Rubric-Aligned Application**

**Project Goal**: Build production-ready, AI-powered collaborative canvas from MVP to final submission
**Complete Timeline**: October 9-17, 2025 (9 days total: 5 days MVP + 4 days rubric sprint)
**Current Sprint**: October 15-17, 2025 (3 days - Phases 2-5)
**Current Status**: Phase 1 MVP Complete ✅ | Phases 2-5 Pending ⏳
**Philosophy**: "Strategic rubric focus: AI agent = 25 points, optimize accordingly"

---

## 📊 **SPRINT PROGRESS SUMMARY**

**Last Updated**: October 16, 2025
**Sprint Status**: 🚀 **PHASE 2 STARTING** (Building on Phase 1 foundation with Figma-inspired enhancements)
**Overall Progress**: 25% complete (Phase 1 complete, Phases 2-5 pending)
**MVP Status**: ✅ **PRODUCTION LIVE** - <https://collabcanvas-mvp-53120.web.app>

### **Phase Completion Overview**

**✅ COMPLETED (1/6 Subphases) - 17%**

- ✅ Phase 1 (MVP): Foundation with basic collaboration (20 rubric points earned)

**🔄 IN PROGRESS (0/5 Subphases)**

- ⏳ **Phase 2a**: Rubric-Required Canvas Features (Oct 15 AM) - Target: +15 points
- ⏳ **Phase 2b**: Figma-Inspired Transform Operations (Oct 15 PM) - Target: +5 points
- ⏳ **Phase 3**: AI Canvas Agent (Oct 16) - Target: +25 points (HIGHEST VALUE)
- ⏳ **Phase 4a**: Performance Optimization (Oct 17, 9-11 AM) - Target: +10 points
- ⏳ **Phase 4b**: Figma-Inspired Interface Structure (Oct 17, 11 AM-1 PM) - Target: +10 points
- ⏳ **Phase 5**: Documentation & Submission (Oct 17 PM) - Target: +15 points

**🎯 Target Rubric Score**: 95-107/105 points (includes +2 LangSmith bonus)
**Current Score**: ~20/105 points (Phase 1 baseline)
**Remaining Points**: 85 points across 3 days

---

## 🔄 **PROGRESSIVE PULL REQUEST STRATEGY (Complete 5-Phase Journey with Subphases)**

### **All PR Milestones - Phase 1 MVP + Rubric Sprint**

| PR # | Phase | Date | Title | Rubric Target | Points | Type | Status |
|------|-------|------|-------|---------------|--------|------|--------|
| **PR-1** | Phase 1 | Oct 9 | `PR 1 feat: project setup and firebase configuration` | Section 1 (partial) | ~3 pts | ✅ Rubric | ✅ Merged |
| **PR-2** | Phase 1 | Oct 10 | `PR 2 feat: core canvas implementation with basic shapes` | Section 1 (partial) | ~3 pts | ✅ Rubric | ✅ Merged |
| **PR-3** | Phase 1 | Oct 11 | `PR 3 feat: firestore persistent state and real-time sync` | Section 1 (partial) | ~5 pts | ✅ Rubric | ✅ Merged |
| **PR-4** | Phase 1 | Oct 12 | `PR 4 feat: realtime cursor tracking with firebase rtdb` | Section 1 (partial) | ~3 pts | ✅ Rubric | ✅ Merged |
| **PR-5** | Phase 1 | Oct 13 | `feat: text shape component and editing` | Section 1 (partial) | ~2 pts | ✅ Rubric | ✅ Merged |
| **PR-6** | Phase 1 | Oct 13 | `feat: user presence system with online users` | Section 1 (partial) | ~2 pts | ✅ Rubric | ✅ Merged |
| **PR-7** | Phase 1 | Oct 14 | `feat: ui polish and production deployment` | Section 1 (partial) | ~2 pts | ✅ Rubric | ✅ Merged |
| **PR-8a** | Phase 2a | Oct 15 AM | `feat: rubric tier-1 features (color/undo/keyboard)` | Sections 2 & 3 (Tier 1) | +15 pts | ✅ Rubric | ⏳ Pending |
| **PR-8b** | Phase 2b | Oct 15 PM | `feat: figma transform operations (resize/rotate/smart-guides)` | Sections 2 & 3 (UX) | +5 pts | 🎨 Figma | ⏳ Pending |
| **PR-9** | Phase 3 | Oct 16 | `feat: ai canvas agent with multi-user sync` | Section 4 | +25 pts | ✅ Rubric | ⏳ Pending |
| **PR-10a** | Phase 4a | Oct 17 9-11 AM | `feat: performance optimization (500+ objects, 5+ users)` | Sections 2, 3, 5 | +10 pts | ✅ Rubric | ⏳ Pending |
| **PR-10b** | Phase 4b | Oct 17 11 AM-1 PM | `feat: figma interface structure (layers/properties panels)` | Sections 3, 5 | +10 pts | 🎨 Figma | ⏳ Pending |
| **PR-11** | Phase 5 | Oct 17 PM | `feat: final documentation and demo video` | Sections 6, 7, 8 | +15 pts | ✅ Rubric | ⏳ Pending |

**Phase 1 MVP Score**: 20/105 points ✅ **COMPLETE**
**Live URL**: <https://collabcanvas-mvp-53120.web.app>
**Foundation Status**: All core collaborative infrastructure deployed and tested
**Next Step**: Begin Phase 2a (Rubric Tier 1 Features) → Phase 2b (Figma Transform Operations)

**Key Strategy**:

- ✅ Rubric-Required = Ensures baseline 95-point target
- 🎨 Figma-Inspired = Adds professional polish and bonus points
- Separate PRs allow independent feature rollback without affecting rubric baseline

---

## 📁 **UPDATED PROJECT FILE STRUCTURE**

```
Gauntlet Project One/collabcanvas-mvp/
├── [Existing Phase 1 files...]
├── 📁 src/
│   ├── 📁 components/
│   │   ├── [Existing: Canvas, Rectangle, Circle, Text, etc.]
│   │   ├── 📄 Line.tsx                      # NEW - Phase 2a
│   │   ├── 📄 Arrow.tsx                     # NEW - Phase 2a
│   │   ├── 📄 ExportModal.tsx               # NEW - Phase 2a
│   │   ├── 📄 ShapeStylePanel.tsx           # NEW - Phase 2a
│   │   ├── 📄 ColorPaletteModal.tsx         # NEW - Phase 2a
│   │   ├── 📄 TransformHandles.tsx          # NEW - Phase 2b (8-point resize, rotation)
│   │   ├── 📄 SmartGuides.tsx               # NEW - Phase 2b (alignment guides)
│   │   ├── 📄 MarqueeSelection.tsx          # NEW - Phase 2b (drag-to-select)
│   │   ├── 📄 LayersPanel.tsx               # NEW - Phase 4b (left sidebar)
│   │   ├── 📄 PropertiesPanel.tsx           # NEW - Phase 4b (right sidebar)
│   │   ├── 📄 AlignmentTools.tsx            # NEW - Phase 4b (9 operations)
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
│   │   ├── 📄 useUndoRedo.ts                # NEW - Phase 2a
│   │   ├── 📄 useKeyboardShortcuts.ts       # NEW - Phase 2a
│   │   ├── 📄 useTransform.ts               # NEW - Phase 2b (resize/rotate logic)
│   │   └── 📄 useSmartGuides.ts             # NEW - Phase 2b (guide calculations)
│   ├── 📁 utils/
│   │   ├── [Existing: colors, helpers, errorMessages]
│   │   ├── 📄 export.ts                     # NEW - Phase 2a
│   │   ├── 📄 alignment.ts                  # NEW - Phase 4b (9 alignment operations)
│   │   ├── 📄 performance.ts                # NEW - Phase 4a
│   │   ├── 📄 transform.ts                  # NEW - Phase 2b (resize/rotate calculations)
│   │   └── 📄 aiCommands.ts                 # NEW - Phase 3
│   └── 📁 types/
│       ├── 📄 ai.types.ts                   # NEW - Phase 3
│       ├── 📄 canvas.types.ts               # NEW - Phase 2a
│       └── 📄 transform.types.ts            # NEW - Phase 2b
├── 📁 Artifacts/
│   ├── [Existing docs...]
│   ├── 📄 PRD-CollabCanvas.md               # UPDATED - v2.2 with subphases
│   ├── 📄 TaskList-CollabCanvas.md          # THIS FILE - v4.0 with subphases
│   ├── 📄 Figma-Feature-Gap-Analysis.md     # NEW - Feature comparison
│   ├── 📄 DEMO-VIDEO-SCRIPT.md              # NEW - Phase 5
│   └── 📄 ARCHITECTURE-FINAL.md             # NEW - Phase 5
└── 📄 .env.local                            # UPDATE - Add OpenAI + LangSmith keys
```

---

## 🚀 **PHASE 2a: RUBRIC-REQUIRED CANVAS FEATURES** (October 15 Morning)

**Branch**: `PR8a-feat/rubric-tier1-features`
**Rubric Target**: Sections 2 (Canvas Features) & 3 (Tier 1 Features - 6 pts)
**Points Goal**: +15 points
**Duration**: Half day (4 hours - 9 AM to 1 PM)
**Type**: ✅ Rubric-Required

### **PR-8a: Rubric Tier 1 Features** 🎯

#### **8a.1 Additional Shape Types** (90 minutes) ⏳

**Goal**: Expand from rectangles/circles/text to full shape library

- [ ] **8a.1.1** Create `src/components/Line.tsx` component (20 min)
  - Import Konva Line and Transformer
  - Add selection, drag, delete functionality
  - Set default stroke width: 2px, color: #333333
  - Add points array for line coordinates

- [ ] **8a.1.2** Create `src/components/Arrow.tsx` component (20 min)
  - Use Konva Arrow with arrowhead
  - Default: 2px stroke, black color, 10px pointer length
  - Add drag and rotation capabilities

- [ ] **8a.1.3** Update `src/utils/helpers.ts` with new shape creators (15 min)
  - `createLineShape(x1, y1, x2, y2, userId)`
  - `createArrowShape(x1, y1, x2, y2, userId)`
  - Add shape type validation

- [ ] **8a.1.4** Update `src/services/types.ts` with new shape types (10 min)
  - Add `'line' | 'arrow'` to ShapeType union
  - Add line-specific properties: `points: number[]`
  - Add arrow-specific properties: `pointerLength: number, pointerWidth: number`

- [ ] **8a.1.5** Update Toolbar with Line and Arrow buttons (15 min)
  - Add SVG icons for Line and Arrow
  - Wire up creation handlers
  - Position buttons after existing shape buttons

- [ ] **8a.1.6** Update Canvas.tsx to render new shape types (10 min)
  - Add conditional rendering for Line and Arrow
  - Ensure proper layering with existing shapes

**Files Created**: 2 new components (Line.tsx, Arrow.tsx)
**Files Modified**: 4 files (helpers.ts, types.ts, Toolbar.tsx, Canvas.tsx)
**Success Criteria**: 5+ distinct shape types (Rectangle, Circle, Text, Line, Arrow) ✅

---

#### **8a.2 Color Picker System** (75 minutes) ⏳

**Goal**: Tier 1 feature (2 points) - Advanced color selection with palettes

- [ ] **8a.2.1** Create `src/components/ColorPaletteModal.tsx` (25 min)
  - Modal overlay with color grid (5 rows × 4 cols = 20 colors)
  - Include "Recent Colors" section (last 6 used)
  - Color picker input for custom colors (#hex)
  - Apply/Cancel buttons

- [ ] **8a.2.2** Create `src/utils/colorPalette.ts` with color definitions (10 min)
  - Define 20 preset colors (blues, greens, reds, yellows, purples)
  - Recent colors storage in localStorage
  - Utility: `addRecentColor(color: string)`

- [ ] **8a.2.3** Add color picker trigger to Toolbar (10 min)
  - "Change Color" button with current color preview
  - Opens ColorPaletteModal on click
  - Only enabled when shape selected

- [ ] **8a.2.4** Integrate color updates with Firestore (15 min)
  - Update `updateShapeColor()` in useShapes hook
  - Sync color changes to all users
  - Add optimistic update for instant feedback

- [ ] **8a.2.5** Add color to shape creation flow (10 min)
  - Store last-used color in state
  - Apply to newly created shapes
  - Persist preference in localStorage

- [ ] **8a.2.6** Test color picker with multi-user sync (5 min)
  - Verify color changes sync across users
  - Test recent colors persistence

**Files Created**: 2 new files (ColorPaletteModal.tsx, colorPalette.ts)
**Files Modified**: 4 files (Toolbar.tsx, useShapes.ts, helpers.ts)
**Success Criteria**: Color picker with 20+ colors, recent colors, multi-user sync ✅

---

#### **8a.3 Undo/Redo Functionality** (105 minutes) ⏳

**Goal**: Tier 1 feature (2 points) - Full undo/redo with keyboard shortcuts

- [ ] **8a.3.1** Create `src/hooks/useUndoRedo.ts` hook (35 min)
  - Action history stack (max 50 actions)
  - Redo stack for undone actions
  - Actions: CREATE, UPDATE, DELETE, MOVE, COLOR_CHANGE
  - Methods: `undo()`, `redo()`, `addAction(action)`

- [ ] **8a.3.2** Define action types in `src/types/canvas.types.ts` (10 min)
  - `CanvasAction` interface with type, timestamp, data
  - `ActionType` enum
  - Serializable action data structures

- [ ] **8a.3.3** Integrate undo/redo into useShapes hook (25 min)
  - Capture shape creation in action history
  - Capture shape updates (position, color, size)
  - Capture shape deletions
  - Apply inverse operations for undo

- [ ] **8a.3.4** Add keyboard shortcuts (Cmd/Ctrl+Z, Cmd/Ctrl+Shift+Z) (15 min)
  - Create `src/hooks/useKeyboardShortcuts.ts`
  - Listen for keyboard events globally
  - Handle Cmd+Z (undo), Cmd+Shift+Z (redo)
  - Prevent default browser behavior

- [ ] **8a.3.5** Add undo/redo buttons to Toolbar (10 min)
  - Undo button (left arrow icon)
  - Redo button (right arrow icon)
  - Disable when stacks empty
  - Show tooltip with keyboard shortcut

- [ ] **8a.3.6** Handle multi-user undo conflicts (10 min)
  - Only undo user's own actions
  - Filter action history by userId
  - Show warning if trying to undo collaborative edits

**Files Created**: 3 new files (useUndoRedo.ts, useKeyboardShortcuts.ts, canvas.types.ts)
**Files Modified**: 3 files (useShapes.ts, Toolbar.tsx, Canvas.tsx)
**Success Criteria**: Undo/redo works with Cmd+Z, handles CREATE/UPDATE/DELETE ✅

---

#### **8a.4 Enhanced Keyboard Shortcuts** (60 minutes) ⏳

**Goal**: Tier 1 feature (2 points) - Professional keyboard navigation

- [ ] **8a.4.1** Extend useKeyboardShortcuts hook (20 min)
  - Arrow keys: Move selected shape (10px per press)
  - Shift+Arrow: Move 50px (fast movement)
  - Cmd/Ctrl+D: Duplicate selected shape
  - Tab: Select next shape, Shift+Tab: previous
  - Cmd/Ctrl+A: Select all shapes

- [ ] **8a.4.2** Add keyboard shortcut display panel (15 min)
  - Update KeyboardHelp.tsx with all shortcuts
  - Group by category: Selection, Movement, Editing, View
  - Add "Press ?" to toggle help

- [ ] **8a.4.3** Implement shape duplication (15 min)
  - Create `duplicateShape()` in useShapes
  - Offset duplicate by 20px x/y
  - Maintain shape properties (color, size)
  - Sync to Firestore

- [ ] **8a.4.4** Implement select all functionality (10 min)
  - Track multiple selected shapes in state
  - Update Canvas selection logic for multi-select
  - Visual feedback for multi-selection

**Files Modified**: 4 files (useKeyboardShortcuts.ts, KeyboardHelp.tsx, useShapes.ts, Canvas.tsx)
**Success Criteria**: 10+ keyboard shortcuts working, help panel shows all ✅

---

#### **8a.5 Export Functionality** (75 minutes) ⏳

**Goal**: Tier 1 feature enhancement - Export canvas as PNG/SVG

- [ ] **8a.5.1** Create `src/utils/export.ts` utilities (25 min)
  - `exportCanvasAsPNG(stage: Konva.Stage, filename: string)`
  - `exportCanvasAsSVG(stage: Konva.Stage, filename: string)`
  - `exportSelectedShapesAsPNG(shapes: Shape[], filename: string)`
  - Handle canvas-to-image conversion

- [ ] **8a.5.2** Create `src/components/ExportModal.tsx` (20 min)
  - Export options: Full Canvas, Selected Shapes Only
  - Format selection: PNG, SVG
  - Filename input with default
  - Quality settings for PNG (low/medium/high)
  - Download button

- [ ] **8a.5.3** Add Export button to Toolbar (10 min)
  - Position in top-right corner
  - Download icon (SVG)
  - Opens ExportModal on click

- [ ] **8a.5.4** Implement PNG export using toDataURL (10 min)
  - Use Konva stage.toDataURL() method
  - Create blob and trigger download
  - Handle errors (canvas too large, etc.)

- [ ] **8a.5.5** Implement SVG export (optional) (10 min)
  - Convert Konva shapes to SVG elements
  - Generate SVG file with proper viewBox
  - Trigger download with blob

**Files Created**: 2 new files (export.ts, ExportModal.tsx)
**Files Modified**: 2 files (Toolbar.tsx, Canvas.tsx)
**Success Criteria**: Export full canvas and selected shapes as PNG ✅

---

#### **8a.6 Phase 2a Integration & Testing** (60 minutes) ⏳

**Goal**: Ensure all Rubric Tier 1 features work together

- [ ] **8a.6.1** Integration testing: All shape types (15 min)
  - Create, move, delete each shape type (Rectangle, Circle, Text, Line, Arrow)
  - Verify multi-user sync for all shapes
  - Test color picker on all shape types

- [ ] **8a.6.2** Integration testing: Undo/redo (15 min)
  - Test undo/redo with CREATE/UPDATE/DELETE actions
  - Verify multi-user undo isolation
  - Test redo after multiple undos

- [ ] **8a.6.3** Integration testing: Keyboard shortcuts (10 min)
  - Test all 10+ keyboard shortcuts
  - Verify no conflicts with browser shortcuts
  - Test help panel toggle (? key)

- [ ] **8a.6.4** Integration testing: Export functionality (10 min)
  - Export full canvas as PNG
  - Export selected shapes as PNG
  - Verify image quality and accuracy

- [ ] **8a.6.5** Multi-user testing (4-5 users) (10 min)
  - Open 5 browser tabs with different users
  - Test concurrent shape creation
  - Verify color picker sync
  - Test undo/redo isolation

**Success Criteria**: All Tier 1 features working together, multi-user sync verified ✅

---

### **Phase 2a Success Criteria** ✅

**Rubric Alignment - Section 2 (Canvas Features - partial)**:

- [ ] 5+ shape types (Rectangle, Circle, Text, Line, Arrow) ✓
- [ ] Text with basic formatting ✓
- [ ] Export functionality (PNG) ✓

**Rubric Alignment - Section 3 Tier 1 (6 points)**:

- [ ] Color picker with recent colors and saved palettes (2 pts) ✓
- [ ] Undo/redo with keyboard shortcuts (Cmd+Z/Cmd+Shift+Z) (2 pts) ✓
- [ ] Keyboard shortcuts for common operations (Delete, Duplicate, Arrows) (2 pts) ✓

**Phase 2a Points Earned**: +15 points
**Cumulative Score**: 35/105 points (Phase 1: 20 + Phase 2a: 15)
**Next Phase**: Phase 2b (Figma-Inspired Transform Operations)

---

## 🎨 **PHASE 2b: FIGMA-INSPIRED TRANSFORM OPERATIONS** (October 15 Afternoon)

**Branch**: `PR8b-feat/figma-transform-operations`
**Rubric Target**: Sections 2 & 3 (UX Enhancement)
**Points Goal**: +5 points
**Duration**: Half day (4 hours - 2 PM to 6 PM)
**Type**: 🎨 Figma-Inspired Enhancement

### **PR-8b: Figma Transform Operations** ✨

#### **8b.1 8-Point Resize Handles** (60 minutes) ⏳

**Goal**: Professional Figma-like resize capabilities

- [ ] **8b.1.1** Create `src/components/TransformHandles.tsx` component (25 min)
  - 8 resize handles: 4 corners + 4 edges
  - Handle positions: NW, N, NE, E, SE, S, SW, W
  - Visual indicators: small squares (8px × 8px)
  - Handle styling: white fill, gray border

- [ ] **8b.1.2** Implement corner resize logic in `src/utils/transform.ts` (20 min)
  - Diagonal resize maintaining aspect ratio with Shift
  - Calculate new width/height based on handle drag
  - Update shape bounds in real-time
  - Minimum size constraints (10px × 10px)

- [ ] **8b.1.3** Implement edge resize logic (10 min)
  - Horizontal resize (E, W handles)
  - Vertical resize (N, S handles)
  - Update single dimension only

- [ ] **8b.1.4** Add resize handles to all shape types (5 min)
  - Integrate TransformHandles with Rectangle, Circle, Text
  - Show handles only when shape selected
  - Hide handles during drag operations

**Files Created**: 2 new files (TransformHandles.tsx, transform.ts)
**Files Modified**: 3 files (Rectangle.tsx, Circle.tsx, Text.tsx)
**Success Criteria**: 8-point resize handles working on all shapes ✅

---

#### **8b.2 Rotation Handle** (45 minutes) ⏳

**Goal**: Figma-style rotation with visual feedback

- [ ] **8b.2.1** Add rotation handle to TransformHandles (20 min)
  - Position above selection bounds (20px offset)
  - Circular handle with rotate icon
  - Connected to selection with thin line
  - Handle size: 12px diameter

- [ ] **8b.2.2** Implement rotation logic (15 min)
  - Calculate angle from shape center to mouse position
  - Update shape rotation property in real-time
  - Snap to 15° increments when Shift pressed
  - Display rotation angle tooltip during rotation

- [ ] **8b.2.3** Sync rotation to Firestore (10 min)
  - Add `rotation` property to Shape interface
  - Update Firestore on rotation end
  - Apply rotation to Konva shapes
  - Sync rotated shapes to all users

**Files Modified**: 3 files (TransformHandles.tsx, transform.ts, types.ts)
**Success Criteria**: Rotation handle working with Shift-snap and real-time display ✅

---

#### **8b.3 Smart Guides** (75 minutes) ⏳

**Goal**: Figma-style alignment guides during drag operations

- [ ] **8b.3.1** Create `src/components/SmartGuides.tsx` component (25 min)
  - Render red/blue guide lines on canvas
  - Vertical and horizontal alignment lines
  - Distance measurement tooltips
  - Auto-hide after 1 second

- [ ] **8b.3.2** Create `src/hooks/useSmartGuides.ts` hook (30 min)
  - Calculate alignment with other shapes during drag
  - Detect when edges align (threshold: 5px)
  - Detect when centers align (vertical/horizontal)
  - Calculate equal spacing between shapes
  - Return guide line positions and measurements

- [ ] **8b.3.3** Integrate smart guides with Canvas drag (15 min)
  - Show guides during shape drag operations
  - Snap to alignment when within threshold
  - Update guide positions in real-time
  - Hide guides on drag end

- [ ] **8b.3.4** Style smart guides (5 min)
  - Red lines for edge alignment
  - Blue lines for center alignment
  - Orange lines for equal spacing
  - Semi-transparent (opacity: 0.7)

**Files Created**: 2 new files (SmartGuides.tsx, useSmartGuides.ts)
**Files Modified**: 2 files (Canvas.tsx, useShapes.ts)
**Success Criteria**: Smart guides show alignment during drag, snap to guides ✅

---

#### **8b.4 Marquee Selection Box** (60 minutes) ⏳

**Goal**: Figma-style drag-to-select with selection rectangle

- [ ] **8b.4.1** Create `src/components/MarqueeSelection.tsx` component (20 min)
  - Dashed rectangle visualization
  - Semi-transparent blue fill (opacity: 0.1)
  - Blue border (2px dashed)
  - Render during drag-to-select operation

- [ ] **8b.4.2** Implement marquee selection logic (25 min)
  - Detect mouse drag on empty canvas (no shape clicked)
  - Calculate selection rectangle bounds
  - Find all shapes within rectangle bounds
  - Update selected shapes state
  - Works with Shift to add to selection

- [ ] **8b.4.3** Integrate with Canvas component (10 min)
  - Add marquee mode to Canvas state
  - Show MarqueeSelection during drag
  - Update selection on drag end
  - Clear marquee on mouse up

- [ ] **8b.4.4** Visual feedback for multi-selection (5 min)
  - Blue outline around all selected shapes
  - Selection count indicator ("3 objects selected")
  - Show transform handles for bounding box of all selected

**Files Created**: 1 new file (MarqueeSelection.tsx)
**Files Modified**: 3 files (Canvas.tsx, useShapes.ts, Toolbar.tsx)
**Success Criteria**: Marquee selection box working, multi-select functional ✅

---

#### **8b.5 Multi-Select Transform Operations** (45 minutes) ⏳

**Goal**: Transform multiple selected shapes together

- [ ] **8b.5.1** Implement group move (15 min)
  - Move all selected shapes together
  - Maintain relative positions
  - Update Firestore for all shapes in batch

- [ ] **8b.5.2** Implement group resize (15 min)
  - Calculate bounding box of selected shapes
  - Scale all shapes proportionally
  - Maintain relative positions during resize

- [ ] **8b.5.3** Implement group rotation (optional) (10 min)
  - Rotate all shapes around group center
  - Maintain relative positions and orientations

- [ ] **8b.5.4** Add Shift+click and Cmd+click multi-select (5 min)
  - Shift+click: Add to selection
  - Cmd/Ctrl+click: Toggle selection
  - Visual feedback for each click

**Files Modified**: 2 files (Canvas.tsx, useShapes.ts)
**Success Criteria**: Multi-select transforms working smoothly ✅

---

#### **8b.6 Aspect Ratio Locking** (30 minutes) ⏳

**Goal**: Maintain aspect ratio during resize with Shift key

- [ ] **8b.6.1** Implement Shift-lock logic (15 min)
  - Detect Shift key during corner resize
  - Calculate proportional width/height
  - Apply locked aspect ratio
  - Visual indicator when locked (cursor change)

- [ ] **8b.6.2** Add aspect ratio toggle button (optional) (10 min)
  - Toggle button in properties panel
  - Lock icon indicator
  - Persist lock state per shape

- [ ] **8b.6.3** Test aspect ratio on all shape types (5 min)
  - Test on rectangles, circles, text
  - Verify maintains proportions
  - Test with multi-select

**Files Modified**: 2 files (transform.ts, TransformHandles.tsx)
**Success Criteria**: Shift+drag maintains aspect ratio on all shapes ✅

---

#### **8b.7 Phase 2b Integration & Testing** (60 minutes) ⏳

**Goal**: Ensure all Figma transform features work together

- [ ] **8b.7.1** Integration testing: Resize handles (15 min)
  - Test all 8 resize handles
  - Test corner resize with Shift (aspect ratio lock)
  - Test edge resize (single dimension)
  - Verify handles on all shape types

- [ ] **8b.7.2** Integration testing: Rotation (10 min)
  - Test rotation handle on all shapes
  - Test Shift-snap to 15° increments
  - Verify angle display during rotation
  - Test multi-user rotation sync

- [ ] **8b.7.3** Integration testing: Smart guides (15 min)
  - Drag shapes and verify alignment guides appear
  - Test edge alignment (red lines)
  - Test center alignment (blue lines)
  - Test equal spacing (orange lines)
  - Verify snap-to behavior

- [ ] **8b.7.4** Integration testing: Marquee selection (10 min)
  - Drag-to-select multiple shapes
  - Test Shift+marquee to add to selection
  - Verify selection count display
  - Test transform on multi-selection

- [ ] **8b.7.5** Performance testing (10 min)
  - Test with 50+ shapes on canvas
  - Verify smooth resize/rotate at 60 FPS
  - Test smart guides performance during drag
  - Verify multi-user sync performance

**Success Criteria**: All Figma transform features working together professionally ✅

---

### **Phase 2b Success Criteria** ✅

**Rubric Alignment - Section 2 (UX Enhancement - 5 points)**:

- [ ] 8-point resize handles on all shapes ✓
- [ ] Rotation handle with Shift-snap ✓
- [ ] Smart alignment guides during drag ✓
- [ ] Marquee selection box (drag-to-select) ✓
- [ ] Multi-select transform operations ✓
- [ ] Aspect ratio locking with Shift ✓
- [ ] Professional Figma-like interaction feel ✓

**Phase 2b Points Earned**: +5 points (UX enhancement)
**Cumulative Score**: 40/105 points (Phase 1: 20 + Phase 2a: 15 + Phase 2b: 5)
**Next Phase**: Phase 3 (AI Canvas Agent - highest value feature)

---

### **Phase 2 Combined Success Criteria** ✅

**Total Phase 2 Points**: +20 points (Phase 2a: 15 + Phase 2b: 5)
**Cumulative Score After Phase 2**: 40/105 points
**Timeline**: 1 full day (October 15) - COMPLETE
**Deployment**: Stage environment ready for Phase 3 AI development

---

## 🤖 **PHASE 3: AI CANVAS AGENT** (October 16)

**Branch**: `PR9-feat/ai-canvas-agent`
**Rubric Target**: Section 4 (AI Canvas Agent - 25 points - HIGHEST VALUE)
**Points Goal**: +25 points
**Duration**: 1 full day (8 hours)
**Type**: ✅ Rubric-Required

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

**Files Created**: 2 new files (openai.ts, ai.types.ts)
**Dependencies Added**: `openai@latest` (~3MB)
**Success Criteria**: OpenAI client initialized, test API call successful ✅

---

#### **9.2 Define Canvas Tools as Function Schemas** (90 minutes) ⏳

**Goal**: Define 8+ canvas tools for OpenAI Tool Calling

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
  - Handle errors gracefully

**Files Created**: 2 new files (aiCommands.ts, aiAgent.ts)
**Success Criteria**: 8-12 tool schemas defined, execution routing working ✅

---

[Continuing with Phase 3 tasks 9.3 through 9.11 - AI Command Panel UI, Integration, Testing...]

#### **9.3 AI Command Panel UI** (75 minutes) ⏳

#### **9.4 Integrate Tool Calling with Canvas Hooks** (90 minutes) ⏳

#### **9.5 Test Creation Tools** (40 minutes) ⏳

#### **9.6 Test Manipulation Tools** (40 minutes) ⏳

#### **9.7 Test Layout Tools** (45 minutes) ⏳

#### **9.8 Test Complex Tools** (60 minutes) ⏳

#### **9.9 AI Performance Optimization** (45 minutes) ⏳

#### **9.10 Command History & Preview** (45 minutes) ⏳

#### **9.11 Phase 3 Integration & Testing** (90 minutes) ⏳

[Detailed tasks same as original TaskList v3.1, lines 592-918]

### **Phase 3 Success Criteria** ✅

**Phase 3 Points Earned**: +25 points (highest value feature)
**Cumulative Score After Phase 3**: 65/105 points
**Timeline**: 1 full day (October 16) - Target completion
**Next Phase**: Phase 4a (Performance Optimization)

---

## ⚡ **PHASE 4a: PERFORMANCE OPTIMIZATION** (October 17, 9-11 AM)

**Branch**: `PR10a-feat/performance-optimization`
**Rubric Target**: Sections 2 (Performance - 10 pts), 5 (Technical - partial)
**Points Goal**: +10 points
**Duration**: 2 hours (9 AM to 11 AM)
**Type**: ✅ Rubric-Required

### **PR-10a: Performance Optimization** 🚀

#### **10a.1 Advanced Performance Optimization** (45 minutes) ⏳

**Goal**: Achieve 500+ objects at 60 FPS (Excellent tier)

- [ ] **10a.1.1** Implement advanced viewport culling (20 min)
  - Enhance existing culling with spatial indexing
  - Use quadtree for efficient spatial queries
  - Only render shapes in viewport + 500px buffer
  - Update on pan/zoom

- [ ] **10a.1.2** Implement shape pooling/recycling (15 min)
  - Reuse Konva shape instances
  - Pool for each shape type
  - Reduce garbage collection overhead

- [ ] **10a.1.3** Add performance monitoring (10 min)
  - Track FPS in real-time
  - Monitor render time per frame
  - Display performance stats in debug panel
  - Log performance warnings

**Files Modified**: 3 files (performance.ts, Canvas.tsx, useShapes.ts)
**Success Criteria**: 500+ objects at consistent 60 FPS ✅

---

#### **10a.2 Optimize Firestore Batching** (30 minutes) ⏳

**Goal**: Reduce Firestore writes and improve sync performance

- [ ] **10a.2.1** Implement Firestore batching (20 min)
  - Batch multiple shape updates (100ms window)
  - Use Firestore writeBatch for bulk operations
  - Reduce number of writes (cost optimization)

- [ ] **10a.2.2** Optimize security rules (10 min)
  - Review Firestore security rules for read performance
  - Add indexes for common queries
  - Test read/write performance

**Files Modified**: 2 files (firestore.ts, firestore.rules)
**Success Criteria**: Reduced Firestore writes, faster sync ✅

---

#### **10a.3 Real-Time Sync Optimization** (45 minutes) ⏳

**Goal**: Achieve <100ms object sync, <50ms cursor sync (Excellent tier)

- [ ] **10a.3.1** Optimize Firestore sync latency (20 min)
  - Use Firestore cache more aggressively
  - Implement optimistic updates everywhere
  - Reduce listener scope with queries
  - Upgrade Firestore SDK if needed

- [ ] **10a.3.2** Optimize cursor tracking (15 min)
  - Reduce throttle to 50ms (from 100ms)
  - Use Realtime Database priority/timestamps
  - Implement cursor interpolation for smoothness

- [ ] **10a.3.3** Add sync latency monitoring (10 min)
  - Measure time from action → Firestore → other users
  - Display sync latency in debug panel
  - Track 95th percentile latency

**Files Modified**: 3 files (firestore.ts, realtime.ts, Canvas.tsx)
**Success Criteria**: <100ms object sync, <50ms cursor sync confirmed ✅

---

#### **10a.4 Code Quality & Architecture** (30 minutes) ⏳

**Goal**: Rubric Section 5 (Technical Implementation - partial)

- [ ] **10a.4.1** Code refactoring for clean architecture (15 min)
  - Consolidate duplicate code
  - Extract reusable utilities
  - Improve component modularity
  - Apply DRY principle

- [ ] **10a.4.2** Add comprehensive error handling (10 min)
  - Wrap all async operations in try/catch
  - User-friendly error messages
  - Log errors to console
  - Graceful degradation for service failures

- [ ] **10a.4.3** Security audit (5 min)
  - Review Firestore security rules
  - Ensure no exposed API keys in code
  - Validate user inputs
  - Add rate limiting for AI commands

**Files Modified**: 10+ files (code-wide refactoring)
**Success Criteria**: Clean, well-organized code with proper error handling ✅

---

#### **10a.5 Phase 4a Testing & Validation** (30 minutes) ⏳

**Goal**: Comprehensive performance testing

- [ ] **10a.5.1** Performance validation (15 min)
  - Create 500+ shapes
  - Verify 60 FPS maintained
  - Test with 5+ concurrent users
  - Monitor memory usage

- [ ] **10a.5.2** Sync latency testing (15 min)
  - Measure object sync times (50 operations)
  - Measure cursor sync times (100 movements)
  - Verify <100ms/<50ms targets

**Success Criteria**: All performance targets met ✅

---

### **Phase 4a Success Criteria** ✅

**Rubric Alignment - Section 2 (Performance - 10 points)**:

- [ ] Consistent performance with 500+ objects ✓
- [ ] Supports 5+ concurrent users ✓
- [ ] No degradation under load ✓
- [ ] Smooth interactions at scale ✓
- [ ] Sub-100ms object sync ✓
- [ ] Sub-50ms cursor sync ✓

**Rubric Alignment - Section 5 (Technical - partial 5 points)**:

- [ ] Clean, well-organized code ✓
- [ ] Proper error handling ✓
- [ ] Security audit complete ✓

**Phase 4a Points Earned**: +10 points
**Cumulative Score After Phase 4a**: 75/105 points
**Next Phase**: Phase 4b (Figma-Inspired Interface Structure)

---

## 🎨 **PHASE 4b: FIGMA-INSPIRED INTERFACE STRUCTURE** (October 17, 11 AM-1 PM)

**Branch**: `PR10b-feat/figma-interface-structure`
**Rubric Target**: Section 3 (Tier 2 - 6 pts), Section 5 (Polish - partial 5 pts)
**Points Goal**: +10 points
**Duration**: 2 hours (11 AM to 1 PM)
**Type**: 🎨 Figma-Inspired Enhancement

### **PR-10b: Figma Interface Structure** ✨

#### **10b.1 Left Sidebar - Layers Panel** (60 minutes) ⏳

**Goal**: Tier 2 feature (3 points) - Professional layer management (Figma Critical Feature 1.1)

- [ ] **10b.1.1** Create `src/components/LayersPanel.tsx` (30 min)
  - Left sidebar panel (280px width)
  - List all canvas shapes with icons and names
  - Drag-to-reorder functionality (react-beautiful-dnd or native)
  - Show/hide toggle per shape (eye icon)
  - Lock/unlock toggle per shape (lock icon)
  - Hierarchical display

- [ ] **10b.1.2** Implement z-index management (15 min)
  - Add zIndex property to Shape interface
  - Update Firestore schema
  - Reorder shapes in Canvas based on zIndex
  - Sync z-index changes across users

- [ ] **10b.1.3** Implement show/hide functionality (10 min)
  - Add visible property to Shape interface
  - Filter visible shapes in Canvas rendering
  - Sync visibility state to Firestore

- [ ] **10b.1.4** Implement lock/unlock functionality (5 min)
  - Add locked property to Shape interface
  - Disable drag/edit for locked shapes
  - Visual indicator on locked shapes

**Files Created**: 1 new file (LayersPanel.tsx)
**Files Modified**: 4 files (types.ts, Canvas.tsx, useShapes.ts, App.tsx)
**Success Criteria**: Layers panel shows all shapes, drag-to-reorder changes z-index ✅

---

#### **10b.2 Right Sidebar - Properties Panel** (60 minutes) ⏳

**Goal**: Tier 2 feature enhancement - Professional properties editing (Figma Critical Feature 1.2)

- [ ] **10b.2.1** Create `src/components/PropertiesPanel.tsx` (25 min)
  - Right sidebar panel (280px width)
  - Position & Size section (X, Y, Width, Height inputs)
  - Rotation input (0-360 degrees)
  - Lock aspect ratio toggle (chain icon)
  - Fill color picker integration
  - Stroke properties (weight, color)

- [ ] **10b.2.2** Implement position/size inputs (20 min)
  - Numeric inputs for X, Y coordinates
  - Numeric inputs for Width, Height
  - Update shape on input change
  - Sync changes to Firestore
  - Real-time updates from other users

- [ ] **10b.2.3** Implement alignment tools section (10 min)
  - 9 alignment buttons in properties panel
  - Visual icons for each alignment operation
  - Enable only when shape(s) selected

- [ ] **10b.2.4** Add fill and stroke controls (5 min)
  - Enhanced color picker for fill
  - Stroke toggle (on/off)
  - Stroke weight slider (1-20px)
  - Opacity sliders (0-100%)

**Files Created**: 1 new file (PropertiesPanel.tsx)
**Files Modified**: 3 files (App.tsx, useShapes.ts, types.ts)
**Success Criteria**: Properties panel functional, position/size inputs update shapes in real-time ✅

---

#### **10b.3 Alignment Tools (9 Operations)** (30 minutes) ⏳

**Goal**: Tier 2 feature (3 points) - Professional alignment capabilities

- [ ] **10b.3.1** Create `src/utils/alignment.ts` utilities (20 min)
  - `alignLeft(shapes: Shape[])` - Align to leftmost x
  - `alignCenter(shapes: Shape[])` - Align to average x center
  - `alignRight(shapes: Shape[])` - Align to rightmost x + width
  - `alignTop(shapes: Shape[])` - Align to topmost y
  - `alignMiddle(shapes: Shape[])` - Align to average y center
  - `alignBottom(shapes: Shape[])` - Align to bottommost y + height
  - `distributeHorizontally(shapes: Shape[])` - Even horizontal spacing
  - `distributeVertically(shapes: Shape[])` - Even vertical spacing
  - `alignToCanvasCenter(shapes: Shape[])` - Center on canvas

- [ ] **10b.3.2** Integrate with PropertiesPanel and Toolbar (10 min)
  - Add alignment buttons to PropertiesPanel
  - Enable only when 2+ shapes selected
  - Apply alignment and update Firestore
  - Sync aligned positions across users

**Files Created**: 1 new file (alignment.ts)
**Files Modified**: 2 files (PropertiesPanel.tsx, Toolbar.tsx)
**Success Criteria**: All 9 alignment operations working on multi-selected shapes ✅

---

#### **10b.4 Dual-Sidebar Layout Integration** (30 minutes) ⏳

**Goal**: Professional Figma-like interface with left + right sidebars

- [ ] **10b.4.1** Update App.tsx layout (15 min)
  - Three-column layout: LayersPanel (left) + Canvas (center) + PropertiesPanel (right)
  - Responsive sidebar widths (resizable optional)
  - Smooth sidebar animations
  - Collapsible sidebars (toggle buttons)

- [ ] **10b.4.2** Style sidebars consistently (10 min)
  - Consistent visual design language
  - Professional icon set (Lucide React)
  - Tooltips on all buttons
  - Dark/light theme support

- [ ] **10b.4.3** Test dual-sidebar interaction (5 min)
  - Click layer in LayersPanel → updates PropertiesPanel
  - Change property in PropertiesPanel → updates Canvas + LayersPanel
  - Verify smooth UX flow

**Files Modified**: 3 files (App.tsx, App.css, index.css)
**Success Criteria**: Professional dual-sidebar layout functional ✅

---

#### **10b.5 Phase 4b Integration & Testing** (30 minutes) ⏳

**Goal**: Ensure Figma interface features work together

- [ ] **10b.5.1** Integration testing: Layers panel (10 min)
  - Test drag-to-reorder z-index
  - Test show/hide functionality
  - Test lock/unlock functionality
  - Verify multi-user sync

- [ ] **10b.5.2** Integration testing: Properties panel (10 min)
  - Test position/size inputs
  - Test rotation input
  - Test fill and stroke controls
  - Verify real-time updates

- [ ] **10b.5.3** Integration testing: Alignment tools (10 min)
  - Test all 9 alignment operations
  - Test with various shape selections (2+, 5+, 10+ shapes)
  - Verify multi-user sync

**Success Criteria**: All Figma interface features working together professionally ✅

---

### **Phase 4b Success Criteria** ✅

**Rubric Alignment - Section 3 Tier 2 (6 points)**:

- [ ] Layers panel with drag-to-reorder and hierarchy (3 pts) ✓
- [ ] Alignment tools (align left/right/center, distribute evenly) (3 pts) ✓
- [ ] 9 alignment operations working ✓
- [ ] Show/hide and lock/unlock layers ✓

**Rubric Alignment - Section 5 (Polish - partial 5 points)**:

- [ ] Professional dual-sidebar interface ✓
- [ ] Properties panel with position/size/rotation inputs ✓
- [ ] Consistent visual design ✓
- [ ] Smooth UX flow ✓

**Phase 4b Points Earned**: +10 points (6 Tier 2 + 4 Polish)
**Cumulative Score After Phase 4b**: 85/105 points
**Next Phase**: Phase 5 (Final Documentation & Submission)

---

### **Phase 4 Combined Success Criteria** ✅

**Total Phase 4 Points**: +20 points (Phase 4a: 10 + Phase 4b: 10)
**Cumulative Score After Phase 4**: 85/105 points
**Timeline**: Half day morning (October 17, 9 AM-1 PM) - Target completion
**Deployment**: Pre-production environment ready for final documentation

---

## 📚 **PHASE 5: FINAL DOCUMENTATION & SUBMISSION** (October 17 Afternoon)

**Branch**: `PR11-feat/final-submission`
**Rubric Target**: Sections 6 (Documentation - 5 pts), 7 (AI Dev Log - Pass/Fail), 8 (Demo Video - Pass/Fail)
**Points Goal**: +15 points + Bonus
**Duration**: 4 hours (2 PM to 6 PM)
**Type**: ✅ Rubric-Required

### **PR-11: Documentation & Demo Video** 📋

[Phase 5 tasks remain the same as original TaskList v3.1, lines 1221-1661]

#### **11.1 Add LangSmith Observability - Hybrid Approach Enhancement** (30 minutes) ⏳

#### **11.2 Comprehensive README Update** (60 minutes) ⏳

#### **11.3 Architecture Documentation** (45 minutes) ⏳

#### **11.4 AI Development Log** (30 minutes) ⏳

#### **11.5 Demo Video Script & Planning** (45 minutes) ⏳

#### **11.6 Demo Video Recording** (90 minutes) ⏳

#### **11.7 Final Production Deployment** (45 minutes) ⏳

#### **11.8 Submission Checklist & Final Review** (45 minutes) ⏳

#### **11.9 Bonus Features (Optional)** (60 minutes) ⏳

### **Phase 5 Success Criteria** ✅

**Phase 5 Points Earned**: +15 points + 3-5 bonus = 18-20 points
**Cumulative Score After Phase 5**: 100-107/105 points
**Timeline**: Half day afternoon (October 17, 2 PM-6 PM)
**Final Submission**: Friday, October 17, 2025 EOD

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
| 7. AI Dev Log | Pass/Fail | Pass | 3/5 sections |
| 8. Demo Video | Pass/Fail | Pass | 3-5 min, all requirements |
| **TOTAL** | **100** | **96-105** | **All requirements met** |
| **Bonus** | **+5** | **+3-5** | Innovation, polish, scale |
| **GRAND TOTAL** | **105** | **99-110** | **A+ grade target** |

### **Submission Deadline**: Friday, October 17, 2025 EOD

### **Final Deliverables Checklist**

- [ ] Live production URL accessible with Figma-inspired interface
- [ ] GitHub repository with clear README including hybrid approach
- [ ] All features working in production (including dual sidebars)
- [ ] Demo video uploaded with LangSmith observability segment
- [ ] AI Development Log complete with hybrid approach documentation
- [ ] Architecture documentation complete with Figma features explained
- [ ] No exposed credentials or security issues
- [ ] All rubric requirements verified

---

## 📈 **PROGRESS TRACKING**

### **Daily Goals with Subphases**

**Pre-Sprint (Oct 9-14) - Phase 1**: MVP Foundation
Target: 20 points | Status: ✅ **COMPLETE**

- 7 PRs merged successfully
- Live at: <https://collabcanvas-mvp-53120.web.app>
- Core collaborative infrastructure operational

**Day 1 (Oct 15) - Phase 2a + 2b**: Canvas Features & Figma Transforms
Target: +20 points | Status: ⏳ Pending

- **Morning (Phase 2a)**: Rubric Tier 1 features (+15 points)
- **Afternoon (Phase 2b)**: Figma transform operations (+5 points)

**Day 2 (Oct 16) - Phase 3**: AI Canvas Agent
Target: +25 points | Status: ⏳ Pending

- Full day focus on highest-value feature
- OpenAI Tool Calling implementation

**Day 3 (Oct 17) - Phases 4a + 4b + 5**: Performance, Figma Interface & Submission
Target: +35 points | Status: ⏳ Pending

- **Morning 9-11 AM (Phase 4a)**: Performance optimization (+10 points)
- **Morning 11 AM-1 PM (Phase 4b)**: Figma interface structure (+10 points)
- **Afternoon 2-6 PM (Phase 5)**: Documentation & submission (+15 points)

### **Risk Mitigation**

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| AI API rate limits | Medium | High | Implement caching, retry logic |
| Performance <500 objects | Low | High | Early testing, viewport culling in Phase 4a |
| Figma features too complex | Medium | Medium | Separated into Phase 2b/4b, can be scaled back |
| Demo video recording issues | Medium | Medium | Multiple takes, practice runs |
| Time constraints | Medium | High | Subphases allow feature prioritization |

---

*Task List Version: 5.0 - Complete with Subphases & Tech Stack Alignment*
*Created: October 15, 2025*
*Updated: October 16, 2025 - Added Phase 2a/2b and 4a/4b subphase structure*
*Updated: October 16, 2025 - Aligned with TechStack v5.0 (custom utilities documented)*
*Complete Timeline: October 9-17, 2025 (9 days: 5 days MVP + 4 days sprint)*
*Phase 1 Status: ✅ COMPLETE (20/105 points, 7 PRs merged)*
*Phases 2-5 Timeline: October 15-17, 2025 (3 days, 6 subphases pending)*
*Current Score: 20/105 points | Target: 95-107/105 points (includes +2 LangSmith bonus)*
*Based on: PRD v5.0, WBS v5.0, TechStack v5.0 & CollabCanvas Rubric*
*AI Strategy: Phase 3 OpenAI SDK (fast) → Phase 5 LangSmith (polish)*
*Figma Integration: Phases 2b & 4b (Transform operations + Dual-sidebar interface)*
*Custom Utilities: transform.ts, alignment.ts, useSmartGuides.ts, MarqueeSelection.tsx*
*MVP Foundation: <https://collabcanvas-mvp-53120.web.app> ✅*
