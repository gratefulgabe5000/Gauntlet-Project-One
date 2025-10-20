# How to Run the Development Server

## Issue: PowerShell Execution Policy

If you see this error:
```
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running 
scripts is disabled on this system.
```

## Solutions (Choose One):

### Option 1: Use Command Prompt (Easiest)
1. Open **Command Prompt** (not PowerShell)
2. Navigate to project:
   ```cmd
   cd C:\Users\Right\Documents\Cursor\GratefulGabe5000\Gauntlet-Project-One
   ```
3. Run dev server:
   ```cmd
   npm run dev
   ```

### Option 2: Use Git Bash
1. Open **Git Bash**
2. Navigate to project:
   ```bash
   cd /c/Users/Right/Documents/Cursor/GratefulGabe5000/Gauntlet-Project-One
   ```
3. Run dev server:
   ```bash
   npm run dev
   ```

### Option 3: Fix PowerShell Policy (Admin Required)
1. **Run PowerShell as Administrator**
2. Run this command:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. Type `Y` to confirm
4. Close and reopen PowerShell (as normal user)
5. Navigate to project:
   ```powershell
   cd C:\Users\Right\Documents\Cursor\GratefulGabe5000\Gauntlet-Project-One
   ```
6. Run dev server:
   ```powershell
   npm run dev
   ```

### Option 4: Bypass Policy for One Command
In PowerShell:
```powershell
cd Gauntlet-Project-One
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
npm run dev
```

---

## After Starting Dev Server

The server will display:
```
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

Open **http://localhost:5173** in your browser.

---

## Testing Task 8b.2 Rotation Features

Once the app loads, test these features:

### Basic Rotation:
1. Create a rectangle
2. Select it → rotation handle appears above
3. Drag rotation handle → shape rotates
4. Hold Shift while rotating → snaps to 15° increments

### Line/Arrow Rotation:
1. Create a line or arrow
2. Select it → rotation handle at center, only 2 corner handles
3. Rotate it
4. Grab a corner handle to resize → rotation flattens to 0° immediately
5. Drag past opposite corner → flips cleanly, no "inchworm"

### Advanced:
1. Rotate any shape
2. Drag it → rotation persists
3. Resize it → rotated resize works (anchor stays fixed)
4. Duplicate it → duplicate has same rotation
5. Zoom in/out → rotation speed adjusts naturally

---

## Troubleshooting

**Port 5173 already in use?**
```bash
npm run dev -- --port 5174
```

**Changes not showing?**
- Hard refresh: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
- Check browser console for errors

**Rotation handle not appearing?**
- Make sure you're selecting a shape (click it)
- Check browser console for errors
- Verify TransformHandles.tsx was saved

---

**Ready to test!** 🎯

