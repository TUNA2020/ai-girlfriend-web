@echo off
REM Quick start - just run npm start and open Chrome
cd /c/Users/tunap/Desktop/AI Girlfriend/src
start "AI Girlfriend" cmd /k "npm start"
timeout 6 >/dev/null
start chrome "http://localhost:3000"
