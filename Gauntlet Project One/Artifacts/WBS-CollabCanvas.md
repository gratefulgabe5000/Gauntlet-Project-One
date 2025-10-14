# CollabCanvas V2 - Work Breakdown Structure (WBS)

## 24-Hour MVP Sprint (Ultra-Focused Edition)

### Project Overview

**Duration**: 24 hours (1440 minutes)
**Critical Path**: Real-time synchronization implementation
**Success Criteria**: 2+ users can collaboratively create and move rectangles in real-time
**Philosophy**: "Working slowly is infinitely better than broken quickly"

---

## 1. PR-1: FOUNDATION SETUP (Hours 0-4)

**Total Effort**: 240 minutes | **Risk Level**: HIGH | **Branch**: `feat/foundation-setup`

### 1.1 Project Initialization & Dependencies (45 min)

- **1.1.1** Create new directory `collabcanvas-mvp` (2 min)
- **1.1.2** Initialize Git repository with `git init` (2 min)
- **1.1.3** Create Vite React TypeScript project: `npm create vite@latest . -- --template react-ts` (5 min)
- **1.1.4** Install core dependencies: `npm install react-konva konva tailwindcss` (5 min)
- **1.1.5** Install Firebase SDK: `npm install firebase` (3 min)
- **1.1.6** Install dev dependencies: `npm install -D @types/react @types/react-dom autoprefixer postcss` (3 min)
- **1.1.7** Verify installation with `npm run dev` - should show Vite default page (5 min)
- **1.1.8** Test build process with `npm run build` (5 min)
- **1.1.9** Create `.gitignore` with node_modules, dist, .env* (3 min)
- **1.1.10** Initial Git commit: `git add . && git commit -m "Initial Vite + React + TS setup"` (2 min)
- **1.1.11** Create development branch: `git checkout -b feat/foundation-setup` (1 min)
- **1.1.12** Update package.json with project name and scripts (3 min)
- **1.1.13** Document package.json dependencies with inline comments (6 min)

### 1.2 Tailwind CSS Configuration (20 min)

- **1.2.1** Initialize Tailwind: `npx tailwindcss init -p` (3 min)
- **1.2.2** Configure `tailwind.config.js` with content paths for React files (5 min)
- **1.2.3** Add Tailwind directives to `src/index.css` (@tailwind base, components, utilities) (3 min)
- **1.2.4** Create basic CSS reset and canvas-specific styles in `src/index.css` (5 min)
- **1.2.5** Test Tailwind by adding utility classes to default App component (2 min)
- **1.2.6** Verify hot reload works with style changes (2 min)

### 1.3 TypeScript Configuration (15 min)

- **1.3.1** Review default `tsconfig.json` and add strict mode settings (5 min)
- **1.3.2** Add path aliases for clean imports: `@/components`, `@/services`, `@/hooks` (5 min)
- **1.3.3** Update Vite config to recognize path aliases (3 min)
- **1.3.4** Test TypeScript compilation with `npx tsc --noEmit` (2 min)

### 1.4 Firebase Project Setup (35 min) **CRITICAL**

- **1.4.1** Create new Firebase project at console.firebase.google.com (5 min)
- **1.4.2** Enable Authentication service (email/password provider only) (5 min)
- **1.4.3** Create Firestore database in test mode (US-central region) (5 min)
- **1.4.4** Create Realtime Database in test mode (US-central region) (3 min)
- **1.4.5** Register web app in Firebase project settings (3 min)
- **1.4.6** Copy Firebase config object to `src/services/firebase.ts` (5 min)
- **1.4.7** Create environment variables file `.env.local` with Firebase keys (5 min)
- **1.4.8** Test Firebase connection with basic `initializeApp()` call (4 min)

### 1.5 Basic App Structure (25 min)

- **1.5.1** Create folder structure: `src/components`, `src/services`, `src/hooks`, `src/auth` (2 min)
- **1.5.2** Replace default `src/App.tsx` with basic layout structure (8 min)
- **1.5.3** Create `src/components/Canvas.tsx` with empty Konva Stage (10 min)
- **1.5.4** Add Canvas component to App with full viewport dimensions (3 min)
- **1.5.5** Style App layout with Tailwind (flex, full height, basic colors) (2 min)

### 1.6 Basic Testing Setup (15 min)

- **1.6.1** Install testing dependencies: `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom` (5 min)
- **1.6.2** Create `vitest.config.ts` with React testing configuration (5 min)
- **1.6.3** Create `src/__tests__/App.test.tsx` with basic render test (3 min)
- **1.6.4** Run test suite with `npm run test` to verify setup (2 min)

### 1.7 Final Validation & Commit (15 min)

- **1.7.1** Run full development server and verify no console errors (3 min)
- **1.7.2** Test Canvas component renders Konva stage (empty gray rectangle) (3 min)
- **1.7.3** Verify Tailwind utilities work (add test classes and check visual changes) (2 min)
- **1.7.4** Confirm Firebase config loads without errors (check browser console) (2 min)
- **1.7.5** Run build process: `npm run build` and verify dist/ folder created (3 min)
- **1.7.6** Final commit: `git add . && git commit -m "Complete foundation setup with Vite+React+Konva+Tailwind+Firebase"` (2 min)

**Checkpoint 1** (Hour 4): ✅ Basic React + Vite + Konva setup working with Firebase project configured

---

## 2. PR-2: AUTHENTICATION SYSTEM (Hours 4-6)

**Total Effort**: 150 minutes | **Risk Level**: MEDIUM | **Branch**: `feat/firebase-auth`

### 2.1 Firebase Authentication Integration (25 min)

- **2.1.1** Create `src/services/firebase.ts` with auth configuration (8 min)
- **2.1.2** Import and initialize Firebase Auth: `getAuth()` (3 min)
- **2.1.3** Test Firebase Auth connection in browser console (2 min)
- **2.1.4** Create `src/services/types.ts` with User interface definitions (5 min)
- **2.1.5** Add auth-related utilities: `signUpWithEmail`, `signInWithEmail`, `signOut` (7 min)

### 2.2 Authentication Context (30 min)

- **2.2.1** Create `src/auth/AuthContext.tsx` with React Context setup (10 min)
- **2.2.2** Implement AuthProvider component with state management (8 min)
- **2.2.3** Add `onAuthStateChanged` listener for persistence (7 min)
- **2.2.4** Create custom hook `useAuth()` for consuming context (3 min)
- **2.2.5** Add loading state handling during auth initialization (2 min)

### 2.3 Login Form Component (35 min)

- **2.3.1** Create `src/auth/LoginForm.tsx` with form structure (10 min)
- **2.3.2** Add email and password input fields with Tailwind styling (8 min)
- **2.3.3** Implement form validation (email format, password length) (10 min)
- **2.3.4** Add login/signup form state switching (toggle between modes) (5 min)
- **2.3.5** Integrate Firebase auth functions with form submission (2 min)

### 2.4 Authentication Guard (15 min)

- **2.4.1** Create `src/auth/AuthGuard.tsx` wrapper component (8 min)
- **2.4.2** Add conditional rendering: show LoginForm if not authenticated (4 min)
- **2.4.3** Display loading spinner during auth check (3 min)

### 2.5 App Integration (15 min)

- **2.5.1** Wrap App component with AuthProvider in `src/main.tsx` (3 min)
- **2.5.2** Replace App content with AuthGuard wrapper (5 min)
- **2.5.3** Add basic user display: name/email in top-right corner (5 min)
- **2.5.4** Add logout button with confirmation (2 min)

### 2.6 Testing & Validation (15 min)

- **2.6.1** Create `src/__tests__/auth/AuthContext.test.tsx` with basic tests (8 min)
- **2.6.2** Test signup flow manually: create new account (3 min)
- **2.6.3** Test login flow manually: sign in with created account (2 min)
- **2.6.4** Test persistence: refresh browser and verify still logged in (2 min)

### 2.7 Error Handling & Polish (15 min)

- **2.7.1** Add error state management for login failures (8 min)
- **2.7.2** Display user-friendly error messages for auth failures (4 min)
- **2.7.3** Add basic loading indicators during login/signup (3 min)

**Fallback Plan**: Anonymous users if Firebase Auth blocks progress

**Checkpoint 2** (Hour 6): ✅ Firebase Auth working (email login minimum)

---

## 3. PR-3: BASIC CANVAS IMPLEMENTATION (Hours 6-10)

**Total Effort**: 200 minutes | **Risk Level**: MEDIUM | **Branch**: `feat/local-rectangles`

### 3.1 Canvas Core Setup (45 min)

- **3.1.1** Enhance `src/components/Canvas.tsx` with full Konva Stage setup (15 min)
- **3.1.2** Set canvas dimensions: 2000x2000px with viewport window (8 min)
- **3.1.3** Implement basic pan functionality with mouse drag (10 min)
- **3.1.4** Add zoom functionality with mouse wheel (8 min)
- **3.1.5** Add canvas boundaries to prevent infinite panning (4 min)

### 3.2 Rectangle Shape Component (40 min)

- **3.2.1** Create `src/components/Rectangle.tsx` with Konva Rect (15 min)
- **3.2.2** Add selection state with visual feedback (border highlight) (10 min)
- **3.2.3** Implement click-to-select functionality (8 min)
- **3.2.4** Add drag-to-move with position updates (7 min)

### 3.3 Canvas State Management (35 min)

- **3.3.1** Create `src/hooks/useCanvas.ts` for local state management (20 min)
- **3.3.2** Implement shapes array state with add/remove functions (10 min)
- **3.3.3** Add selected shape state management (3 min)
- **3.3.4** Create shape ID generation utility (2 min)

### 3.4 Toolbar Component (25 min)

- **3.4.1** Create `src/components/Toolbar.tsx` with basic layout (8 min)
- **3.4.2** Add "Add Rectangle" button with Tailwind styling (5 min)
- **3.4.3** Implement shape creation: 100x100px at canvas center (8 min)
- **3.4.4** Add zoom controls: zoom in/out buttons (4 min)

### 3.5 Keyboard Interactions (20 min)

- **3.5.1** Add global keyboard event listener to Canvas component (8 min)
- **3.5.2** Implement Delete key to remove selected shapes (8 min)
- **3.5.3** Add Escape key to deselect all shapes (4 min)

### 3.6 Shape Management Logic (15 min)

- **3.6.1** Create `src/utils/helpers.ts` with shape utility functions (8 min)
- **3.6.2** Add shape positioning helper (center shapes on creation) (4 min)
- **3.6.3** Add shape validation helper (ensure shapes stay in bounds) (3 min)

### 3.7 Integration & Testing (20 min)

- **3.7.1** Integrate all components into main Canvas component (8 min)
- **3.7.2** Create `src/__tests__/components/Rectangle.test.tsx` (6 min)
- **3.7.3** Create `src/__tests__/components/Toolbar.test.tsx` (6 min)

**Scope Limitations Applied**:

- ❌ No shape styling or colors (fixed gray)
- ❌ No undo/redo
- ❌ No advanced shape manipulation

**Checkpoint 3** (Hour 10): ✅ User can create and drag rectangles locally

---

## 4. PR-4: REAL-TIME SYNCHRONIZATION (Hours 10-16) **CRITICAL PATH**

**Total Effort**: 290 minutes | **Risk Level**: VERY HIGH | **Branch**: `feat/realtime-sync`

### 4.1 Data Schema & Types (20 min)

- **4.1.1** Define Firestore document structure for canvas shapes (8 min)
- **4.1.2** Update `src/services/types.ts` with Shape, Canvas interfaces (8 min)
- **4.1.3** Add shape locking interfaces: `LockedShape`, `LockStatus` (4 min)

### 4.2 Firestore Service Layer (50 min)

- **4.2.1** Create `src/services/firestore.ts` with Firestore connection (15 min)
- **4.2.2** Implement `createShape()` function for adding new shapes (10 min)
- **4.2.3** Implement `updateShape()` function for position/property changes (10 min)
- **4.2.4** Implement `deleteShape()` function for shape removal (8 min)
- **4.2.5** Add `subscribeToCanvas()` for real-time shape updates (7 min)

### 4.3 Real-Time Shape Synchronization (60 min)

- **4.3.1** Create `src/hooks/useShapes.ts` for shape state management (20 min)
- **4.3.2** Implement Firestore listener for incoming shape changes (15 min)
- **4.3.3** Add optimistic updates for local shape operations (15 min)
- **4.3.4** Handle conflicts between local and remote shape updates (10 min)

### 4.4 Object Locking System (45 min)

- **4.4.1** Implement shape locking mechanism (first-come-first-serve) (20 min)
- **4.4.2** Add visual feedback for locked shapes (red border) (10 min)
- **4.4.3** Implement lock acquisition on shape drag start (8 min)
- **4.4.4** Add automatic lock release after 30 seconds of inactivity (7 min)

### 4.5 Canvas Component Integration (30 min)

- **4.5.1** Replace local state with useShapes hook in Canvas component (15 min)
- **4.5.2** Update Rectangle components to use Firestore IDs (8 min)
- **4.5.3** Modify shape creation to save to Firestore immediately (7 min)

### 4.6 Error Handling & Offline Support (25 min)

- **4.6.1** Add error boundaries for Firestore connection failures (10 min)
- **4.6.2** Implement basic offline queue for shape operations (10 min)
- **4.6.3** Add user-friendly error messages for sync failures (5 min)

### 4.7 Firestore Security Rules (15 min)

- **4.7.1** Create `firebase/firestore.rules` with authenticated user access (10 min)
- **4.7.2** Deploy security rules to Firebase project (3 min)
- **4.7.3** Test security rules with unauthenticated requests (2 min)

### 4.8 Critical Multi-User Testing (45 min)

- **4.8.1** Create `src/__tests__/services/firestore.test.ts` (15 min)
- **4.8.2** Manual test: Open 2 browser tabs, create shape in tab 1 (5 min)
- **4.8.3** Verify shape appears in tab 2 within 500ms (5 min)
- **4.8.4** Test shape movement sync between tabs (5 min)
- **4.8.5** Test shape deletion sync between tabs (5 min)
- **4.8.6** Test object locking: drag same shape from both tabs (10 min)

**Performance Targets (Relaxed for MVP)**:

- Shape sync: <500ms acceptable for MVP
- 3 users maximum for testing
- 25 shapes maximum limit

**Fallback Plans**:

- If real-time fails → 2-second polling (1 hour implementation)
- Nuclear option → Single-user canvas with "coming soon" message

**🚨 CRITICAL SUCCESS**: Multiple users see each other's rectangles in real-time

**Checkpoint 4** (Hour 16): ✅ **MAKE OR BREAK** - Two browser tabs can see each other's rectangles

---

## 5. PR-5: USER PRESENCE & CURSORS (Hours 16-20)

**Total Effort**: 200 minutes | **Risk Level**: MEDIUM | **Branch**: `feat/user-presence`

### 5.1 Realtime Database Setup (25 min)

- **5.1.1** Create `src/services/realtime.ts` with Realtime Database connection (10 min)
- **5.1.2** Set up user presence data structure: `/sessions/{canvasId}/{userId}` (8 min)
- **5.1.3** Test Realtime Database connection and write permissions (7 min)

### 5.2 User Color System (20 min)

- **5.2.1** Create `src/utils/colors.ts` with user color generation (10 min)
- **5.2.2** Generate consistent colors from user ID hash (5 min)
- **5.2.3** Create palette of 12 distinct colors for users (5 min)

### 5.3 Cursor Tracking (40 min)

- **5.3.1** Add mouse movement listener to Canvas component (10 min)
- **5.3.2** Throttle cursor position updates (every 100ms) (8 min)
- **5.3.3** Send cursor coordinates to Realtime Database (10 min)
- **5.3.4** Create `src/components/Cursor.tsx` for other users' cursors (12 min)

### 5.4 Presence Management (35 min)

- **5.4.1** Create `src/hooks/usePresence.ts` for presence state (15 min)
- **5.4.2** Track user online/offline status with heartbeat (10 min)
- **5.4.3** Handle user join/leave events (8 min)
- **5.4.4** Implement automatic cleanup on disconnect (2 min)

### 5.5 User Presence UI (30 min)

- **5.5.1** Create `src/components/UserPresence.tsx` component (15 min)
- **5.5.2** Display online users list with names and colors (10 min)
- **5.5.3** Show user count and activity status (5 min)

### 5.6 Cursor Display Integration (25 min)

- **5.6.1** Subscribe to other users' cursor positions (10 min)
- **5.6.2** Render other users' cursors on canvas (10 min)
- **5.6.3** Add user name labels next to cursors (5 min)

### 5.7 Testing & Performance (25 min)

- **5.7.1** Test multi-tab cursor movement synchronization (10 min)
- **5.7.2** Verify user list updates when users join/leave (5 min)
- **5.7.3** Test cursor tracking performance with 3+ users (5 min)
- **5.7.4** Create basic presence system tests (5 min)

**Performance Targets (Relaxed for MVP)**:

- Cursor updates: <200ms acceptable for MVP
- Basic presence indicators only

**Checkpoint 5** (Hour 20): ✅ Live cursor tracking between users

---

## 6. PR-6: ESSENTIAL UI/UX (Hours 20-22)

**Total Effort**: 140 minutes | **Risk Level**: LOW | **Branch**: `feat/ui-polish`

### 6.1 Toolbar Enhancement (30 min)

- **6.1.1** Redesign Toolbar with modern Tailwind styling (15 min)
- **6.1.2** Add icons to buttons (Plus icon for Add Rectangle) (8 min)
- **6.1.3** Implement hover states and button feedback (7 min)

### 6.2 Loading & Status Indicators (25 min)

- **6.2.1** Add loading spinner for shape creation operations (8 min)
- **6.2.2** Show connection status indicator (connected/disconnected) (10 min)
- **6.2.3** Add loading states for authentication (7 min)

### 6.3 Error Message System (20 min)

- **6.3.1** Create toast notification system for errors (10 min)
- **6.3.2** Add user-friendly messages for common failures (8 min)
- **6.3.3** Style error messages with appropriate colors (2 min)

### 6.4 User Experience Improvements (25 min)

- **6.4.1** Add helpful onboarding text: "Click 'Add Rectangle' to start" (5 min)
- **6.4.2** Improve visual feedback for selected shapes (better borders) (8 min)
- **6.4.3** Add keyboard shortcuts help tooltip (7 min)
- **6.4.4** Implement better empty state when no shapes exist (5 min)

### 6.5 Responsive Layout (15 min)

- **6.5.1** Ensure toolbar stays visible on different screen sizes (8 min)
- **6.5.2** Add mobile detection with "Desktop required" message (7 min)

### 6.6 Visual Polish (15 min)

- **6.6.1** Improve overall color scheme and consistency (8 min)
- **6.6.2** Add subtle animations for button interactions (4 min)
- **6.6.3** Clean up spacing and typography (3 min)

### 6.7 Testing & Validation (10 min)

- **6.7.1** Test UI across different browser sizes (5 min)
- **6.7.2** Verify loading states work correctly (3 min)
- **6.7.3** Test error scenarios display appropriate messages (2 min)

**Scope Limitations Applied**:

- ❌ No advanced UI polish
- ❌ No mobile responsiveness
- ❌ No complex error handling

**Checkpoint 6** (Hour 22): ✅ Clean, functional interface deployed and publicly accessible

---

## 7. PR-7: TESTING & DEPLOYMENT (Hours 22-24)

**Total Effort**: 140 minutes | **Risk Level**: MEDIUM | **Branch**: `feat/production-deploy`

### 7.1 Build Optimization (20 min)

- **7.1.1** Configure Vite for production build optimization (8 min)
- **7.1.2** Add code splitting for better loading performance (5 min)
- **7.1.3** Optimize bundle size (remove unused dependencies) (7 min)

### 7.2 Error Boundaries & Resilience (25 min)

- **7.2.1** Create React error boundary components (15 min)
- **7.2.2** Add fallback UI for crashed components (8 min)
- **7.2.3** Implement graceful degradation for Firebase failures (2 min)

### 7.3 Firebase Hosting Setup (20 min)

- **7.3.1** Install Firebase CLI: `npm install -g firebase-tools` (3 min)
- **7.3.2** Initialize Firebase Hosting: `firebase init hosting` (5 min)
- **7.3.3** Configure `firebase.json` for SPA routing (7 min)
- **7.3.4** Set build directory to `dist` in Firebase config (5 min)

### 7.4 Production Deployment (20 min)

- **7.4.1** Create production build: `npm run build` (5 min)
- **7.4.2** Deploy to Firebase Hosting: `firebase deploy --only hosting` (8 min)
- **7.4.3** Verify deployed app loads correctly (5 min)
- **7.4.4** Test Firebase services work in production (2 min)

### 7.5 Multi-User Production Testing (30 min)

- **7.5.1** Open production URL in 3 different browsers (5 min)
- **7.5.2** Test complete collaboration workflow with 3 users (15 min)
- **7.5.3** Verify real-time sync works in production environment (5 min)
- **7.5.4** Test authentication flows in production (5 min)

### 7.6 Performance Validation (15 min)

- **7.6.1** Check page load time with Chrome DevTools (<10 seconds) (5 min)
- **7.6.2** Test with 20+ rectangles for performance (5 min)
- **7.6.3** Verify memory usage remains reasonable (5 min)

### 7.7 Final Documentation (10 min)

- **7.7.1** Document known limitations in README (5 min)
- **7.7.2** Add usage instructions for new users (3 min)
- **7.7.3** List browser compatibility requirements (2 min)

**Success Criteria Validation**:

- ✅ 2+ users can see each other's rectangles
- ✅ Basic collaborative interaction works for 5+ minutes
- ✅ Deployed and shareable URL works
- ✅ Production app handles 3+ concurrent users

**Final Checkpoint** (Hour 24): ✅ Working collaborative canvas deployed to production

---

## ULTRA-FOCUSED SCOPE BOUNDARIES

### ✅ **MUST HAVE** (Core MVP)

1. Users can create rectangles
2. Users can move rectangles
3. Multiple users can see each other's rectangles in real-time
4. Basic authentication (email/password)
5. Deployed and publicly accessible

### ❌ **EXPLICITLY EXCLUDED** (Time Savers)

- User profiles or avatars
- Canvas persistence beyond basic shapes
- Undo/redo functionality
- Shape styling or colors (fixed gray only)
- Mobile responsiveness
- Advanced error handling
- Performance optimization
- Security beyond Firebase defaults
- Google OAuth (email auth only)
- Canvas grid overlay
- Advanced zoom controls
- Shape resizing
- Copy/paste functionality

### 🔄 **FALLBACK FEATURES** (If Time Permits)

- Google social login
- Basic shape selection feedback
- Improved cursor visibility
- Canvas boundary indicators

---

## RISK MITIGATION TASKS (V2 Edition)

### Primary Backup Plans

- **BACKUP-1**: 2-second polling if real-time sync fails (1 hour)
- **BACKUP-2**: Anonymous users if auth completely fails (30 min)
- **BACKUP-3**: Static shape demo with screenshots (2 hours)
- **BACKUP-4**: Simple HTML5 canvas if Konva fails (3 hours)

### Debugging Buffer Tasks

- **DEBUG-1**: Firebase connection troubleshooting (45 min)
- **DEBUG-2**: Konva basic functionality fixes (45 min)
- **DEBUG-3**: Browser compatibility issues (30 min)

### Nuclear Options (Last Resort)

- **NUCLEAR-1**: Single-user canvas with "multiplayer coming soon" message
- **NUCLEAR-2**: Screen recording demo of working prototype
- **NUCLEAR-3**: Detailed technical proof-of-concept document

---

## RELAXED PERFORMANCE TARGETS (V2)

### MVP Performance Expectations

- **Shape synchronization**: <500ms (relaxed from 100ms)
- **Cursor updates**: <200ms (relaxed from 50ms)
- **Canvas performance**: 20 rectangles minimum (reduced from 500)
- **Initial load**: <10 seconds (relaxed from 3 seconds)
- **Browser support**: Chrome desktop ONLY
- **Concurrent users**: 3 users maximum for testing
- **Canvas size**: 2000x2000px (reduced from 5000x5000px)
- **Object limit**: 25 shapes maximum
- **Session duration**: 30 minutes before refresh needed

### Quality Philosophy

**"Ship working ugly over broken beautiful"**

- Functionality > Performance > Polish
- Working sync > Perfect UI
- Documented limitations > Hidden failures
- Quick deployment > Feature completeness

---

## GANTT CHART - 24 HOUR MVP SPRINT V3 (ULTRA-GRANULAR)

```
Task                                      |  Hours: 0  2  4  6  8 10 12 14 16 18 20 22 24
==========================================================================================================
1. PR-1: Foundation Setup (240 min)      | [████████████████]
   1.1 Project Initialization (45m)      | [██████]
       1.1.1-1.1.4 Vite+React+Deps      | [████]
       1.1.5-1.1.8 Firebase SDK         | [██]
       1.1.9-1.1.13 Git & Config        | [██]
   1.2 Tailwind CSS Config (20m)         | [███]
   1.3 TypeScript Setup (15m)            | [██]
   1.4 Firebase Project (35m)            | [█████] **HIGH RISK**
   1.5 Basic App Structure (25m)         | [███]
   1.6 Testing Setup (15m)               | [██]
   1.7 Validation & Commit (15m)         | [██]

2. PR-2: Authentication (150 min)        |                  [████████████]
   2.1 Firebase Auth Integration (25m)   |                  [███]
   2.2 Authentication Context (30m)      |                  [████]
   2.3 Login Form Component (35m)        |                  [████]
   2.4 Authentication Guard (15m)        |                  [██]
   2.5 App Integration (15m)             |                  [██]
   2.6 Testing & Validation (15m)        |                  [██]
   2.7 Error Handling (15m)              |                  [██]

3. PR-3: Local Canvas (200 min)          |                           [█████████████]
   3.1 Canvas Core Setup (45m)           |                           [█████]
       3.1.1 Konva Stage Setup           |                           [██]
       3.1.2-3.1.5 Pan/Zoom/Bounds       |                           [███]
   3.2 Rectangle Component (40m)         |                           [████]
   3.3 Canvas State Mgmt (35m)           |                           [████]
   3.4 Toolbar Component (25m)           |                           [███]
   3.5 Keyboard Interactions (20m)       |                           [██]
   3.6 Shape Management (15m)            |                           [██]
   3.7 Integration & Testing (20m)       |                           [██]

4. PR-4: Real-time Sync (290 min) **CRITICAL** |                                    [████████████████████████]
   4.1 Data Schema & Types (20m)         |                                    [██]
   4.2 Firestore Service Layer (50m)     |                                    [█████]
       4.2.1 Firestore Connection        |                                    [██]
       4.2.2-4.2.5 CRUD Operations       |                                    [███]
   4.3 Real-time Synchronization (60m)   |                                    [██████]
       4.3.1 useShapes Hook             |                                    [██]
       4.3.2 Firestore Listeners        |                                    [██]
       4.3.3-4.3.4 Optimistic Updates   |                                    [██]
   4.4 Object Locking System (45m)       |                                    [█████]
   4.5 Canvas Integration (30m)          |                                    [███]
   4.6 Error Handling (25m)              |                                    [███]
   4.7 Security Rules (15m)              |                                    [██]
   4.8 Critical Testing (45m)            |                                    [█████]

5. PR-5: User Presence (200 min)         |                                                             [████████████████]
   5.1 Realtime DB Setup (25m)          |                                                             [██]
   5.2 User Color System (20m)           |                                                             [██]
   5.3 Cursor Tracking (40m)             |                                                             [████]
       5.3.1-5.3.2 Mouse Listeners       |                                                             [██]
       5.3.3-5.3.4 Cursor Component      |                                                             [██]
   5.4 Presence Management (35m)         |                                                             [███]
   5.5 User Presence UI (30m)            |                                                             [███]
   5.6 Cursor Integration (25m)          |                                                             [██]
   5.7 Testing & Performance (25m)       |                                                             [██]

6. PR-6: UI Polish (140 min)             |                                                                          [███████████]
   6.1 Toolbar Enhancement (30m)         |                                                                          [███]
   6.2 Loading & Status (25m)            |                                                                          [██]
   6.3 Error Messages (20m)              |                                                                          [██]
   6.4 UX Improvements (25m)             |                                                                          [██]
   6.5 Responsive Layout (15m)           |                                                                          [██]
   6.6 Visual Polish (15m)               |                                                                          [██]
   6.7 Testing (10m)                     |                                                                          [█]

7. PR-7: Production Deploy (140 min)     |                                                                                   [███████████]
   7.1 Build Optimization (20m)          |                                                                                   [██]
   7.2 Error Boundaries (25m)            |                                                                                   [██]
   7.3 Firebase Hosting (20m)            |                                                                                   [██]
   7.4 Production Deploy (20m)           |                                                                                   [██]
   7.5 Multi-User Testing (30m)          |                                                                                   [███]
   7.6 Performance Validation (15m)      |                                                                                   [██]
   7.7 Final Documentation (10m)         |                                                                                   [█]

CRITICAL CHECKPOINTS                     | ▲    ▲    ▲              ▲                                       ▲             ▲
                                         | CP1  CP2  CP3           CP4 (MAKE/BREAK)                        CP5          CP6

BACKUP/FALLBACK TASKS                    |    [~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~]
Extended Debugging Buffer               |         [~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~]
Real-time Fallback (2-sec polling)     |                                    [~~~~~~~~~~~~~~~]
Emergency Single-user Deploy           |                                                   [~~~~~~~]

Legend: [████] = Scheduled Work | [~~~~] = Buffer/Fallback Time | **CRITICAL** = High Risk Period
        CP = Checkpoint | ▲ = Critical Decision Point
```

### **Granular Task Time Summary**

| PR | Section | Tasks | Total Time | Risk Level |
|----|---------|-------|------------|------------|
| **PR-1** | Foundation Setup | 24 tasks | 240 min (4h) | 🔴 HIGH |
| **PR-2** | Authentication | 20 tasks | 150 min (2.5h) | 🟡 MEDIUM |
| **PR-3** | Local Canvas | 23 tasks | 200 min (3.3h) | 🟡 MEDIUM |
| **PR-4** | Real-time Sync | 28 tasks | 290 min (4.8h) | 🔴 **CRITICAL** |
| **PR-5** | User Presence | 25 tasks | 200 min (3.3h) | 🟡 MEDIUM |
| **PR-6** | UI Polish | 19 tasks | 140 min (2.3h) | 🟢 LOW |
| **PR-7** | Production Deploy | 20 tasks | 140 min (2.3h) | 🟡 MEDIUM |
| **TOTAL** | **All PRs** | **159 tasks** | **1360 min (22.7h)** | - |
| **Buffer** | Risk Management | - | **80 min (1.3h)** | - |
| **GRAND TOTAL** | **Complete MVP** | **159+ tasks** | **1440 min (24h)** | - |

## HOURLY DECISION FRAMEWORK (V2)

### **Hour 4 Decision Point**

❌ **If Basic Setup Failing**: Switch to simpler alternatives
✅ **If On Track**: Proceed to authentication

### **Hour 8 Decision Point**

❌ **If Auth Blocking**: Switch to anonymous users immediately
✅ **If Auth Working**: Continue with canvas development

### **Hour 12 Decision Point**

❌ **If Canvas Issues**: Accept basic static shapes, focus on sync
✅ **If Canvas Working**: Begin real-time implementation

### **Hour 16 Decision Point** (**CRITICAL**)

❌ **If Real-time Broken**: Deploy single-user version, document sync approach
✅ **If Real-time Working**: Celebrate and continue with presence features

### **Hour 20 Decision Point**

❌ **If Presence Failing**: Deploy without cursors, document feature
✅ **If Presence Working**: Add minimal polish

### **Hour 22 Decision Point**

❌ **If Deployment Issues**: Create screen recording demo
✅ **If Deployed**: Final testing and validation

---

## SUCCESS METRICS VALIDATION (V2)

### Minimum Viable Success (Hour 24)

- [ ] 2+ users can see each other's rectangles (even with delays)
- [ ] Rectangles persist across browser refreshes
- [ ] Basic user identification working (colors/names)
- [ ] Publicly accessible via shareable URL
- [ ] Works in Chrome desktop

### Stretch Success (If Everything Goes Well)

- [ ] Real-time cursor tracking functional
- [ ] Sub-500ms shape synchronization
- [ ] Clean, intuitive interface
- [ ] 3+ users can collaborate simultaneously
- [ ] Documented feature roadmap

### Acceptable Compromises

- ✅ Shape sync up to 2-second delays
- ✅ Manual page refresh for some updates
- ✅ Basic text-based user identification
- ✅ Desktop Chrome only support
- ✅ 25 shape limit clearly communicated

### MVP Success Definition

**"If 2+ people can move rectangles and see each other doing it, we win."**

All other features, performance optimizations, and polish are bonus points. The core technical validation is proving real-time collaborative visual editing is possible with our chosen technology stack.

---

## RESOURCE ALLOCATION (V3 - ULTRA-GRANULAR)

### **Detailed Time Distribution**

| Phase | PR | Duration | Tasks | Percentage | Risk Level |
|-------|----|---------:|------:|-----------:|------------|
| **Setup** | PR-1 | 240 min | 24 | 16.7% | 🔴 HIGH |
| **Auth** | PR-2 | 150 min | 20 | 10.4% | 🟡 MEDIUM |
| **Canvas** | PR-3 | 200 min | 23 | 13.9% | 🟡 MEDIUM |
| **Sync** | PR-4 | 290 min | 28 | 20.1% | 🔴 **CRITICAL** |
| **Presence** | PR-5 | 200 min | 25 | 13.9% | 🟡 MEDIUM |
| **Polish** | PR-6 | 140 min | 19 | 9.7% | 🟢 LOW |
| **Deploy** | PR-7 | 140 min | 20 | 9.7% | 🟡 MEDIUM |
| **Buffer** | Risk Mgmt | 80 min | - | 5.6% | 🟠 FALLBACK |
| **TOTAL** | **All** | **1440 min** | **159** | **100%** | - |

### **Risk-Time Allocation by Granular Tasks**

#### **🔴 High Risk Tasks (530 minutes - 36.8%)**
- **PR-1 Foundation**: 240 min across 24 granular tasks
  - Firebase project setup (35 min) - highest individual risk
  - Vite + React + TypeScript integration (45 min)
  - Initial testing framework setup (15 min)

- **PR-4 Real-time Sync**: 290 min across 28 granular tasks
  - Firestore real-time listeners (60 min) - highest technical risk
  - Object locking system (45 min) - conflict resolution complexity
  - Multi-user testing validation (45 min) - critical success validation

#### **🟡 Medium Risk Tasks (690 minutes - 47.9%)**
- **PR-2 Authentication**: 150 min (20 tasks) - Firebase Auth integration
- **PR-3 Local Canvas**: 200 min (23 tasks) - Konva.js learning curve
- **PR-5 User Presence**: 200 min (25 tasks) - Real-time Database complexity
- **PR-7 Production Deploy**: 140 min (20 tasks) - Firebase Hosting deployment

#### **🟢 Low Risk Tasks (140 minutes - 9.7%)**
- **PR-6 UI Polish**: 140 min (19 tasks) - Straightforward Tailwind styling

#### **🟠 Buffer Tasks (80 minutes - 5.6%)**
- Debugging time for unexpected issues
- Fallback implementations if primary approaches fail
- Additional testing time for critical path validation

### **Critical Path Analysis**

#### **Sequential Dependencies**
1. **PR-1 → PR-2**: Firebase project must exist before authentication
2. **PR-2 → PR-3**: Authentication required before canvas access
3. **PR-3 → PR-4**: Local canvas required before real-time sync
4. **PR-4 → PR-5**: Shape sync must work before adding presence features
5. **PR-5 → PR-6**: Core functionality required before UI polish
6. **PR-6 → PR-7**: Complete features required before production deployment

#### **Parallel Opportunities**
- **Within PR-4**: Firestore service development can happen in parallel with React hook development
- **Within PR-5**: Cursor tracking and presence UI can be developed simultaneously
- **Within PR-6**: UI components can be polished in parallel with error handling

### **Task Complexity Distribution**

#### **Simple Tasks (1-5 minutes): 28 tasks**
- Git commits, file creation, basic configuration
- Quick tests and validations
- Simple UI adjustments

#### **Medium Tasks (5-15 minutes): 89 tasks**
- Component development, hook implementation
- Firebase service integration
- Testing and validation

#### **Complex Tasks (15+ minutes): 42 tasks**
- Core system architecture (Konva setup, Firestore integration)
- Real-time synchronization logic
- Multi-user testing scenarios

### **Efficiency Optimizations**

#### **Batch Similar Tasks**
- All Firebase configuration tasks in PR-1
- All component creation tasks grouped by PR
- All testing tasks at end of each PR

#### **Minimize Context Switching**
- Complete each granular task fully before moving to next
- Group related tasks within same files/components
- Batch all deployment and configuration tasks

#### **Risk Mitigation Through Granularity**
- Each 2-10 minute task reduces risk of getting "stuck"
- Clear progress indicators every few minutes
- Easy rollback to specific granular task if needed

### **Success Metrics by Granular Tasks**

#### **Completion Rate Targets**
- **Hour 4**: 24 tasks completed (PR-1 complete)
- **Hour 6**: 44 tasks completed (PR-1 + PR-2 complete)
- **Hour 10**: 67 tasks completed (PR-1 through PR-3 complete)
- **Hour 16**: 95 tasks completed (PR-1 through PR-4 complete) - **CRITICAL**
- **Hour 20**: 120 tasks completed (PR-1 through PR-5 complete)
- **Hour 22**: 139 tasks completed (PR-1 through PR-6 complete)
- **Hour 24**: 159 tasks completed (All PRs complete) - **SUCCESS**

#### **Quality Gates**
- Each PR requires 100% of its granular tasks complete before merge
- Critical checkpoints validate cumulative task completion
- Fallback triggers based on task completion rate vs. time elapsed

---

*Document Version: 3.0 (Ultra-Granular MVP)*
*Created: October 13, 2025*
*Updated: October 14, 2025*
*Sprint Start: October 14, 2025*
*Total Tasks: 159 granular tasks across 7 PRs*
*Philosophy: "Working slowly is infinitely better than broken quickly"*
