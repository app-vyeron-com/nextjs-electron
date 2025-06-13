/**
 * @fileOverview Core Electron main process setup and lifecycle management.
 * This file is intended to be the main entry point for Electron.
 * It should be referenced in your project's package.json "main" field if you are using electron-builder,
 * or run directly with "electron ."
 *
 * It now directly calls launchApp from index.ts.
 * The user of the library would typically have their own electron-main.js
 * that imports and calls launchApp from 'nextjs-electron'.
 *
 * This file serves as an example or a direct entry point if the library
 * is packaged as a self-contained Electron app (e.g., for a template).
 */
'use strict'; // Ensure 'use strict' for CJS compatibility if this file is ever run directly in CJS context

import { app } from 'electron';
import path from 'path';
import { launchApp, getDefaultConfig } from './index'; // Import from library's public API
import type { ElectronConfig } from './config';

// This file acts as the "executable" part of the library if someone were to run `electron path/to/nextjs-electron/dist/main.js`
// Or if electron-builder is configured to use this as its main entry.

async function startApplication() {
  // Determine the path to the Next.js '/out' directory.
  // This needs to be robust, whether running from node_modules or locally.
  // For a library, the user should ideally provide this path.
  // Defaulting for standalone library testing: assumes 'out' dir is sibling to 'nextjs-electron' dir.
  // A real app using this library would pass a configured 'appUrl'.
  let defaultAppUrl = '';
  try {
    // Path when `nextjs-electron` is a direct dependency and run via `electron node_modules/nextjs-electron/dist/main.js`
    // from project root. Project root has `out` folder.
    // __dirname would be node_modules/nextjs-electron/dist
    const projectRootGuess = path.join(__dirname, '..', '..', '..'); // up from dist, up from src/node_modules, up from nextjs-electron
    defaultAppUrl = `file://${path.join(projectRootGuess, 'out', 'index.html')}`;

    // A more direct way if `electron .` is run from the project root where `out` exists:
    // defaultAppUrl = `file://${path.join(process.cwd(), 'out', 'index.html')}`;
    // However, process.cwd() can be tricky with packaged apps.
    
    // For testing the library itself, you might place a sample 'out' directory:
    // defaultAppUrl = `file://${path.join(__dirname, '..', '..', 'sample-out', 'index.html')}`;

  } catch (e) {
    console.error("Could not determine default app URL for development/testing. Please provide appUrl in config.", e);
  }

  const defaultConfigFromLibrary = getDefaultConfig();
  const appConfig: Partial<ElectronConfig> = {
    // Override defaults if necessary for this direct execution context
    appUrl: defaultConfigFromLibrary.appUrl || defaultAppUrl, // Use library default if set, else calculated
    productName: 'Next.js Electron (Dev)', // Placeholder
    appId: 'com.example.nextjselectron.dev', // Placeholder
    // User configuration would override these if launchApp is called by user code
  };

  // If this main.ts is the entry point, call launchApp.
  // This allows the library to be tested or used as a standalone app template.
  await launchApp(appConfig);
}

// Handle app ready event if this file is the direct Electron entry point.
// If launchApp is imported and called by user code, its internal app.on('ready') will handle it.
if (!app.isReady()) {
  app.on('ready', startApplication);
} else {
  // If app is already ready (e.g. hot reload or other scenarios)
  startApplication();
}

// This structure ensures that if a user's project sets its main Electron entry
// to this file (e.g., node_modules/nextjs-electron/dist/main.js), it will work.
// However, the recommended way is for users to create their own electron-main.js
// and import `launchApp` from the library.
