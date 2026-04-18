# How to Start the AI Girlfriend Web App

## Quick Start - Windows

### Method 1: PowerShell (Recommended)
Run the PowerShell script:
```powershell
.\start-app.ps1
```

### Method 2: Batch File
Double-click `start-app.bat` or run from Command Prompt:
```cmd
start-app.bat
```

### Method 3: Manual
```cmd
cd C:\Users\tunap\Desktop\AI Girlfriend
src\npm start
```

Then open Chrome: http://localhost:3000

## Troubleshooting Batch File Issues

### If batch file doesn't work:

1. **Run as Administrator**
   - Right-click start-app.bat
   - Select "Run as administrator"

2. **Check Node.js installation**
   ```cmd
   node --version
   npm --version
   ```

3. **Alternative manual start**:
   ```cmd
   cd src
   npm start
   ```
   Then open Chrome manually to http://localhost:3000

### Common Issues:

**Chrome doesn't open automatically:**
- Manually open: http://localhost:3000

**Port 3000 already in use:**
```cmd
cd src
npm start -- --port 3001
```

**Need to reinstall dependencies:**
```cmd
rmdir /s /q node_modules
del package-lock.json
npm install
```

## PowerShell Script Features

The `start-app.ps1` script provides:
- Better error messages with colors
- Automatic dependency checking
- Clear status updates
- Graceful error handling

## Development Server

Once started, the server runs at:
- **URL**: http://localhost:3000
- **Hot Reload**: Enabled (changes reflect automatically)
- **API**: React Scripts development server

## Verification

After starting, you should see:
```
Compiled successfully!
You can now view ai-girlfriend in the browser.
  Local: http://localhost:3000
```
