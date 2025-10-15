# CollabCanvas MVP Demo Video - Visual Storyboard

**Document Purpose**: Visual guide for video production with screen layouts for each segment
**Total Segments**: 10 segments (9 at 15 sec, 1 at 45 sec) = 180 seconds (3:00 minutes)
**Production Tool**: OBS Studio / Loom / ScreenFlow

---

## 📐 **SCREEN LAYOUT TEMPLATES**

### **Layout A: Single Browser (Full Screen)**
```
┌─────────────────────────────────────────────────────────────┐
│                    BROWSER WINDOW (100%)                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ [URL Bar] collabcanvas-mvp-53120.web.app              │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │                                                         │ │
│  │              COLLABCANVAS CONTENT                       │ │
│  │                                                         │ │
│  │                  (see segment details)                  │ │
│  │                                                         │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### **Layout B: Split Screen (Two Browsers)**
```
┌───────────────────────────────┬───────────────────────────────┐
│    BROWSER 1 (User 1)         │    BROWSER 2 (User 2)         │
│  ┌─────────────────────────┐  │  ┌─────────────────────────┐  │
│  │ User 1 Canvas View      │  │  │ User 2 Canvas View      │  │
│  │                         │  │  │                         │  │
│  │  [Shapes visible here]  │  │  │  [Same shapes sync]     │  │
│  │                         │  │  │                         │  │
│  │  🔵 User 1 cursor       │  │  │  🟢 User 2 cursor       │  │
│  └─────────────────────────┘  │  └─────────────────────────┘  │
└───────────────────────────────┴───────────────────────────────┘
```

### **Layout C: Split Screen (Three Browsers)**
```
┌──────────────────────┬──────────────────────┬──────────────────────┐
│  BROWSER 1           │  BROWSER 2           │  BROWSER 3           │
│  ┌────────────────┐  │  ┌────────────────┐  │  ┌────────────────┐  │
│  │ User 1 Canvas  │  │  │ User 2 Canvas  │  │  │ User 3 Canvas  │  │
│  │                │  │  │                │  │  │                │  │
│  │ 🔵 cursor      │  │  │ 🟢 cursor      │  │  │ 🟣 cursor      │  │
│  └────────────────┘  │  └────────────────┘  │  └────────────────┘  │
└──────────────────────┴──────────────────────┴──────────────────────┘
```

---

## 🎬 **SEGMENT 1: OPENING & PROJECT INTRODUCTION** [0:00-0:15]
**Layout**: Single Browser (Full Screen)

```
┌─────────────────────────────────────────────────────────────────┐
│                       BROWSER WINDOW                             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                                                            │  │
│  │                   ┌───────────────────┐                   │  │
│  │                   │                   │                   │  │
│  │                   │   CollabCanvas    │                   │  │
│  │                   │       MVP         │                   │  │
│  │                   │                   │                   │  │
│  │                   └───────────────────┘                   │  │
│  │                                                            │  │
│  │              Real-Time Collaborative Design                │  │
│  │                                                            │  │
│  │                   ┌─────────────────┐                     │  │
│  │                   │   Get Started   │  ← Hover effect     │  │
│  │                   └─────────────────┘                     │  │
│  │                                                            │  │
│  │                   ┌─────────────────┐                     │  │
│  │                   │   View Demo     │                     │  │
│  │                   └─────────────────┘                     │  │
│  │                                                            │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

TEXT OVERLAY (bottom third):
┌─────────────────────────────────────────────────────────────────┐
│  "CollabCanvas MVP — Built in 24 Hours"                         │
│  "Demonstrating Real-Time Collaborative Infrastructure"         │
└─────────────────────────────────────────────────────────────────┘
```

**Visual Elements**:
- Clean landing page with gradient background
- Large logo/title centered
- Two prominent CTA buttons
- Professional, minimalist design
- Text overlay appears after 2 seconds

**Narration**: "Welcome to CollabCanvas' Minimum Viable Product—a real-time collaborative design platform built in 24 hours..."

---

## 🎬 **SEGMENT 2: AUTHENTICATION & CANVAS BASICS** [0:15-0:30]
**Layout**: Single Browser (Full Screen) → Transition to Canvas

### **Frame 1: Login Screen** [0:15-0:22]
```
┌─────────────────────────────────────────────────────────────────┐
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                     CollabCanvas                           │  │
│  │                                                            │  │
│  │          ┌──────────────────────────────────┐             │  │
│  │          │  Sign In                         │             │  │
│  │          ├──────────────────────────────────┤             │  │
│  │          │                                  │             │  │
│  │  Email   │ user1@collabcanvas.com ← Typing │             │  │
│  │          │                                  │             │  │
│  │          ├──────────────────────────────────┤             │  │
│  │          │                                  │             │  │
│  │ Password │ ••••••••••••          ← Typing  │             │  │
│  │          │                                  │             │  │
│  │          ├──────────────────────────────────┤             │  │
│  │          │                                  │             │  │
│  │          │     [Sign In Button] ← Click    │             │  │
│  │          │                                  │             │  │
│  │          └──────────────────────────────────┘             │  │
│  │                                                            │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

CURSOR HIGHLIGHT:
  🖱️ Cursor moves to email field → types → password → clicks Sign In
```

### **Frame 2: Main Canvas** [0:23-0:30]
```
┌─────────────────────────────────────────────────────────────────┐
│  ┌────┬──────────────────────────────────────────────┬──────┐  │
│  │ ☰  │  [🔲] [⭕] [T] [📏] [🎨]     [user1@...] 🟢 │  ⚙️  │  │
│  ├────┴──────────────────────────────────────────────┴──────┤  │
│  │                                                            │  │
│  │                    CANVAS WORKSPACE                        │  │
│  │                                                            │  │
│  │         (Light gray grid background)                       │  │
│  │                                                            │  │
│  │              🖱️ ← Pan movement (drag canvas)              │  │
│  │                                                            │  │
│  │                    Zoom: 100% → 150% → 80%                │  │
│  │                    (Mouse wheel animation)                 │  │
│  │                                                            │  │
│  │                                                            │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

ANIMATION ARROWS:
  → Pan left/right with drag gesture
  ↕️ Zoom in/out with scroll animation

VISUAL INDICATORS:
  - Grid moves smoothly during pan
  - Zoom level indicator updates: 100% → 150% → 80%
```

**Narration**: "Users authenticate with Firebase... After login, users see the main canvas workspace with pan and zoom capabilities."

---

## 🎬 **SEGMENT 3: SHAPE CREATION & MOVEMENT** [0:30-0:45]
**Layout**: Single Browser (Full Screen)

### **Frame 1: Create Rectangle** [0:32]
```
┌─────────────────────────────────────────────────────────────────┐
│  │ [🔲] [⭕] [T]  ← Click Rectangle tool                       │
│  ├────────────────────────────────────────────────────────────┤ │
│  │                                                            │  │
│  │                                                            │  │
│  │                    Click position                          │  │
│  │                         ↓                                  │  │
│  │                    ┌────────┐                              │  │
│  │                    │        │  ← Blue rectangle appears    │  │
│  │                    │  RECT  │     (200 × 150px)            │  │
│  │                    │        │                              │  │
│  │                    └────────┘                              │  │
│  │                         ↑                                  │  │
│  │                    🖱️ cursor                               │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### **Frame 2: Create Circle** [0:36]
```
┌─────────────────────────────────────────────────────────────────┐
│  │ [🔲] [⭕] [T]  ← Click Circle tool                          │
│  ├────────────────────────────────────────────────────────────┤ │
│  │                                                            │  │
│  │       ┌────────┐                                           │  │
│  │       │        │                                           │  │
│  │       │  RECT  │  (existing rectangle)                     │  │
│  │       │        │                                           │  │
│  │       └────────┘                                           │  │
│  │                                                            │  │
│  │                            ⭕  ← Red circle appears        │  │
│  │                           /   \   (100px radius)           │  │
│  │                          |  O  |                           │  │
│  │                           \   /                            │  │
│  │                            🖱️                              │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### **Frame 3: Create Text** [0:39]
```
┌─────────────────────────────────────────────────────────────────┐
│  │ [🔲] [⭕] [T]  ← Click Text tool                            │
│  ├────────────────────────────────────────────────────────────┤ │
│  │                                                            │  │
│  │       ┌────────┐         ⭕                                 │  │
│  │       │  RECT  │        / O \                              │  │
│  │       └────────┘        \___/                              │  │
│  │                                                            │  │
│  │                                                            │  │
│  │              CollabCanvas MVP|  ← Text input cursor        │  │
│  │              (Typing animation)                            │  │
│  │                    🖱️                                      │  │
│  │                                                            │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### **Frame 4: Move Rectangle** [0:42-0:45]
```
┌─────────────────────────────────────────────────────────────────┐
│  │                                                            │  │
│  │       ┌────────┐                                           │  │
│  │       │  RECT  │ ............ ┌────────┐                   │  │
│  │       └────────┘              │  RECT  │ ← Drag to here   │  │
│  │                               └────────┘                   │  │
│  │           ⭕                                                │  │
│  │          / O \                                             │  │
│  │                                                            │  │
│  │              CollabCanvas MVP                              │  │
│  │                                                            │  │
│  │                                🖱️ (dragging motion)        │  │
└─────────────────────────────────────────────────────────────────┘

ANIMATION:
  - Dotted line shows drag path
  - Rectangle smoothly moves to new position
  - Selection handles visible during drag
```

**Narration**: "The MVP supports three shape types: rectangles, circles, and text. Watch as I create and move objects."

---

## 🎬 **SEGMENT 4: REAL-TIME SYNC SETUP** [0:45-1:00]
**Layout**: Single Browser → Split Screen Setup

### **Frame 1: Opening Second Browser** [0:47-0:49]
```
┌───────────────────────────────┬───────────────────────────────┐
│    BROWSER 1 (User 1)         │    BROWSER 2 (Opening...)     │
│  ┌─────────────────────────┐  │  ┌─────────────────────────┐  │
│  │                         │  │  │                         │  │
│  │   ┌────────┐            │  │  │    🔄 Loading...        │  │
│  │   │  RECT  │    ⭕      │  │  │                         │  │
│  │   └────────┘   / O \    │  │  │                         │  │
│  │                         │  │  │                         │  │
│  │  CollabCanvas MVP       │  │  │                         │  │
│  │                         │  │  │                         │  │
│  └─────────────────────────┘  │  └─────────────────────────┘  │
└───────────────────────────────┴───────────────────────────────┘
```

### **Frame 2: User 2 Login** [0:51-0:53]
```
┌───────────────────────────────┬───────────────────────────────┐
│    BROWSER 1 (User 1)         │    BROWSER 2 (User 2 Login)   │
│  ┌─────────────────────────┐  │  ┌─────────────────────────┐  │
│  │   ┌────────┐    ⭕       │  │  │  ┌──────────────────┐  │  │
│  │   │  RECT  │   / O \     │  │  │  │  Sign In         │  │  │
│  │   └────────┘             │  │  │  │                  │  │  │
│  │                         │  │  │  │ user2@collab...  │  │  │
│  │  CollabCanvas MVP       │  │  │  │ ••••••••         │  │  │
│  │                         │  │  │  │ [Sign In] ← Click│  │  │
│  │  🔵 User 1              │  │  │  └──────────────────┘  │  │
│  └─────────────────────────┘  │  └─────────────────────────┘  │
└───────────────────────────────┴───────────────────────────────┘
```

### **Frame 3: Both Users See Same Canvas** [0:55-1:00]
```
┌───────────────────────────────┬───────────────────────────────┐
│    BROWSER 1 (User 1)         │    BROWSER 2 (User 2)         │
│  ┌─────────────────────────┐  │  ┌─────────────────────────┐  │
│  │   ┌────────┐    ⭕       │  │  │   ┌────────┐    ⭕       │  │
│  │   │  RECT  │   / O \     │  │  │   │  RECT  │   / O \     │  │
│  │   └────────┘             │  │  │   └────────┘             │  │
│  │                         │  │  │                         │  │
│  │  CollabCanvas MVP       │  │  │  CollabCanvas MVP       │  │
│  │                         │  │  │                         │  │
│  │  🔵 User 1              │  │  │  🟢 User 2              │  │
│  └─────────────────────────┘  │  └─────────────────────────┘  │
└───────────────────────────────┴───────────────────────────────┘

HIGHLIGHT (pulse animation):
  ✨ Both rectangles highlighted
  ✨ Both circles highlighted
  ✨ Both text elements highlighted
  "SYNCED ✅" badge appears briefly
```

**Narration**: "I'm opening a second browser window with a different user account... User 2 immediately sees all shapes that User 1 created."

---

## 🎬 **SEGMENT 5: MULTIPLAYER CURSORS** [1:00-1:15]
**Layout**: Split Screen (Two Browsers)

### **Frame 1: User 1 Cursor Movement** [1:02-1:05]
```
┌───────────────────────────────┬───────────────────────────────┐
│    BROWSER 1 (User 1)         │    BROWSER 2 (User 2 View)    │
│  ┌─────────────────────────┐  │  ┌─────────────────────────┐  │
│  │   ┌────────┐    ⭕       │  │  │   ┌────────┐    ⭕       │  │
│  │   │  RECT  │   / O \     │  │  │   │  RECT  │   / O \     │  │
│  │   └────────┘             │  │  │   └────────┘             │  │
│  │                         │  │  │                         │  │
│  │  🖱️🔵                    │  │  │  🖱️🔵 ← "User 1"        │  │
│  │  (moving around)        │  │  │  (appears in real-time) │  │
│  │                         │  │  │                         │  │
│  └─────────────────────────┘  │  └─────────────────────────┘  │
└───────────────────────────────┴───────────────────────────────┘

CURSOR TRAIL:
  Blue dotted line showing User 1's cursor path
  Name label "User 1" follows cursor with 20px offset
```

### **Frame 2: User 2 Cursor Movement** [1:05-1:08]
```
┌───────────────────────────────┬───────────────────────────────┐
│    BROWSER 1 (User 1 View)    │    BROWSER 2 (User 2)         │
│  ┌─────────────────────────┐  │  ┌─────────────────────────┐  │
│  │   ┌────────┐    ⭕       │  │  │   ┌────────┐    ⭕       │  │
│  │   │  RECT  │   / O \     │  │  │   │  RECT  │   / O \     │  │
│  │   └────────┘             │  │  │   └────────┘             │  │
│  │                         │  │  │                         │  │
│  │           🖱️🟢           │  │  │           🖱️🟢           │  │
│  │      ↑ "User 2"         │  │  │      (moving around)    │  │
│  │  (appears in real-time) │  │  │                         │  │
│  └─────────────────────────┘  │  └─────────────────────────┘  │
└───────────────────────────────┴───────────────────────────────┘

CURSOR TRAIL:
  Green dotted line showing User 2's cursor path
  Name label "User 2" follows cursor
```

### **Frame 3: Both Cursors Simultaneously** [1:08-1:15]
```
┌───────────────────────────────┬───────────────────────────────┐
│    BROWSER 1 (User 1)         │    BROWSER 2 (User 2)         │
│  ┌─────────────────────────┐  │  ┌─────────────────────────┐  │
│  │   ┌────────┐    ⭕       │  │  │   ┌────────┐    ⭕       │  │
│  │   │  RECT  │   / O \     │  │  │   │  RECT  │   / O \     │  │
│  │   └────────┘             │  │  │   └────────┘             │  │
│  │                         │  │  │                         │  │
│  │  🖱️🔵        🖱️🟢        │  │  │  🖱️🔵        🖱️🟢        │  │
│  │  User 1      User 2     │  │  │  User 1      User 2     │  │
│  │  (both moving together) │  │  │  (both moving together) │  │
│  └─────────────────────────┘  │  └─────────────────────────┘  │
└───────────────────────────────┴───────────────────────────────┘

ANIMATION:
  Both cursors moving in circular/random patterns simultaneously
  Crossed paths create visual interest
```

**Narration**: "Each user has a distinct cursor with their name label... Cursor positions update in real-time, creating a seamless collaborative experience."

---

## 🎬 **SEGMENT 6: PRESENCE AWARENESS** [1:15-1:30]
**Layout**: Split Screen → Three Browsers

### **Frame 1: Presence Panel (2 Users)** [1:17-1:20]
```
┌───────────────────────────────┬───────────────────────────────┐
│    BROWSER 1 (User 1)         │    BROWSER 2 (User 2)         │
│  ┌─────────────────────────┐  │  ┌─────────────────────────┐  │
│  │ ┌──────────────────┐    │  │  │ ┌──────────────────┐    │  │
│  │ │ 👥 Online Users  │    │  │  │ │ 👥 Online Users  │    │  │
│  │ ├──────────────────┤    │  │  │ ├──────────────────┤    │  │
│  │ │ 🟢 User 1 (you)  │← Highlight │ │ 🟢 User 1        │    │  │
│  │ │ 🟢 User 2        │    │  │  │ │ 🟢 User 2 (you)  │← Highlight │
│  │ └──────────────────┘    │  │  │ └──────────────────┘    │  │
│  │                         │  │  │                         │  │
│  │   ┌────────┐    ⭕       │  │  │   ┌────────┐    ⭕       │  │
│  │   │  RECT  │   / O \     │  │  │   │  RECT  │   / O \     │  │
│  │   └────────┘             │  │  │   └────────┘             │  │
│  └─────────────────────────┘  │  └─────────────────────────┘  │
└───────────────────────────────┴───────────────────────────────┘

ANIMATION:
  Presence panel glows/pulses to draw attention
```

### **Frame 2: User 3 Joins** [1:22-1:24]
```
┌──────────────────┬──────────────────┬──────────────────┐
│  BROWSER 1       │  BROWSER 2       │  BROWSER 3       │
│  ┌────────────┐  │  ┌────────────┐  │  ┌────────────┐  │
│  │👥 Online   │  │  │👥 Online   │  │  │ 🔄 Login   │  │
│  │🟢 User 1   │  │  │🟢 User 1   │  │  │            │  │
│  │🟢 User 2   │  │  │🟢 User 2   │  │  │ user3@...  │  │
│  │            │  │  │            │  │  │ ••••••     │  │
│  │   🔵  🟢   │  │  │   🔵  🟢   │  │  │ [Sign In]  │  │
│  └────────────┘  │  └────────────┘  │  └────────────┘  │
└──────────────────┴──────────────────┴──────────────────┘
```

### **Frame 3: Presence Updates Everywhere** [1:24-1:30]
```
┌──────────────────┬──────────────────┬──────────────────┐
│  BROWSER 1       │  BROWSER 2       │  BROWSER 3       │
│  ┌────────────┐  │  ┌────────────┐  │  ┌────────────┐  │
│  │👥 Online   │  │  │👥 Online   │  │  │👥 Online   │  │
│  │🟢 User 1   │  │  │🟢 User 1   │  │  │🟢 User 1   │  │
│  │🟢 User 2   │  │  │🟢 User 2   │  │  │🟢 User 2   │  │
│  │🟢 User 3 ✨│  │  │🟢 User 3 ✨│  │  │🟢 User 3   │  │
│  │   (NEW!)   │  │  │   (NEW!)   │  │  │   (you)    │  │
│  └────────────┘  │  └────────────┘  │  └────────────┘  │
│                  │                  │                  │
│  🔵  🟢          │  🔵  🟢          │  🔵  🟢          │
│       🟣 ← NEW! │       🟣 ← NEW! │       🟣 (me)    │
└──────────────────┴──────────────────┴──────────────────┘

ANIMATION:
  ✨ "User 3" entry animates in with slide + fade
  Purple cursor (User 3) appears with bounce effect
  Presence panel glows green when updated
```

**Narration**: "The presence system shows who's currently online... When a third user joins, all active users see the presence update instantly."

---

## 🎬 **SEGMENT 7: REAL-TIME SYNC STRESS TEST** [1:30-1:45]
**Layout**: Split Screen (Three Browsers)

### **Frame 1: User 1 Creates Rectangle** [1:32]
```
┌──────────────────┬──────────────────┬──────────────────┐
│  BROWSER 1       │  BROWSER 2       │  BROWSER 3       │
│                  │                  │                  │
│  [🔲] ← Click    │                  │                  │
│                  │                  │                  │
│  ┌────────┐      │  ┌────────┐ ✨   │  ┌────────┐ ✨   │
│  │ NEW!   │      │  │ NEW!   │      │  │ NEW!   │      │
│  └────────┘      │  └────────┘      │  └────────┘      │
│  (creating...)   │  (syncing...)    │  (syncing...)    │
│                  │                  │                  │
│  🔵              │  🔵  🟢          │  🔵  🟢  🟣      │
└──────────────────┴──────────────────┴──────────────────┘

SYNC INDICATOR:
  ⚡ Lightning bolt animation from Browser 1 → 2 → 3
```

### **Frame 2: User 2 Moves Circle** [1:35]
```
┌──────────────────┬──────────────────┬──────────────────┐
│  BROWSER 1       │  BROWSER 2       │  BROWSER 3       │
│                  │                  │                  │
│  ┌────────┐      │  ┌────────┐      │  ┌────────┐      │
│  └────────┘      │  └────────┘      │  └────────┘      │
│                  │                  │                  │
│   ⭕ .........⭕  │   ⭕ .........⭕  │   ⭕ .........⭕  │
│  (syncing)       │  (dragging)      │  (syncing)       │
│                  │       🟢         │                  │
│  🔵              │                  │  🟣              │
└──────────────────┴──────────────────┴──────────────────┘

ANIMATION:
  Dotted line shows drag path
  Circle position updates simultaneously on all screens
```

### **Frame 3: User 3 Creates Text** [1:38]
```
┌──────────────────┬──────────────────┬──────────────────┐
│  BROWSER 1       │  BROWSER 2       │  BROWSER 3       │
│                  │                  │                  │
│  ┌────────┐      │  ┌────────┐      │  ┌────────┐      │
│  └────────┘      │  └────────┘      │  └────────┘      │
│                  │                  │      [T] ← Click │
│      ⭕          │      ⭕          │      ⭕          │
│                  │                  │                  │
│  "Testing" ✨    │  "Testing" ✨    │  "Testing|"      │
│  (syncing)       │  (syncing)       │  (typing...)     │
│  🔵              │  🟢              │  🟣              │
└──────────────────┴──────────────────┴──────────────────┘
```

### **Frame 4: ALL Users Edit Simultaneously** [1:41-1:45]
```
┌──────────────────┬──────────────────┬──────────────────┐
│  BROWSER 1       │  BROWSER 2       │  BROWSER 3       │
│  (Dragging rect) │  (Rotating ⭕)   │  (Moving text)   │
│                  │                  │                  │
│  ┌────────┐→     │  ┌────────┐      │  ┌────────┐      │
│  └────────┘      │  └────────┘      │  └────────┘      │
│                  │      ↻           │                  │
│      ⭕          │      ⭕          │      ⭕          │
│  "Testing"       │  "Testing" →     │  "Testing"       │
│                  │                  │                  │
│  🔵 dragging     │  🟢 rotating     │  🟣 moving       │
└──────────────────┴──────────────────┴──────────────────┘

OVERLAY (full screen):
┌─────────────────────────────────────────────────────────────────┐
│  ⚡ REAL-TIME SYNC  |  3 USERS EDITING SIMULTANEOUSLY            │
└─────────────────────────────────────────────────────────────────┘
```

**Narration**: "Multiple users editing simultaneously—all changes propagate instantly across all users."

---

## 🎬 **SEGMENT 8: PERSISTENCE - REFRESH TEST** [1:45-2:00]
**Layout**: Focus on Browser 2, then Split Screen

### **Frame 1: User 2 Before Refresh** [1:47-1:49]
```
┌─────────────────────────────────────────────────────────────────┐
│                    BROWSER 2 (User 2) - BEFORE                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ collabcanvas-mvp-53120.web.app                    🟢 User 2│ │
│  ├───────────────────────────────────────────────────────────┤  │
│  │                                                            │  │
│  │       ┌────────┐    ┌────────┐        ⭕                   │  │
│  │       │  RECT  │    │  RECT  │       / O \                 │  │
│  │       └────────┘    └────────┘                            │  │
│  │                                                            │  │
│  │       "Testing Sync"    "CollabCanvas MVP"                │  │
│  │                                                            │  │
│  │       🔵 User 1    🟢 User 2 (dragging...)    🟣 User 3    │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│              ⚠️ ABOUT TO REFRESH (F5) ⚠️                        │
└─────────────────────────────────────────────────────────────────┘
```

### **Frame 2: Refresh in Progress** [1:49-1:52]
```
┌─────────────────────────────────────────────────────────────────┐
│                    BROWSER 2 (User 2) - REFRESHING               │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ collabcanvas-mvp-53120.web.app        ⟳ Reloading...     │  │
│  ├───────────────────────────────────────────────────────────┤  │
│  │                                                            │  │
│  │                                                            │  │
│  │                        🔄                                  │  │
│  │                   Loading...                               │  │
│  │                                                            │  │
│  │                Reconnecting to Canvas                      │  │
│  │                                                            │  │
│  │                                                            │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### **Frame 3: After Refresh - Canvas Restored** [1:54-2:00]
```
┌─────────────────────────────────────────────────────────────────┐
│                    BROWSER 2 (User 2) - AFTER REFRESH ✅         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ collabcanvas-mvp-53120.web.app                    🟢 User 2│ │
│  ├───────────────────────────────────────────────────────────┤  │
│  │                                                            │  │
│  │       ┌────────┐    ┌────────┐        ⭕                   │  │
│  │       │  RECT  │    │  RECT  │       / O \                 │  │
│  │       └────────┘    └────────┘                            │  │
│  │         ✅            ✅             ✅                     │  │
│  │       "Testing Sync"    "CollabCanvas MVP"                │  │
│  │            ✅                 ✅                            │  │
│  │       🔵 User 1    🟢 User 2 (back!)    🟣 User 3          │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

COMPARISON OVERLAY (split screen):
┌───────────────────────────┬───────────────────────────┐
│     BEFORE (1:47)         │     AFTER (1:54)          │
│  ┌──────────────────────┐ │  ┌──────────────────────┐ │
│  │ [5 shapes visible]   │ │  │ [5 shapes visible]   │ │
│  │ Same positions ←───────────→ Identical state! ✅  │ │
│  └──────────────────────┘ │  └──────────────────────┘ │
└───────────────────────────┴───────────────────────────┘
```

**Narration**: "User 2 will refresh their browser mid-edit... After refresh, User 2 returns to the exact canvas state. Nothing was lost—persistence is working perfectly."

---

## 🎬 **SEGMENT 9: PERSISTENCE - FULL DISCONNECT** [2:00-2:15]
**Layout**: Three Browsers → All Logout → One Browser Returns

### **Frame 1: All Users Logged In** [2:00-2:02]
```
┌──────────────────┬──────────────────┬──────────────────┐
│  BROWSER 1       │  BROWSER 2       │  BROWSER 3       │
│  ┌────────────┐  │  ┌────────────┐  │  ┌────────────┐  │
│  │Canvas with │  │  │Canvas with │  │  │Canvas with │  │
│  │5-6 shapes  │  │  │5-6 shapes  │  │  │5-6 shapes  │  │
│  │            │  │  │            │  │  │            │  │
│  │🟢 User 1   │  │  │🟢 User 2   │  │  │🟢 User 3   │  │
│  │[Logout]←   │  │  │[Logout]←   │  │  │[Logout]←   │  │
│  └────────────┘  │  └────────────┘  │  └────────────┘  │
└──────────────────┴──────────────────┴──────────────────┘
```

### **Frame 2: All Users Logged Out** [2:06-2:08]
```
┌──────────────────┬──────────────────┬──────────────────┐
│  BROWSER 1       │  BROWSER 2       │  BROWSER 3       │
│  ┌────────────┐  │  ┌────────────┐  │  ┌────────────┐  │
│  │            │  │  │            │  │  │            │  │
│  │  Sign In   │  │  │  Sign In   │  │  │  Sign In   │  │
│  │            │  │  │            │  │  │            │  │
│  │[Empty]     │  │  │[Empty]     │  │  │[Empty]     │  │
│  │            │  │  │            │  │  │            │  │
│  └────────────┘  │  └────────────┘  │  └────────────┘  │
└──────────────────┴──────────────────┴──────────────────┘

OVERLAY (dramatic pause):
┌─────────────────────────────────────────────────────────────────┐
│  ⚠️ ALL USERS DISCONNECTED - TESTING PERSISTENCE... ⚠️          │
└─────────────────────────────────────────────────────────────────┘
```

### **Frame 3: User 1 Returns** [2:10-2:12]
```
┌─────────────────────────────────────────────────────────────────┐
│                    BROWSER 1 (User 1 Returning)                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                  Sign In → Loading... → Canvas Loaded      │  │
│  │                                                            │  │
│  │                         🔄 Loading...                      │  │
│  │                  Restoring canvas state...                 │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### **Frame 4: Canvas Fully Restored** [2:12-2:15]
```
┌─────────────────────────────────────────────────────────────────┐
│              BROWSER 1 (User 1) - CANVAS RESTORED ✅             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                                                            │  │
│  │       ┌────────┐    ┌────────┐        ⭕                   │  │
│  │       │  RECT  │    │  RECT  │       / O \                 │  │
│  │       └────────┘    └────────┘                            │  │
│  │         ✅            ✅             ✅                     │  │
│  │       "Testing Sync"    "CollabCanvas MVP"                │  │
│  │            ✅                 ✅                            │  │
│  │                                                            │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

COMPARISON SPLIT:
┌───────────────────────────┬───────────────────────────┐
│  BEFORE LOGOUT (2:00)     │  AFTER RE-LOGIN (2:12)    │
│  ┌──────────────────────┐ │  ┌──────────────────────┐ │
│  │ Rectangle 1 @ (50,50)│ │  │ Rectangle 1 @ (50,50)│ │
│  │ Rectangle 2 @(300,50)│ │  │ Rectangle 2 @(300,50)│ │
│  │ Circle @ (150, 200)  │ │  │ Circle @ (150, 200)  │ │
│  │ Text "Testing" ...   │ │  │ Text "Testing" ...   │ │
│  │ Text "CollabCanvas"  │ │  │ Text "CollabCanvas"  │ │
│  └──────────────────────┘ │  └──────────────────────┘ │
│     100% IDENTICAL STATE ✅                            │
└───────────────────────────┴───────────────────────────┘
```

**Narration**: "All users log out... Let's log back in and verify persistence... ALL shapes intact—everything persisted."

---

## 🎬 **SEGMENT 10: DEPLOYMENT & CLOSING** [2:15-3:00]
**Layout**: Single Browser → Incognito Test → Multi-User Demo → Closing

### **Frame 1: Show Deployed URL** [2:17-2:19]
```
┌─────────────────────────────────────────────────────────────────┐
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  🔒 https://collabcanvas-mvp-53120.web.app     ← ZOOM IN │  │
│  ├───────────────────────────────────────────────────────────┤  │
│  │                                                            │  │
│  │                    CANVAS INTERFACE                        │  │
│  │                                                            │  │
│  │       ┌────────┐    ┌────────┐        ⭕                   │  │
│  │       │  RECT  │    │  RECT  │       / O \                 │  │
│  │       └────────┘    └────────┘                            │  │
│  │                                                            │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

URL HIGHLIGHT:
┌─────────────────────────────────────────────────────────────────┐
│  ✅ HTTPS Secured (SSL Certificate)                             │
│  ✅ Firebase Hosting (Global CDN)                               │
│  ✅ Publicly Accessible                                         │
└─────────────────────────────────────────────────────────────────┘
```

### **Frame 2: Incognito Mode Test** [2:22-2:25]
```
┌───────────────────────────────┬───────────────────────────────┐
│    EXISTING BROWSER           │    NEW INCOGNITO BROWSER      │
│  ┌─────────────────────────┐  │  ┌─────────────────────────┐  │
│  │ User 1 (logged in)      │  │  │ 🕶️ Incognito Mode       │  │
│  │                         │  │  │                         │  │
│  │   ┌────────┐    ⭕       │  │  │ Navigating to:         │  │
│  │   │  RECT  │   / O \     │  │  │ collabcanvas-mvp...    │  │
│  │   └────────┘             │  │  │                         │  │
│  │                         │  │  │ 🔄 Loading...          │  │
│  │  "CollabCanvas MVP"     │  │  │                         │  │
│  │                         │  │  │                         │  │
│  │  🔵 User 1              │  │  │                         │  │
│  └─────────────────────────┘  │  └─────────────────────────┘  │
└───────────────────────────────┴───────────────────────────────┘
```

### **Frame 3: New User Joins** [2:28-2:32]
```
┌───────────────────────────────┬───────────────────────────────┐
│    EXISTING BROWSER           │    INCOGNITO BROWSER (User 4) │
│  ┌─────────────────────────┐  │  ┌─────────────────────────┐  │
│  │ User 1 Canvas           │  │  │ Landing → Login → Canvas│  │
│  │                         │  │  │                         │  │
│  │   ┌────────┐    ⭕       │  │  │   ┌────────┐    ⭕       │  │
│  │   │  RECT  │   / O \     │  │  │   │  RECT  │   / O \     │  │
│  │   └────────┘             │  │  │   └────────┘             │  │
│  │                         │  │  │                         │  │
│  │  🔵 User 1  🟠 User 4 ← │  │  │  🔵 User 1  🟠 User 4   │  │
│  │            (NEW!)       │  │  │            (me!)        │  │
│  └─────────────────────────┘  │  └─────────────────────────┘  │
└───────────────────────────────┴───────────────────────────────┘

TEXT OVERLAY:
  "Publicly Accessible ✅ - New user joined seamlessly!"
```

### **Frame 4: Multi-User Collaboration Demo** [2:35-2:48]
```
┌──────────────────┬──────────────────┬──────────────────┐
│  BROWSER 1       │  BROWSER 2       │  BROWSER 3       │
│  ┌────────────┐  │  ┌────────────┐  │  ┌────────────┐  │
│  │ User 1     │  │  │ User 2     │  │  │ User 3     │  │
│  │            │  │  │            │  │  │            │  │
│  │ ┌────────┐ │  │  │ ┌────────┐ │  │  │ ┌────────┐ │  │
│  │ │  RECT  │ │  │  │ │  RECT  │ │  │  │ │  RECT  │ │  │
│  │ └────────┘ │  │  │ └────────┘ │  │  │ └────────┘ │  │
│  │   ⭕       │  │  │   ⭕       │  │  │   ⭕       │  │
│  │ "Testing"  │  │  │ "Testing"  │  │  │ "Testing"  │  │
│  │            │  │  │            │  │  │            │  │
│  │ 🔵🟢🟣🟠    │  │  │ 🔵🟢🟣🟠    │  │  │ 🔵🟢🟣🟠    │  │
│  │ (all active)│  │  │ (all active)│  │  │ (all active)│  │
│  └────────────┘  │  └────────────┘  │  └────────────┘  │
└──────────────────┴──────────────────┴──────────────────┘

ANIMATION:
  - All cursors moving around canvas
  - Users creating/moving shapes together
  - Real-time sync happening seamlessly
  - Smooth, responsive interface
```

### **Frame 5: Final Closing Shot** [2:52-3:00]
```
┌─────────────────────────────────────────────────────────────────┐
│                       FINAL CANVAS VIEW                          │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                                                            │  │
│  │       ┌────────┐    ┌────────┐        ⭕                   │  │
│  │       │  RECT  │    │  RECT  │       / O \                 │  │
│  │       └────────┘    └────────┘                            │  │
│  │                                                            │  │
│  │       "Testing Sync"    "CollabCanvas MVP"                │  │
│  │                                                            │  │
│  │       🔵 User 1    🟢 User 2    🟣 User 3    🟠 User 4     │  │
│  │       (all cursors moving smoothly)                        │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

FADE IN OVERLAY (centered):
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│                      CollabCanvas MVP ✅                         │
│                                                                  │
│              ✅ Real-Time Multi-User Sync                        │
│              ✅ Multiplayer Cursors with Labels                  │
│              ✅ Presence Awareness                               │
│              ✅ State Persistence                                │
│              ✅ User Authentication                              │
│              ✅ Deployed: collabcanvas-mvp-53120.web.app        │
│                                                                  │
│           Foundation Ready for Advanced Features                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

FADE TO BLACK
```

**Narration**: "CollabCanvas MVP is deployed on Firebase Hosting and publicly accessible... CollabCanvas MVP demonstrates bulletproof multiplayer infrastructure with real-time synchronization, presence awareness, and state persistence. The foundation is solid."

---

## 🎨 **COLOR CODING GUIDE**

### **User Cursors**
- 🔵 **User 1**: Blue (#3B82F6) - Primary user
- 🟢 **User 2**: Green (#10B981) - Secondary user
- 🟣 **User 3**: Purple (#8B5CF6) - Tertiary user
- 🟠 **User 4**: Orange (#F97316) - Fourth user (incognito demo)

### **UI Elements**
- ✅ **Success/Complete**: Green checkmark
- ⚠️ **Warning/Alert**: Yellow/orange warning
- ✨ **New/Highlight**: Sparkle animation
- ⚡ **Fast/Sync**: Lightning bolt
- 🔄 **Loading/Syncing**: Spinner animation

### **Shape Colors (Default)**
- Rectangles: Blue (#3B82F6)
- Circles: Red (#EF4444)
- Text: Black (#000000)
- New shapes in demos: Vary colors for visual interest

---

## 📐 **TECHNICAL SPECIFICATIONS**

### **Screen Recording Settings**
- **Resolution**: 1920×1080 (Full HD)
- **Frame Rate**: 30 FPS minimum
- **Bitrate**: 8000 kbps (high quality)
- **Audio**: 192 kbps AAC, 48kHz sample rate
- **Format**: MP4 (H.264 codec for best compatibility)

### **Browser Window Sizes**
- **Single Browser**: 1920×1080 (full screen)
- **Split Screen (2 browsers)**: 960×1080 each (50/50 split)
- **Split Screen (3 browsers)**: 640×1080 each (33/33/33 split)

### **Text Overlay Settings**
- **Font**: Inter, SF Pro, or Helvetica (sans-serif)
- **Size**: 24-32px for main text, 18-20px for details
- **Color**: White text with 50% black background overlay for readability
- **Position**: Bottom third (non-intrusive)
- **Duration**: 2-3 seconds per overlay

### **Animation Timing**
- **Cursor movement**: Smooth interpolation
- **Shape creation**: 200ms fade-in animation
- **Sync indicators**: Pulse animation every 500ms
- **Transitions**: 300ms fade between segments

---

## 🎬 **PRODUCTION WORKFLOW**

### **Pre-Production (30 minutes)**
1. ✅ Create 3-4 user accounts (user1, user2, user3, user4)
2. ✅ Set up 3+ browser windows (or profiles)
3. ✅ Test screen recording software
4. ✅ Practice narration 2-3 times
5. ✅ Clear canvas (start with empty state)

### **Production (Recording - 2 passes)**

**Pass 1**: Record segments 1-7 (0:00-1:45)
- Focus on authentication, shapes, sync setup, cursors, presence, stress test

**Pass 2**: Record segments 8-10 (1:45-3:00)
- Focus on persistence tests and extended deployment demo

### **Post-Production (45 minutes)**
1. ✅ Stitch 2 passes together in video editor
2. ✅ Add text overlays (success badges, annotations)
3. ✅ Add narration voiceover (if not recorded live)
4. ✅ Color grade for consistency
5. ✅ Export final MP4
6. ✅ Upload to YouTube/Vimeo (unlisted)

---

## 🎯 **SUCCESS CHECKLIST**

### **Visual Quality**
- [ ] All text is readable (no blurry recording)
- [ ] Split screens are evenly sized
- [ ] Cursors are visible and distinct colors
- [ ] No UI glitches or artifacts

### **Demonstration Completeness**
- [ ] All 8 MVP requirements shown
- [ ] Real-time sync proven (multiple angles)
- [ ] Persistence tested (refresh + logout)
- [ ] Deployment URL visible
- [ ] 3+ users shown simultaneously

### **Audio Quality**
- [ ] Clear narration (no background noise)
- [ ] Consistent volume level
- [ ] No clipping or distortion
- [ ] Pacing matches visuals (not too fast/slow)

### **Timing**
- [ ] Total duration: 2:50-3:10 (target 3:00)
- [ ] No awkward pauses or dead air
- [ ] Smooth transitions between segments

---

## 🚀 **FINAL NOTES**

### **What Makes This Demo Successful**
1. ✅ **Visual Proof**: Split screen shows sync happening in real-time
2. ✅ **Stress Testing**: Multiple users, refresh, logout scenarios
3. ✅ **Professional Presentation**: Clean, organized, no fumbling
4. ✅ **Complete Coverage**: Every MVP requirement demonstrated

### **Common Pitfalls to Avoid**
- ❌ Talking too fast (rushing through demos)
- ❌ Not holding on sync demonstrations long enough
- ❌ Single-browser demos (doesn't prove multiplayer)
- ❌ Poor audio quality or mumbling

### **Bonus Points Opportunities**
- 🌟 Exceptionally smooth video editing
- 🌟 Creative visual demonstrations (cursor trails, sync animations)
- 🌟 Professional on-screen graphics
- 🌟 Clear, confident narration
- 🌟 Going over requirements (4 users instead of 3)

---

**Document Version**: 2.0
**Created**: October 15, 2025
**Updated**: October 15, 2025
**Purpose**: Visual storyboard for MVP demo video production
**Total Frames**: 40+ frames (10 segments, varying frames per segment)
**Production Time**: ~2 hours (including retakes and editing)
**Status**: Ready for video production
**Changes**: Removed technical performance metrics, extended closing to 45 seconds
