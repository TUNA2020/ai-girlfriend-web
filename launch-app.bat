@echo off
REM AI Girlfriend Web App - Launch Script
REM This script starts the development server and opens Chrome

setlocal EnableDelayedExpansion

echo ============================================================
echo        AI Girlfriend Web App - Starting...
echo ============================================================
echo.

REM Step 1: Check Node.js
node --version >/dev/null 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not found! Please install Node.js.
    pause
    exit /b 1
)
for /f "tokens=*" %%a in ('node --version') do set NODE_VER=%%a
echo [1/4] Node.js ^!NODE_VER! - OK
echo.

REM Step 2: Check npm
npm --version >/dev/null 2>&1
if errorlevel 1 (
    echo [ERROR] npm not found!
    pause
    exit /b 1
)
for /f "tokens=*" %%a in ('npm --version') do set NPM_VER=%%a
echo [2/4] npm ^!NPM_VER! - OK
echo.

REM Step 3: Check/Install dependencies
if not exist "node_modules" (
    echo [3/4] Installing dependencies...
    npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
) else (
    echo [3/4] Dependencies already installed - OK
)
echo.

REM Step 4: Start server
cd /c/Users/tunap/Desktop/AI Girlfriend/src

echo [4/4] Starting development server...
start "Server" cmd /k "npm start"

REM Wait for server to start
timeout /t 6 /nobreak >/dev/null

REM Open Chrome
start "" chrome "http://localhost:3000"

echo.
echo ============================================================
echo        ✓ SUCCESS! Application is running
echo ============================================================
echo.
echo  URL: http://localhost:3000
echo.
echo  To stop: Close the Server window or press Ctrl+C
timeout /t 300
