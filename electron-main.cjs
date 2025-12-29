// electron-main.cjs (CommonJS)
const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

// In dev mode, enable automatic reload of the main process when files change.
if (process.env.ELECTRON_DEV) {
  try {
    require('electron-reload')(__dirname, {
      electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
      awaitWriteFinish: true,
    });
  } catch (e) {
    // If electron-reload isn't installed, don't block — dev script should still work.
    // This is just a nicety for developer convenience.
    // eslint-disable-next-line no-console
    console.warn('electron-reload not available, skipping main-process auto-reload', e && e.message);
  }
}

function createWindow() {
  // Resolve an appropriate icon for the window / dock.
  // Try several common locations so this works both in dev and when packaged.
  const resolveIcon = () => {
    const candidates = [
      path.join(__dirname, 'public', 'icons', 'icon.png'),
      path.join(__dirname, 'public', 'icons', 'icon.icns'),
      // When packaged with electron-builder these files may live under resources
      path.join(process.resourcesPath || '', 'public', 'icons', 'icon.icns'),
      path.join(process.resourcesPath || '', 'app', 'public', 'icons', 'icon.icns'),
      path.join(process.resourcesPath || '', 'icons', 'icon.icns'),
    ];

    for (const c of candidates) {
      try {
        if (c && fs.existsSync(c)) return c;
      } catch (e) {
        // ignore
      }
    }
    return null;
  };

  const iconPath = resolveIcon();

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: iconPath || undefined,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Load the built Vite app from the dist folder
  // If we're in development, load the Vite dev server URL for live reload.
  // The `electron:dev` script sets ELECTRON_DEV=1 before launching Electron.
  if (process.env.ELECTRON_DEV) {
    const devUrl = 'http://localhost:8080';
    win.loadURL(devUrl);
  } else {
    win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }

  // Optional: open DevTools
  // Open DevTools when DEBUG_ELECTRON is set (helpful for diagnosing packaged builds)
  if (process.env.DEBUG_ELECTRON) {
    win.webContents.once('dom-ready', () => {
      try {
        win.webContents.openDevTools({ mode: 'right' });
      } catch (e) {
        // ignore
      }
    });
  }
}

app.whenReady().then(() => {
  // If we found an icon, set it as the Dock icon on macOS so it appears correctly
  // in the menu bar / Dock. This is a best-effort attempt and will silently
  // continue if the platform does not support it.
  try {
    const iconCandidates = [
      path.join(__dirname, 'public', 'icons', 'icon.icns'),
      path.join(process.resourcesPath || '', 'public', 'icons', 'icon.icns'),
      path.join(process.resourcesPath || '', 'app', 'public', 'icons', 'icon.icns'),
      path.join(process.resourcesPath || '', 'icons', 'icon.icns'),
    ];
    for (const p of iconCandidates) {
      if (p && fs.existsSync(p)) {
        if (process.platform === 'darwin' && app.dock && typeof app.dock.setIcon === 'function') {
          try { app.dock.setIcon(p); } catch (e) { /* ignore */ }
        }
        break;
      }
    }
  } catch (e) {
    // ignore any errors while trying to set icons
  }

  createWindow();

  app.on('activate', () => {
    // Re-create window on macOS when dock icon is clicked and no windows open
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  // On macOS, apps usually stay running until Cmd+Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
