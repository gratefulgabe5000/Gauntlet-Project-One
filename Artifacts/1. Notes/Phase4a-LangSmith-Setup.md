# Phase 4a: LangSmith Integration Setup Guide

**Date**: October 18, 2025  
**Duration**: 5-10 minutes  
**Value**: +2 bonus points!  

---

## 🎯 **What is LangSmith?**

LangSmith is an observability platform for AI applications. It lets you:
- Track every AI command and its response
- Monitor token usage and costs
- Debug AI behavior with detailed traces
- View performance metrics in real-time

**Best part**: It's **completely optional** - your app works fine without it, but you get +2 bonus points for adding it!

---

## 📋 **Setup Steps** (5-10 minutes)

### **Step 1: Create LangSmith Account** (2 minutes)

1. Go to: https://smith.langchain.com
2. Sign up with your email (or GitHub/Google)
3. Verify your email
4. **Free tier**: 50,000 traces/month (more than enough for this project!)

---

### **Step 2: Generate API Key** (1 minute)

1. Go to Settings: https://smith.langchain.com/settings
2. Click "Create API Key"
3. Name it: `CollabCanvas Development`
4. **Copy the key** - it starts with `lsv2_pt_...`
5. **Important**: Save it now! You won't see it again

---

### **Step 3: Add to `.env.local`** (1 minute)

Open `Gauntlet-Project-One/.env.local` and add:

```bash
# LangSmith API Key (Phase 4a: +2 bonus points!)
VITE_LANGCHAIN_API_KEY=lsv2_pt_your-actual-key-here

# LangSmith Configuration
VITE_LANGCHAIN_TRACING_V2=true
VITE_LANGCHAIN_PROJECT=collabcanvas-ai-agent
```

**Replace `lsv2_pt_your-actual-key-here` with your actual key!**

---

### **Step 4: Restart Dev Server** (30 seconds)

```bash
# Stop the current dev server (Ctrl+C)
# Then restart it:
npm run dev
```

---

### **Step 5: Test It!** (2 minutes)

1. Open your app: http://localhost:5173
2. Open the AI Command Panel (✨ icon)
3. Send a command: "Create a blue rectangle in the center"
4. Go to your LangSmith dashboard: https://smith.langchain.com
5. Click "Projects" → "collabcanvas-ai-agent"
6. **You should see your trace!** 🎉

---

## 🔍 **What You'll See in LangSmith**

Each AI command will show:
- **Input**: Your natural language command
- **Tools Called**: Which canvas tools the AI used
- **Token Usage**: Prompt tokens, completion tokens, total cost
- **Duration**: How long the AI took to respond
- **Success/Error**: Whether the command succeeded

---

## 🎯 **Success Criteria**

✅ LangSmith account created  
✅ API key added to `.env.local`  
✅ Dev server restarted  
✅ At least one trace visible in LangSmith dashboard  
✅ **+2 bonus points earned!**

---

## 🐛 **Troubleshooting**

### **"ℹ️ LangSmith not configured" in console**

- Check that your `.env.local` has `VITE_LANGCHAIN_API_KEY`
- Make sure it starts with `lsv2_pt_`
- Restart the dev server (Ctrl+C, then `npm run dev`)

### **"No traces showing in LangSmith dashboard"**

- Wait 10-15 seconds (traces take a moment to appear)
- Refresh the LangSmith page
- Make sure you're looking at the right project: "collabcanvas-ai-agent"

### **"Still not working"**

- The app **still works fine** without LangSmith!
- You can skip this and come back later
- LangSmith is **optional** (but worth +2 points!)

---

## 💡 **Why This is Worth +2 Points**

The rubric rewards professional AI development practices:
- ✅ **Observability**: You can monitor your AI in production
- ✅ **Debugging**: Easy to diagnose AI issues
- ✅ **Cost Tracking**: See exactly how much each command costs
- ✅ **Best Practice**: Industry-standard tool for AI apps

---

## ⏱️ **Time Investment**

- **Setup**: 5-10 minutes
- **Testing**: 2 minutes
- **Total**: ~12 minutes for +2 points
- **ROI**: 10 points/hour (best in Phase 4a!)

---

## 📈 **After Setup**

Once LangSmith is working:
1. You'll see every AI command traced
2. Token usage will be visible (for cost tracking)
3. You can debug any AI issues easily
4. Your demo video can show the LangSmith dashboard (impressive!)

---

*Setup Guide created: October 18, 2025*  
*Phase 4a: Performance & Code Quality*  
*Status: Ready to test*

