# CollabCanvas - Product Requirements Document

## Document Status

**Version**: 5.0 (Complete Technology Stack Alignment)
**Timeline**: October 14-17, 2025 (4-day development sprint)
**Submission Deadline**: Friday, October 17, 2025 EOD
**Target Score**: 95-107/105 points (>90% success rate)
**Latest Update**: Aligned with TechStack v5.0 (custom utilities documented)

## Executive Summary

CollabCanvas is a production-ready, AI-powered real-time collaborative canvas application with a **Figma-inspired professional interface** designed to enable teams to think together visually. Building on a successful MVP deployment (Phase 1), this PRD outlines the path to a full-featured platform with AI canvas agent, professional design tools, and enterprise-grade performance—all aligned with the CollabCanvas Rubric requirements.

**Key Differentiators**:

- **AI Canvas Agent**: Natural language commands for canvas manipulation (25 points - highest rubric value)
- **Real-time Collaboration**: Sub-100ms sync with conflict resolution and multi-user presence
- **Figma-Inspired Interface**: Professional dual-sidebar layout (layers panel + properties panel)
- **Critical Transform Operations**: 8-point resize handles, rotation, smart guides, marquee selection
- **High Performance**: 500+ objects at 60 FPS supporting 5+ concurrent users

**Development Approach**: Progressive enhancement across 5 phases, with Phase 1 (MVP) completed and Phases 2-5 delivering rubric-aligned features with integrated Figma Phase 1 Critical Core Features by Friday.

## Product Vision

To create the most intuitive and powerful collaborative canvas platform that empowers teams to express ideas visually and collaborate seamlessly, regardless of their physical location.

## Target Market

- **Primary**: Small to medium-sized teams (5-50 people) in tech companies, design agencies, and consulting firms
- **Secondary**: Educational institutions, workshops, and training organizations
- **Tertiary**: Individual creators and freelancers who need collaborative presentation tools

## User Personas & User Stories

### **1. The Designer (Canvas Owner)**

*"I create and control the collaborative workspace"*

**Profile**: The team member who initiates a collaborative session by creating a new canvas. They own the workspace, control access, and guide the overall session direction. They're responsible for inviting collaborators and maintaining the canvas.

**Core Need**: To create an effective collaborative workspace where their team can work together visually.

**User Stories:**

- As a Designer, I want to **create a new canvas quickly** so that I can start a collaborative session immediately
- As a Designer, I want to **invite collaborators by sharing a URL** so that my team can join easily
- As a Designer, I want to **see who is currently active on the canvas** so that I know who's participating
- As a Designer, I want to **add shapes to organize ideas** so that we can structure our thinking visually
- As a Designer, I want to **see real-time changes from collaborators** so that I can track our progress together

### **2. The Collaborator (Invited User)**

*"I join the workspace to contribute and build on ideas"*

**Profile**: A team member who receives an invitation to join an existing canvas. They contribute to the collaborative session by adding shapes, moving elements, and building on others' ideas. They respect the Designer's leadership while actively participating.

**Core Need**: To join seamlessly and contribute meaningfully to the collaborative workspace.

**User Stories:**

- As a Collaborator, I want to **join a canvas using a shared URL** so that I can participate without complex setup
- As a Collaborator, I want to **see other participants' cursors** so that I know where everyone is working
- As a Collaborator, I want to **add and move shapes** so that I can contribute my ideas visually
- As a Collaborator, I want to **see changes in real-time** so that I can build on others' work immediately
- As a Collaborator, I want to **avoid conflicts when editing** so that our work doesn't interfere with each other

### **24-Hour MVP Success Criteria (Concrete & Deliverable)**

- **CORE VALIDATION**: 2+ users can simultaneously create, move, and see rectangles for 5+ minutes
- **TECHNICAL PROOF**: Real-time sync working reliably in Chrome browser
- **USER EXPERIENCE**: New user can create first rectangle within 30 seconds of joining
- **DEPLOYMENT PROOF**: Publicly accessible via Firebase Hosting URL
- **AUTHENTICATION PROOF**: Multiple users can join via Firebase Auth (email/Google)

## Finalized Technology Stack

### Frontend

- **React** + **Vite** for fast development and component architecture
- **Konva.js** for high-performance canvas rendering and manipulation
- **Tailwind CSS** for utility-first styling
- **TypeScript** for type safety

### Backend & Services

- **Firebase Authentication** for user management (email/password + Google)
- **Cloud Firestore** for persistent state (shapes, metadata)
- **Firebase Realtime Database** for high-frequency updates (cursors, presence)
- **Firebase Hosting** for deployment and static file serving

### Real-time Architecture

- **Firestore** for canvas state persistence with real-time listeners
- **Realtime Database** for cursor positions and user presence
- **Simple object locking** (first-come basis) for conflict resolution
- **Firebase onDisconnect()** for automatic cleanup

### Rationale for Firebase Stack

- **Fastest setup**: Authentication is plug-and-play with Firebase Auth
- **Built-in real-time**: Firestore and RTDB provide instant synchronization
- **Simple deployment**: Firebase Hosting integrates seamlessly
- **Generous free tier**: Perfect for MVP development and testing
- **24-hour constraint**: Eliminates backend infrastructure setup time

## Phase 1 - Minimum Viable Product (24-Hour Sprint)

**Sprint Rationale**: This is a focused 24-hour development sprint to validate the technical feasibility and core user experience of real-time collaborative canvas editing. This project aims to build a solid multiplayer foundation with basic canvas functionality to pass Gauntlet AI project requirements.

**Key Constraints & Approach**:

- **Timeline**: 24-hour MVP deadline (Due 2025.10.14)
- **Goal**: Build a solid multiplayer foundation with basic canvas functionality
- **Top Priority**: Everything else can be simplified, but if sync is broken, you fail MVP
- **Success Definition**: If 2+ users can simultaneously create, move, and see each other's rectangles in real-time without major conflicts, the sprint succeeds
- **Critical Path Focus**: Real-time synchronization via Firebase is the core technical challenge. If sync works reliably, the MVP succeeds. If sync is broken, the MVP Sprint FAILS. All other features can be simplified or mocked.

**Core MVP Features**:

1. **Canvas Workspace**
   - **Size**: 2000x2000px bounded canvas
   - **Constraints**: Objects cannot be placed or moved outside boundaries
   - **Navigation**: Pan and zoom with hard boundaries
   - **Grid**: Optional overlay for alignment assistance

2. **Shape System**
   - **Types**: Rectangles only
   - **Styling**: Fixed gray fill (#cccccc)
   - **Interaction**: Click to select, drag to move, Delete key to remove
   - **Creation**: Button creates shape at viewport center (100x100px default size)

3. **Real-time Collaboration**
   - Live cursor tracking with user names and unique colors
   - Real-time shape synchronization
   - Simple object locking (first-come basis)
   - User presence indicators and online status

4. **Authentication System**
   - Firebase Auth with email/password signup/login
   - Google social login integration
   - User display names (Google name or email prefix)
   - Persistent user sessions

5. **Essential UI**
   - Canvas toolbar with shape creation controls
   - User presence list showing online collaborators
   - Simple navigation and zoom controls

**Success Criteria**:

- 2+ users can edit simultaneously without conflicts
- Basic functionality works in Chrome (primary browser)
- Deployed via Firebase Hosting and publicly accessible
- Authentication allows multiple users to join via Firebase Auth
- Real-time cursors show user presence with names and colors
- Users can create, move, and delete rectangles
- Object locking prevents simultaneous edits (first user to drag locks object)
- Canvas supports pan and zoom with 2000x2000px boundaries
- Work persists when users leave and rejoin

**Development Timeline** (24-Hour Sprint):

- **Hours 1-6**: Project setup, basic canvas, Firebase auth setup (**HIGH RISK PERIOD**)
- **Hours 7-12**: Rectangle creation and basic manipulation
- **Hours 13-18**: Real-time synchronization and cursor tracking (**CRITICAL PATH**)
- **Hours 19-24**: User presence, testing, and deployment

## **24-Hour MVP Execution Plan**

### **Critical Success Checkpoints**

- **Hour 4**: Basic React + Vite + Konva setup working
- **Hour 8**: User can create and drag one rectangle
- **Hour 12**: Firebase Auth working (email login minimum)
- **Hour 16**: Two browser tabs can see each other's rectangles (**MAKE OR BREAK**)
- **Hour 20**: Cursor tracking between users
- **Hour 23**: Deployed and publicly accessible

### **Risk Mitigation & Fallback Plan**

**Hour 0-4 Risk**: Firebase/Konva setup complexity

- **Fallback**: Use simpler canvas library if Konva blocks progress
- **Backup**: Anonymous users if Firebase Auth fails

**Hour 12-16 Risk**: Real-time sync implementation

- **Fallback**: If Firestore real-time fails, use polling every 2 seconds
- **Nuclear Option**: Single-user canvas with "multiplayer coming soon"

**Hour 20-24 Risk**: Integration bugs

- **Approach**: Deploy minimal working version, document known issues
- **Priority**: Working sync > Perfect UI

**The 80/20 Rule**: Focus 80% of time on real-time sync, 20% on everything else

**Sync Strategy**:

- **Primary Sync**: Firestore for persistent state (shapes, metadata)
- **High-frequency Updates**: Firebase Realtime Database for cursors/presence
- **Conflict Resolution**: Simple object locking (first-come basis)
- **Performance**: <100ms for shape changes, <50ms for cursor updates

**Database Schema**:

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

**Why Two Databases?**

- **Firestore**: For persistent canvas state (shapes, metadata) - optimized for complex queries
- **Realtime Database**: For high-frequency updates (cursor positions, presence) - lower latency

---

## Figma-Inspired Feature Integration Strategy

### Critical Features from Figma Feature Gap Analysis

Based on the comprehensive Figma Feature Gap Analysis, the following **Phase 1 Critical Core Features** have been integrated into the 4-day development timeline via dedicated **subphases (2a/2b, 4a/4b)**:

**✅ Integrated Features** (distributed across dedicated Figma subphases):

1. **Multi-Selection System** (3.1) → **Phase 2b** (Oct 15 PM)
   - Type: 🎨 Figma-Inspired Enhancement
   - Marquee selection box (click-and-drag)
   - Shift+click and Ctrl+click multi-select
   - Select all (Ctrl+A)
   - Visual indication of multiple selected objects

2. **Transform Operations** (3.2) → **Phase 2b** (Oct 15 PM)
   - Type: 🎨 Figma-Inspired Enhancement
   - 8-point resize handles on selected shapes
   - Rotation handle above selection
   - Smart guides during drag operations
   - Aspect ratio locking (Shift+drag)

3. **Layers Panel** (1.1) → **Phase 4b** (Oct 17, 11 AM - 1 PM)
   - Type: 🎨 Figma-Inspired Enhancement
   - Left sidebar with hierarchical tree structure
   - Drag-and-drop to reorder z-index
   - Show/hide and lock/unlock layers
   - Layer selection integration

4. **Properties Panel** (1.2) → **Phase 4b** (Oct 17, 11 AM - 1 PM)
   - Type: 🎨 Figma-Inspired Enhancement
   - Right sidebar with element properties
   - Position, size, and rotation inputs
   - Alignment and distribution tools (9 operations)
   - Fill and stroke properties

5. **Frames & Artboards** (2.1) → **Phase 4b** (Stretch Goal)
   - Type: 🎨 Figma-Inspired Enhancement
   - Frame tool with presets
   - Device size templates
   - Frame properties panel

**⏸️ Deferred Features** (complexity exceeds 4-day timeline):

6. **Pen Tool & Vector Editing** (4.1) - 5-7 days estimated
   - Reason: Requires complex bezier curve mathematics and vector path editing logic
   - Alternative: Focus on simpler shape primitives (lines, arrows in Phase 2a)
   - Future Enhancement: Post-submission feature for v2.0

**Subphase Structure**:

| Original Phase | Rubric Subphase | Figma Subphase | Purpose |
|----------------|-----------------|----------------|---------|
| **Phase 2** | **Phase 2a** (AM) | **Phase 2b** (PM) | Tier 1 features vs Transform operations |
| **Phase 3** | **Phase 3** (Full day) | N/A | AI Canvas Agent (highest rubric value) |
| **Phase 4** | **Phase 4a** (9-11 AM) | **Phase 4b** (11 AM-1 PM) | Performance optimization vs Interface structure |

**Impact on Timeline & Success Rate**:

- **Timeline**: Still achievable in 4 days (Oct 14-17) with strategic subphase separation
- **Rubric Score**: Maintains 95-107/105 target (>90% success rate)
- **Risk Mitigation**: Figma features in dedicated subphases (2b, 4b), can be scaled back if needed
- **Core Protection**: Rubric-required features (2a, 3, 4a, 5) protected in separate subphases
- **UI Transformation**: Left sidebar (layers) + right sidebar (properties) = Figma-like interface
- **Flexibility**: Each subphase can be adjusted independently without affecting rubric baseline

---

## Phase 2-5: Rubric-Aligned Enhancement Strategy

### Strategic Phase-to-Rubric Mapping

| Phase | Duration | Rubric Sections | Points Target | Rubric-Required Deliverables | Figma-Inspired Enhancements |
|-------|----------|----------------|---------------|------------------------------|----------------------------|
| **Phase 1 (✅ Complete)** | Oct 14 | Sections 1, 5, 6 | 20/100 | MVP foundation, basic sync, auth, deployment ||
| **Phase 2a** | Oct 15 AM | Sections 2 & 3 (Tier 1) | +15 points | Color picker, undo/redo, keyboard shortcuts, lines/arrows, export ||
| **Phase 2b** | Oct 15 PM | Sections 2 & 3 (UX) | +5 points || **8-point resize handles, rotation handles, marquee selection, smart guides** |
| **Phase 3** | Oct 16 | Section 4 (AI Agent) | +25 points | 8+ AI commands, complex layouts, multi-user AI sync | AI leverages Phase 2b transforms |
| **Phase 4a** | Oct 17 AM | Sections 2, 3 (Tier 2) | +10 points | Performance optimization (500+ objects, 5+ users) ||
| **Phase 4b** | Oct 17 AM | Sections 5 (Polish) | +10 points | Code quality, documentation prep | **Left sidebar layers panel, right sidebar properties panel, 9 alignment operations, frames tool (stretch)** |
| **Phase 5** | Oct 17 PM | Sections 6, 7, 8 | +15 points | Documentation, demo video, final polish | Showcase Figma-inspired interface |
| **Bonus** | Throughout | Innovation & Polish | +5 points | Exceptional UX, AI features, scale demonstration | **Professional Figma-like interface** |
| **TOTAL** | 4 days | All sections | **105/105** | Complete rubric-aligned submission | + Figma-inspired professional interface |

### Why This Sequence?

1. **Phase 2a (Day 2 Morning)**: Rubric-required Tier 1 features
   - Color picker, undo/redo, keyboard shortcuts (Tier 1 = 2 points each)
   - Lines and arrows (additional shape types)
   - Export functionality (PNG/SVG)
   - **Rubric Points: +15**

2. **Phase 2b (Day 2 Afternoon)**: Figma-inspired transform operations
   - **8-point resize handles & rotation** (critical Figma UX)
   - **Marquee selection & smart guides** (critical Figma UX)
   - Enhanced visual feedback and interaction polish
   - **Rubric Points: +5 (UX improvements)**

3. **Phase 3 (Day 3)**: Implement highest-value feature (AI agent = 25 points)
   - AI Canvas Agent with 8+ commands
   - Complex layout generation
   - Multi-user AI collaboration
   - **AI can leverage Phase 2b transform operations**
   - **Rubric Points: +25**

4. **Phase 4a (Day 4 AM First Half)**: Performance optimization (rubric-required)
   - Canvas rendering optimization (500+ objects at 60 FPS)
   - Support 5+ concurrent users without degradation
   - Memory management and cleanup
   - **Rubric Points: +10**

5. **Phase 4b (Day 4 AM Second Half)**: Figma-inspired interface structure
   - **Left sidebar layers panel** (hierarchical tree view)
   - **Right sidebar properties panel** (position, size, alignment)
   - **9 alignment operations** (professional design tool feature)
   - Frames & artboards (stretch goal)
   - **Rubric Points: +10 (code quality + polish)**

6. **Phase 5 (Day 4 PM)**: Documentation and submission
   - Professional documentation
   - Demo video showcasing Figma-inspired interface
   - Final deployment
   - **Rubric Points: +15**

**Strategic Rationale**: This phasing separates rubric-required features (Phases 2a, 3, 4a, 5) from Figma-inspired enhancements (Phases 2b, 4b). The rubric features ensure the 95-point baseline, while Figma enhancements add professional polish for bonus points and exceptional UX. Phase 2b transforms enable more powerful Phase 3 AI commands, and Phase 4b interface gives the project a professional Figma-like appearance for the demo video.

---

### Phase 2a - Rubric-Required Canvas Features (October 15 Morning - Targets Rubric Section 2 & 3 Tier 1)

**Duration**: Half day (October 15, 9 AM - 1 PM)
**Rubric Target**: Canvas Features & Performance (15 points) - Tier 1 features
**Type**: ✅ Rubric-Required

**Goal**: Implement Tier 1 rubric features for canvas functionality

**Priority Features (Tier 1 - 2 points each, implementing 3)**:

1. **Color Picker System** (Tier 1 - 2 points)
   - Color picker with recent colors and saved palettes
   - Apply colors to shapes
   - Color persistence across sessions
   - React-colorful or similar library integration

2. **Undo/Redo Functionality** (Tier 1 - 2 points)
   - Full undo/redo with keyboard shortcuts (Cmd+Z/Cmd+Shift+Z)
   - Action history tracking (in-memory stack)
   - Synced undo history for collaborative editing
   - Show undo/redo buttons in toolbar

3. **Enhanced Keyboard Shortcuts** (Tier 1 - 2 points)
   - Delete key for object removal ✅ (already implemented)
   - Arrow keys to move selected objects (5px increments)
   - Cmd/Ctrl+D for duplicate
   - Tab for next object selection
   - R for Rectangle, O for Circle, T for Text
   - V for Move tool, H for Hand tool
   - Keyboard shortcuts help panel (? key)

**Canvas Enhancements (Rubric-Required)**:

4. **Additional Shape Types**
   - Circles and ellipses ✅ (already implemented)
   - **Lines** (new - simple line shape)
   - **Arrows** (new - line with arrowhead)
   - Basic text layers with formatting ✅ (already implemented)

5. **Export Functionality**
   - Export canvas as PNG (Stage.toDataURL())
   - Export canvas as SVG (planned)
   - Export selected objects only
   - Download functionality with file naming

**Performance Targets**:

- Support 300+ objects with consistent performance
- Maintain 60 FPS during interactions
- Support 4-5 concurrent users

**Success Criteria**:

- ✅ All 3 Tier 1 features working with keyboard shortcuts
- ✅ 3+ shape types beyond rectangles (circle, text, line, arrow)
- ✅ Text with basic formatting
- ✅ Undo/redo with visual feedback
- ✅ Color picker integrated into toolbar
- ✅ Export canvas as PNG working

---

### Phase 2b - Figma-Inspired Transform Operations (October 15 Afternoon - UX Enhancement)

**Duration**: Half day (October 15, 2 PM - 6 PM)
**Rubric Target**: Canvas Features & Performance (5 points) - UX improvements
**Type**: 🎨 Figma-Inspired Enhancement

**Goal**: Add professional Figma-like transform and selection operations

**Transform Operations** (Figma Critical Feature - 3.2):

1. **8-Point Resize Handles**
   - Corner handles (4): Diagonal resize maintaining aspect ratio with Shift
   - Edge handles (4): Horizontal/vertical resize
   - Visual handle indicators (small squares)
   - Real-time size display during resize
   - Sync resize operations to all users

2. **Rotation Handle**
   - Rotation handle above selection bounds
   - Visual rotation indicator (circular arc)
   - Real-time angle display during rotation
   - Snap to 15° increments with Shift
   - Rotate around shape center point

3. **Smart Guides**
   - Alignment guides when dragging (red/blue lines)
   - Show when edges align with other objects
   - Show when centers align (vertical/horizontal)
   - Spacing guides (equal distance indicators)
   - Distance measurement tooltip

4. **Maintain Aspect Ratio**
   - Shift+drag on corner handles locks aspect ratio
   - Visual indicator when aspect ratio locked
   - Works for all shape types

**Multi-Selection System** (Figma Critical Feature - 3.1):

5. **Marquee Selection Box**
   - Click-and-drag selection box (dashed rectangle)
   - Select all shapes within box bounds
   - Visual feedback during selection
   - Works with Shift to add to selection

6. **Multi-Select Operations**
   - Shift+click to add to selection
   - Cmd/Ctrl+click to toggle selection
   - Select all (Ctrl+A)
   - Visual indication of selected objects (blue outline)
   - Transform operations work on multi-selection

**Visual Feedback Enhancements**:

- Bounding box around selected shapes
- Selection count indicator ("3 objects selected")
- Hover state visual feedback
- Cursor changes based on interaction mode

**Performance Targets**:

- Smooth 60 FPS during transform operations
- No lag with 10+ objects selected
- Real-time sync of transforms to all users

**Success Criteria**:

- ✅ **8-point resize handles working on all shapes**
- ✅ **Rotation handle with visual feedback**
- ✅ **Smart guides showing alignment during drag**
- ✅ **Marquee selection box working**
- ✅ Multi-select and transform operations
- ✅ Professional Figma-like interaction feel

---

### Phase 2 Combined Success Criteria

**Rubric Points Earned**: +20 points (15 from Phase 2a + 5 from Phase 2b)
**Timeline**: 1 full day (October 15)
**Status after Phase 2**: 40/100 points (Phase 1: 20 + Phase 2: 20)

### Phase 3 - AI Canvas Agent Implementation (October 16 - Targets Rubric Section 4)

**Duration**: 1 day (October 16)
**Rubric Target**: AI Canvas Agent (25 points - highest value section)

**Goal**: Implement AI-powered canvas commands with multi-user shared state

**Implementation Strategy - Hybrid Approach**:

- **Phase 3**: Direct OpenAI SDK with Tool Calling (fast development, simple debugging)
- **Phase 5**: Add LangSmith observability wrapper (production monitoring, demo polish)
- **Rationale**: Evaluated LangChain vs OpenAI SDK based on AI School presentations (Week 3.1 Tool Calling, Week 1.2 LangSmith). Hybrid approach optimizes for 1-day Phase 3 timeline while enabling professional observability in Phase 5.

**Command Categories (Minimum 6 commands, targeting 8+)**:

**Creation Commands (2+)**:

1. "Create a [color] [shape] at position [x], [y]"
2. "Add text that says [content]"
3. "Make a [width]x[height] rectangle"

**Manipulation Commands (2+)**:
4. "Move the [color/id] [shape] to [position/direction]"
5. "Resize the [shape] to be [size] / [X] times bigger"
6. "Change [shape] color to [color]"

**Layout Commands (1+)**:
7. "Arrange these shapes in a [horizontal/vertical] row"
8. "Create a grid of [N]x[N] [shapes]"
9. "Space these elements evenly"

**Complex Commands (1+)**:
10. "Create a login form with username and password fields"
11. "Build a navigation bar with [N] menu items"
12. "Make a card layout with title and description"

**AI Agent Features**:

- Natural language processing via OpenAI Tool Calling (8+ function schemas)
- LLM integration: GPT-4o-mini for speed (<2s response) or GPT-4-turbo for complex commands
- Tool calling pattern: LLM suggests action → React hooks execute → Firestore syncs
- Shared state across all users (all users see AI-generated objects via Firestore)
- Real-time command execution with <2 second response time
- Visual feedback during AI processing (loading states, success/error toasts)
- Error handling for ambiguous commands (retry logic, fallback to pattern matching)
- Command history and caching (localStorage for common commands)

**Multi-User AI Collaboration**:

- Multiple users can issue AI commands simultaneously
- AI-generated objects sync to all users
- Clear attribution of AI-generated vs user-generated objects
- Conflict resolution for concurrent AI commands

**Performance Targets**:

- Sub-2 second AI response time
- 90%+ accuracy for command execution
- Multiple users can use AI simultaneously without conflicts

**Success Criteria**:

- 8+ distinct command types working reliably
- Complex commands create multi-element layouts
- AI commands sync to all users in real-time
- Natural language processing handles variations
- Smooth UX with loading states and feedback

### Phase 4a - Performance Optimization (October 17 Morning, First Half - Targets Rubric Sections 2, 3)

**Duration**: 2 hours (October 17, 9 AM - 11 AM)
**Rubric Target**: Canvas Features & Performance (10 points) - Excellent tier performance
**Type**: ✅ Rubric-Required

**Goal**: Achieve rubric performance targets for Excellent tier (500+ objects, 5+ users)

**Performance Optimization**:

1. **Canvas Rendering Optimization**
   - Viewport culling (only render visible shapes)
   - Layer caching for static elements
   - Batch shape updates for sync operations
   - Optimize Konva Stage settings (pixelRatio, listening)

2. **Real-Time Sync Optimization**
   - Optimize Firestore queries (limit, indexes)
   - Debounce cursor updates (50ms max)
   - Batch shape updates (combine multiple changes)
   - Connection pooling and management

3. **Memory Management**
   - Shape cleanup on delete (remove event listeners)
   - Limit undo/redo history (max 50 actions)
   - Clean up disconnected user data
   - Browser memory profiling

4. **Stress Testing**
   - Test with 500+ objects on canvas
   - Test with 5+ concurrent users
   - Load testing different browsers
   - Network throttling tests

**Performance Targets (Excellent Tier)**:

- Support 500+ objects at 60 FPS ✅ REQUIRED
- Sub-100ms object sync ✅ REQUIRED
- Sub-50ms cursor sync ✅ REQUIRED
- Support 5+ concurrent users without degradation ✅ REQUIRED
- Initial load time <2 seconds

**Code Quality Improvements** (Rubric Section 5):

- Refactor for clean architecture
- Add comprehensive error handling
- Improve code organization and modularity
- Add code comments and documentation
- Security audit (API keys, Firebase rules)
- ESLint fixes and TypeScript strict mode

**Success Criteria**:

- ✅ Consistent 60 FPS with 500+ objects
- ✅ Sub-100ms object sync, sub-50ms cursor sync
- ✅ 5+ concurrent users supported
- ✅ No memory leaks during extended sessions
- ✅ Clean, well-organized codebase
- ✅ All linter errors resolved

---

### Phase 4b - Figma-Inspired Interface Structure (October 17 Morning, Second Half - Polish)

**Duration**: 2 hours (October 17, 11 AM - 1 PM)
**Rubric Target**: Tier 2 features + Polish (10 points)
**Type**: 🎨 Figma-Inspired Enhancement

**Goal**: Add professional Figma-like dual-sidebar interface structure

**Left Sidebar - Layers Panel** (Figma Critical Feature - 1.1):

1. **Hierarchical Tree Structure**
   - Display all canvas objects in nested view
   - Show shape type icons (rectangle, circle, text)
   - Layer naming (e.g., "Rectangle 1", "Text 2")
   - Collapsible sections (if grouping implemented)

2. **Layer Management**
   - **Drag-and-drop to reorder z-index** (critical)
   - **Show/hide layers** (eye icon toggle)
   - **Lock/unlock layers** (lock icon toggle)
   - **Rename layers** with double-click
   - Delete layer button (trash icon)

3. **Layer Selection Integration**
   - Click layer name → select on canvas
   - Selected canvas item highlights in layers panel
   - Multi-select layers with Cmd/Ctrl+click
   - Visual indicators for selected layer (blue highlight)

4. **Search/Filter** (Stretch Goal)
   - Search layers by name
   - Filter by shape type

**Right Sidebar - Properties Panel** (Figma Critical Feature - 1.2):

5. **Position & Size Panel**
   - X, Y coordinate numeric inputs (pixel precision)
   - Width, Height numeric inputs
   - Lock aspect ratio toggle (chain icon)
   - Rotation input (0-360 degrees)
   - Update shape on input change

6. **Alignment & Distribution Tools** (9 operations)
   - **Align left/right/center horizontal** (3 buttons)
   - **Align top/bottom/middle vertical** (3 buttons)
   - **Distribute evenly** horizontal/vertical (2 buttons)
   - **Align to canvas center** (1 button)
   - Works on single or multiple selected shapes

7. **Fill & Stroke Properties**
   - Enhanced color picker integration from Phase 2a
   - Stroke toggle (on/off)
   - Stroke weight control (1-20px slider)
   - Fill opacity slider (0-100%)
   - Stroke opacity slider (0-100%)

**Frames & Artboards** (Figma Critical Feature - 2.1 - Stretch Goal):

8. **Frame Tool** (if time permits)
   - Frame button in toolbar (F key)
   - Click-and-drag to create custom frames
   - Pre-set device sizes dropdown (mobile, tablet, desktop)
   - Frame properties (background color, clip content)
   - Frame list in layers panel

**UI/UX Polish**:

- Responsive sidebar widths (resizable)
- Smooth sidebar animations
- Consistent visual design language
- Professional icon set (Lucide React or similar)
- Tooltips on all buttons

**Success Criteria**:

- ✅ **Left sidebar layers panel functional**
- ✅ **Drag-and-drop layer reordering working**
- ✅ **Show/hide and lock/unlock layers working**
- ✅ **Right sidebar properties panel functional**
- ✅ **All 9 alignment operations working**
- ✅ **Position/size inputs update shapes in real-time**
- ✅ **Professional Figma-like dual-sidebar layout**
- ✅ **Frames tool working** (stretch goal)

---

### Phase 4 Combined Success Criteria

**Rubric Points Earned**: +20 points (10 from Phase 4a + 10 from Phase 4b)
**Timeline**: Half day morning (October 17, 9 AM - 1 PM)
**Status after Phase 4**: 85/100 points (Phase 1: 20 + Phase 2: 20 + Phase 3: 25 + Phase 4: 20)

### Phase 5 - Final Deployment & Documentation (October 17 Afternoon - Targets Rubric Sections 6, 7, 8)

**Duration**: Half day (October 17, afternoon)
**Rubric Target**: Documentation & Submission Quality (5 points) + Required sections (AI Log + Demo Video) + Bonus (+2)

**Goal**: Complete all submission requirements and deploy production version

**Hybrid Approach Enhancement**:

- **Add LangSmith Observability** (15 minutes setup)
  - Wrap existing OpenAI client with `wrapOpenAI()` for automatic tracing
  - Zero code changes to Phase 3 tool calling logic
  - Gain production-grade monitoring for demo video
  - Show metrics: response times, costs, accuracy, traces
  - Potential +2 bonus points for professional monitoring approach

**Documentation Requirements**:

1. **README.md** (Comprehensive)
   - Clear project description
   - Detailed setup instructions
   - Architecture overview
   - Feature list with screenshots
   - Technology stack explanation
   - API documentation
   - Deployment guide
   - Contributing guidelines

2. **AI Development Log** (REQUIRED - already created)
   - Tools & workflow used
   - 3-5 effective prompting strategies
   - Code analysis (AI vs hand-written percentages)
   - Strengths & limitations
   - Key learnings

3. **Architecture Documentation**
   - System architecture diagram
   - Component hierarchy
   - Data flow documentation
   - Firebase integration details
   - Real-time sync strategy

**Demo Video Requirements** (REQUIRED):

- **Duration**: 3-5 minutes
- **Content**:
  - Real-time collaboration demo (2+ users, show both screens)
  - Multiple AI commands executing and syncing
  - **LangSmith observability dashboard** (show response times, costs, traces)
  - Advanced features walkthrough (Tier 1, Tier 2 features)
  - Architecture explanation with diagrams (highlight hybrid approach)
  - Performance demonstration (multi-user, many objects)
- **Quality**: Clear audio, HD video, professional presentation

**Final Deployment**:

- Production build optimization
- Firebase hosting deployment
- Performance monitoring setup
- Final security audit
- Load testing with 5+ concurrent users
- Backup and rollback procedures

**Submission Checklist**:

- ✅ Repository with clear README
- ✅ Live deployment URL (publicly accessible)
- ✅ AI Development Log (in repository)
- ✅ Demo video (uploaded and linked)
- ✅ Architecture documentation
- ✅ All features working in production
- ✅ Clean, commented code
- ✅ No exposed credentials or security issues

**Success Criteria**:

- All documentation complete and professional
- Demo video meets all requirements
- Stable production deployment supporting 5+ users
- Fast load times and smooth performance
- Repository ready for evaluation

## Technical Considerations

### Essential Error Handling

**Network Issues** (MVP Minimum):

- **Connection Loss**: Show "You're offline" message
- **Sync Failure**: Show "Sync issues - refresh page"
- **Firebase Errors**: Show "Service temporarily unavailable"

**User Experience** (MVP Minimum):

- **Empty Canvas**: Show "Click 'Add Rectangle' to start"
- **No Other Users**: Show "Share this URL to collaborate"
- **Mobile Access**: "This works best on desktop Chrome"

### Accessibility Baseline (MVP)

**Absolute Minimum**:

- **Keyboard Navigation**: Tab through buttons, Enter to click
- **Screen Reader**: "Collaborative canvas" page title
- **Focus Indicators**: Visible focus outlines on all buttons
- **Color**: High contrast for cursor colors only

### Security Requirements

- End-to-end encryption for sensitive canvases
- Role-based access control
- Secure file upload handling
- Rate limiting and DDoS protection
- GDPR compliance for European users

### Scalability Considerations

- Horizontal scaling for WebSocket servers
- Database optimization for large canvases
- CDN for static assets and images
- Caching strategies for frequently accessed canvases
- Load balancing for high availability

## Project Success Goals & Rubric Alignment

### Rubric Score Targets (Total: 100 points + 5 bonus)

**Core Collaborative Infrastructure (30 points)**

- Target: 28-30 points (Excellent tier)
- Real-time sync: <100ms objects, <50ms cursors
- Conflict resolution: Last-write-wins with proper state management
- Persistence: Full state preservation across disconnects

**Canvas Features & Performance (20 points)**

- Target: 18-20 points (Excellent tier)
- 3+ shape types with text support
- 500+ objects at 60 FPS
- 5+ concurrent users supported

**Advanced Figma-Inspired Features (15 points)**

- Target: 13-15 points (Excellent tier)
- 3 Tier 1 features (6 points): Color picker, Undo/Redo, Keyboard shortcuts
- 2 Tier 2 features (6 points): Layers panel, Alignment tools
- 1 Tier 3 feature (3 points): Collaborative comments OR Version history

**AI Canvas Agent (25 points)**

- Target: 23-25 points (Excellent tier)
- 8+ command types across all categories
- Complex commands create multi-element layouts
- Sub-2 second response with 90%+ accuracy
- Multi-user AI collaboration with shared state

**Technical Implementation (10 points)**

- Target: 9-10 points (Excellent tier)
- Clean architecture with separation of concerns
- Robust authentication with Firebase
- Proper error handling and security

**Documentation & Submission Quality (5 points)**

- Target: 5 points (Excellent tier)
- Comprehensive README with setup guide
- Stable deployment supporting 5+ users
- Professional documentation

**Required Sections (Pass/Fail)**

- ✅ AI Development Log (completed)
- ✅ Demo Video (3-5 minutes, 2+ users, AI features)

**Bonus Points Target (+3-5 points)**

- Innovation: AI-powered design features (+2)
- Polish: Exceptional UX/UI with smooth animations (+2)
- Scale: 500+ objects, 5+ users (+1)

**Overall Target Score: 95-105/105 points (90%+ = A grade)**

## 24-Hour MVP Risk Assessment (Phase 1 - Completed ✅)

**Status**: This section is retained for documentation purposes. Phase 1 MVP was successfully completed on October 14, 2025.

### **Critical Dependencies - Lessons Learned**

**Technical Blockers Encountered**:

- **Firebase Setup**: Security rules, authentication config (resolved)
- **Konva.js Learning**: Initial learning curve (resolved)
- **Real-time Sync**: Successfully implemented via Firestore + RTDB
- **Cross-tab Testing**: Multi-user sync verified and working

**Time Management Insights**:

- Avoided perfectionism by focusing on core features first
- Prevented feature creep by strict adherence to MVP requirements
- Managed debug time effectively with targeted testing

### **MVP Success Achieved**

**Minimum Viable Success** (✅ All Achieved):

- ✅ Two users can see each other's rectangles
- ✅ Rectangles persist when users refresh
- ✅ Basic user identification (names/colors)
- ✅ Deployed and shareable URL

**Stretch Goals Achieved**:

- ✅ Smooth cursor tracking
- ✅ Visual feedback for object locking
- ✅ Clean, minimal UI

**MVP Philosophy Applied**:
**"Ship working ugly over broken beautiful"** - Successfully deployed working MVP on schedule.

## Development Timeline Summary

### Phase-by-Phase Schedule (October 14-17, 2025)

**Phase 1: MVP Foundation** (Completed October 14)

- ✅ Basic canvas with rectangles
- ✅ Real-time synchronization
- ✅ User authentication
- ✅ Cursor tracking
- ✅ Initial deployment
- **Points: 20/100**

**Phase 2a: Rubric-Required Canvas Features** (October 15 Morning)

- Duration: Half day (9 AM - 1 PM)
- Type: ✅ Rubric-Required
- Focus: Tier 1 features (color picker, undo/redo, keyboard shortcuts)
- Deliverables: 3 Tier 1 features, lines/arrows, export
- **Points: +15 (Total: 35/100)**

**Phase 2b: Figma-Inspired Transform Operations** (October 15 Afternoon)

- Duration: Half day (2 PM - 6 PM)
- Type: 🎨 Figma-Inspired
- Focus: Transform operations (resize handles, rotation, smart guides, marquee selection)
- Deliverables: 8-point resize, rotation handle, smart guides, marquee selection
- **Points: +5 (Total: 40/100)**

**Phase 3: AI Canvas Agent** (October 16)

- Duration: 1 full day
- Type: ✅ Rubric-Required (highest value)
- Focus: AI command system with multi-user sync
- Deliverables: 8+ commands, complex layouts, shared AI state
- **Points: +25 (Total: 65/100)**

**Phase 4a: Performance Optimization** (October 17, 9 AM - 11 AM)

- Duration: 2 hours
- Type: ✅ Rubric-Required
- Focus: Excellent tier performance targets
- Deliverables: 500+ objects at 60 FPS, 5+ users, code quality
- **Points: +10 (Total: 75/100)**

**Phase 4b: Figma-Inspired Interface Structure** (October 17, 11 AM - 1 PM)

- Duration: 2 hours
- Type: 🎨 Figma-Inspired
- Focus: Dual-sidebar layout (layers panel + properties panel)
- Deliverables: Left sidebar layers, right sidebar properties, 9 alignment operations, frames (stretch)
- **Points: +10 (Total: 85/100)**

**Phase 5: Final Deployment & Documentation** (October 17 Afternoon)

- Duration: Half day (2 PM - 6 PM)
- Type: ✅ Rubric-Required
- Focus: Submission requirements
- Deliverables: README, demo video showcasing Figma-inspired interface, final deployment
- **Points: +15 (Total: 100/100)**

**Bonus Points** (Throughout development)

- Exceptional UX with Figma-inspired interface
- AI features beyond requirements
- Professional polish and scale demonstration
- **Points: +5-7 (Target Total: 105-107/105)**

**Submission Deadline: Friday, October 17, 2025 EOD**

## Project Conclusion

**CollabCanvas Goal**: Build a production-ready, AI-powered collaborative canvas application with Figma-inspired interface that scores 95+ points on the rubric.

**What We're Building**:

- A fully-featured real-time collaborative canvas platform
- AI-powered canvas agent that responds to natural language commands
- **Figma-inspired professional interface** with layers panel and properties panel
- **Critical Figma transform operations**: 8-point resize handles, rotation, smart guides
- **Advanced selection system**: Marquee selection, multi-select, visual feedback
- Production deployment supporting 5+ concurrent users
- Comprehensive documentation and demo video

**Success Definition**:

The project succeeds when:

1. Real-time collaboration works flawlessly (<100ms sync)
2. AI agent executes 8+ command types with 90%+ accuracy
3. Canvas supports 500+ objects at 60 FPS with 5+ users
4. **Figma-inspired interface**: Left sidebar (layers) + Right sidebar (properties) functional
5. **Transform operations**: 8-point resize, rotation handles, smart guides working
6. All Tier 1 and Tier 2 features implemented and working
7. Professional documentation and demo video complete
8. Final rubric score: 95-105/105 points

**Strategic Positioning**:

CollabCanvas isn't just another design tool—it's a platform for **collaborative thinking** powered by AI with a **Figma-inspired professional interface**. While Figma excels at design deliverables, CollabCanvas combines Figma's intuitive interface with AI-powered canvas manipulation, enabling teams to think together visually with natural language commands. This creates a new category of collaborative intelligence tools that merge professional design UX with AI superpowers.

**From MVP to Production in 3 Days**:

This accelerated timeline validates that AI-assisted development can deliver production-quality applications in compressed timeframes. The key is:

1. Clear rubric-aligned requirements
2. **Strategic integration of Figma-inspired critical features**
3. Phased approach with daily milestones
4. Focus on high-value features (AI agent = 25 points)
5. Progressive enhancement from working MVP
6. AI-powered development throughout

**Figma Feature Integration Success**:
By carefully analyzing Figma's Phase 1 Critical Core Features and integrating them into the existing 4-day timeline via dedicated subphases, CollabCanvas achieves:

- **Professional UX**: Layers panel (Phase 4b), properties panel (Phase 4b), transform handles (Phase 2b)
- **Efficient workflow**: Marquee selection (Phase 2b), keyboard shortcuts (Phase 2a), smart guides (Phase 2b)
- **Clear separation**: Rubric-required features (Phases 2a, 3, 4a, 5) vs Figma enhancements (Phases 2b, 4b)
- **Rubric alignment**: All Figma features contribute to UX/polish points, not required for baseline
- **Realistic scope**: Deferred pen tool (5-7 days) to maintain timeline feasibility
- **>90% success rate maintained**: 95-107/105 points target unchanged

**Phase Structure:**

- **Phase 2a** (Morning): Rubric Tier 1 features → +15 points
- **Phase 2b** (Afternoon): Figma transform operations → +5 points
- **Phase 4a** (9-11 AM): Performance optimization → +10 points
- **Phase 4b** (11 AM-1 PM): Figma interface structure → +10 points

---

## Appendix: Strategic Positioning Analysis

#### **1. Figma Optimizes for Design Deliverables, Not Thinking Relationships**

**Figma's Real User Story**: _"As a designer, I want to create professional design artifacts that stakeholders can review and approve"_

**CollabCanvas User**: _"As humans, we want to think together and build understanding"_

**The Gap**: Figma assumes you know what you're building. Our users are about **discovering** what to build through collaborative exploration.

#### **2. Different Collaboration Philosophies**

**Figma's Philosophy**:

- "Let's collaborate on this design"
- Assumes pre-defined roles (designer vs. reviewer)
- Optimized for feedback loops and iteration cycles
- Success = better design deliverables

**CollabCanvas Philosophy**:

- "Let's think together and see what emerges"
- Fluid roles that change based on moment and context
- Optimized for collective intelligence and emergence
- Success = deeper understanding and stronger relationships

#### **3. The Critical Strategic Difference:**

**Figma** is brilliant at **"collaborative design"** - multiple people working on a design artifact.

**CollabCanvas** is brilliant at **"collaborative thinking"** - multiple people using visual space to understand problems and explore solutions.

**Different Success Stories:**

- **Figma Success**: _"We shipped a better product because our design collaboration was seamless"_
- **CollabCanvas Success**: _"We discovered a solution none of us could have found alone because we were able to think together"_

#### **4. Strategic Implications for MVP:**

Our target users reveal that CollabCanvas should be optimized for:

1. **Onboarding non-designers** (Figma intimidates them)
2. **Thinking processes** rather than design processes
3. **Emergence and discovery** rather than refinement and polish
4. **Relationship building** rather than workflow efficiency

**The Strategic Insight**: Figma owns "collaborative design." But there's a massive white space around "collaborative thinking" that our personas perfectly address.

We're not competing with Figma - we're creating an entirely different category where **thinking together visually** is more important than **creating professional design artifacts**.

This positioning makes our 24-hour MVP even more focused: prove that people can **think better together** in our space, not that they can design better.

---

## APPENDIX D: ASSIGNMENT SUBMISSION QUICK REFERENCE

### 📋 **Submission Form Links - Copy & Paste Ready**

Use this table when filling out the "Submit Assignment" form:

| **Field** | **Link/URL** | **Status** | **Notes** |
|-----------|--------------|------------|-----------|
| **X/Twitter Post** | `[TO BE ADDED]` | ⏳ Required | Post demo video and project highlights |
| **GitHub Repository** | `https://github.com/gratefulgabe5000/Gauntlet-Project-One/tree/feat/pr-8-canvas-enhancements` | ✅ Ready | Update branch name for each phase |
| **Demo Video** | `[TO BE ADDED]` | ⏳ Required | YouTube or Vimeo (3-5 minutes) |
| **AI Development Log** | `[TO BE ADDED] | ⏳ Pending | Complete after Phase 5 |
| **Live Deployment** | `https://collabcanvas-mvp-53120.web.app` | ✅ Live | Add to "Additional Notes" field |

### 📂 **Additional Submission Resources**

**Phase 1 MVP (COMPLETE)**:

- GitHub Branch: `main` (7 PRs merged: PR-1 through PR-7)
- PR-1: `feat: project setup and firebase configuration`
- PR-2: `feat: core canvas implementation with basic shapes`
- PR-3: `feat: firestore persistent state and real-time sync`
- PR-4: `feat: realtime cursor tracking with firebase rtdb`
- PR-5: `feat: text shape component and editing`
- PR-6: `feat: user presence system with online users`
- PR-7: `feat: ui polish and production deployment`

**Phase 2-5 (PENDING)**:

- PR-8 Branch: `feat/pr-8-canvas-enhancements`
- PR-9 Branch: `feat/pr-9-ai-canvas-agent`
- PR-10 Branch: `feat/pr-10-performance-tier2`
- PR-11 Branch: `feat/pr-11-final-submission`

### 🎥 **Demo Video Checklist**

**Must Include** (3-5 minutes total):

1. ✅ Introduction (30 sec) - Project overview, hybrid AI approach
2. ✅ Real-time collaboration demo (60 sec) - 2+ users, sync demonstration
3. ✅ AI Canvas Agent demo (90 sec) - 8+ commands, tool calling in action
4. ✅ LangSmith observability (30 sec) - Dashboard showing metrics (+2 bonus points)
5. ✅ Advanced features (60 sec) - Color picker, undo/redo, layers, alignment
6. ✅ Performance demo (30 sec) - 500+ shapes at 60 FPS

### 📝 **Documentation Links**

**Primary Documents** (in `Gauntlet Project One/collabcanvas-mvp/Artifacts/`):

- PRD: `PRD-CollabCanvas.md` (v2.1)
- Task List: `TaskList-CollabCanvas.md` (v3.1)
- WBS: `WBS-CollabCanvas.md` (v2.0)
- Tech Stack: `TechStack.md` (v4.0 - Hybrid Approach)
- AI Dev Log: `AI-Development-Log.md` (Phase 5 - to be finalized)
- Architecture MVP: `ARCH-CollabCanvas-MVP.mermaid` (Phase 1 - Complete ✅)
- Architecture Complete: `ARCH-CollabCanvas-Complete.mermaid` (Phases 1-5)
- Architecture Comparison: `ARCH-Comparison-MVP-vs-Complete.md` (Evolution doc)
- **Architecture System Integration**: `ARCH-System-Integration.mermaid` (Full tech stack - NEW ⭐)
- **System Integration Analysis**: `System-Integration-Analysis.md` (Complete evaluation - NEW ⭐)
- Phase 3 Guide: `PHASE3-IMPLEMENTATION-GUIDE.md` (OpenAI Tool Calling)

**README Sections**:

- Setup Instructions: See README.md Section 2
- Feature List: See README.md Section 3
- Architecture Overview: See README.md Section 4
- AI Agent Documentation: See README.md Section 5

### 🎯 **Final Submission Checklist**

Use this checklist before clicking "Submit Assignment":

- [ ] X/Twitter post published with demo video link
- [ ] GitHub repository link updated (correct branch for final PR)
- [ ] Demo video uploaded and URL added (3-5 minutes, HD quality)
- [ ] AI Development Log finalized and accessible
- [ ] Live deployment URL working (test with 2+ users)
- [ ] All documentation complete (README, Architecture, AI Log)
- [ ] Rubric self-assessment complete (target: 95-107/105 points)

**Submission Deadline**: Friday, October 17, 2025, 11:59 PM - 10:59 PM

---

_Document Version: 5.0_
_Last Updated: October 16, 2025_
_Changes: Aligned with TechStack v5.0 - all custom utilities documented (transform.ts, alignment.ts, smart guides, marquee selection)_
_Key Structure: Phase 2a (Rubric Tier 1) + Phase 2b (Figma Transforms) + Phase 4a (Performance) + Phase 4b (Figma Interface)_
_Figma Integration: Transform operations (8-point resize, rotation, smart guides), marquee selection, layers panel, properties panel_
_Strategic Separation: ✅ Rubric-Required (85 pts baseline) + 🎨 Figma-Inspired (15 pts polish + bonus)_
_Custom Implementations: All Figma features achievable with Konva.js primitives (transform.ts, alignment.ts, useSmartGuides.ts, MarqueeSelection.tsx)_
_Deferred: Pen tool & vector editing (5-7 days complexity, marked as future enhancement)_
_AI Strategy: Hybrid approach (OpenAI SDK Phase 3 + LangSmith Phase 5) based on AI School evaluation_
_Timeline: October 14-17, 2025 (Submission Friday EOD) - MAINTAINED_
_Rubric Target: 95-107/105 points (>90% success rate MAINTAINED)_
_Aligned With: TaskList v5.0, WBS v5.0, TechStack v5.0_
