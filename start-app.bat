@echo off
REM AI Girlfriend Web App - Start Script
REM This batch file starts the development server and opens Chrome

echo Starting AI Girlfriend Web App...
echo.

REM Check if Node.js is available
node --version >/dev/null 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    pause
    exit /b 1
)

REM Check if npm is available
npm --version >/dev/null 2>&1
if %errorlevel% neq 0 (
    echo Error: npm is not installed or not in PATH
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo Error: Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Change to src directory and start the server
cd /c/Users/tunap/Desktop/AI Girlfriend/src
start "AI Girlfriend" cmd /k "npm start"

REM Wait for server to start
timeout /t 5 /nobreak >/dev/null

REM Open Chrome browser
start chrome "http://localhost:3000"

echo.
echo AI Girlfriend Web App is now running!
echo Server: http://localhost:3000
echo.
echo Press Ctrl+C in the command prompt windows to stop the server.
