@echo off
REM AI Girlfriend Web App - Debug Launch Script
REM This version keeps the window open for debugging

setlocal EnableDelayedExpansion

echo ============================================================
echo        AI Girlfriend Web App - Debug Mode
echo ============================================================
echo.

REM Check Node.js
node --version
if errorlevel 1 (
    echo [ERROR] Node.js not found!
    pause
    exit /b 1
)

REM Check npm
npm --version
if errorlevel 1 (
    echo [ERROR] npm not found!
    pause
    exit /b 1
)

REM Install if needed
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if errorlevel 1 (
        echo [ERROR] npm install failed
        pause
        exit /b 1
    )
)

REM Start server
cd /c/Users/tunap/Desktop/AI Girlfriend/src

echo.
echo Starting server... (Ctrl+C to stop)
echo.

REM Start npm and keep window open
npm start

REM After npm exits, still keep window open for error messages
echo.
echo Press any key to close...
pause >/dev/null
