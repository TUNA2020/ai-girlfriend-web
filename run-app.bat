@echo off
REM AI Girlfriend Web App - Run Script
REM Launches the app and opens Chrome automatically

echo ================================================
echo    AI Girlfriend Web App Launcher
echo ================================================
echo.

REM Check prerequisites
echo Checking prerequisites...
node --version || goto error
npm --version || goto error
echo.

REM Install if needed
if not exist "node_modules" (
    echo Installing dependencies...
    npm install || goto error
)

REM Start the app
cd src
start "AI Girlfriend" cmd /k "npm start"

REM Wait and open browser
timeout 6 >/dev/null
start "" chrome "http://localhost:3000"

echo App started! Visit http://localhost:3000
goto end

:error
echo Error: Please ensure Node.js is installed
goto end

:end
