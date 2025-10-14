# PR-5 Cursor Tracking Debug Guide

## 🔍 **Issue**: Cursors not appearing in multi-user sessions

### **Quick Diagnosis Steps**

#### 1. **Check Browser Console** (F12 → Console)

Look for these messages:

**✅ Good Signs:**
```
🔔 Initializing user presence...
✅ User presence initialized: <userId>
🔔 Subscribing to presence updates: global-canvas-v1
👥 Active users: <number>
```

**❌ Problem Signs:**
```
❌ Error initializing presence: ...
❌ Cursor update permission error: ...
FIREBASE WARNING: set at /sessions/... failed: permission_denied
```

#### 2. **Deploy Realtime Database Rules** (Most Likely Issue)

The Realtime Database security rules need to be deployed to Firebase:

**Option A - Using Firebase CLI:**
```bash
cd "Gauntlet Project One/collabcanvas-mvp"
npx firebase deploy --only database
```

**Option B - Via Firebase Console:**
1. Go to https://console.firebase.google.com
2. Select your project: `collabcanvas-mvp-53120`
3. Click "Realtime Database" in the left sidebar
4. Click the "Rules" tab
5. Replace the rules with:
```json
{
  "rules": {
    "sessions": {
      "$canvasId": {
        "$userId": {
          ".read": "auth != null",
          ".write": "auth != null && auth.uid == $userId"
        }
      }
    }
  }
}
```
6. Click "Publish"

#### 3. **Verify Database Structure**

After moving your mouse on the canvas, check the Firebase Console:
- Go to Realtime Database → Data tab
- You should see: `/sessions/global-canvas-v1/<userId>`
- Each user entry should have:
  - `userId`: string
  - `displayName`: string
  - `cursorColor`: string
  - `cursorX`: number
  - `cursorY`: number
  - `lastSeen`: timestamp
  - `isOnline`: boolean

#### 4. **Check Network Tab** (F12 → Network)

Filter by "firebase":
- Look for WebSocket connections to `firebaseio.com`
- Should see real-time updates being sent/received

#### 5. **Manual Test in Console**

Open browser console and try:
```javascript
// Check if presence hook is working
console.log('Active users:', window.presenceDebug);

// Manually trigger cursor update (if available)
// This would require exposing the function for debugging
```

---

## 🛠️ **Common Fixes**

### Fix 1: Database Rules Not Deployed
**Symptom**: Permission denied errors in console
**Solution**: Deploy database rules (see Step 2 above)

### Fix 2: Realtime Database Not Enabled
**Symptom**: "Database doesn't exist" errors
**Solution**:
1. Go to Firebase Console
2. Realtime Database → Create Database
3. Choose location (us-central1)
4. Start in test mode
5. Then apply proper rules from above

### Fix 3: CORS/Network Issues
**Symptom**: Connection failed errors
**Solution**: Check firewall, network settings

### Fix 4: Multiple User Sessions
**Symptom**: Only seeing one user
**Solution**: Use different browsers or incognito mode for truly separate sessions

---

## 🧪 **Testing Checklist**

- [ ] Database rules deployed
- [ ] Both users logged in with different accounts
- [ ] Console shows "✅ User presence initialized" for both
- [ ] Console shows "👥 Active users: 1" (or more)
- [ ] UserPresence panel shows other users (top-right)
- [ ] Moving mouse triggers cursor updates (check console)
- [ ] Other user's cursor appears on canvas

---

## 📊 **Expected Console Output**

**User 1 (Tab 1):**
```
🔔 Initializing user presence...
✅ User presence initialized: abc123
🔔 Subscribing to presence updates: global-canvas-v1
📭 No active sessions (initially)
👥 Active users: 1 (when User 2 joins)
```

**User 2 (Tab 2):**
```
🔔 Initializing user presence...
✅ User presence initialized: xyz789
🔔 Subscribing to presence updates: global-canvas-v1
👥 Active users: 1 (sees User 1)
```

---

## 🚨 **If Still Not Working**

1. **Clear browser cache** and reload
2. **Check Firebase project settings** - ensure Realtime Database URL is correct
3. **Verify .env.local** has correct `VITE_FIREBASE_DATABASE_URL`
4. **Restart dev server** (`npm run dev`)
5. **Check for TypeScript errors** in the console

---

## 📞 **Need More Help?**

Share:
1. Full console output from both tabs
2. Screenshot of Firebase Realtime Database Rules
3. Screenshot of Firebase Realtime Database Data tab
4. Any error messages

This will help diagnose the exact issue!
