/**
 * @fileOverview Manages Electron app lifecycle events and window creation.
 * This was previously part of main.ts or index.ts, refactored for clarity.
 */
import { app, BrowserWindow, shell, session, Menu, dialog } from 'electron';
import path from 'path';
import type { MergedElectronConfig } from './config';
import { initializeIPCHandlers } from './ipc';
import { initializeUpdater } from './updater';
import log from './utils/logger'; // Use the configured logger

let mainWindowInstance: BrowserWindow | null = null;

function createMainWindow(config: MergedElectronConfig): BrowserWindow {
  const windowOptions = { ...config.windowOptions }; // Copy to avoid mutating original config

  // Ensure webPreferences and preload script path are correctly set
  windowOptions.webPreferences = {
    ...windowOptions.webPreferences,
    preload: path.join(__dirname, 'preload.js'), // Always use the library's preload
    contextIsolation: !config.security.disableContextIsolation,
    nodeIntegration: config.security.enableNodeIntegrationInRenderers,
    sandbox: windowOptions.webPreferences?.sandbox !== undefined ? windowOptions.webPreferences.sandbox : true, // Default to true if not specified by user
  };

  const win = new BrowserWindow(windowOptions);
  mainWindowInstance = win;

  // Load the app URL (Next.js export)
  if (config.appUrl) {
    win.loadURL(config.appUrl).catch(err => {
      log.error(`Failed to load URL ${config.appUrl}:`, err);
      dialog.showErrorBox('Load Error', `Failed to load the application content from ${config.appUrl}. Please check the path and ensure your Next.js app is exported correctly to the 'out' directory.`);
    });
  } else {
    log.error('appUrl is not defined in the configuration. Cannot load application content.');
    dialog.showErrorBox('Configuration Error', 'Application URL is not configured. Unable to load content.');
  }

  // Open DevTools if configured
  if (config.openDevTools ?? (!app.isPackaged)) {
    win.webContents.openDevTools();
  }

  // Security: Intercept new window requests
  win.webContents.setWindowOpenHandler(({ url }) => {
    // Example: Allow specific URLs or deny all
    // For instance, only allow http/https links to open in external browser
    if (url.startsWith('http:') || url.startsWith('https:')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    // Potentially allow specific internal routes if your app uses them for new windows
    // if (url.startsWith('app://')) { return { action: 'allow' }; }
    log.warn(`Blocked new window for URL: ${url}`);
    return { action: 'deny' };
  });

  // Apply Content Security Policy
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [config.security.csp || "default-src 'self'"],
      },
    });
  });
  
  win.on('closed', () => {
    mainWindowInstance = null;
  });

  return win;
}

function setupMenu(config: MergedElectronConfig) {
  const template: (Electron.MenuItemConstructorOptions | Electron.MenuItem)[] = [
    ...(process.platform === 'darwin' ? [{
      label: config.productName || app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] as Electron.MenuItemConstructorOptions[] : []),
    {
      label: 'File',
      submenu: [
        process.platform === 'darwin' ? { role: 'close' } : { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(process.platform === 'darwin' ? [
          { role: 'pasteAndMatchStyle' },
          { role: 'delete' },
          { role: 'selectAll' },
          { type: 'separator' },
          {
            label: 'Speech',
            submenu: [
              { role: 'startSpeaking' },
              { role: 'stopSpeaking' }
            ]
          }
        ] : [
          { role: 'delete' },
          { type: 'separator' },
          { role: 'selectAll' }
        ]) as Electron.MenuItemConstructorOptions[]
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        ...(process.platform === 'darwin' ? [
          { type: 'separator' },
          { role: 'front' },
          { type: 'separator' },
          { role: 'window' }
        ] : [
          { role: 'close' }
        ]) as Electron.MenuItemConstructorOptions[]
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: async () => {
            await shell.openExternal('https://electronjs.org')
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}


/**
 * Sets up the primary application lifecycle events and creates the main window.
 * This function is typically called when Electron's 'ready' event fires.
 * @param config - The merged and validated application configuration.
 * @returns The main BrowserWindow instance.
 */
export async function setupAppLifecycle(config: MergedElectronConfig): Promise<BrowserWindow> {
  log.info(`Setting up app lifecycle for: ${config.productName}`);
  log.debug('Using configuration:', config);
  
  if (mainWindowInstance && !mainWindowInstance.isDestroyed()) {
    log.warn('Main window already exists. Focusing existing window.');
    mainWindowInstance.focus();
    return mainWindowInstance;
  }

  // Initialize IPC Handlers
  initializeIPCHandlers({ config });

  // Create the browser window.
  const mainWindow = createMainWindow(config);
  
  // Setup application menu
  setupMenu(config);

  // Initialize auto-updater if configured
  if (config.updater) {
    initializeUpdater(mainWindow, config.updater, config.logLevel === 'debug');
  }
  
  // Optional: Set user data path if specified
  if (config.userDataPath) {
      try {
          const resolvedPath = path.resolve(config.userDataPath);
          log.info(`Setting user data path to: ${resolvedPath}`);
          app.setPath('userData', resolvedPath);
      } catch (error) {
          log.error(`Failed to set custom user data path '${config.userDataPath}':`, error);
      }
  }


  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      log.info('App activated with no windows open, creating new main window.');
      createMainWindow(config);
    } else if (mainWindowInstance && !mainWindowInstance.isDestroyed()) {
      log.info('App activated, showing existing main window.');
      mainWindowInstance.show();
    }
  });
  
  log.info('App lifecycle setup complete.');
  return mainWindow;
}

export function getMainWindowInstance(): BrowserWindow | null {
    return mainWindowInstance;
}
