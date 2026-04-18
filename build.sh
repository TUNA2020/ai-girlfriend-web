#!/bin/bash
set -e

echo "Building AI Girlfriend Web App..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Build the application
echo "Building production bundle..."
npm run build

echo "Build complete!"
echo "Open public/index.html in a browser to run the app"
