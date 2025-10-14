# CollabCanvas 24-Hour MVP - Development Task List

## 🎯 **Mission: Prove Real-Time Collaborative Canvas Works**

**Sprint Goal**: 2+ users can simultaneously create, move, and see rectangles in real-time
**Timeline**: 24 hours (Due: 2025.10.14)
**Philosophy**: "Working slowly is infinitely better than broken quickly"

---

## 📊 **SPRINT PROGRESS SUMMARY**

**Last Updated**: October 14, 2025

### **Completed Milestones** ✅

| PR | Status | Completion Date | Notes |
|----|--------|----------------|-------|
| **PR-1** | ✅ **COMPLETE** | Oct 13, 2025 | Foundation setup with Vite+React+Konva+Tailwind+Firebase |
| **PR-2** | ✅ **COMPLETE** | Oct 14, 2025 | Firebase Authentication with email/password, context, guards |
| **PR-3** | ✅ **COMPLETE** | Oct 14, 2025 | Local canvas functionality - rectangles, drag, delete, pan/zoom |
| **PR-4** | ✅ **COMPLETE** | Oct 14, 2025 | **CRITICAL** - Real-time collaboration sync - TESTED & WORKING! |
| **PR-5** | 🔄 **NEXT** | - | User presence and cursor tracking |
| **PR-6** | ⏳ Pending | - | Essential UI polish |
| **PR-7** | ⏳ Pending | - | Production deployment |

### **Key Achievements Today**

✅ **PR-1 Complete**:

- Vite + React + TypeScript + Konva.js project initialized
- Tailwind CSS configured with custom canvas styles
- Firebase project created (Auth, Firestore, Realtime DB)
- Basic Canvas component with Konva Stage (2000x2000px)
- Vitest testing framework configured
- Build process verified

✅ **PR-2 Complete**:

- Firebase Authentication fully integrated
- AuthContext with `onAuthStateChanged` persistence
- LoginForm with validation and mode switching
- AuthGuard protecting canvas routes
- User display in toolbar (avatar, name, email)
- Logout functionality with confirmation
- Error handling with auto-dismiss (10s) and manual dismiss
- User-friendly loading states
- Full viewport layout optimized
- Unit tests for Auth components

✅ **PR-3 Complete**:

- Canvas core setup: pan, zoom, and boundary constraints
- Rectangle component with selection, drag, and boundary enforcement
- useCanvas hook for local state management (add, remove, update, select)
- Toolbar component with Add Rectangle and zoom controls
- Keyboard interactions (Delete to remove, Escape to deselect)
- Shape management utilities (helpers.ts) for DRY code
- Canvas dimensions: 2000x2000px with responsive viewport
- Integration testing (Rectangle, Toolbar, useCanvas tests)
- Bug fixes: stage/shape drag conflicts, boundary constraints
- Code organization: centralized constants and utilities

✅ **PR-4 Complete - CRITICAL MILESTONE ACHIEVED!**:

- Firestore data schema & TypeScript interfaces for real-time sync
- Complete Firestore service layer (firestore.ts) with CRUD operations
- Real-time shape synchronization using onSnapshot listeners
- useShapes hook replacing local state with Firestore state
- Object locking system (first-come-first-serve, 30s timeout)
- Optimistic updates for instant UI feedback
- Error handling & loading states in UI
- Firestore security rules (authenticated-only access)
- Multi-user testing validated: 2+ users collaborating successfully
- Shapes persist across browser refreshes
- Real-time sync latency <500ms confirmed

### **Current State**

🎉 **MVP CORE PROVEN**: Real-time collaborative canvas is WORKING!
🟢 **Multi-User**: 2+ users can collaborate simultaneously with <500ms sync
🟢 **Persistence**: All shapes saved to Firestore, survive browser refresh
🟢 **Features**: Create, select, drag, delete rectangles with real-time sync
🟢 **Canvas**: Pan/zoom with mouse, 2000x2000px canvas with boundaries
🟢 **Security**: Firestore rules enforcing authenticated-only access
🎨 **UI**: Clean interface with toolbar, zoom controls, user info, loading states
🔒 **Locking**: Basic shape locking system (30s timeout)

### **Next Steps**

**PR-5: User Presence & Cursor Tracking** (Estimated: 2 hours) 🟡 **MEDIUM PRIORITY**

- Real-time cursor position tracking
- Online user list with colors
- User names displayed next to cursors
- Realtime Database for high-frequency updates
- Visual indicators for who's online

---

## 📁 **PROJECT FILE STRUCTURE**

```
Gauntlet Project One/collabcanvas-mvp/
├── 📄 package.json                     # Dependencies & scripts
├── 📄 vite.config.ts                   # Vite configuration
├── 📄 tailwind.config.js              # Tailwind CSS config
├── 📄 tsconfig.json                   # TypeScript configuration
├── 📄 .gitignore                      # Git ignore rules
├── 📁 public/
│   ├── 📄 index.html                  # Main HTML template
│   └── 📄 favicon.ico                 # App favicon
├── 📁 src/
│   ├── 📄 main.tsx                    # React app entry point
│   ├── 📄 App.tsx                     # Main App component
│   ├── 📄 index.css                   # Global styles & Tailwind
│   ├── 📁 components/
│   │   ├── 📄 Canvas.tsx              # Main canvas component (Konva)
│   │   ├── 📄 Toolbar.tsx             # Shape creation controls
│   │   ├── 📄 UserPresence.tsx        # Online users list
│   │   ├── 📄 Rectangle.tsx           # Rectangle shape component
│   │   └── 📄 Cursor.tsx              # Other users' cursors
│   ├── 📁 auth/
│   │   ├── 📄 AuthContext.tsx         # Firebase auth context
│   │   ├── 📄 LoginForm.tsx           # Email/password login
│   │   └── 📄 AuthGuard.tsx           # Protected route wrapper
│   ├── 📁 services/
│   │   ├── 📄 firebase.ts             # Firebase configuration
│   │   ├── 📄 firestore.ts            # Shape data operations
│   │   ├── 📄 realtime.ts             # Cursor & presence sync
│   │   └── 📄 types.ts                # TypeScript interfaces
│   ├── 📁 hooks/
│   │   ├── 📄 useCanvas.ts            # Canvas state management
│   │   ├── 📄 useShapes.ts            # Shape CRUD operations
│   │   └── 📄 usePresence.ts          # User presence tracking
│   ├── 📁 utils/
│   │   ├── 📄 colors.ts               # User color generation
│   │   └── 📄 helpers.ts              # Utility functions
│   └── 📁 __tests__/
│       ├── 📁 components/
│       │   ├── 📄 Canvas.test.tsx     # Canvas component tests
│       │   ├── 📄 Rectangle.test.tsx  # Rectangle component tests
│       │   └── 📄 Toolbar.test.tsx    # Toolbar component tests
│       ├── 📁 hooks/
│       │   ├── 📄 useCanvas.test.ts   # Canvas hook tests
│       │   ├── 📄 useShapes.test.ts   # Shape management tests
│       │   └── 📄 usePresence.test.ts # Presence tracking tests
│       ├── 📁 services/
│       │   ├── 📄 firestore.test.ts   # Firestore service tests
│       │   └── 📄 realtime.test.ts    # Real-time service tests
│       ├── 📁 integration/
│       │   ├── 📄 auth-flow.test.tsx  # Authentication flow tests
│       │   ├── 📄 canvas-sync.test.tsx # Multi-user sync tests
│       │   └── 📄 user-presence.test.tsx # Presence system tests
│       └── 📁 e2e/
│           ├── 📄 collaboration.test.ts # End-to-end collaboration
│           └── 📄 production.test.ts  # Production deployment tests
└── 📁 firebase/
    ├── 📄 firestore.rules             # Firestore security rules
    ├── 📄 database.rules.json         # Realtime DB rules
    └── 📄 firebase.json               # Firebase project config
```

### **Key File Purposes**

| File | Purpose | Priority | Status |
|------|---------|----------|--------|
| `App.tsx` | Main component orchestration | 🔴 Critical | ✅ Complete |
| `Canvas.tsx` | Konva Stage & rectangle rendering | 🔴 Critical | ✅ Complete |
| `Rectangle.tsx` | Rectangle shape component | 🔴 Critical | ✅ Complete |
| `Toolbar.tsx` | Shape creation controls | 🔴 Critical | ✅ Complete |
| `useShapes.ts` | Real-time Firestore state management | 🔴 Critical | ✅ Complete |
| `firestore.ts` | Shape persistence & real-time sync | 🔴 Critical | ✅ Complete |
| `helpers.ts` | Shape utility functions | 🟡 Medium | ✅ Complete |
| `firebase.ts` | Firebase SDK initialization | 🔴 Critical | ✅ Complete |
| `types.ts` | TypeScript interfaces | 🔴 Critical | ✅ Complete |
| `firestore.rules` | Firestore security rules | 🔴 Critical | ✅ Complete |
| `realtime.ts` | Cursor tracking & presence | 🟡 Medium | ⏳ Next |
| `AuthContext.tsx` | User authentication state | 🟡 Medium | ✅ Complete |
| `useCanvas.ts` | (Legacy) Local state - replaced by useShapes | 🟢 Low | ✅ Complete |

### **Component Hierarchy**

```
App
├── AuthGuard
│   ├── Toolbar (Add Rectangle button)
│   ├── UserPresence (Online users list)
│   └── Canvas
│       ├── Rectangle[] (All shapes)
│       └── Cursor[] (Other users' cursors)
└── LoginForm (if not authenticated)
```

---

## 🔄 **PROGRESSIVE PULL REQUEST STRATEGY**

### **PR Milestones & Deployment Strategy**

Each PR represents a **working, deployable state** that builds incrementally toward the final MVP. This ensures rollback safety and demonstrates progress at each checkpoint.

| PR # | Timing | Title | Description | Deploy Target | Status |
|------|--------|-------|-------------|---------------|--------|
| **PR-1** | Hour 4 | `feat: basic project setup and canvas foundation` | Vite+React+Konva+Tailwind+Firebase config | ✅ Dev Deploy | ✅ **COMPLETE** |
| **PR-2** | Hour 6 | `feat: firebase authentication system` | Email/password auth with context | ✅ Dev Deploy | ✅ **COMPLETE** |
| **PR-3** | Hour 10 | `feat: single-user rectangle canvas` | Create, select, drag, delete rectangles locally | ✅ Dev Deploy | ✅ **COMPLETE** |
| **PR-4** | Hour 12 | `feat: real-time collaborative rectangles` | **CRITICAL** - Multi-user shape synchronization | ✅ Dev Deploy | ✅ **COMPLETE** |
| **PR-5** | Hour 16 | `feat: user presence and cursor tracking` | Live cursors and online user indicators | ✅ Stage Deploy | 🔄 **NEXT** |
| **PR-6** | Hour 22 | `feat: essential UI and user experience` | Toolbar, presence list, basic polish | ✅ Stage Deploy | ⏳ Pending |
| **PR-7** | Hour 24 | `feat: production deployment and validation` | Final optimizations, error handling | ✅ **Prod Deploy** | ⏳ Pending |

### **Progressive PR Details**

#### **PR-1: Foundation Setup** (Hour 4) 🔴 ✅ **COMPLETE**

**Branch**: `feat/foundation-setup`

##### **1.1 Project Initialization & Dependencies** (45 minutes) ✅

- [x] **1.1.1** Create new directory `Gauntlet Project One/collabcanvas-mvp` (2 min)
- [x] **1.1.2** Initialize Git repository with `git init` (2 min)
- [x] **1.1.3** Create Vite React TypeScript project: `npm create vite@latest . -- --template react-ts` (5 min)
- [x] **1.1.4** Install core dependencies: `npm install react-konva konva tailwindcss` (5 min)
- [x] **1.1.5** Install Firebase SDK: `npm install firebase` (3 min)
- [x] **1.1.6** Install dev dependencies: `npm install -D @types/react @types/react-dom autoprefixer postcss` (3 min)
- [x] **1.1.7** Verify installation with `npm run dev` - should show Vite default page (5 min)
- [x] **1.1.8** Test build process with `npm run build` (5 min)
- [x] **1.1.9** Create `.gitignore` with node_modules, dist, .env* (3 min)
- [x] **1.1.10** Initial Git commit: `git add . && git commit -m "Initial Vite + React + TS setup"` (2 min)
- [x] **1.1.11** Create development branch: `git checkout -b feat/foundation-setup` (1 min)
- [x] **1.1.12** Update package.json with project name and scripts (3 min)
- [x] **1.1.13** Document package.json dependencies with inline comments (6 min)

##### **1.2 Tailwind CSS Configuration** (20 minutes) ✅

- [x] **1.2.1** Initialize Tailwind: `npx tailwindcss init -p` (3 min)
- [x] **1.2.2** Configure `tailwind.config.js` with content paths for React files (5 min)
- [x] **1.2.3** Add Tailwind directives to `src/index.css` (@tailwind base, components, utilities) (3 min)
- [x] **1.2.4** Create basic CSS reset and canvas-specific styles in `src/index.css` (5 min)
- [x] **1.2.5** Test Tailwind by adding utility classes to default App component (2 min)
- [x] **1.2.6** Verify hot reload works with style changes (2 min)

##### **1.3 TypeScript Configuration** (15 minutes) ✅

- [x] **1.3.1** Review default `tsconfig.json` and add strict mode settings (5 min)
- [x] **1.3.2** Add path aliases for clean imports: `@/components`, `@/services`, `@/hooks` (5 min)
- [x] **1.3.3** Update Vite config to recognize path aliases (3 min)
- [x] **1.3.4** Test TypeScript compilation with `npx tsc --noEmit` (2 min)

##### **1.4 Firebase Project Setup** (35 minutes) ✅

- [x] **1.4.1** Create new Firebase project at console.firebase.google.com (5 min)
- [x] **1.4.2** Enable Authentication service (email/password provider only) (5 min)
- [x] **1.4.3** Create Firestore database in test mode (US-central region) (5 min)
- [x] **1.4.4** Create Realtime Database in test mode (US-central region) (3 min)
- [x] **1.4.5** Register web app in Firebase project settings (3 min)
- [x] **1.4.6** Copy Firebase config object to `src/services/firebase.ts` (5 min)
- [x] **1.4.7** Create environment variables file `.env.local` with Firebase keys (5 min)
- [x] **1.4.8** Test Firebase connection with basic `initializeApp()` call (4 min)

##### **1.5 Basic App Structure** (25 minutes) ✅

- [x] **1.5.1** Create folder structure: `src/components`, `src/services`, `src/hooks`, `src/auth` (2 min)
- [x] **1.5.2** Replace default `src/App.tsx` with basic layout structure (8 min)
- [x] **1.5.3** Create `src/components/Canvas.tsx` with empty Konva Stage (10 min)
- [x] **1.5.4** Add Canvas component to App with full viewport dimensions (3 min)
- [x] **1.5.5** Style App layout with Tailwind (flex, full height, basic colors) (2 min)

##### **1.6 Basic Testing Setup** (15 minutes) ✅

- [x] **1.6.1** Install testing dependencies: `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom` (5 min)
- [x] **1.6.2** Create `vitest.config.ts` with React testing configuration (5 min)
- [x] **1.6.3** Create `src/__tests__/App.test.tsx` with basic render test (3 min)
- [x] **1.6.4** Run test suite with `npm run test` to verify setup (2 min)

##### **1.7 Final Validation & Commit** (15 minutes) ✅

- [x] **1.7.1** Run full development server and verify no console errors (3 min)
- [x] **1.7.2** Test Canvas component renders Konva stage (empty gray rectangle) (3 min)
- [x] **1.7.3** Verify Tailwind utilities work (add test classes and check visual changes) (2 min)
- [x] **1.7.4** Confirm Firebase config loads without errors (check browser console) (2 min)
- [x] **1.7.5** Run build process: `npm run build` and verify dist/ folder created (3 min)
- [x] **1.7.6** Final commit: `git add . && git commit -m "Complete foundation setup with Vite+React+Konva+Tailwind+Firebase"` (2 min)

**Success Criteria**: ✅ **COMPLETE**

- [x] Vite dev server runs on localhost:5173 without errors
- [x] Basic canvas renders (empty Konva stage, 2000x2000px)
- [x] Tailwind utilities work (test with bg-blue-500, p-4, etc.)
- [x] Firebase project exists and config loads
- [x] **Unit Tests**: App component renders without crashing
- [x] **Integration Test**: Canvas initializes with correct dimensions
- [x] **Smoke Test**: Build process completes successfully

**Deploy**: Basic static site with empty canvas

---

#### **PR-2: Authentication Layer** (Hour 6) 🟡 ✅ **COMPLETE**

**Branch**: `feat/firebase-auth`

##### **2.1 Firebase Authentication Integration** (25 minutes) ✅

- [x] **2.1.1** Create `src/services/firebase.ts` with auth configuration (8 min)
- [x] **2.1.2** Import and initialize Firebase Auth: `getAuth()` (3 min)
- [x] **2.1.3** Test Firebase Auth connection in browser console (2 min)
- [x] **2.1.4** Create `src/services/types.ts` with User interface definitions (5 min)
- [x] **2.1.5** Add auth-related utilities: `signUpWithEmail`, `signInWithEmail`, `signOut` (7 min)

##### **2.2 Authentication Context** (30 minutes) ✅

- [x] **2.2.1** Create `src/auth/AuthContext.tsx` with React Context setup (10 min)
- [x] **2.2.2** Implement AuthProvider component with state management (8 min)
- [x] **2.2.3** Add `onAuthStateChanged` listener for persistence (7 min)
- [x] **2.2.4** Create custom hook `useAuth()` for consuming context (3 min)
- [x] **2.2.5** Add loading state handling during auth initialization (2 min)

##### **2.3 Login Form Component** (35 minutes) ✅

- [x] **2.3.1** Create `src/auth/LoginForm.tsx` with form structure (10 min)
- [x] **2.3.2** Add email and password input fields with Tailwind styling (8 min)
- [x] **2.3.3** Implement form validation (email format, password length) (10 min)
- [x] **2.3.4** Add login/signup form state switching (toggle between modes) (5 min)
- [x] **2.3.5** Integrate Firebase auth functions with form submission (2 min)

##### **2.4 Authentication Guard** (15 minutes) ✅

- [x] **2.4.1** Create `src/auth/AuthGuard.tsx` wrapper component (8 min)
- [x] **2.4.2** Add conditional rendering: show LoginForm if not authenticated (4 min)
- [x] **2.4.3** Display loading spinner during auth check (3 min)

##### **2.5 App Integration** (15 minutes) ✅

- [x] **2.5.1** Wrap App component with AuthProvider in `src/main.tsx` (3 min)
- [x] **2.5.2** Replace App content with AuthGuard wrapper (5 min)
- [x] **2.5.3** Add basic user display: name/email in top-right corner (5 min)
- [x] **2.5.4** Add logout button with confirmation (2 min)

##### **2.6 Testing & Validation** (15 minutes) ✅

- [x] **2.6.1** Create `src/__tests__/auth/AuthContext.test.tsx` with basic tests (8 min)
- [x] **2.6.2** Test signup flow manually: create new account (3 min)
- [x] **2.6.3** Test login flow manually: sign in with created account (2 min)
- [x] **2.6.4** Test persistence: refresh browser and verify still logged in (2 min)

##### **2.7 Error Handling & Polish** (15 minutes) ✅

- [x] **2.7.1** Add error state management for login failures (8 min)
- [x] **2.7.2** Display user-friendly error messages for auth failures (4 min)
- [x] **2.7.3** Add basic loading indicators during login/signup (3 min)

**Success Criteria**: ✅ **COMPLETE**

- [x] User can sign up with email/password
- [x] User can log in/out successfully
- [x] Auth state persists on browser refresh
- [x] Protected canvas only accessible when authenticated
- [x] **Unit Tests**: AuthContext provides correct auth state
- [x] **Unit Tests**: LoginForm validation works correctly
- [x] **Integration Test**: Complete signup/login/logout flow
- [x] **Integration Test**: Auth persistence across page refresh
- [x] **Security Test**: Unauthenticated users see login form only

**Deploy**: Login-protected empty canvas

---

#### **PR-3: Local Canvas Functionality** (Hour 10) 🟡 ✅ **COMPLETE**

**Branch**: `feat/local-rectangles`

##### **3.1 Canvas Core Setup** (45 minutes) ✅

- [x] **3.1.1** Enhance `src/components/Canvas.tsx` with full Konva Stage setup (15 min)
- [x] **3.1.2** Set canvas dimensions: 2000x2000px with viewport window (8 min)
- [x] **3.1.3** Implement basic pan functionality with mouse drag (10 min)
- [x] **3.1.4** Add zoom functionality with mouse wheel (8 min)
- [x] **3.1.5** Add canvas boundaries to prevent infinite panning (4 min)

##### **3.2 Rectangle Shape Component** (40 minutes) ✅

- [x] **3.2.1** Create `src/components/Rectangle.tsx` with Konva Rect (15 min)
- [x] **3.2.2** Add selection state with visual feedback (border highlight) (10 min)
- [x] **3.2.3** Implement click-to-select functionality (8 min)
- [x] **3.2.4** Add drag-to-move with position updates (7 min)

##### **3.3 Canvas State Management** (35 minutes) ✅

- [x] **3.3.1** Create `src/hooks/useCanvas.ts` for local state management (20 min)
- [x] **3.3.2** Implement shapes array state with add/remove functions (10 min)
- [x] **3.3.3** Add selected shape state management (3 min)
- [x] **3.3.4** Create shape ID generation utility (2 min)

##### **3.4 Toolbar Component** (25 minutes) ✅

- [x] **3.4.1** Create `src/components/Toolbar.tsx` with basic layout (8 min)
- [x] **3.4.2** Add "Add Rectangle" button with Tailwind styling (5 min)
- [x] **3.4.3** Implement shape creation: 100x100px at canvas center (8 min)
- [x] **3.4.4** Add zoom controls: zoom in/out buttons (4 min)

##### **3.5 Keyboard Interactions** (20 minutes) ✅

- [x] **3.5.1** Add global keyboard event listener to App component (8 min)
- [x] **3.5.2** Implement Delete key to remove selected shapes (8 min)
- [x] **3.5.3** Add Escape key to deselect all shapes (4 min)

##### **3.6 Shape Management Logic** (15 minutes) ✅

- [x] **3.6.1** Create `src/utils/helpers.ts` with shape utility functions (8 min)
- [x] **3.6.2** Add shape positioning helper (center shapes on creation) (4 min)
- [x] **3.6.3** Add shape validation helper (ensure shapes stay in bounds) (3 min)

##### **3.7 Integration & Testing** (20 minutes) ✅

- [x] **3.7.1** Integrate all components into main App component (8 min)
- [x] **3.7.2** Create `src/__tests__/components/Rectangle.test.tsx` (6 min)
- [x] **3.7.3** Create `src/__tests__/components/Toolbar.test.tsx` (6 min)
- [x] **3.7.4** Create `src/__tests__/hooks/useCanvas.test.ts` (bonus)

**Success Criteria**: ✅ **ALL COMPLETE**

- [x] "Add Rectangle" button creates 100x100px gray rectangles at center
- [x] Click on rectangle selects it (shows border highlight)
- [x] Drag selected rectangles to move them around canvas
- [x] Delete key removes currently selected rectangle
- [x] Canvas pan/zoom works smoothly with mouse
- [x] **Unit Tests**: Rectangle component renders with correct properties
- [x] **Unit Tests**: Toolbar button triggers shape creation
- [x] **Unit Tests**: useCanvas hook manages state correctly
- [x] **Integration Test**: Complete create→select→move→delete workflow
- [x] **Integration Test**: Canvas boundaries prevent shapes from moving outside
- [x] **User Test**: Keyboard interactions work correctly

**Deploy**: ✅ Fully functional single-user canvas

**Additional Achievements**:

- Implemented real-time drag boundary constraints using `dragBoundFunc`
- Fixed stage/shape drag conflicts with synchronous ref tracking
- Centralized constants and utilities in `src/utils/helpers.ts`
- Independent axis constraints for canvas panning (horizontal/vertical)

---

#### **PR-4: Real-Time Collaboration** (Hour 12) 🔴 **CRITICAL** ✅ **COMPLETE**

**Branch**: `feat/realtime-sync`

##### **4.1 Data Schema & Types** (20 minutes) ✅

- [x] **4.1.1** Define Firestore document structure for canvas shapes (8 min)
- [x] **4.1.2** Update `src/services/types.ts` with Shape, Canvas interfaces (8 min)
- [x] **4.1.3** Add shape locking interfaces: `LockedShape`, `LockStatus` (4 min)

##### **4.2 Firestore Service Layer** (50 minutes) ✅

- [x] **4.2.1** Create `src/services/firestore.ts` with Firestore connection (15 min)
- [x] **4.2.2** Implement `createShape()` function for adding new shapes (10 min)
- [x] **4.2.3** Implement `updateShape()` function for position/property changes (10 min)
- [x] **4.2.4** Implement `deleteShape()` function for shape removal (8 min)
- [x] **4.2.5** Add `subscribeToCanvas()` for real-time shape updates (7 min)

##### **4.3 Real-Time Shape Synchronization** (60 minutes) ✅

- [x] **4.3.1** Create `src/hooks/useShapes.ts` for shape state management (20 min)
- [x] **4.3.2** Implement Firestore listener for incoming shape changes (15 min)
- [x] **4.3.3** Add optimistic updates for local shape operations (15 min)
- [x] **4.3.4** Handle conflicts between local and remote shape updates (10 min)

##### **4.4 Object Locking System** (45 minutes) ✅

- [x] **4.4.1** Implement shape locking mechanism (first-come-first-serve) (20 min)
- [x] **4.4.2** Add visual feedback for locked shapes (red border) (10 min)
- [x] **4.4.3** Implement lock acquisition on shape drag start (8 min)
- [x] **4.4.4** Add automatic lock release after 30 seconds of inactivity (7 min)

##### **4.5 Canvas Component Integration** (30 minutes) ✅

- [x] **4.5.1** Replace local state with useShapes hook in App component (15 min)
- [x] **4.5.2** Update Rectangle components to use full Shape interface (8 min)
- [x] **4.5.3** Modify shape creation to save to Firestore immediately (7 min)

##### **4.6 Error Handling & Offline Support** (25 minutes) ✅

- [x] **4.6.1** Add error state management for Firestore failures (10 min)
- [x] **4.6.2** Implement loading states in UI (10 min)
- [x] **4.6.3** Add user-friendly error messages for sync failures (5 min)

##### **4.7 Firestore Security Rules** (15 minutes) ✅

- [x] **4.7.1** Create `firestore.rules` with authenticated user access (10 min)
- [x] **4.7.2** Configure firebase.json for rules deployment (3 min)
- [x] **4.7.3** Add deploy scripts to package.json (2 min)

##### **4.8 Critical Multi-User Testing** (45 minutes) ✅

- [x] **4.8.1** Development server running for testing (5 min)
- [x] **4.8.2** Manual test: Open 2 browser tabs, create shape in tab 1 (5 min)
- [x] **4.8.3** Verify shape appears in tab 2 within 500ms (5 min)
- [x] **4.8.4** Test shape movement sync between tabs (5 min)
- [x] **4.8.5** Test shape deletion sync between tabs (5 min)
- [x] **4.8.6** Verify shape persistence across browser refresh (10 min)
- [x] **4.8.7** Validate simultaneous multi-user editing (10 min)

**Success Criteria**: ✅ **ALL CORE CRITERIA VALIDATED!**

- [x] **CRITICAL**: Multiple users see each other's rectangles in real-time ✅
- [x] **CRITICAL**: Shape changes sync between browsers within 500ms ✅
- [x] **CRITICAL**: Basic object locking system implemented ✅
- [x] **CRITICAL**: Shapes persist across browser refresh ✅
- [x] **Manual Test**: Multi-tab rectangle synchronization validated (2+ tabs) ✅
- [x] **Manual Test**: Shape persistence after page refresh validated ✅
- [x] **Manual Test**: Create shape in tab 1, appears in tab 2 <500ms ✅
- [x] **Manual Test**: Shape movement sync validated ✅
- [x] **Manual Test**: Shape deletion sync validated ✅
- [ ] **Unit Tests**: Firestore service tests (deferred to PR-6)
- [ ] **Unit Tests**: useShapes hook tests (deferred to PR-6)
- [ ] **Conflict Test**: Simultaneous drag locking (basic system in place)
- [ ] **Network Test**: Offline behavior (basic error handling in place)
- [ ] **Load Test**: Performance with 20+ shapes (works in manual testing)

**Deploy**: ✅ **MILESTONE COMPLETE** - Multi-user collaborative canvas WORKING!

**Additional Achievements**:

- Created comprehensive Firestore service with 450+ lines of code
- Implemented useShapes hook with real-time synchronization
- Added optimistic updates for instant UI feedback
- Firestore security rules protecting all data operations
- Loading and error states for better user experience
- Shape locking system with 30-second timeout
- Real-time onSnapshot listeners for instant updates
- Successfully tested with 2+ concurrent users
- Validated <500ms sync latency in real-world testing

🚨 **FALLBACK PLAN**: If real-time sync fails completely:

1. Implement 2-second polling instead of real-time listeners (1 hour)
2. Deploy single-user version with "Multiplayer coming soon" message

---

#### **PR-5: User Presence** (Hour 20) 🟡

**Branch**: `feat/user-presence`

##### **5.1 Realtime Database Setup** (25 minutes)

- [ ] **5.1.1** Create `src/services/realtime.ts` with Realtime Database connection (10 min)
- [ ] **5.1.2** Set up user presence data structure: `/sessions/{canvasId}/{userId}` (8 min)
- [ ] **5.1.3** Test Realtime Database connection and write permissions (7 min)

##### **5.2 User Color System** (20 minutes)

- [ ] **5.2.1** Create `src/utils/colors.ts` with user color generation (10 min)
- [ ] **5.2.2** Generate consistent colors from user ID hash (5 min)
- [ ] **5.2.3** Create palette of 12 distinct colors for users (5 min)

##### **5.3 Cursor Tracking** (40 minutes)

- [ ] **5.3.1** Add mouse movement listener to Canvas component (10 min)
- [ ] **5.3.2** Throttle cursor position updates (every 100ms) (8 min)
- [ ] **5.3.3** Send cursor coordinates to Realtime Database (10 min)
- [ ] **5.3.4** Create `src/components/Cursor.tsx` for other users' cursors (12 min)

##### **5.4 Presence Management** (35 minutes)

- [ ] **5.4.1** Create `src/hooks/usePresence.ts` for presence state (15 min)
- [ ] **5.4.2** Track user online/offline status with heartbeat (10 min)
- [ ] **5.4.3** Handle user join/leave events (8 min)
- [ ] **5.4.4** Implement automatic cleanup on disconnect (2 min)

##### **5.5 User Presence UI** (30 minutes)

- [ ] **5.5.1** Create `src/components/UserPresence.tsx` component (15 min)
- [ ] **5.5.2** Display online users list with names and colors (10 min)
- [ ] **5.5.3** Show user count and activity status (5 min)

##### **5.6 Cursor Display Integration** (25 minutes)

- [ ] **5.6.1** Subscribe to other users' cursor positions (10 min)
- [ ] **5.6.2** Render other users' cursors on canvas (10 min)
- [ ] **5.6.3** Add user name labels next to cursors (5 min)

##### **5.7 Testing & Performance** (25 minutes)

- [ ] **5.7.1** Test multi-tab cursor movement synchronization (10 min)
- [ ] **5.7.2** Verify user list updates when users join/leave (5 min)
- [ ] **5.7.3** Test cursor tracking performance with 3+ users (5 min)
- [ ] **5.7.4** Create basic presence system tests (5 min)

**Success Criteria**:

- [ ] Live cursor tracking between users with <200ms latency
- [ ] Online user list with colors and names
- [ ] User names display next to their cursors
- [ ] Automatic cleanup when users disconnect
- [ ] **Unit Tests**: Cursor component renders at correct coordinates
- [ ] **Unit Tests**: UserPresence component displays active users
- [ ] **Integration Test**: Multi-tab cursor movement sync
- [ ] **Integration Test**: User join/leave events update presence list
- [ ] **Real-time Test**: Cursor position updates within 200ms
- [ ] **Cleanup Test**: User disconnect removes cursor and updates list

**Deploy**: Full collaborative experience with presence awareness

---

#### **PR-6: Essential UI Polish** (Hour 22) 🟢

**Branch**: `feat/ui-polish`

##### **6.1 Toolbar Enhancement** (30 minutes)

- [ ] **6.1.1** Redesign Toolbar with modern Tailwind styling (15 min)
- [ ] **6.1.2** Add icons to buttons (Plus icon for Add Rectangle) (8 min)
- [ ] **6.1.3** Implement hover states and button feedback (7 min)

##### **6.2 Loading & Status Indicators** (25 minutes)

- [ ] **6.2.1** Add loading spinner for shape creation operations (8 min)
- [ ] **6.2.2** Show connection status indicator (connected/disconnected) (10 min)
- [ ] **6.2.3** Add loading states for authentication (7 min)

##### **6.3 Error Message System** (20 minutes)

- [ ] **6.3.1** Create toast notification system for errors (10 min)
- [ ] **6.3.2** Add user-friendly messages for common failures (8 min)
- [ ] **6.3.3** Style error messages with appropriate colors (2 min)

##### **6.4 User Experience Improvements** (25 minutes)

- [ ] **6.4.1** Add helpful onboarding text: "Click 'Add Rectangle' to start" (5 min)
- [ ] **6.4.2** Improve visual feedback for selected shapes (better borders) (8 min)
- [ ] **6.4.3** Add keyboard shortcuts help tooltip (7 min)
- [ ] **6.4.4** Implement better empty state when no shapes exist (5 min)

##### **6.5 Responsive Layout** (15 minutes)

- [ ] **6.5.1** Ensure toolbar stays visible on different screen sizes (8 min)
- [ ] **6.5.2** Add mobile detection with "Desktop required" message (7 min)

##### **6.6 Visual Polish** (15 minutes)

- [ ] **6.6.1** Improve overall color scheme and consistency (8 min)
- [ ] **6.6.2** Add subtle animations for button interactions (4 min)
- [ ] **6.6.3** Clean up spacing and typography (3 min)

##### **6.7 Testing & Validation** (10 minutes)

- [ ] **6.7.1** Test UI across different browser sizes (5 min)
- [ ] **6.7.2** Verify loading states work correctly (3 min)
- [ ] **6.7.3** Test error scenarios display appropriate messages (2 min)

**Success Criteria**:

- [ ] Clean, intuitive toolbar with proper visual hierarchy
- [ ] Loading states appear during shape creation/sync operations
- [ ] Network errors show user-friendly messages
- [ ] Responsive layout works on desktop screens (1024px+)
- [ ] **Unit Tests**: Toolbar components render correctly
- [ ] **UI Test**: Loading indicators show during operations
- [ ] **Error Test**: Network errors display appropriate messages
- [ ] **Accessibility Test**: Keyboard navigation works for toolbar
- [ ] **Visual Test**: Layout remains stable across screen sizes

**Deploy**: Production-ready user interface

---

#### **PR-7: Production Ready** (Hour 24) 🟡

**Branch**: `feat/production-deploy`

##### **7.1 Build Optimization** (20 minutes)

- [ ] **7.1.1** Configure Vite for production build optimization (8 min)
- [ ] **7.1.2** Add code splitting for better loading performance (5 min)
- [ ] **7.1.3** Optimize bundle size (remove unused dependencies) (7 min)

##### **7.2 Error Boundaries & Resilience** (25 minutes)

- [ ] **7.2.1** Create React error boundary components (15 min)
- [ ] **7.2.2** Add fallback UI for crashed components (8 min)
- [ ] **7.2.3** Implement graceful degradation for Firebase failures (2 min)

##### **7.3 Firebase Hosting Setup** (20 minutes)

- [ ] **7.3.1** Install Firebase CLI: `npm install -g firebase-tools` (3 min)
- [ ] **7.3.2** Initialize Firebase Hosting: `firebase init hosting` (5 min)
- [ ] **7.3.3** Configure `firebase.json` for SPA routing (7 min)
- [ ] **7.3.4** Set build directory to `dist` in Firebase config (5 min)

##### **7.4 Production Deployment** (20 minutes)

- [ ] **7.4.1** Create production build: `npm run build` (5 min)
- [ ] **7.4.2** Deploy to Firebase Hosting: `firebase deploy --only hosting` (8 min)
- [ ] **7.4.3** Verify deployed app loads correctly (5 min)
- [ ] **7.4.4** Test Firebase services work in production (2 min)

##### **7.5 Multi-User Production Testing** (30 minutes)

- [ ] **7.5.1** Open production URL in 3 different browsers (5 min)
- [ ] **7.5.2** Test complete collaboration workflow with 3 users (15 min)
- [ ] **7.5.3** Verify real-time sync works in production environment (5 min)
- [ ] **7.5.4** Test authentication flows in production (5 min)

##### **7.6 Performance Validation** (15 minutes)

- [ ] **7.6.1** Check page load time with Chrome DevTools (<10 seconds) (5 min)
- [ ] **7.6.2** Test with 20+ rectangles for performance (5 min)
- [ ] **7.6.3** Verify memory usage remains reasonable (5 min)

##### **7.7 Final Documentation** (10 minutes)

- [ ] **7.7.1** Document known limitations in README (5 min)
- [ ] **7.7.2** Add usage instructions for new users (3 min)
- [ ] **7.7.3** List browser compatibility requirements (2 min)

**Success Criteria**:

- [ ] Firebase Hosting deployment successful
- [ ] Build optimization reduces bundle size
- [ ] Error boundaries prevent app crashes
- [ ] Production app handles 3+ concurrent users
- [ ] **End-to-End Test**: Complete user journey works in production
- [ ] **Production Test**: Deployed app handles multi-user collaboration
- [ ] **Performance Test**: Page load time under 10 seconds
- [ ] **Mobile Test**: Shows "Desktop required" message appropriately
- [ ] **Error Test**: Error boundaries catch crashes gracefully
- [ ] **Security Test**: Firebase rules prevent unauthorized access
- [ ] **Final Validation**: All MVP success criteria met

**Deploy**: **FINAL** - Public production deployment with shareable URL

**🎯 SUCCESS METRICS**:

- Production URL: `https://[project-id].web.app`
- 2+ users can collaborate simultaneously
- Real-time shape synchronization <500ms
- All core functionality working in production

### **PR Safety & Rollback Strategy**

#### **Merge Requirements**

- [ ] **All checkboxes completed** for that PR milestone
- [ ] **Deploy works** without errors
- [ ] **Previous functionality** still works (no regressions)
- [ ] **Manual testing** passes for 2+ users

#### **Rollback Plan**

If any PR fails critical requirements:

1. **Immediately revert** to previous working PR
2. **Deploy previous version** to maintain working state
3. **Debug offline** or implement fallback
4. **Never leave main branch broken**

#### **Branch Protection**

- `main` branch always represents **working deployed state**
- Each PR must pass basic smoke tests
- **Hour 16 PR-4** is the critical milestone - if this fails, implement fallback plan

---

## 🧪 **COMPREHENSIVE TESTING STRATEGY**

### **Testing Philosophy for 24-Hour Sprint**

**"Test the critical path ruthlessly, everything else strategically"**

- **80% effort** on real-time collaboration testing (PR-4)
- **15% effort** on authentication and core canvas functionality
- **5% effort** on UI/UX and edge cases

### **Testing Tools & Setup**

```bash
# Test Dependencies (add to package.json)
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event vitest jsdom
```

**Test Configuration**:

- **Unit Tests**: Vitest + React Testing Library
- **Integration Tests**: Multi-tab browser testing
- **E2E Tests**: Manual testing with 2-3 browser tabs
- **Performance Tests**: Chrome DevTools + manual validation

### **Test Execution Schedule**

| Hour | Test Focus | Priority | Time Budget |
|------|------------|----------|-------------|
| 4 | Foundation tests | 🟢 Low | 10 min |
| 6 | Authentication tests | 🟡 Medium | 15 min |
| 10 | Canvas interaction tests | 🟡 Medium | 20 min |
| **16** | **Real-time sync tests** | 🔴 **CRITICAL** | **45 min** |
| 20 | Presence tests | 🟡 Medium | 15 min |
| 22 | UI/UX tests | 🟢 Low | 10 min |
| 24 | End-to-end validation | 🔴 Critical | 30 min |

### **Critical Test Scenarios (Must Pass)**

#### **🔴 CRITICAL: Multi-User Real-Time Sync** (PR-4)

```javascript
// Example critical test
describe('Real-time Collaboration', () => {
  test('shapes sync between multiple users within 500ms', async () => {
    // Open 2 browser tabs
    // Create rectangle in tab 1
    // Verify appears in tab 2 within 500ms
    // Move rectangle in tab 2
    // Verify movement in tab 1 within 500ms
  });

  test('object locking prevents simultaneous edits', async () => {
    // Attempt to drag same rectangle from both tabs
    // Verify only first user can drag (lock acquired)
    // Verify second user sees lock indicator
  });
});
```

#### **🟡 IMPORTANT: Authentication Flow** (PR-2)

```javascript
describe('Authentication', () => {
  test('user can signup, login, and maintain session', async () => {
    // Complete signup flow
    // Verify redirect to canvas
    // Refresh browser
    // Verify still authenticated
  });
});
```

#### **🟡 IMPORTANT: Canvas Operations** (PR-3)

```javascript
describe('Canvas Operations', () => {
  test('complete rectangle lifecycle', async () => {
    // Create rectangle
    // Select rectangle
    // Move rectangle
    // Delete rectangle
    // Verify each step works
  });
});
```

### **Test Data & Scenarios**

#### **Performance Test Data**

- **Users**: 3 concurrent users (Chrome tabs)
- **Shapes**: 20 rectangles maximum
- **Operations**: Create, move, delete every 5 seconds
- **Duration**: 5-minute stress test

#### **Network Test Scenarios**

- **Connection Loss**: Disconnect/reconnect WiFi
- **Slow Network**: Throttle to 3G speeds
- **Firestore Limits**: Test rate limiting behavior

### **Test Failure Protocols**

#### **PR-4 Critical Test Failures** (Hour 16)

1. **Immediate**: Stop development, assess issue
2. **15 min**: Attempt quick fix
3. **30 min**: Implement 2-second polling fallback
4. **45 min**: Deploy single-user version with "multiplayer coming soon"

#### **Other Test Failures**

- **Continue development** with documented known issues
- **Fix in subsequent PR** if time permits
- **Document workarounds** for users

### **Manual Testing Checklist**

#### **Multi-Tab Testing Setup**

1. Open 3 Chrome tabs with same deployed URL
2. Login with 3 different test accounts
3. Execute collaboration scenarios
4. Verify real-time synchronization

#### **Essential Manual Tests**

- [ ] **Signup Flow**: New user can create account
- [ ] **Shape Creation**: Button creates rectangle at center
- [ ] **Shape Selection**: Click selects rectangle (visual feedback)
- [ ] **Shape Movement**: Drag moves rectangle smoothly
- [ ] **Shape Deletion**: Delete key removes selected rectangle
- [ ] **Multi-User Sync**: Changes appear in other tabs <500ms
- [ ] **Cursor Tracking**: Other users' cursors visible and moving
- [ ] **User Presence**: Online users list updates correctly
- [ ] **Persistence**: Shapes remain after browser refresh
- [ ] **Error Handling**: Network issues show appropriate messages

### **Test Automation vs Manual**

#### **Automated Tests (60% coverage)**

- Unit tests for components and hooks
- Service layer functionality tests
- Authentication flow tests
- Basic integration tests

#### **Manual Tests (40% coverage)**

- Multi-tab real-time synchronization
- User experience validation
- Performance under load
- Error scenario testing
- Production deployment validation

### **Testing Time Management**

**Total Testing Time**: 2.5 hours over 24-hour sprint

- **Writing Tests**: 1.5 hours (during development)
- **Running Tests**: 0.5 hours (at checkpoints)
- **Manual Validation**: 0.5 hours (PR validations)

**Efficient Testing Approach**:

- Write tests **during** development, not after
- Test **critical path first** (real-time sync)
- **Manual test** while development server runs
- **Automate** repetitive validation tasks

---

## ⏰ **HOUR-BY-HOUR EXECUTION PLAN**

### **PHASE 1: PROJECT SETUP (Hours 0-4)** 🔴 **HIGH RISK**

#### **Hour 0-1: Development Environment**

- [ ] **0.1** Install Node.js, npm, Git (10 min)
- [ ] **0.2** Set up VS Code with minimal extensions (10 min)
- [ ] **0.3** Initialize Git repository (10 min)
- [ ] **0.4** Create Vite project with React + TypeScript (10 min)
- [ ] **0.5** Install dependencies: Tailwind CSS, Konva.js, react-konva (20 min)

#### **Hour 1-3: Firebase Project Setup** ⚡ **CRITICAL PATH**

- [ ] **1.1** Create Firebase project in console (20 min)
- [ ] **1.2** Enable Authentication (email/password only) (30 min)
- [ ] **1.3** Create Firestore database with basic security rules (40 min)
- [ ] **1.4** Create Realtime Database for cursors (30 min)
- [ ] **1.5** Install Firebase SDK and configure (20 min)

#### **Hour 3-4: Basic App Structure**

- [ ] **3.1** Create main App component (15 min)
- [ ] **3.2** Set up basic layout with Tailwind (10 min)
- [ ] **3.3** Create placeholder components (Canvas, Auth, Toolbar) (20 min)
- [ ] **3.4** Test basic React + Vite setup (15 min)

**🎯 CHECKPOINT 1** (Hour 4): ✅ Basic React + Vite + Konva setup working
**📋 DELIVERABLE**: Merge **PR-1** - Foundation Setup

---

### **PHASE 2: AUTHENTICATION (Hours 4-6)** 🟡 **MEDIUM RISK**

#### **Hour 4-5: Firebase Authentication**

- [ ] **4.1** Create authentication context (20 min)
- [ ] **4.2** Implement email/password login form (30 min)
- [ ] **4.3** Add basic signup functionality (10 min)

#### **Hour 5-6: User State Management**

- [ ] **5.1** Handle authentication state changes (30 min)
- [ ] **5.2** Create basic user profile display (15 min)
- [ ] **5.3** Implement logout functionality (15 min)

**🔄 FALLBACK**: Anonymous users if Firebase Auth blocks progress

**🎯 CHECKPOINT 2** (Hour 6): ✅ Firebase Auth working (email login minimum)
**📋 DELIVERABLE**: Merge **PR-2** - Authentication Layer

---

### **PHASE 3: BASIC CANVAS (Hours 6-10)** 🟡 **MEDIUM RISK** ✅ **COMPLETE**

#### **Hour 6-7.5: Konva Canvas Setup** ✅

- [x] **6.1** Create Canvas component with Konva Stage (30 min)
- [x] **6.2** Implement basic pan and zoom (30 min)
- [x] **6.3** Set canvas boundaries (2000x2000px) (30 min)

#### **Hour 7.5-9.5: Rectangle Shape System** ✅

- [x] **7.1** Create basic Rectangle component (40 min)
- [x] **7.2** Implement click to select (30 min)
- [x] **7.3** Add drag to move functionality (40 min)
- [x] **7.4** Implement delete with Delete key (10 min)

#### **Hour 9.5-10: Shape Management** ✅

- [x] **9.1** Create "Add Rectangle" button (15 min)
- [x] **9.2** Add shapes to canvas center (100x100px default) (15 min)

**🎯 CHECKPOINT 3** (Hour 10): ✅ **COMPLETE** - User can create, select, drag, and delete rectangles with keyboard shortcuts
**📋 DELIVERABLE**: ✅ **MERGED** - **PR-3** - Local Canvas Functionality

---

### **PHASE 4: REAL-TIME SYNC (Hours 10-12)** 🔴 **CRITICAL PATH** ✅ **COMPLETE**

#### **Hour 10-11: Firestore Integration** ✅

- [x] **10.1** Design minimal canvas data schema (20 min)
- [x] **10.2** Implement shape save to Firestore (35 min)
- [x] **10.3** Implement real-time shape loading (35 min)

#### **Hour 11-12: Real-time Shape Synchronization** ✅

- [x] **11.1** Set up Firestore real-time listeners (60 min)
- [x] **11.2** Implement shape update synchronization (60 min)
- [x] **11.3** Handle shape creation/deletion sync (30 min)
- [x] **11.4** Implement basic object locking system (30 min)
- [x] **11.5** Add error handling and loading states (20 min)
- [x] **11.6** Create Firestore security rules (15 min)
- [x] **11.7** Multi-user testing and validation (30 min)

**🔄 FALLBACKS**: Not needed - real-time sync working perfectly!

**🎯 CHECKPOINT 4** (Hour 12): ✅ **MILESTONE ACHIEVED** - Multiple users collaborating in real-time with <500ms sync!
**📋 DELIVERABLE**: ✅ **COMPLETE** - **PR-4** - Real-Time Collaboration (**CRITICAL MILESTONE PASSED!**)

---

### **PHASE 5: USER PRESENCE (Hours 16-20)** 🟡 **MEDIUM RISK**

#### **Hour 16-17.5: Cursor Tracking**

- [ ] **16.1** Set up Realtime Database connection (20 min)
- [ ] **16.2** Implement basic cursor position tracking (40 min)
- [ ] **16.3** Display other users' cursors (30 min)

#### **Hour 17.5-19.5: Presence System**

- [ ] **17.1** Track online/offline user status (40 min)
- [ ] **17.2** Assign basic colors to users (30 min)
- [ ] **17.3** Create minimal user presence list (30 min)
- [ ] **17.4** Show user names with cursors (20 min)

#### **Hour 19.5-20: Cleanup**

- [ ] **19.1** Handle user disconnect cleanup (30 min)

**🎯 CHECKPOINT 5** (Hour 20): ✅ Cursor tracking between users
**📋 DELIVERABLE**: Merge **PR-5** - User Presence & Cursor Tracking

---

### **PHASE 6: ESSENTIAL UI (Hours 20-22)** 🟢 **LOW RISK**

#### **Hour 20-21: Minimal UI Components**

- [ ] **20.1** Create basic toolbar with "Add Rectangle" button (20 min)
- [ ] **20.2** Add simple zoom controls (20 min)
- [ ] **20.3** Style minimal user presence list (20 min)

#### **Hour 21-22: Essential UX**

- [ ] **21.1** Add basic loading indicators (20 min)
- [ ] **21.2** Implement essential error messages (20 min)
- [ ] **21.3** Add minimal user guidance text (20 min)

**🎯 CHECKPOINT 6** (Hour 22): ✅ Clean, functional interface
**📋 DELIVERABLE**: Merge **PR-6** - Essential UI & User Experience

---

### **PHASE 7: DEPLOYMENT (Hours 22-24)** 🟡 **MEDIUM RISK**

#### **Hour 22-23: Testing & Integration**

- [ ] **22.1** Test 2-3 user scenarios (30 min)
- [ ] **22.2** Test basic authentication flows (15 min)
- [ ] **22.3** Test essential error cases (15 min)

#### **Hour 23-24: Firebase Hosting**

- [ ] **23.1** Configure Firebase Hosting (15 min)
- [ ] **23.2** Build and deploy application (15 min)
- [ ] **23.3** Test deployed version with multiple users (15 min)
- [ ] **23.4** Verify core success criteria met (10 min)
- [ ] **23.5** Document known issues and limitations (5 min)

**🎯 FINAL CHECKPOINT** (Hour 24): ✅ Working collaborative canvas deployed
**📋 DELIVERABLE**: Merge **PR-7** - Production Deployment & Validation (**FINAL MILESTONE**)

---

## 🎯 **SUCCESS VALIDATION CHECKLIST**

### **Minimum Viable Success (Must Have)**

- [ ] 2+ users can see each other's rectangles in real-time
- [ ] Rectangles persist when users refresh browser
- [ ] Basic user identification working (colors/names)
- [ ] Publicly accessible via shareable URL
- [ ] Works in Chrome desktop

### **Stretch Success (If Time Permits)**

- [ ] Real-time cursor tracking functional
- [ ] Sub-500ms shape synchronization
- [ ] Clean, intuitive interface
- [ ] 3+ users can collaborate simultaneously

---

## ⚠️ **RISK MITIGATION & FALLBACKS**

### **Decision Points & Fallbacks**

| Hour | Risk Assessment | Fallback Action |
|------|----------------|----------------|
| 4 | Basic setup failing | Switch to simpler alternatives |
| 8 | Auth blocking progress | Switch to anonymous users |
| 12 | Canvas issues | Accept static shapes, focus on sync |
| **16** | **Real-time broken** | **Deploy single-user version** |
| 20 | Presence failing | Deploy without cursors |
| 22 | Deployment issues | Screen recording demo |

### **Emergency Backup Plans**

- [ ] **BACKUP-1**: 2-second polling if real-time sync fails (1 hour)
- [ ] **BACKUP-2**: Anonymous users if auth completely fails (30 min)
- [ ] **BACKUP-3**: Static shape demo with screenshots (2 hours)

### **Nuclear Options (Last Resort)**

- [ ] **NUCLEAR-1**: Single-user canvas with "multiplayer coming soon"
- [ ] **NUCLEAR-2**: Screen recording demo of working prototype
- [ ] **NUCLEAR-3**: Detailed technical proof-of-concept document

---

## 📊 **PERFORMANCE TARGETS (Relaxed for MVP)**

- **Shape synchronization**: <500ms (acceptable for MVP)
- **Cursor updates**: <200ms (acceptable for MVP)
- **Canvas performance**: 20 rectangles minimum
- **Initial load**: <10 seconds
- **Browser support**: Chrome desktop ONLY
- **Concurrent users**: 3 users maximum for testing
- **Canvas size**: 2000x2000px
- **Object limit**: 25 shapes maximum

---

## 🛠️ **TECHNOLOGY STACK REFERENCE**

### **Frontend**

- React + Vite + TypeScript
- Konva.js for canvas rendering
- Tailwind CSS for styling

### **Backend & Services**

- Firebase Authentication (email/password)
- Cloud Firestore (persistent shapes)
- Firebase Realtime Database (cursors/presence)
- Firebase Hosting (deployment)

### **Database Schema Quick Reference**

```javascript
// Firestore: canvas/global-canvas-v1
{
  canvasId: "global-canvas-v1",
  shapes: [
    {
      id: "shape_uuid_1",
      type: "rectangle",
      x: 100, y: 200, width: 100, height: 100,
      fill: "#cccccc",
      createdBy: "user_id",
      isLocked: false,
      lockedBy: null
    }
  ]
}

// Realtime DB: /sessions/global-canvas-v1/{userId}
{
  displayName: "John Doe",
  cursorColor: "#FF5733",
  cursorX: 450, cursorY: 300,
  lastSeen: "timestamp"
}
```

---

## 🎯 **FINAL SUCCESS DEFINITION**

**"If 2+ people can move rectangles around and see each other doing it in real-time, we win."**

Everything else—performance optimization, polish, advanced features—is bonus points. The core validation is proving real-time collaborative visual editing works with our chosen technology stack.

---

*Task List Version: 1.0*
*Created: October 13, 2025*
*Sprint Start: October 14, 2025*
*Philosophy: "Working slowly is infinitely better than broken quickly"*
