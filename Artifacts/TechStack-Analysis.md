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

- **Canvas Library**: Konva.js - Optimized for high-performance canvas operations with React integration
- **UI Components**: Basic components built with Tailwind CSS
- **Firebase SDK**: Firebase v9+ for authentication, Firestore, and Realtime Database
- **Testing**: Vitest + React Testing Library for component and integration testing
- **Linting**: ESLint with TypeScript rules

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

*Technology Stack Version: 2.1 (Production Deployed)*
*Created: October 13, 2025 - Aligned with PRD v1.0*
*Updated: October 15, 2025 - Post-production deployment refinements*
*Status: Production Live @ <https://collabcanvas-mvp-53120.web.app>*
