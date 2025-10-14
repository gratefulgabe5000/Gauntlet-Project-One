# CollabCanvas MVP - Deployment Guide

## 🚀 Quick Deployment (First Time)

### **Step 1: Authenticate with Firebase**

Open a terminal in the `collabcanvas-mvp` directory and run:

```bash
npx firebase login
```

This will:
- Open your browser for Google authentication
- Grant Firebase CLI access to your project
- Save credentials locally (one-time setup)

### **Step 2: Deploy to Firebase Hosting**

After authentication, simply run:

```bash
npm run deploy
```

This script will:
1. Build production bundle (`npm run build`)
2. Deploy to Firebase Hosting (`firebase deploy --only hosting`)
3. Provide your live URL

---

## 📱 Expected Deployment Output

```
✔ Build successful!
🚀 Deploying to Firebase Hosting...

=== Deploying to 'collabcanvas-mvp-53120'...

i  deploying hosting
i  hosting[collabcanvas-mvp-53120]: beginning deploy...
i  hosting[collabcanvas-mvp-53120]: found 3 files in dist
✔  hosting[collabcanvas-mvp-53120]: file upload complete
i  hosting[collabcanvas-mvp-53120]: finalizing version...
✔  hosting[collabcanvas-mvp-53120]: version finalized
i  hosting[collabcanvas-mvp-53120]: releasing new version...
✔  hosting[collabcanvas-mvp-53120]: release complete

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/collabcanvas-mvp-53120/overview
Hosting URL: https://collabcanvas-mvp-53120.web.app
```

---

## 🌐 Your Live URLs

After deployment, your app will be available at:

- **Primary URL**: `https://collabcanvas-mvp-53120.web.app`
- **Alternative**: `https://collabcanvas-mvp-53120.firebaseapp.com`
- **Console**: https://console.firebase.google.com/project/collabcanvas-mvp-53120

---

## 🔄 Future Deployments

After initial authentication, deployments are simple:

```bash
# Quick deploy (builds + deploys)
npm run deploy

# Manual steps
npm run build
npx firebase deploy --only hosting

# Preview locally before deploying
npm run preview  # Serves the dist/ folder locally
```

---

## ✅ Post-Deployment Validation

After deployment, verify:

1. **Visit the live URL**: Open in browser
2. **Check console**: No errors in browser DevTools
3. **Verify Canvas**: Gray canvas with centered test rectangle
4. **Check Konva**: "✓ Konva.js Active" indicator visible
5. **Test toolbar**: Buttons render correctly

---

## 🎯 Current Deployment Status (PR1)

**What's Deployed**:
- ✅ React 18 + TypeScript foundation
- ✅ Konva.js canvas rendering (test rectangle)
- ✅ Tailwind CSS styling
- ✅ Firebase configuration (connected)
- ✅ Basic toolbar UI
- ✅ User presence indicator

**Not Yet Deployed** (Coming in PR2-PR7):
- ❌ Authentication (PR2)
- ❌ Rectangle creation (PR3)
- ❌ Real-time sync (PR4)
- ❌ Cursor tracking (PR5)
- ❌ UI polish (PR6)
- ❌ Production optimizations (PR7)

---

## 🛠️ Deployment Configuration

### **firebase.json**
```json
{
  "hosting": {
    "public": "dist",
    "rewrites": [
      { "source": "**", "destination": "/index.html" }
    ]
  }
}
```

### **.firebaserc**
```json
{
  "projects": {
    "default": "collabcanvas-mvp-53120"
  }
}
```

---

## 🐛 Troubleshooting

### **Error: Not authenticated**
```bash
npx firebase login
```

### **Error: Project not found**
Verify `.firebaserc` contains correct project ID:
```bash
cat .firebaserc  # Should show collabcanvas-mvp-53120
```

### **Error: Build failed**
```bash
npm run build
# Fix TypeScript errors shown
# Then retry: npm run deploy
```

### **Deployment stuck**
- Check internet connection
- Try: `npx firebase logout` then `npx firebase login`
- Verify Firebase project exists in console

---

## 📊 Bundle Analysis

Current production bundle (PR1):
- **HTML**: 0.46 KB (gzipped: 0.30 KB)
- **CSS**: 10.11 KB (gzipped: 2.73 KB)
- **JS**: 510.75 KB (gzipped: 158.50 KB)
- **Total**: ~521 KB (~161 KB gzipped)

Largest dependencies:
- Konva.js: ~450 KB (canvas rendering engine)
- React + React-DOM: ~40 KB
- Firebase SDK: ~20 KB (only used modules)

---

## 🔒 Security Notes

**Current Configuration** (MVP):
- Firebase services in **test mode** (anyone can access)
- No authentication required yet
- Security rules will be added in PR4

**Production Checklist** (Post-MVP):
- [ ] Enable Firestore security rules
- [ ] Enable Realtime DB security rules
- [ ] Add authentication requirements
- [ ] Configure CORS if needed
- [ ] Enable Firebase App Check

---

## 📈 Deployment History

| PR | Date | Version | Description | URL |
|----|------|---------|-------------|-----|
| PR1 | 2025-10-14 | 0.1.0 | Foundation Setup | [Pending First Deploy] |
| PR2 | TBD | 0.2.0 | Authentication | TBD |
| PR3 | TBD | 0.3.0 | Local Canvas | TBD |
| PR4 | TBD | 0.4.0 | Real-Time Sync | TBD |
| PR5 | TBD | 0.5.0 | User Presence | TBD |
| PR6 | TBD | 0.6.0 | UI Polish | TBD |
| PR7 | TBD | 1.0.0 | **Production MVP** | TBD |

---

*Deployment configured for PR1 Foundation Setup*
*Last Updated: October 14, 2025*
