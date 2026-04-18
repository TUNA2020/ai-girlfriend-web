# AI Girlfriend Web App - PowerShell Launch Script
# This script starts the development server and opens Chrome

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "   AI Girlfriend Web App - Starting..." -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "[1/4] Checking Node.js..." -NoNewline
$nodeVersion = node --version
if ($?) {
    Write-Host " $nodeVersion" -ForegroundColor Green
} else {
    Write-Host " Node.js not found!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org"
    Write-Host "Press any key to exit..."
    [void]$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

# Check npm
Write-Host "[2/4] Checking npm..." -NoNewline
$npmVersion = npm --version
if ($?) {
    Write-Host " $npmVersion" -ForegroundColor Green
} else {
    Write-Host " npm not found!" -ForegroundColor Red
    Write-Host "Press any key to exit..."
    [void]$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

# Check/Install dependencies
if (-not (Test-Path "node_modules")) {
    Write-Host "[3/4] Installing dependencies..." -ForegroundColor Yellow
    npm install
    if (-not $?) {
        Write-Host "[ERROR] npm install failed" -ForegroundColor Red
        Write-Host "Press any key to exit..."
        [void]$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        exit 1
    }
} else {
    Write-Host "[3/4] Dependencies already installed" -ForegroundColor Green
}
Write-Host ""

# Start server
$srcPath = "C:\Users\tunap\Desktop\AI Girlfriend\src"
Write-Host "[4/4] Starting development server..." -ForegroundColor Green
Write-Host ""

# Start npm and redirect output
Start-Process cmd -ArgumentList "/c", "cd /c/Users/tunap/Desktop/AI Girlfriend/src && npm start" -NoNewWindow

# Wait for server to start
Start-Sleep -Seconds 6

# Open Chrome
Write-Host "Opening Chrome..."
try {
    Start-Process "chrome" "http://localhost:3000"
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host "   ✓ SUCCESS! Application is running" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "URL: http://localhost:3000" -ForegroundColor Green
    Write-Host ""
    Write-Host "To stop: Close the server window or press Ctrl+C" -ForegroundColor Gray
    Write-Host ""
    
    # Keep window open
    Write-Host "Press any key to exit..." -ForegroundColor Gray
    [void]$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
} catch {
    Write-Host "Chrome not found. Please open http://localhost:3000 manually" -ForegroundColor Yellow
}
