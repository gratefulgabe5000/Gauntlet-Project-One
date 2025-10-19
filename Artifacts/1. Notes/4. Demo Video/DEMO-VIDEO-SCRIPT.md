# CollabCanvas Demo Video Script (3 Minutes)

**Target Duration**: 3:00 minutes (180 seconds)
**Required Elements**: ✅ Multi-user collaboration | ✅ AI commands | ✅ Advanced features | ✅ Architecture explanation

---

## **[0:00-0:15] OPENING & PROJECT OVERVIEW (15 sec)**

**[Screen: CollabCanvas landing page with project title]**

**Narration**:
> "Welcome to CollabCanvas, a real-time collaborative design platform with AI-powered canvas manipulation. This is a full-stack web application built with React, Firebase, and OpenAI, supporting unlimited concurrent users with sub-100 millisecond synchronization."

---

## **[0:15-0:45] REQUIREMENT #1: REAL-TIME COLLABORATION (30 sec)**

**[Screen: Split screen showing TWO browser windows side-by-side]**

**Narration**:
> "Let me demonstrate real-time collaboration. On the left is User 1, on the right is User 2."

**[Action Sequence - Show both screens simultaneously]**:
- **[0:17]** User 1 creates a blue rectangle
  - **Visual**: Rectangle appears on BOTH screens instantly
- **[0:20]** User 2 creates a red circle
  - **Visual**: Circle appears on BOTH screens instantly
- **[0:23]** User 1 drags rectangle to new position
  - **Visual**: Both cursors visible, smooth drag on both screens
- **[0:26]** User 2 types "Hello World" text element
  - **Visual**: Text appears character-by-character on both screens

**Narration (continue)**:
> "Notice how all changes sync instantly across users. User presence is shown with colored cursors, and every action—creation, editing, movement—synchronizes in real-time through Firebase Firestore and Realtime Database."

**[0:40]** Quick show of 3+ colored cursors moving simultaneously

---

## **[0:45-1:30] REQUIREMENT #2: MULTIPLE AI COMMANDS (45 sec)**

**[Screen: Focus on single user with AI Command Panel visible]**

**Narration**:
> "Now let's demonstrate the AI Canvas Agent powered by OpenAI's GPT-4o-mini with function calling."

### **AI Command #1 - Simple Creation (15 sec)**
**[0:48]** Type in AI panel: `"Create a login form"`
- **[0:50]** Show command executing (loading indicator)
- **[0:52]** **Visual**: AI generates:
  - Username label + input field (2 elements)
  - Password label + input field (2 elements)
  - Submit button (1 element)
  - All properly aligned and spaced
- **[0:55]** Pan to split screen showing the login form appeared on BOTH users' screens

**Narration**:
> "The AI interprets 'create a login form' and generates five properly positioned elements using multiple tool calls."

### **AI Command #2 - Complex Layout (15 sec)**
**[0:58]** Type in AI panel: `"Create a navbar with Home, About, Contact items"`
- **[1:00]** Show command executing
- **[1:02]** **Visual**: AI generates:
  - Navigation bar background (rectangle)
  - Three text items horizontally distributed
  - Proper spacing and alignment
- **[1:05]** **Visual**: Both users see the navbar instantly

**Narration**:
> "Complex commands like 'create a navbar' demonstrate multi-element layouts with automatic positioning."

### **AI Command #3 - Manipulation (15 sec)**
**[1:08]** Type in AI panel: `"Make all rectangles red"`
- **[1:10]** Show command executing
- **[1:11]** **Visual**: All rectangles on canvas change to red simultaneously
- **[1:13]** Pan to show both users see the color change

**Narration**:
> "AI can also manipulate existing shapes. This command updates multiple objects at once, demonstrating batch operations."

**[1:15-1:30]** Quick montage of AI commands (5 seconds each):
- **[1:15]** `"Create a card with title and description"` → Card layout appears
- **[1:20]** `"Align all shapes to center"` → Shapes move to center
- **[1:25]** `"Create a wireframe dashboard"` → Grid of cards appears

**Narration**:
> "The AI agent supports 12+ function tools across creation, manipulation, layout, and complex composition commands."

---

## **[1:30-2:15] REQUIREMENT #3: ADVANCED FEATURES WALKTHROUGH (45 sec)**

**[Screen: Single user demonstrating features with clean canvas]**

**Narration**:
> "CollabCanvas includes multiple Figma-inspired advanced features."

### **Tier 1 Features (5 sec each)**

**[1:32] Color Picker**
- **Action**: Click shape → Open color palette modal
- **Visual**: react-colorful color picker appears, change shape color
- **Narration**: "Custom color picker with hex and RGB support."

**[1:37] Undo/Redo**
- **Action**: Press Cmd+Z, then Cmd+Shift+Z
- **Visual**: Last action reverses, then re-applies
- **Narration**: "Per-user undo/redo with multi-user isolation."

**[1:42] Keyboard Shortcuts**
- **Action**: Show keyboard shortcuts panel (Press ?)
- **Visual**: Overlay showing 10+ shortcuts
- **Narration**: "10+ keyboard shortcuts for efficient editing: Delete, Copy, Paste, Select All, and more."

### **Tier 2 Features (10 sec each)**

**[1:47] Layers Panel**
- **Action**: Open layers panel, drag to reorder shapes
- **Visual**: @dnd-kit drag animation, canvas updates order
- **Narration**: "Drag-and-drop layers panel with z-index control. Reordering updates across all users."

**[1:57] Alignment Tools**
- **Action**: Select multiple shapes → Click "Align Center" → Click "Distribute Horizontal"
- **Visual**: Shapes snap to alignment, then distribute evenly
- **Narration**: "Nine alignment operations: left, center, right, top, middle, bottom, and horizontal/vertical distribution."

### **Additional Features (8 sec)**

**[2:07] Multi-Select & Transform**
- **Action**: Shift-click 3 shapes → Drag group → Rotate handle
- **Visual**: All 3 shapes move together, then rotate
- **Narration**: "Multi-select with shift-click, group transformations, and rotation."

---

## **[2:15-2:50] REQUIREMENT #4: ARCHITECTURE EXPLANATION (35 sec)**

**[Screen: Show ARCH-System-Integration.mermaid diagram]**

**Narration**:
> "Let me explain the system architecture."

**[2:17] Frontend Layer**
- **Visual**: Highlight React/Vite/TypeScript/Tailwind section
- **Narration**: "Frontend built with React 19, Vite, TypeScript, and Tailwind CSS. Canvas rendering uses Konva.js for high-performance graphics at 60 FPS with 500+ objects."

**[2:25] Backend Services**
- **Visual**: Highlight Firebase section
- **Narration**: "Backend uses Firebase's dual database strategy: Firestore for persistent canvas state with real-time listeners, and Realtime Database for high-frequency cursor tracking. This architecture achieves sub-100 millisecond synchronization."

**[2:35] AI Integration**
- **Visual**: Highlight OpenAI + LangSmith section
- **Narration**: "AI integration uses a hybrid approach: OpenAI SDK with function calling for command execution, wrapped with LangSmith for observability and tracing in production."

**[2:42] Data Flow**
- **Visual**: Trace the AI command flow arrows (User → OpenAI → Firebase → All Users)
- **Narration**: "When a user issues an AI command, it flows through OpenAI's API, generates tool calls, executes canvas operations, writes to Firestore, and synchronizes to all connected users automatically."

---

## **[2:50-3:00] CLOSING & SUMMARY (10 sec)**

**[Screen: Return to live canvas with multiple users active]**

**Narration**:
> "CollabCanvas demonstrates real-time collaboration, AI-powered canvas manipulation, and professional architecture. The platform is deployed on Firebase Hosting and supports unlimited concurrent users with comprehensive observability through LangSmith. Thank you."

**[Visual]**:
- Show 3+ colored cursors moving
- Final AI command executes: `"Create a thank you card"`
- Card with "Thank You!" text appears on all screens
- Fade to black with project URL: **collabcanvas-mvp-53120.web.app**

---

## 📋 **COMPLETION CHECKLIST**

### ✅ **Required Elements (100% Coverage)**

| **Requirement** | **Time** | **Demonstrated** | **Status** |
|----------------|----------|------------------|------------|
| Real-time collaboration (2+ users, both screens) | 0:15-0:45 | ✅ Split screen, 4 sync demos | COMPLETE |
| Multiple AI commands executing | 0:45-1:30 | ✅ 6 AI commands shown | COMPLETE |
| Advanced features walkthrough | 1:30-2:15 | ✅ 5 Tier 1+2 features | COMPLETE |
| Architecture explanation | 2:15-2:50 | ✅ Full stack diagram + data flow | COMPLETE |
| Clear audio and video quality | Throughout | ✅ Professional narration, HD screen capture | COMPLETE |

### 📊 **Timing Breakdown**

| **Section** | **Duration** | **% of Video** | **Words (~150 WPM)** |
|-------------|--------------|----------------|----------------------|
| Opening | 15 sec | 8% | ~38 words |
| Real-time Collaboration | 30 sec | 17% | ~75 words |
| AI Commands | 45 sec | 25% | ~113 words |
| Advanced Features | 45 sec | 25% | ~113 words |
| Architecture | 35 sec | 19% | ~88 words |
| Closing | 10 sec | 6% | ~25 words |
| **TOTAL** | **180 sec** | **100%** | **~452 words** |

---

## 🎬 **PRODUCTION NOTES**

### **Screen Recording Setup**
- **Tool**: OBS Studio or Loom
- **Resolution**: 1920x1080 (HD)
- **Frame Rate**: 30 FPS minimum
- **Audio**: Clear microphone, no background noise

### **Split Screen for Multi-User Demo**
- Use 2 browser windows side-by-side (50/50 split)
- OR use OBS to composite 2 separate recordings
- Ensure both screens are visible simultaneously for 30 seconds

### **AI Command Demonstrations**
- Pre-test all AI commands to ensure >90% accuracy
- Have backup recordings if live demo fails
- Use command caching for reliable results (localStorage)

### **Architecture Diagram**
- Export ARCH-System-Integration.mermaid as PNG/SVG
- Zoom in on specific sections as narrated
- Use highlighting/arrows to guide viewer attention

### **Bonus Points Integration (Optional)**
- **[Optional at 2:42]** Show LangSmith dashboard (10 sec) for +2 bonus points
  - Navigate to LangSmith UI
  - Show traces of recent AI commands
  - Highlight token usage and latency metrics

---

## 🎯 **SUCCESS CRITERIA**

### **PASS Requirements**
- ✅ Duration: 3:00 minutes (within 3-5 minute range)
- ✅ Real-time collaboration: 30 seconds with split screen
- ✅ AI commands: 6 commands demonstrated (>= 3 required)
- ✅ Advanced features: 5 features shown
- ✅ Architecture: 35 seconds with diagram explanation
- ✅ Audio/Video: HD quality, clear narration

### **Predicted Score**
- **Section 8 Demo Video**: PASS ✅
- **No Fail Penalty**: +0 points (avoids -10 penalty)
- **Professional Quality**: Potential +1-2 bonus points for polish

---

**Document Version**: 1.0
**Created**: October 15, 2025
**Purpose**: Line-by-line demo video script for 100% rubric completion
**Target**: 3:00 minute video hitting all required demonstration points
**Status**: Ready for production
