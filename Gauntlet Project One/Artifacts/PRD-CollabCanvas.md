# CollabCanvas - Product Requirements Document

## Executive Summary

CollabCanvas is a real-time collaborative digital whiteboard application designed to enable teams to brainstorm, design, and collaborate visually in a shared digital space. The platform will provide intuitive drawing tools, real-time synchronization, and seamless collaboration features to support modern remote and hybrid work environments.

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

### **Scope Boundaries (What NOT to Build)**

- ❌ User profiles or avatars
- ❌ Canvas persistence beyond basic shapes
- ❌ Undo/redo functionality
- ❌ Shape styling or colors
- ❌ Mobile responsiveness
- ❌ Error handling beyond basic alerts
- ❌ Performance optimization
- ❌ Security beyond Firebase defaults

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

### Phase 2 - Enhanced Drawing Tools (2-3 weeks)

**Goal**: Expand drawing capabilities to match user expectations

1. **Advanced Shape System (Phase 2)**
   - **Types**: Freehand drawing, basic shapes (rectangle, circle, arrow, line), text
   - **Styling**: Various brush sizes and colors
   - **Interaction**: Advanced selection system with grouping
   - **Creation**: Multiple drawing tools and shape creation methods

2. **Enhanced Canvas (Phase 2)**
   - **Size**: Infinite canvas with performance optimization
   - **Constraints**: Viewport culling and lazy loading
   - **Navigation**: Smooth navigation with advanced controls
   - **Performance**: 60fps for smooth drawing experience
   - **Features**: Canvas minimap, improved zoom controls, layer management

3. **Advanced Drawing Tools**
   - Freehand drawing with pen tool
   - Text tool with formatting options
   - Eraser functionality
   - Selection and move tool improvements

4. **Export Functionality**
   - Export canvas as PNG/PDF
   - Export selected areas
   - Print functionality

### Phase 3 - Advanced Collaboration (8-10 weeks)

**Goal**: Professional-grade collaboration features

1. **Enhanced Collaboration**
   - Canvas commenting system
   - @mentions in comments
   - Live presentation mode
   - Advanced cursor collaboration
   - Voice/video integration

2. **Canvas Management**
   - Multiple canvas support
   - Canvas organization and folders
   - Sharing and permissions system
   - Canvas templates

3. **Advanced Features**
   - Undo/redo functionality
   - Version history and branching
   - Advanced search and filtering
   - Keyboard shortcuts

4. **Integrations**
   - Google Drive/OneDrive sync
   - Slack/Microsoft Teams integration
   - Webhook support

### Phase 4 - Enterprise & Scale (10-12 weeks)

**Goal**: Enterprise-ready platform with advanced capabilities

1. **Enterprise Features**
   - Single Sign-On (SSO) integration
   - Advanced analytics and reporting
   - Audit logs and compliance
   - Custom branding options
   - Advanced admin controls

2. **AI-Powered Features**
   - AI-assisted shape recognition
   - Smart layout suggestions
   - Auto-generated meeting summaries
   - Content suggestions based on context
   - OCR for handwritten text

3. **Advanced Organization**
   - Team workspaces
   - Advanced folder hierarchies
   - Canvas templates marketplace
   - Advanced user roles and permissions

### Phase 5 - Platform Extensions (Future)

**Goal**: Extensible platform with marketplace ecosystem

1. **Platform Extensions**
   - Plugin/extension system
   - Third-party widget marketplace
   - API for custom integrations
   - Embedding capabilities
   - Mobile apps (iOS/Android)

2. **Advanced Visualization**
   - 3D canvas support
   - AR/VR integration
   - Advanced animation tools
   - Data visualization widgets
   - Interactive presentations

## Technical Considerations

### Performance Requirements

**MVP Performance Targets** (Realistic for 24-hour sprint):

- **Shape synchronization**: <500ms acceptable for MVP (relaxed from 100ms)
- **Cursor updates**: <200ms acceptable for MVP (relaxed from 50ms)
- **Canvas performance**: Handle 20 rectangles minimum (reduced from 500)
- **Initial load**: <10 seconds acceptable for MVP
- **Browser support**: Chrome desktop ONLY
- **Concurrent users**: 3 users maximum for MVP testing

**MVP Constraints & Acknowledged Limitations**:

- **Canvas Size**: 2000x2000px (reduced from 5000x5000px)
- **Object Limit**: 25 shapes maximum
- **Session Duration**: 30-minute sessions before refresh needed
- **Network**: Requires good internet, no offline support
- **Devices**: Desktop Chrome only, mobile shows "not supported"

**Performance Philosophy for MVP**:
"Working slowly is infinitely better than broken quickly"

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

## Project Success Goals

1. **User Engagement**
   - 70% user retention after first week
   - Average session duration: 15+ minutes
   - 5+ canvases created per active user per month

2. **Technical Performance**
   - 99.9% uptime
   - <2 second initial canvas load time
   - <100ms real-time update latency

3. **Business Metrics**
   - 1,000 registered users within 3 months
   - 100 active teams using the platform
   - 4.5+ star rating in user feedback

## 24-Hour MVP Risk Assessment

### **Critical Dependencies (MVP Blockers)**

**Technical Blockers**:

- **Firebase Setup**: Security rules, authentication config
- **Konva.js Learning**: If unfamiliar, could take 4-6 hours
- **Real-time Sync**: Most complex part, 50% of development time
- **Cross-tab Testing**: Ensuring sync works between browser tabs

**Time Management Risks**:

- **Perfectionism**: Spending too much time on UI polish
- **Feature Creep**: Adding "just one more feature"
- **Debug Rabbit Holes**: Getting stuck on edge cases
- **Firebase Limits**: Rate limiting during testing

### **Success Definitions (24-Hour Focus)**

**Minimum Viable Success**:

- ✅ Two users can see each other's rectangles
- ✅ Rectangles persist when users refresh
- ✅ Basic user identification (names/colors)
- ✅ Deployed and shareable URL

**Stretch Goals** (if time permits):

- ✅ Smooth cursor tracking
- ✅ Visual feedback for object locking
- ✅ Clean, minimal UI

**MVP Philosophy**:
**"Ship working ugly over broken beautiful"**

### **Decision Framework for Time Pressure**

**When Behind Schedule**:

1. **Hour 12**: If auth not working → Switch to anonymous users
2. **Hour 16**: If real-time broken → Accept 2-second polling
3. **Hour 20**: If bugs persist → Deploy with "known issues" list
4. **Hour 23**: If deployment fails → Screen recording demo

**Quality vs. Time Trade-offs**:

- Functionality > Performance
- Working > Pretty
- Documented issues > Hidden bugs
- Simple deployment > Complex features

## 24-Hour MVP Conclusion

**CollabCanvas MVP Goal**: Prove that real-time collaborative thinking can work technically within 24 hours.

**What We're Validating**:

- Firebase real-time sync can handle collaborative canvas editing
- Users can intuitively collaborate on visual thinking tasks
- The "thinking relationship platform" concept has technical merit

**What We're NOT Building**:

- A production-ready application
- A polished user experience
- A scalable enterprise platform

**Success Means**:
If 2+ people can simultaneously move rectangles around and see each other's cursors in real-time, we've proven the core concept works. Everything else is iteration.

**Next Steps After MVP**:
The validated technical foundation will support the revolutionary user personas and strategic positioning outlined in this document. But first, we need to prove the technology works.

---

## Appendix: Strategic Positioning Analysis

### **Question: Would These Revolutionary User Personas Fit Well for Figma?**

**Answer: Absolutely not** - and that's exactly what makes CollabCanvas revolutionary.

#### **Why These Personas DON'T Fit Figma:**

**1. Figma Optimizes for Design Deliverables, Not Thinking Relationships**

**Figma's Real User Story**: *"As a designer, I want to create professional design artifacts that stakeholders can review and approve"*

**CollabCanvas Revolutionary Personas**: *"As humans, we want to think together and build understanding"*

**The Gap**: Figma assumes you know what you're building. Our personas are about **discovering** what to build through collaborative exploration.

**2. Figma Requires Design Literacy**

- **Space Curators in Figma**: Struggle because they need design skills to create the "welcoming space." Figma's complexity intimidates non-designers.
- **Deep Divers in Figma**: Only work if they're actual designers. A developer wanting to "think with their hands" gets lost in Figma's interface complexity.
- **Pattern Readers in Figma**: Get overwhelmed by layers, components, and design-specific features when they just want to understand relationships.

**3. Different Collaboration Philosophies**

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

#### **The Critical Strategic Difference:**

**Figma** is brilliant at **"collaborative design"** - multiple people working on a design artifact.

**CollabCanvas** is brilliant at **"collaborative thinking"** - multiple people using visual space to understand problems and explore solutions.

**Different Success Stories:**

- **Figma Success**: *"We shipped a better product because our design collaboration was seamless"*
- **CollabCanvas Success**: *"We discovered a solution none of us could have found alone because we were able to think together"*

#### **Strategic Implications for MVP:**

Our revolutionary personas reveal that CollabCanvas should be optimized for:

1. **Onboarding non-designers** (Figma intimidates them)
2. **Thinking processes** rather than design processes
3. **Emergence and discovery** rather than refinement and polish
4. **Relationship building** rather than workflow efficiency

**The Strategic Insight**: Figma owns "collaborative design." But there's a massive white space around "collaborative thinking" that our personas perfectly address.

We're not competing with Figma - we're creating an entirely different category where **thinking together visually** is more important than **creating professional design artifacts**.

This positioning makes our 24-hour MVP even more focused: prove that people can **think better together** in our space, not that they can design better.

---

*Document Version: 1.0*
*Last Updated: October 13, 2025*
*Next Review: November 13, 2025*
