# CollabCanvas Technology Stack

**Version**: 5.0 (Complete Subphase Alignment)
**Last Updated**: October 16, 2025
**Aligned With**: PRD v4.0, TaskList v4.0, WBS v4.0

## Finalized Technology Decisions

This document outlines the confirmed technology stack for the CollabCanvas project, now updated to support the complete **6-subphase structure** (Phase 2a/2b, Phase 4a/4b) with both **rubric-required features** and **Figma-inspired enhancements**.

**Strategic Approach**: This stack supports 85 baseline rubric points (✅ Rubric-Required) plus 15 polish points and bonuses (🎨 Figma-Inspired).

**Key Enhancement**: All Figma-inspired features (Phase 2b transform operations, Phase 4b interface structure) are achievable with **existing Konva.js primitives** and custom utilities—**no new libraries required**.

## Frontend Architecture

### Core Framework: React 19 + Vite + TypeScript

- **Component Architecture**: React 19 with TypeScript for type-safe, scalable UI development
- **Build Tool**: Vite for fast development and optimized production builds
- **Canvas Operations**: Konva.js for high-performance canvas rendering and manipulation
- **Styling**: Tailwind CSS for utility-first, responsive design
- **State Management**: React built-in state + Firebase real-time listeners

### Key Libraries & Tools

**Phase 1 (MVP - Complete)**:

- **Canvas Library**: Konva.js - High-performance canvas with built-in transform features (resize, rotate, multi-select)
- **UI Components**: Basic components built with Tailwind CSS
- **Firebase SDK**: Firebase v9+ for authentication, Firestore, and Realtime Database
- **Testing**: Vitest + React Testing Library for component and integration testing
- **Linting**: ESLint with TypeScript rules

**Phase 2a - Rubric Tier 1** (Required):

- **Color Picker**: react-colorful for Tier 1 feature (2 points)
- **Undo/Redo**: React state + optional Zustand if complex
- **Export**: Konva.js built-in (`toDataURL()`, `toSVG()`)
- **Keyboard Shortcuts**: Native JavaScript event listeners

**Phase 2b - Figma Transform Operations** (Enhancement):

- **8-Point Resize**: Konva.js Transformer (built-in)
- **Rotation Handle**: Konva.js Transformer (built-in)
- **Smart Guides**: Custom implementation using Konva Line shapes
- **Marquee Selection**: Custom implementation using Konva Rect + collision detection
- **Transform Utilities**: Custom `src/utils/transform.ts` for math helpers

**Phase 3 - AI Canvas Agent** (Critical):

- **AI/LLM Integration**: OpenAI SDK (`openai@latest`) for Tool Calling - **CRITICAL for 25 rubric points**
- **Observability**: LangSmith (Phase 5) for production monitoring
- **Caching**: localStorage for command caching

**Phase 4a - Performance** (Required):

- **Performance Monitoring**: Browser Performance API + React DevTools Profiler (built-in)
- **Optimization**: Viewport culling, shape pooling (custom implementations)

**Phase 4b - Figma Interface** (Enhancement):

- **Drag & Drop**: @dnd-kit for Layers Panel Tier 2 feature (3 points)
- **Alignment Utilities**: Custom `src/utils/alignment.ts` for 9 operations
- **Layout**: React + Tailwind for dual-sidebar structure

## Backend & Services: Firebase Stack

### Authentication: Firebase Authentication

- **User Management**: Email/password signup and login
- **Social Login**: Google OAuth integration
- **Session Management**: Firebase handles token management and refresh
- **User Profiles**: Display names (Google name or email prefix)

### Database: Dual Firebase Database Strategy

- **Primary Database**: Cloud Firestore for persistent canvas state
  - Canvas metadata and shape data
  - User permissions and canvas settings
  - Optimized for complex queries and transactions
- **Real-time Database**: Firebase Realtime Database for high-frequency updates
  - Live cursor positions and user presence
  - Optimized for low-latency real-time synchronization

### Hosting & Deployment: Firebase Hosting

- **Static Hosting**: Firebase Hosting for React app deployment
- **Global CDN**: Automatic global content delivery
- **SSL/HTTPS**: Automatic SSL certificate management
- **Custom Domain**: Easy domain configuration

## Real-time Collaboration Strategy

### Firebase-Based Architecture

- **Primary Sync**: Firestore for persistent state (shapes, metadata)
- **High-frequency Updates**: Firebase Realtime Database for cursors/presence
- **Conflict Resolution**: Simple object locking (first-come basis)
- **Performance Target**: <100ms for shape changes, <50ms for cursor updates
- **Automatic Cleanup**: Firebase onDisconnect() for user presence management

### Database Schema Strategy

```javascript
// Firestore: canvas/global-canvas-v1
{
  canvasId: "global-canvas-v1",
  shapes: [
    {
      id: "shape_uuid_1",
      type: "rectangle",
      x: 100, y: 200, width: 150, height: 100,
      fill: "#cccccc",
      createdBy: "user_id",
      createdAt: "timestamp",
      lastModifiedBy: "user_id",
      lastModifiedAt: "timestamp",
      isLocked: false,
      lockedBy: null
    }
  ],
  lastUpdated: "timestamp"
}

// Realtime DB: /sessions/global-canvas-v1/{userId}
{
  displayName: "John Doe",
  cursorColor: "#FF5733",
  cursorX: 450, cursorY: 300,
  lastSeen: "timestamp"
}
```

## Development Environment

### Required Tools

- **Node.js**: v18+ (v24.10.0 in use)
- **Package Manager**: npm v11.6.1
- **Firebase CLI**: For local development and deployment
- **Code Editor**: VS Code with Firebase and React extensions

### Development Workflow

- **Version Control**: Git with conventional commit messages
- **Local Development**: Firebase Emulator Suite for local testing
- **Firebase Project**: Shared Firebase project configuration
- **Environment Variables**: Firebase config managed through environment files

## MVP Success Criteria (24-Hour Constraint)

### Technical Requirements

- **Real-time Sync**: 2+ users can edit simultaneously without conflicts
- **Performance**: Shape changes sync within 100ms via Firestore
- **Presence**: Cursor updates sync within 50ms via Realtime Database
- **Browser Support**: Works reliably in Chrome (primary target)
- **Deployment**: Publicly accessible via Firebase Hosting
- **Authentication**: Multiple users can join via Firebase Auth

### Functional Requirements

- **Shape Management**: Users can create, move, and delete rectangles
- **Conflict Resolution**: Simple object locking prevents simultaneous edits
- **Canvas Navigation**: Pan and zoom with 2000x2000px boundaries
- **Persistence**: Work persists when users leave and rejoin
- **User Presence**: Real-time cursors show user names and colors

## Rationale for Firebase Stack (24-Hour MVP)

### Why Firebase for This Sprint?

1. **Zero Backend Setup**: No server infrastructure, database setup, or deployment configuration needed
2. **Built-in Real-time**: Firestore and Realtime Database provide instant synchronization out of the box
3. **Authentication Ready**: Firebase Auth handles user management with minimal code
4. **Instant Deployment**: Firebase Hosting deploys with a single command
5. **Generous Free Tier**: Perfect for MVP development and testing without cost concerns
6. **Proven at Scale**: Used by apps with millions of users, so scalability is proven
7. **Time-to-Market**: Eliminates 80% of backend infrastructure work, critical for 24-hour constraint

### Trade-offs Accepted for Speed

- **Vendor Lock-in**: Acceptable for MVP to prove concept
- **Less Customization**: Firebase's opinionated approach trades flexibility for speed
- **Cost at Scale**: More expensive than self-hosted solutions at enterprise scale
- **Limited Backend Logic**: Complex business logic requires Cloud Functions (Phase 2+)

### Future Migration Path

This Firebase foundation can either:

1. **Scale with Firebase**: Add Cloud Functions, advanced security rules, etc.
2. **Migrate Gradually**: Replace components with custom backend as needs grow
3. **Hybrid Approach**: Keep Firebase for auth/real-time, add custom APIs for complex features

**The Strategic Decision**: For a 24-hour MVP focused on proving real-time collaboration works, Firebase is the optimal choice. It eliminates infrastructure complexity and lets us focus entirely on the core user experience and collaboration mechanics.

---

## Phase 2b & 4b: Figma-Inspired Custom Utilities

### Transform Utilities (Phase 2b)

**File**: `src/utils/transform.ts`
**Purpose**: Mathematical helpers for Figma-inspired transform operations
**Libraries**: None (pure JavaScript/TypeScript, uses Konva.js primitives)
**Timeframe**: 20 minutes (TaskList 8b.1.2)

**Functions Needed**:

- `calculateResizeHandles(shape, handleType)` - Calculate 8-point resize coordinates
- `calculateRotation(shape, mousePosition)` - Calculate rotation angle from center point
- `maintainAspectRatio(shape, newDimensions, originalRatio)` - Aspect ratio locking math
- `snapToAngle(angle, snapIncrement)` - Snap rotation to 15° increments (Shift key)

**Dependencies**: Konva.js shape primitives (built-in)

---

### Smart Guides Implementation (Phase 2b)

**Approach**: Custom Konva Line shapes for visual alignment guides
**Purpose**: Show red/blue alignment guides when dragging shapes
**Timeframe**: 30 minutes (TaskList 8b.3.2)

**Implementation Strategy**:

- Create `src/hooks/useSmartGuides.ts` hook
- Calculate when shape edges/centers align with other shapes
- Render Konva Line shapes for visual feedback
- Snap threshold: 5px alignment tolerance
- Color coding: Red for edge alignment, Blue for center alignment

**Functions Needed**:

- `detectAlignmentGuides(draggedShape, allShapes, threshold)` - Find alignment opportunities
- `calculateGuideLines(alignments)` - Generate Line coordinates
- `snapToGuides(position, guides, threshold)` - Snap position to nearest guide

**Dependencies**: Konva Line shapes (built-in)

---

### Marquee Selection Implementation (Phase 2b)

**Approach**: Custom Konva Rect with collision detection
**Purpose**: Click-and-drag selection box for multi-select
**Timeframe**: 25 minutes (TaskList 8b.4.2)

**Implementation Strategy**:

- Create `src/components/MarqueeSelection.tsx` component
- Render dashed blue rectangle during mouse drag
- Use Konva collision detection to find shapes within bounds
- Visual feedback: Semi-transparent blue fill (opacity: 0.1)

**Functions Needed**:

- `calculateMarqueeBounds(startPoint, currentPoint)` - Rectangle coordinates
- `findShapesInBounds(shapes, marqueeBounds)` - Collision detection
- `updateSelection(selectedShapes, newShapes, shiftKey)` - Add/replace selection

**Dependencies**: Konva Rect (built-in), Konva collision detection

---

### Alignment Utilities (Phase 4b)

**File**: `src/utils/alignment.ts`
**Purpose**: Mathematical helpers for Figma-inspired alignment operations
**Libraries**: None (pure JavaScript/TypeScript)
**Timeframe**: 20 minutes (TaskList 10b.3.1)

**9 Alignment Operations**:

1. **`alignLeft(shapes: Shape[])`**
   - Align all shapes to the leftmost x coordinate
   - Math: `targetX = Math.min(...shapes.map(s => s.x))`

2. **`alignCenter(shapes: Shape[])`**
   - Align all shapes to the average x center
   - Math: `targetX = avg(shapes.map(s => s.x + s.width / 2)) - shape.width / 2`

3. **`alignRight(shapes: Shape[])`**
   - Align all shapes to the rightmost x + width
   - Math: `targetX = Math.max(...shapes.map(s => s.x + s.width)) - shape.width`

4. **`alignTop(shapes: Shape[])`**
   - Align all shapes to the topmost y coordinate
   - Math: `targetY = Math.min(...shapes.map(s => s.y))`

5. **`alignMiddle(shapes: Shape[])`**
   - Align all shapes to the average y center
   - Math: `targetY = avg(shapes.map(s => s.y + s.height / 2)) - shape.height / 2`

6. **`alignBottom(shapes: Shape[])`**
   - Align all shapes to the bottommost y + height
   - Math: `targetY = Math.max(...shapes.map(s => s.y + s.height)) - shape.height`

7. **`distributeHorizontally(shapes: Shape[])`**
   - Space shapes evenly with equal gaps horizontally
   - Math: Calculate total width, divide remaining space by (n-1) gaps

8. **`distributeVertically(shapes: Shape[])`**
   - Space shapes evenly with equal gaps vertically
   - Math: Calculate total height, divide remaining space by (n-1) gaps

9. **`alignToCanvasCenter(shapes: Shape[])`**
   - Center selected shapes on the canvas
   - Math: `targetX = (canvasWidth / 2) - (groupWidth / 2)`, `targetY = (canvasHeight / 2) - (groupHeight / 2)`

**Return Type**: `{ shapeId: string, newX: number, newY: number }[]` for Firestore update

**Dependencies**: None (pure math)

---

### Konva.js - Complete Feature Support

**Version**: Latest stable
**Why Konva.js**: Powerful HTML5 Canvas framework with built-in support for Figma-like features

**Phase 2b Transform Support**:

- ✅ **Built-in Transformer** with 8 resize handles via `enabledAnchors` prop
  - Corner handles: `['top-left', 'top-right', 'bottom-left', 'bottom-right']`
  - Edge handles: `['top-center', 'middle-right', 'bottom-center', 'middle-left']`
- ✅ **Built-in rotation handle** via `rotateEnabled` prop
  - Rotation snapping: Use `rotationSnaps` array for Shift-snap to 15° increments
- ✅ **Multi-node transform support** for group operations via `nodes()` method
- ✅ **Aspect ratio locking** via `keepRatio` prop (Shift key toggle)
- ⚠️ **Smart guides**: Custom implementation using Konva `Line` shapes
- ⚠️ **Marquee selection**: Custom implementation using Konva `Rect` + collision

**Phase 4b Interface Support**:

- ✅ **Layer management**: z-index control via `zIndex()` method
- ✅ **Show/hide layers**: `visible` property on shapes
- ✅ **Shape selection**: Built-in selection and highlighting
- ✅ **Export**: `stage.toDataURL()` for PNG, `stage.toSVG()` for SVG (experimental)
- ⚠️ **Alignment operations**: Custom utility functions in `alignment.ts`

**Performance Features**:

- ✅ **Supports 500+ shapes at 60 FPS** with viewport culling
- ✅ **Efficient re-rendering**: Only changed layers re-render automatically
- ✅ **Layer caching**: `cache()` method for static elements
- ✅ **Batch updates**: `batchDraw()` for multiple changes

**Code Examples**:

```typescript
// 8-point resize with aspect ratio lock
const transformer = new Konva.Transformer({
  nodes: [shape],
  enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right',
                   'top-center', 'middle-right', 'bottom-center', 'middle-left'],
  keepRatio: false, // Toggle with Shift key
  rotateEnabled: true,
  rotationSnaps: [0, 45, 90, 135, 180, 225, 270, 315] // Shift-snap angles
});

// Multi-select transform
transformer.nodes([shape1, shape2, shape3]);

// Viewport culling for performance
layer.children.forEach(shape => {
  const isVisible = shape.isClientRectOnScreen();
  shape.visible(isVisible);
});
```

---

## Phase 2-5 Technology Enhancements (Rubric-Aligned)

### AI Canvas Agent Infrastructure (Phase 3 - 25 Points)

**CRITICAL ADDITION**: Hybrid Approach - OpenAI Tool Calling + LangSmith Observability

#### **Phase 3 (October 16): OpenAI SDK with Tool Calling**

```bash
# Installation
npm install openai@latest

# Environment Configuration (.env.local)
VITE_OPENAI_API_KEY=sk-...
```

**Why Direct OpenAI SDK for Phase 3?**

- **Fast setup**: 30 minutes to working prototype (vs 60-90 min with LangChain)
- **Tool calling built-in**: Perfect for structured canvas commands (8+ command types)
- **Simple debugging**: Direct API inspection during development crunch
- **Minimal dependencies**: 1 package (3MB) vs 5+ packages (15-20MB)
- **Time-critical**: 1 day to deliver 25 rubric points

**Tool Calling Pattern** (from AI School Week 3.1):

- Define 8+ canvas tools as function schemas (creation, manipulation, layout, complex)
- LLM suggests action → Your code executes via React hooks
- Guaranteed structured JSON output (no parsing errors)
- Natural language → Canvas commands in <2 seconds

#### **Phase 5 (October 17 PM): Add LangSmith Observability**

```bash
# Installation
npm install langsmith

# Environment Configuration (.env.local)
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=<your-langsmith-key>
```

**Why Add LangSmith for Phase 5?**

- **Non-breaking enhancement**: Wraps existing OpenAI client (5 lines of code)
- **Production monitoring**: Automatic tracing of all AI calls
- **Demo video value**: Show professional metrics (response times, costs, accuracy)
- **Zero code changes**: Existing tool calling logic stays identical
- **Free tier**: 50,000 traces/month (sufficient for development + demo)

**Implementation Strategy**:

- **Phase 3 (MVP)**: Direct OpenAI SDK with tool calling
  - Client-side API calls with dangerouslyAllowBrowser
  - Focus on getting 8+ commands working quickly
  - Simple console.log debugging
- **Phase 5 (Enhancement)**: Wrap with LangSmith
  - Add `wrapOpenAI(client)` for automatic tracing
  - Zero changes to tool calling code
  - Get detailed observability for demo video
- **Production (Future)**: Proxy through Firebase Cloud Functions for security
- **Caching**: localStorage for common commands (reduce API costs)

### Additional Phase 2-5 Libraries

**Color Picker (Phase 2 - Tier 1 Feature)**:

```bash
npm install react-colorful
```

- 2.8kb lightweight library
- Zero dependencies
- Saves 2-3 hours vs building from scratch

**Drag & Drop (Phase 4 - Tier 2 Feature)**:

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

- Modern drag-and-drop for layers panel
- Excellent TypeScript support
- Replaces unmaintained react-beautiful-dnd

**Performance Monitoring (Phase 4)**:

- Browser Performance API (built-in, no install)
- React DevTools Profiler (built-in, no install)
- Target: 500+ objects at 60 FPS

**Optional State Management**:

```bash
npm install zustand  # Only if React state becomes complex
```

### Updated Database Schema (AI Integration)

```javascript
// Firestore: canvas/global-canvas-v1 (Enhanced)
{
  shapes: [
    {
      // ... existing fields ...
      createdBy: "user_id" | "ai-agent",
      aiCommand: "Create a red circle" | null,
      aiGeneratedAt: timestamp | null
    }
  ],
  aiCommandHistory: [
    {
      command: "Create a login form",
      executedBy: "user_id",
      executedAt: timestamp,
      shapesCreated: ["shape_uuid_1", "shape_uuid_2"],
      success: true,
      responseTime: 1.8  // seconds
    }
  ]
}
```

### Installation Timeline

**Before Phase 2 (October 15)**:

```bash
npm install react-colorful
```

**Before Phase 3 (October 16)** - **CRITICAL**:

```bash
npm install openai@latest
# Create .env.local and add OpenAI API key
# Estimated setup time: 30 minutes (hybrid approach saves 30-60 min vs pure LangChain)
```

**Before Phase 4 (October 17 AM)**:

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

**Phase 5 (October 17 PM)** - **ENHANCEMENT**:

```bash
npm install langsmith
# Add LangSmith API key to .env.local
# Wrap OpenAI client (5 minutes)
# Estimated setup time: 15 minutes total
```

### Cost Analysis

**OpenAI API (Phase 3 & 5)**:

- GPT-4o-mini: ~$0.02 per command (recommended for speed)
- GPT-4-turbo: ~$0.05 per command (if needed for complex commands)
- Development testing: $5-10 (Phase 3)
- Demo video recording: $2-3 (Phase 5)
- **Total Budget**: $15-20

**LangSmith (Phase 5)**:

- **Free Tier**: 50,000 traces/month
- **Development Usage**: ~1,000 traces (well within free tier)
- **Cost**: $0

**Total Project Cost**: $15-20 (same as OpenAI-only approach) ✅

### Security Considerations

**Phase 3 (MVP Approach)**:

- Client-side API calls (acceptable for demo)
- Environment variables for API keys
- Rate limiting on client side

**Phase 5+ (Production)**:

- Migrate to Firebase Cloud Functions
- Server-side API proxy
- No exposed credentials

### Technology Stack Summary (Complete)

| Component | Library | Phase | Purpose | Points | Type |
|-----------|---------|-------|---------|--------|------|
| Frontend | React 19 + Vite + TS | 1 | Core framework | - | ✅ |
| Canvas | Konva.js | 1 | Shape rendering | - | ✅ |
| Styling | Tailwind CSS | 1 | UI design | - | ✅ |
| Auth | Firebase Auth | 1 | User management | - | ✅ |
| Database | Firestore + RTDB | 1 | Real-time sync | 30 | ✅ |
| Hosting | Firebase Hosting | 1 | Deployment | - | ✅ |
| **Color Picker** | **react-colorful** | **2a** | **Tier 1 feature** | **2** | ✅ |
| **Undo/Redo** | **React state** | **2a** | **Tier 1 feature** | **2** | ✅ |
| **Keyboard** | **Native JS** | **2a** | **Tier 1 feature** | **2** | ✅ |
| **Export** | **Konva.js** | **2a** | **PNG/SVG** | - | ✅ |
| **Transform Handles** | **Konva Transformer** | **2b** | **8-point resize** | **+3** | 🎨 |
| **Rotation** | **Konva Transformer** | **2b** | **Rotate handle** | **+1** | 🎨 |
| **Smart Guides** | **Custom (Konva Line)** | **2b** | **Alignment** | **+1** | 🎨 |
| **Marquee Select** | **Custom (Konva Rect)** | **2b** | **Multi-select** | - | 🎨 |
| **AI Agent** | **OpenAI SDK** | **3** | **Tool calling** | **25** ⭐ | ✅ |
| **Viewport Culling** | **Custom** | **4a** | **Performance** | - | ✅ |
| **Shape Pooling** | **Custom** | **4a** | **Performance** | - | ✅ |
| **Firestore Batch** | **Firebase SDK** | **4a** | **Optimize writes** | - | ✅ |
| **Layers Panel** | **@dnd-kit** | **4b** | **Tier 2 feature** | **3** | 🎨 |
| **Properties Panel** | **React + Tailwind** | **4b** | **Right sidebar** | - | 🎨 |
| **Alignment Tools** | **Custom (alignment.ts)** | **4b** | **9 operations** | **3** | 🎨 |
| **Observability** | **LangSmith** | **5** | **AI monitoring** | **+2 bonus** 🎁 | ✅ |
| Performance API | Built-in | 4a | 60 FPS monitoring | - | ✅ |
| Testing | Vitest + RTL | 1-5 | Quality assurance | - | ✅ |

**Total Rubric Coverage**: 100/100 points + 7 bonus = 107/105
**Legend**: ✅ Rubric-Required | 🎨 Figma-Inspired | ⭐ Highest Value
**Hybrid Approach Benefit**: Faster Phase 3 development + Professional Phase 5 polish
**Custom Implementations**: Transform utilities, Smart guides, Marquee selection, Alignment tools (all achievable with Konva.js primitives)

### Risk Assessment (Updated with Hybrid Approach)

**Eliminated Risks**:

- ✅ AI infrastructure now defined (was critical gap)
- ✅ **Hybrid approach reduces Phase 3 complexity** (OpenAI SDK simpler than LangChain)
- ✅ **Fast debugging strategy** (direct API → console.log in Phase 3)
- ✅ **LangSmith safety net** (add observability in Phase 5 without code changes)
- ✅ Drag-and-drop library identified (@dnd-kit)
- ✅ Color picker solution specified (react-colorful)
- ✅ Performance monitoring tools listed (Performance API)
- ✅ **Phase 2b custom implementations documented** (transform, smart guides, marquee)
- ✅ **Phase 4b alignment utilities documented** (9 operations specified)
- ✅ **Konva.js capabilities clarified** (built-in vs custom features)

**Remaining Risks (Minimal)**:

- ⚠️ OpenAI API rate limits (mitigate with caching + retry logic)
- ⚠️ AI response time variability (target <2s, GPT-4o-mini for speed)
- ⚠️ API costs exceeding budget (monitor usage, caching reduces calls)
- ⚠️ LangSmith setup time (minimal - 15 min in Phase 5)
- ⚠️ Custom utility complexity (transform.ts, alignment.ts) - **LOW RISK**: Pure math, manageable within timeframes

**Mitigation Strategy**:

- **Phase 3 Focus**: Get 25 points quickly with simple OpenAI SDK
- **Phase 5 Safety**: Add LangSmith for production polish (optional but valuable)
- Aggressive command caching in localStorage (reduce API costs)
- Fallback to pattern matching if API fails
- Budget alert at $15 usage
- Use GPT-4o-mini (faster + cheaper) over GPT-4-turbo

**Hybrid Approach Advantage**: If AI integration struggles in Phase 3, debugging is simpler without framework abstractions. LangSmith can be skipped in Phase 5 if time-constrained (not required for 25 AI points).

---

*Technology Stack Version: 5.0 (Complete Subphase Alignment)*
*Created: October 13, 2025 - Aligned with PRD v1.0*
*Updated: October 15, 2025 - Phase 2-5 enhancements added*
*Updated: October 15, 2025 - Hybrid approach (OpenAI SDK + LangSmith) based on AI School evaluation*
*Updated: October 16, 2025 - Phase 2a/2b and 4a/4b subphase structure added*
*Updated: October 16, 2025 - Added custom utilities documentation (transform.ts, alignment.ts)*
*Updated: October 16, 2025 - Expanded Konva.js capabilities (built-in vs custom features)*
*Aligned With: PRD v4.0, TaskList v4.0, WBS v4.0*
*Status: Phase 1 Production Live @ <https://collabcanvas-mvp-53120.web.app>*
*Readiness: ✅ Phase 2b: Custom utilities (transform.ts) | Phase 3: OpenAI SDK (30 min) | Phase 4b: Alignment utilities (alignment.ts) | Phase 5: LangSmith wrapper (15 min)*
*Strategy: ✅ Rubric baseline (85 pts) + 🎨 Figma polish (15 pts + bonus) → Fast Phase 3 delivery → Professional Phase 5 polish*
*Custom Implementations: All Figma-inspired features achievable with Konva.js primitives (no new libraries required)*
