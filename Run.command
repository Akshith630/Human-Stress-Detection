#!/bin/bash

# Prevent multiple simultaneous executions using a more robust method
LOCK_FILE="/tmp/stress-detect-run.lock"
LOCK_PID_FILE="/tmp/stress-detect-run.pid"

# Function to check and handle locks
check_lock() {
    if [ -f "$LOCK_FILE" ] && [ -f "$LOCK_PID_FILE" ]; then
        LOCK_PID=$(cat "$LOCK_PID_FILE" 2>/dev/null)
        if [ -n "$LOCK_PID" ] && ps -p "$LOCK_PID" > /dev/null 2>&1; then
            # Script is already running - close this terminal window immediately
            osascript -e 'tell application "Terminal" to close front window' 2>/dev/null &
            exit 0
        else
            # Stale lock, remove it
            rm -f "$LOCK_FILE" "$LOCK_PID_FILE"
        fi
    fi
}

# Check lock before proceeding
check_lock

# Create lock files
touch "$LOCK_FILE"
echo $$ > "$LOCK_PID_FILE"
trap "rm -f '$LOCK_FILE' '$LOCK_PID_FILE'" EXIT INT TERM

# Go to your project folder
cd "$(dirname "$0")" || exit 1

# Function to open app (ensures only one instance)
open_app() {
    local app_path="$1"
    local app_name="Stress Detect Companion"
    
    # Check if app is already running
    if pgrep -f "$app_name" > /dev/null; then
        # Bring existing app to front
        osascript -e "tell application \"$app_name\" to activate" 2>/dev/null || true
    else
        # Open the app (only one instance)
        open "$app_path" 2>/dev/null
    fi
    
    # Always close terminal window after opening app
    sleep 0.3
    osascript -e 'tell application "Terminal" to close front window' 2>/dev/null || true
    exit 0
}

# Check if Electron app exists in release folder
if [ -d "release/mac-arm64/Stress Detect Companion.app" ]; then
    open_app "release/mac-arm64/Stress Detect Companion.app"
elif [ -d "/Applications/Stress Detect Companion.app" ]; then
    open_app "/Applications/Stress Detect Companion.app"
else
    echo "Built app not found. Starting development server..."
    echo "To build the app, run: npm run electron:package"
    # Run in current terminal without opening new windows
    npm run electron:dev
fi