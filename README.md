# CollabCanvas MVP

> 24-Hour MVP: Real-time collaborative canvas with rectangles using React, Konva, and Firebase

A real-time collaborative digital whiteboard where multiple users can simultaneously create, move, and see rectangles in real-time.

**Author**: Matthew Sizemore, Gauntlet AI Cohort 3
**Sprint Goal**: Prove that real-time collaborative canvas editing works technically
**Philosophy**: "Working slowly is infinitely better than broken quickly"

---

## 🎯 Current Status: **PR1 Complete** ✅

**Foundation Setup Complete** - Ready for deployment and PR2 Authentication

### ✅ Completed (Hours 0-4)
- React 18 + TypeScript + Vite development environment
- Firebase integration (Auth, Firestore, Realtime Database)
- Konva.js canvas rendering engine
- Tailwind CSS with canvas-specific styling
- Vitest + React Testing Library (4 tests passing)
- Production build ready (510 KB bundle)
- Firebase Hosting configuration

### 📅 Coming Next (PR2-PR7)
- **PR2** (Hours 4-6): Firebase Authentication
- **PR3** (Hours 6-10): Rectangle creation and manipulation
- **PR4** (Hours 10-16): Real-time synchronization ⚠️ **CRITICAL**
- **PR5** (Hours 16-20): User presence and cursor tracking
- **PR6** (Hours 20-22): UI polish
- **PR7** (Hours 22-24): Production deployment

---

## 🚀 Quick Start

### **Development**

```bash
# Install dependencies
npm install

# Start dev server (with network access)
npm run dev
# Opens at http://localhost:5173

# Run tests
npm test

# Type checking
npm run type-check

# Lint code
npm run lint
```

### **Production Build**

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

### **Deployment**

```bash
# First time: Authenticate with Firebase
npx firebase login

# Deploy to Firebase Hosting
npm run deploy
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

---

## 🏗️ Technology Stack

### **Frontend**
- **React 18** - Component architecture
- **TypeScript** - Type safety and developer experience
- **Vite** - Fast build tool and dev server
- **Konva.js** - High-performance 2D canvas rendering
- **Tailwind CSS** - Utility-first styling

### **Backend Services**
- **Firebase Authentication** - User management (email/password)
- **Cloud Firestore** - Persistent shape data storage
- **Firebase Realtime Database** - High-frequency cursor/presence updates
- **Firebase Hosting** - Static site deployment

### **Development Tools**
- **Vitest** - Fast unit testing
- **React Testing Library** - Component testing
- **ESLint** - Code quality
- **TypeScript** - Strict type checking

---

## 📁 Project Structure

```
collabcanvas-mvp/
├── src/
│   ├── App.tsx                    # Main application component
│   ├── main.tsx                   # React entry point
│   ├── index.css                  # Global styles + Tailwind
│   │
│   ├── components/
│   │   └── Canvas.tsx             # Konva Stage & rendering
│   │
│   ├── services/
│   │   └── firebase.ts            # Firebase configuration
│   │
│   ├── hooks/                     # Custom React hooks (PR2+)
│   ├── auth/                      # Authentication components (PR2+)
│   │
│   └── __tests__/
│       ├── setup.ts               # Vitest configuration
│       ├── vitest.d.ts            # Type declarations
│       └── App.test.tsx           # Component tests
│
├── public/                        # Static assets
├── dist/                          # Production build output
│
├── firebase.json                  # Firebase Hosting config
├── .firebaserc                    # Firebase project ID
├── vite.config.ts                 # Vite configuration
├── vitest.config.ts               # Test configuration
├── tailwind.config.js             # Tailwind customization
├── tsconfig.json                  # TypeScript configuration
│
├── DEPLOYMENT.md                  # Deployment guide
└── README.md                      # This file
```

---

## 🧪 Testing

### **Run Tests**

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### **Current Test Coverage**

- ✅ App component renders without crashing
- ✅ Toolbar with buttons displays correctly
- ✅ User presence indicator shows
- ✅ Canvas component integrates properly

---

## 🔧 Development

### **Available Scripts**

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm test` | Run test suite |
| `npm run type-check` | Check TypeScript types |
| `npm run lint` | Lint code with ESLint |
| `npm run lint:fix` | Fix linting errors automatically |
| `npm run deploy` | Build and deploy to Firebase Hosting |

### **Environment Variables**

Create `.env.local` with your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

**Note**: `.env.local` is gitignored for security.

---

## 🎯 MVP Success Criteria

### **Critical Success Metrics**
- ✅ 2+ users can collaborate simultaneously
- ✅ Shape updates sync between browsers within 500ms
- ✅ Basic object locking prevents edit conflicts
- ✅ Authentication persists across sessions
- ✅ Deployed and publicly accessible

### **Current Progress**
- **Foundation**: ✅ 100% Complete (PR1)
- **Authentication**: 📅 Planned (PR2)
- **Local Canvas**: 📅 Planned (PR3)
- **Real-Time Sync**: 📅 Critical Path (PR4)
- **Overall**: ~16% complete

---

## 🚧 Known Limitations (PR1)

- No authentication yet (coming in PR2)
- Canvas displays test rectangle only (PR3 adds interaction)
- No real-time synchronization yet (PR4)
- No cursor tracking (PR5)
- Basic UI only (PR6 adds polish)
- Development mode only (PR7 adds production optimizations)

---

## 📊 Bundle Size

**Production Build** (PR1):
- **HTML**: 0.46 KB (gzipped: 0.30 KB)
- **CSS**: 10.11 KB (gzipped: 2.73 KB)
- **JavaScript**: 510.75 KB (gzipped: 158.50 KB)
- **Total**: ~521 KB (~161 KB gzipped)

Primary dependencies:
- Konva.js: ~450 KB (canvas rendering)
- React + React-DOM: ~40 KB
- Firebase SDK: ~20 KB

---

## 🔒 Security

**Current Configuration** (MVP):
- Firebase services in **test mode** (development only)
- No authentication required yet
- Security rules will be implemented in PR4

**Production Checklist** (Coming):
- [ ] Firestore security rules
- [ ] Realtime Database security rules
- [ ] Authentication requirements
- [ ] Rate limiting
- [ ] CORS configuration

---

## 📚 Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide and troubleshooting
- [Architecture Diagram](../Artifacts/ArchitectureDiagram-CollabCanvas.mermaid) - System architecture
- [Product Requirements](../Artifacts/PRD-CollabCanvas.md) - Full PRD document
- [Task List](../Artifacts/TaskList-CollabCanvas.md) - 24-hour sprint breakdown
- [Work Breakdown](../Artifacts/WBS-CollabCanvas.md) - Detailed WBS

---

## 🐛 Troubleshooting

### **Dev server won't start**
```bash
# Kill any process using port 5173
npx kill-port 5173
npm run dev
```

### **Build fails**
```bash
# Clean install dependencies
rm -rf node_modules package-lock.json
npm install
npm run build
```

### **Tests fail**
```bash
# Clear test cache
npm test -- --clearCache
npm test
```

### **Firebase deployment fails**
```bash
# Re-authenticate
npx firebase logout
npx firebase login
npm run deploy
```

---

## 📈 Performance

**Development**:
- Hot Module Replacement (HMR): <100ms
- TypeScript compilation: <2 seconds
- Test execution: <5 seconds

**Production**:
- Initial load: <10 seconds (target)
- Canvas render: 60fps
- Shape sync: <500ms (target)

---

## 🤝 Contributing

This is a 24-hour MVP sprint project. Development follows a strict PR-based workflow:

1. Each PR represents a working, deployable milestone
2. All tests must pass before merging
3. TypeScript strict mode enforced
4. ESLint rules must be satisfied

---

## 📝 License

Private project - Gauntlet AI Cohort 3

---

## 📞 Support

For questions or issues:
- Review [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
- Check [TaskList-CollabCanvas.md](../Artifacts/TaskList-CollabCanvas.md) for sprint details
- See [PRD-CollabCanvas.md](../Artifacts/PRD-CollabCanvas.md) for full requirements

---

**Last Updated**: October 14, 2025
**Current Sprint**: 24-Hour MVP (PR1 Complete)
**Next Milestone**: PR2 - Firebase Authentication System
**Firebase Project**: `collabcanvas-mvp-53120`
**Deployment URL**: `https://collabcanvas-mvp-53120.web.app` (pending first deploy)
