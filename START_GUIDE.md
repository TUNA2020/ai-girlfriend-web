# AI Girlfriend Web App - Quick Start Guide

## 🚀 Launch the Application

### Option 1: Using the Batch File (Recommended for Windows)

**Simply double-click `launch-app.bat`** to start everything automatically!

The batch file will:
1. ✓ Check if Node.js is installed
2. ✓ Check if npm is available
3. ✓ Install dependencies (if needed)
4. ✓ Start the development server
5. ✓ Open Chrome browser automatically at http://localhost:3000

---

### Option 2: Manual Start (Alternative Methods)

#### Method A: Using Command Prompt
```cmd
cd C:\Users\tunap\Desktop\AI Girlfriend
src\npm start
```
Then open Chrome: **http://localhost:3000**

#### Method B: Using PowerShell (Better Error Messages)
```powershell
.\start-app.ps1
```

#### Method C: Direct npm Command
```cmd
cd src
npm start
```

---

## 📋 Troubleshooting

### ❌ Problem: Batch file doesn't work

**Solution 1: Run as Administrator**
- Right-click `launch-app.bat`
- Select "Run as administrator"

**Solution 2: Check Node.js Installation**
```cmd
node --version
npm --version
```
If these don't work, reinstall Node.js from https://nodejs.org

### ❌ Problem: Chrome doesn't open

**Manual workaround:**
1. Start the server using any method above
2. Open Chrome yourself
3. Navigate to: **http://localhost:3000**

### ❌ Problem: Port 3000 already in use

```cmd
cd src
npm start -- --port 3001
```
Then open: **http://localhost:3001**

### ❌ Problem: Dependencies not installed

```cmd
cd ..
rmdir /s /q node_modules
del package-lock.json
npm install
```

---

## ⚙️ How It Works

### Development Server
- Uses React Scripts (create-react-app)
- Hot reload enabled (changes appear automatically)
- Runs on port 3000 by default

### Application Flow
1. User opens http://localhost:3000
2. Sees character carousel with 5 AI girlfriends
3. Selects a character
4. Chat interface opens
5. Types messages and receives AI responses

### Key Features
- ✅ 5 unique AI characters
- ✅ Context-aware conversations
- ✅ 200+ messages per character
- ✅ Offline operation (local LLM)
- ✅ Emotion detection
- ✅ Relationship progression
- ✅ Multi-language (English, Hindi, Hinglish)

---

## 📂 Project Structure

```
ai-girlfriend/
├── launch-app.bat      ← Double-click this!
├── start-app.ps1       ← PowerShell version
├── package.json        ← Dependencies & scripts
├── public/
│   └── index.html      ← HTML template
└── src/
    ├── App.js          ← Main component
    ├── index.js        ← Entry point
    ├── components/     ← UI components
    │   ├── CharacterCard.js
    │   ├── CharacterCarousel.js
    │   ├── ChatWindow.js
    │   └── MessageInput.js
    ├── context/        ← State management
    ├── hooks/          ← Custom hooks
    ├── pages/          ← Page components
    ├── styles/         ← CSS/styling
    └── utils/          ← Helper functions
```

---

## 🛠️ Development Commands

| Command | Purpose |
|---------|---------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run unit tests |
| `npm install` | Install dependencies |

---

## ✅ Success Indicators

When the app starts successfully, you'll see:
```
Compiled successfully!
You can now view ai-girlfriend in the browser.
  Local: http://localhost:3000
```

Then Chrome opens automatically at **http://localhost:3000**

---

## 🎉 You're Ready!

The AI Girlfriend web app is now built and ready to use!
- Double-click `launch-app.bat` to start
- Or use any of the manual methods above
- Start chatting with your AI girlfriend!

**Need help?** Check DOCUMENTATION.md for detailed information.
