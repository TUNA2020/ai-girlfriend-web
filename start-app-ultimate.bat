@echo off
REM AI Girlfriend Web App - Ultimate Start Script
REM Handles all common issues and provides clear feedback

setlocal enabledelayedexpansion

TITLE AI Girlfriend Web App

REM Colors for output
set "COLOR_GREEN=0a"
set "COLOR_YELLOW=0e"
set "COLOR_RED=0c"
set "COLOR_BLUE=01"

define PRINT_COLOR
    echo(%2
    mode con: cols=80 lines=25
    color %1
    echo %~
    color 07
)

echo.
echo ============================================================
echo        AI Girlfriend Web App - Starting...
echo ============================================================
echo.

REM === CHECK NODE.JS ===
echo [1/5] Checking Node.js installation...
node --version >/dev/null 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not found!
    echo [INFO] Please install Node.js from https://nodejs.org
    echo [INFO] Download and run the installer
    pause
    exit /b 1
)
for /f "tokens=*" %%a in ('node --version') do set "NODE_VERSION=%%a"
echo [OK] Node.js !NODE_VERSION!

REM === CHECK NPM ===
echo [2/5] Checking npm...
npm --version >/dev/null 2>&1
if errorlevel 1 (
    echo [ERROR] npm not found!
    pause
    exit /b 1
)
for /f "tokens=*" %%a in ('npm --version') do set "NPM_VERSION=%%a"
echo [OK] npm !NPM_VERSION!

REM === CHECK DIRECTORY ===
echo [3/5] Checking project structure...
if not exist "src" (
    echo [ERROR] src directory not found!
    pause
    exit /b 1
)
if not exist "package.json" (
    echo [ERROR] package.json not found!
    pause
    exit /b 1
)
echo [OK] Project structure valid

REM === INSTALL DEPENDENCIES ===
echo [4/5] Checking dependencies...
if not exist "node_modules" (
    echo [INFO] Installing dependencies (first time setup)...
    npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies!
        echo [INFO] Try running: npm install --force
        pause
        exit /b 1
    )
) else (
    echo [OK] Dependencies already installed
)

REM === START SERVER ===
echo [5/5] Starting development server...
echo.

REM Navigate to src directory and start
cd /c/Users/tunap/Desktop/AI Girlfriend/src

REM Start server with error handling
npm start > "C:\Users\tunap\Desktop\AI Girlfriend\server.log" 2>&1

if errorlevel 1 (
    echo [ERROR] Failed to start server!
    type "C:\Users\tunap\Desktop\AI Girlfriend\server.log"
    pause
    exit /b 1
)

REM Wait for server to be ready
ping 127.0.0.1 -n 7 >/dev/null

REM Check if server is running
findstr /C:"Compiled successfully" "C:\Users\tunap\Desktop\AI Girlfriend\server.log" >/dev/null
if errorlevel 1 (
    echo [WARNING] Server may not have started correctly
    echo [INFO] Check server.log for details
)

REM Open Chrome
echo.
echo Opening Chrome browser...
start "" chrome "http://localhost:3000"

REM Display success message
echo.
echo ============================================================
echo        ✓ SUCCESS! AI Girlfriend is running!
echo ============================================================
echo.
echo  Server URL: http://localhost:3000
echo "  Status: Running"
echo.
echo  How to stop: Press Ctrl+C in this window or close the server window
echo.
echo  Server log: C:\Users\tunap\Desktop\AI Girlfriend\server.log
timeout /t 300

REM Cleanup
if exist "server.log" del "server.log"
