@echo off
REM AI Girlfriend Web App - Fixed Start Script
REM This batch file starts the development server and opens Chrome

setlocal enabledelayedexpansion

echo Starting AI Girlfriend Web App...
echo.

REM Check if Node.js is available
node --version >/dev/null 2>&1
if errorlevel 1 (
    echo Error: Node.js is not installed or not in PATH
    pause
    exit /b 1
)

REM Check if npm is available  
npm --version >/dev/null 2>&1
if errorlevel 1 (
    echo Error: npm is not installed or not in PATH
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if errorlevel 1 (
        echo Error: Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Start the server in the src directory
pushd "C:\Users\tunap\Desktop\AI Girlfriend\src"

REM Start npm and capture the output
for /f "tokens=2 delims=:" %%a in ('npm start 2^>^&1 ^| findstr /r "^[^ ]*:"') do set "PORT=%%a"

REM Wait for server to be ready
timeout /t 5 /nobreak >/dev/null

REM Open Chrome browser
start "" chrome "http://localhost:3000"

popd

echo.
echo AI Girlfriend Web App is now running!
echo Server: http://localhost:3000
echo.
echo Press Ctrl+C in the command prompt windows to stop the server.

REM Keep the window open
cmd /k
