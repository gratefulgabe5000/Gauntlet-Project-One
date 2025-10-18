# Phase 3: AI Canvas Agent - Setup Guide

**Created**: October 18, 2025  
**Branch**: `PR9-feat/ai-canvas-agent`  
**Target**: +25 rubric points (highest value feature)  

---

## ✅ Prerequisites Completed

- [x] OpenAI SDK installed (v6.5.0)
- [x] Branch created (`PR9-feat/ai-canvas-agent`)
- [ ] Environment variables configured
- [ ] OpenAI API key obtained

---

## 🔧 Step 1: Set Up Environment Variables

### Create `.env.local` File

In the `Gauntlet-Project-One` directory, create a file named `.env.local` with the following content:

```bash
# CollabCanvas Environment Variables
# Phase 3: AI Canvas Agent Configuration

# OpenAI API Key
# Get your API key from: https://platform.openai.com/api-keys
VITE_OPENAI_API_KEY=your-openai-api-key-here

# Model Configuration (optional, defaults set in code)
# VITE_OPENAI_MODEL=gpt-4o-mini
```

### Get Your OpenAI API Key

1. **Create OpenAI Account**: https://platform.openai.com/signup
2. **Add Billing**: https://platform.openai.com/account/billing
   - Minimum: $5 credit
   - Estimated usage: $15-20 for Phase 3 development
3. **Generate API Key**: https://platform.openai.com/api-keys
   - Click "Create new secret key"
   - Name it "CollabCanvas Development"
   - Copy the key (starts with `sk-...`)
   - **Important**: Save it immediately - you won't see it again!
4. **Update `.env.local`**: Replace `your-openai-api-key-here` with your actual key

### Security Notes

- ✅ `.env.local` is already in `.gitignore` - it will never be committed
- ⚠️ **NEVER** commit API keys to version control
- ⚠️ **NEVER** share your API key publicly
- ✅ The template below is safe to use

---

## 📋 `.env.local` Template

```bash
# CollabCanvas AI Canvas Agent Configuration
VITE_OPENAI_API_KEY=sk-proj-your-actual-key-here-replace-this-text
```

**Windows PowerShell Command to Create File**:
```powershell
cd Gauntlet-Project-One
@"
# CollabCanvas AI Canvas Agent Configuration
VITE_OPENAI_API_KEY=sk-proj-your-actual-key-here
"@ | Out-File -FilePath .env.local -Encoding utf8
```

Then edit `.env.local` and replace `sk-proj-your-actual-key-here` with your real key.

---

## 🔍 Verify Installation

### Check OpenAI Package

```powershell
cd Gauntlet-Project-One
npm list openai
```

**Expected output**: `openai@6.5.0` or similar

### Verify Environment Variables

After creating `.env.local`, restart your dev server:

```powershell
npm run dev
```

The Vite server will automatically load environment variables from `.env.local`.

---

## 🚀 Phase 3 Implementation Tasks

### Task 9.1: AI Service Setup (45 minutes)

**Goal**: Create OpenAI client with tool calling support

**Files to Create**:
1. `src/services/openai.ts` - OpenAI client initialization
2. `src/types/ai.types.ts` - TypeScript interfaces for AI types

**Key Features**:
- Initialize OpenAI client with `dangerouslyAllowBrowser: true` (dev only)
- Implement `executeAICommand(userInput: string)` function
- Add retry logic (3 attempts with exponential backoff)
- Error handling with user-friendly messages

### Task 9.2: Define Canvas Tools (90 minutes)

**Goal**: Define 8-12 canvas tools as OpenAI function schemas

**Tools Categories** (minimum 8):
1. **Creation Tools** (3):
   - `create_shape` - Rectangle/Circle/Text/Line/Arrow
   - `create_text` - Text with formatting
   - `create_sized_shape` - Specific dimensions

2. **Manipulation Tools** (3):
   - `move_shape` - Move to position/direction
   - `resize_shape` - Change size
   - `change_color` - Update fill color

3. **Layout Tools** (2+):
   - `arrange_shapes` - Horizontal/vertical/grid patterns
   - `align_shapes` - Left/right/center/top/bottom

**File**: `src/utils/aiCommands.ts`

### Task 9.3: AI Command Panel UI (75 minutes)

**Goal**: Build user interface for AI commands

**Components to Create**:
1. `src/components/AICommandPanel.tsx` - Main UI
2. Input field with natural language prompt
3. Submit button + loading state
4. Command history display
5. Error messages with toast notifications

### Task 9.4: Integration (90 minutes)

**Goal**: Connect AI service to canvas hooks

**Integration Points**:
1. Wire AI service to `useShapes` hook
2. Execute tool calls and create/modify shapes
3. Multi-user sync for AI-created shapes
4. Real-time updates across all users

---

## 📊 Expected API Usage

### Cost Estimates

**Model**: `gpt-4o-mini` (recommended)
- **Input**: ~$0.15 per 1M tokens
- **Output**: ~$0.60 per 1M tokens
- **Average command**: ~500 tokens (input + output)
- **Cost per command**: ~$0.0004 (less than 1 cent)
- **100 commands**: ~$0.04
- **1000 commands**: ~$0.40

**Development Budget**: $15-20 should cover all Phase 3 development and testing

### Alternative Model

**Model**: `gpt-4-turbo` (for complex commands)
- More expensive but better at complex multi-step commands
- Use only if `gpt-4o-mini` struggles with complex layouts

---

## 🧪 Testing Commands

Once implemented, test with these natural language commands:

### Basic Creation
- "Create a blue rectangle in the center"
- "Add a red circle at 100, 200"
- "Create text that says 'Hello World'"

### Manipulation
- "Move the rectangle to the right"
- "Make the circle bigger"
- "Change the rectangle color to green"

### Layout
- "Arrange the shapes in a horizontal line"
- "Create a grid of 3x3 blue squares"
- "Align all shapes to the left"

### Complex
- "Create a login form with username and password fields"
- "Make a navbar with 5 menu items"
- "Build a card layout with title and description"

---

## 📝 Implementation Checklist

### Environment Setup
- [ ] `.env.local` created with template
- [ ] OpenAI API key obtained from platform.openai.com
- [ ] API key added to `.env.local`
- [ ] Dev server restarted to load environment variables
- [ ] API key verified (starts with `sk-`)

### Task 9.1: AI Service Setup (45 min)
- [ ] Create `src/services/openai.ts`
- [ ] Create `src/types/ai.types.ts`
- [ ] Initialize OpenAI client
- [ ] Implement `executeAICommand()` function
- [ ] Add error handling and retry logic
- [ ] Test API connection

### Task 9.2: Canvas Tools Definition (90 min)
- [ ] Create `src/utils/aiCommands.ts`
- [ ] Define 3 creation tools
- [ ] Define 3 manipulation tools
- [ ] Define 2+ layout tools
- [ ] Add tool execution handlers
- [ ] Test tool schemas

### Task 9.3: AI Command Panel UI (75 min)
- [ ] Create `src/components/AICommandPanel.tsx`
- [ ] Add input field and submit button
- [ ] Implement loading states
- [ ] Add command history
- [ ] Integrate with App.tsx
- [ ] Test UI interactions

### Task 9.4: Integration & Testing (90 min)
- [ ] Connect AI service to canvas hooks
- [ ] Implement tool call execution
- [ ] Test all 8-12 commands
- [ ] Verify multi-user sync
- [ ] Test error handling
- [ ] Performance optimization

### Phase 3 Complete
- [ ] All features implemented and tested
- [ ] Demo video footage captured
- [ ] Documentation updated
- [ ] Branch ready for merge

---

## 🎯 Success Criteria

### Rubric Requirements (25 points)

**Section 4: AI Canvas Agent**

1. **Natural Language Commands** (5 pts)
   - AI understands canvas-related commands
   - Responds with appropriate tool calls
   - Handles ambiguous requests gracefully

2. **Tool Calling Implementation** (8 pts)
   - 8-12 distinct canvas tools defined
   - Proper OpenAI function schemas
   - Tool calls execute correctly

3. **Canvas Integration** (7 pts)
   - AI-created shapes appear on canvas
   - Multi-user sync works
   - Shapes have proper properties

4. **User Experience** (5 pts)
   - Command panel is intuitive
   - Loading states and feedback
   - Error messages are helpful
   - Response time < 2 seconds (90% of requests)

### Bonus Points
- **LangSmith Integration** (+2 pts) - Add in Phase 5
- **Advanced Commands** (+1-2 pts) - Complex layouts, patterns

---

## 🔗 Useful Resources

### OpenAI Documentation
- **Tool Calling Guide**: https://platform.openai.com/docs/guides/function-calling
- **API Reference**: https://platform.openai.com/docs/api-reference
- **Best Practices**: https://platform.openai.com/docs/guides/production-best-practices

### Project Documentation
- **TaskList**: `Artifacts/TaskList-CollabCanvas.md` (Phase 3 section)
- **Phase 3 Implementation Guide**: `Artifacts/1. Notes/PRD-PHASE3-IMPLEMENTATION-GUIDE.md`
- **Tech Stack**: `Artifacts/TECH-TechStack.md` (Phase 3 section)

---

## 🚨 Troubleshooting

### Environment Variable Not Loading
**Issue**: `import.meta.env.VITE_OPENAI_API_KEY` is undefined

**Solutions**:
1. Verify `.env.local` exists in `Gauntlet-Project-One/` directory
2. Restart dev server: `npm run dev`
3. Check file name is exactly `.env.local` (not `.env.local.txt`)
4. Ensure variable starts with `VITE_` prefix

### API Key Invalid
**Issue**: OpenAI returns 401 Unauthorized

**Solutions**:
1. Verify API key starts with `sk-proj-` or `sk-`
2. Check key was copied correctly (no extra spaces)
3. Verify billing is enabled on OpenAI account
4. Generate a new key if needed

### Rate Limit Errors
**Issue**: OpenAI returns 429 Too Many Requests

**Solutions**:
1. Add retry logic with exponential backoff (already in implementation)
2. Reduce request frequency during testing
3. Check your OpenAI usage limits
4. Consider upgrading to higher tier if needed

---

*Setup Guide Created: October 18, 2025*  
*Phase 3 Target: 25 rubric points*  
*Estimated Duration: 6-8 hours*  
*Branch: PR9-feat/ai-canvas-agent*  

