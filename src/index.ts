/**
 * @fileOverview Main entry point for the nextjs-electron library.
 * This file exports the primary functions and types for users of the library.
 *
 * - launchApp: Function to initialize and launch the Electron application.
 * - ElectronConfig: Type definition for the configuration object.
 */

import { app, BrowserWindow } from 'electron';
import path from 'path';
import { configureApp, type ElectronConfig, type MergedElectronConfig, getDefaultConfig } from './config';
import { setupAppLifecycle } from './app-lifecycle'; // Corrected import path
import { enableWebGPU } from './webgpu';
import { initializeLogger } from './utils/logger';

export type { ElectronConfig, WindowOptions, SecurityConfig, WebGPUConfig } from './config';

let mainWindow: BrowserWindow | null = null;

/**
 * Launches the Electron application with the given user configuration.
 * Merges user config with defaults and starts the Electron app lifecycle.
 *
 * @param userConfig - Optional configuration object for the Electron application.
 */
export async function launchApp(userConfig?: Partial<ElectronConfig>): Promise<void> {
  const config = configureApp(userConfig);
  initializeLogger(config.logLevel);

  if (config.enableWebGPU) {
    enableWebGPU(app, config.webgpu);
  }

  // Ensure single instance
  const gotTheLock = app.requestSingleInstanceLock({
    productName: config.productName,
  });

  if (!gotTheLock) {
    app.quit();
    return;
  }

  app.on('second-instance', (_event, commandLine, _workingDirectory, additionalData) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
    // You can handle commandLine and additionalData here
    console.log('Second instance started with:', commandLine, additionalData);
  });
  
  // Set AppUserModelID for Windows
  if (process.platform === 'win32' && config.appId) {
      app.setAppUserModelId(config.appId);
  }

  // Defer app ready handling to setupAppLifecycle
  // This function should only be called once.
  if (app.isReady()) {
    console.warn("launchApp called after app.isReady(). This might lead to unexpected behavior if Electron's main entry point is not this library's main.js.");
    // If app is already ready, directly proceed. This path is less common for library usage.
    mainWindow = await setupAppLifecycle(config);
  } else {
    app.on('ready', async () => {
      mainWindow = await setupAppLifecycle(config);
    });
  }

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      if (app.isReady()) { // Ensure app is ready before creating a window on activate
        mainWindow = await setupAppLifecycle(config); // Re-setup or create new window
      }
    } else if (mainWindow) {
        mainWindow.show();
    }
  });

  // Graceful shutdown
  process.on('SIGINT', () => app.quit());
  process.on('SIGTERM', () => app.quit());

  // Uncaught exception handling
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    // Optionally: log to file, report to service, then exit
    app.quit();
  });
}

// Re-export config related items if needed by consumers for type safety or extension
export { getDefaultConfig, configureApp };
export function getMainWindow(): BrowserWindow | null {
  return mainWindow;
}
