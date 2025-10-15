# CollabCanvas Technology Stack

## Finalized Technology Decisions

This document outlines the confirmed technology stack for the CollabCanvas project. All decisions have been made and this represents the foundation we'll build upon for the **24-hour MVP sprint**.

**Critical Constraint**: This stack is optimized specifically for the 24-hour development window. The primary goal is to prove real-time collaborative functionality works reliably.

## Frontend Architecture

### Core Framework: React 19 + Vite + TypeScript

- **Component Architecture**: React 19 with TypeScript for type-safe, scalable UI development
- **Build Tool**: Vite for fast development and optimized production builds
- **Canvas Operations**: Konva.js for high-performance canvas rendering and manipulation
- **Styling**: Tailwind CSS for utility-first, responsive design
- **State Management**: React built-in state + Firebase real-time listeners

### Key Libraries & Tools

**Phase 1 (MVP - Complete)**:
- **Canvas Library**: Konva.js - Optimized for high-performance canvas operations with React integration
- **UI Components**: Basic components built with Tailwind CSS
- **Firebase SDK**: Firebase v9+ for authentication, Firestore, and Realtime Database
- **Testing**: Vitest + React Testing Library for component and integration testing
- **Linting**: ESLint with TypeScript rules

**Phase 2-5 Additions** (Rubric Requirements):
- **AI/LLM Integration**: OpenAI SDK (`openai@latest`) for AI Canvas Agent - **CRITICAL for 25 rubric points**
- **Color Picker**: react-colorful for Tier 1 feature (2 points)
- **Drag & Drop**: @dnd-kit for Layers Panel Tier 2 feature (3 points)
- **Performance Monitoring**: Browser Performance API + React DevTools Profiler (built-in)
- **State Management**: React state + optional Zustand for complex undo/redo if needed

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

| Component | Library | Phase | Purpose | Points |
|-----------|---------|-------|---------|--------|
| Frontend | React 19 + Vite + TS | 1 | Core framework | - |
| Canvas | Konva.js | 1 | Shape rendering | - |
| Styling | Tailwind CSS | 1 | UI design | - |
| Auth | Firebase Auth | 1 | User management | - |
| Database | Firestore + RTDB | 1 | Real-time sync | 30 |
| Hosting | Firebase Hosting | 1 | Deployment | - |
| **AI Agent** | **OpenAI SDK** | **3** | **Tool calling** | **25** ⭐ |
| **Observability** | **LangSmith** | **5** | **AI monitoring** | **+2 bonus** 🎁 |
| Color Picker | react-colorful | 2 | Tier 1 feature | 2 |
| Drag & Drop | @dnd-kit | 4 | Tier 2 feature | 3 |
| Performance | Performance API | 4 | 60 FPS target | - |
| Testing | Vitest + RTL | 1-5 | Quality assurance | - |

**Total Rubric Coverage**: 100/100 points (with bonus potential: 107/105)
**Hybrid Approach Benefit**: Faster Phase 3 development + Professional Phase 5 polish

### Risk Assessment (Updated with Hybrid Approach)

**Eliminated Risks**:
- ✅ AI infrastructure now defined (was critical gap)
- ✅ **Hybrid approach reduces Phase 3 complexity** (OpenAI SDK simpler than LangChain)
- ✅ **Fast debugging strategy** (direct API → console.log in Phase 3)
- ✅ **LangSmith safety net** (add observability in Phase 5 without code changes)
- ✅ Drag-and-drop library identified
- ✅ Color picker solution specified
- ✅ Performance monitoring tools listed

**Remaining Risks (Reduced)**:
- ⚠️ OpenAI API rate limits (mitigate with caching + retry logic)
- ⚠️ AI response time variability (target <2s, GPT-4o-mini for speed)
- ⚠️ API costs exceeding budget (monitor usage, caching reduces calls)
- ⚠️ LangSmith setup time (minimal - 15 min in Phase 5)

**Mitigation Strategy**:
- **Phase 3 Focus**: Get 25 points quickly with simple OpenAI SDK
- **Phase 5 Safety**: Add LangSmith for production polish (optional but valuable)
- Aggressive command caching in localStorage (reduce API costs)
- Fallback to pattern matching if API fails
- Budget alert at $15 usage
- Use GPT-4o-mini (faster + cheaper) over GPT-4-turbo

**Hybrid Approach Advantage**: If AI integration struggles in Phase 3, debugging is simpler without framework abstractions. LangSmith can be skipped in Phase 5 if time-constrained (not required for 25 AI points).

---

*Technology Stack Version: 4.0 (Hybrid Approach)*
*Created: October 13, 2025 - Aligned with PRD v1.0*
*Updated: October 15, 2025 - Phase 2-5 enhancements added*
*Updated: October 15, 2025 - Hybrid approach (OpenAI SDK + LangSmith) based on AI School evaluation*
*Status: Phase 1 Production Live @ <https://collabcanvas-mvp-53120.web.app>*
*Readiness: ✅ Phase 3: Install OpenAI SDK (30 min) | Phase 5: Add LangSmith wrapper (15 min)*
*Strategy: Fast Phase 3 delivery → Professional Phase 5 polish*
