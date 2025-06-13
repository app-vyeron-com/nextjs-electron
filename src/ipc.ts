/**
 * @fileOverview IPC (Inter-Process Communication) channel definitions and handlers.
 * Centralizes IPC logic for type safety and clarity.
 */

import { ipcMain, IpcMainEvent, IpcMainInvokeEvent, shell } from 'electron';
import type { MergedElectronConfig } from './config'; // For accessing config if needed

// Define IPC channel names as constants for better maintainability and type safety
export type IPCChannel =
  | 'example-request-data'
  | 'example-data-response' // Main to Renderer
  | 'main-process-message'  // Main to Renderer
  | 'get-app-version'
  | 'open-external-link'
  | 'perform-background-task'
  | 'background-task-status'; // Main to Renderer

// Define a generic payload type or specific types per channel
export interface IPCMessagePayload {
  [key: string]: any;
}

interface IPCHandlerContext {
  config: MergedElectronConfig;
  // Add other context like mainWindow if needed by handlers
}

/**
 * Initializes IPC handlers in the main process.
 * Should be called after the app is ready and config is loaded.
 */
export function initializeIPCHandlers(context: IPCHandlerContext): void {
  const { config } = context;

  // Handle 'example-request-data' from renderer
  ipcMain.on('example-request-data', (event: IpcMainEvent, args: IPCMessagePayload) => {
    console.log('Main process received [example-request-data]:', args);
    // Process data and send a response
    event.sender.send('example-data-response', {
      message: 'Data received successfully by main process',
      originalData: args,
      timestamp: new Date().toISOString(),
    });
  });

  // Handle 'get-app-version' (invoke/handle pattern)
  ipcMain.handle('get-app-version', async (_event: IpcMainInvokeEvent) => {
    return config.productName ? `${config.productName} v${app.getVersion()}` : app.getVersion();
  });

  // Handle 'open-external-link'
  ipcMain.on('open-external-link', (_event: IpcMainEvent, url: string) => {
    if (url && (url.startsWith('http:') || url.startsWith('https:') || url.startsWith('mailto:'))) {
      shell.openExternal(url);
    } else {
      console.warn(`Blocked attempt to open invalid external URL via IPC: ${url}`);
    }
  });
  
  // Example of a longer background task
  ipcMain.handle('perform-background-task', async (event: IpcMainInvokeEvent, params: { duration: number }) => {
    event.sender.send('background-task-status', { status: 'started', message: `Task started for ${params.duration}ms.` });
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = { success: true, data: `Task completed after ${params.duration}ms.` };
        event.sender.send('background-task-status', { status: 'completed', result });
        resolve(result);
      }, params.duration || 2000);
    });
  });

  console.log('IPC Handlers Initialized.');
}

/**
 * Sends a message from the main process to all renderer windows (or a specific one).
 * @param window - The BrowserWindow to send the message to. If null, sends to all windows (not implemented here).
 * @param channel - The IPC channel to use.
 * @param payload - The data to send.
 */
export function sendMessageToRenderer(
  window: Electron.BrowserWindow | null,
  channel: IPCChannel,
  payload: IPCMessagePayload
): void {
  if (!window || window.isDestroyed()) {
    console.warn(`Attempted to send IPC message to a destroyed window on channel: ${channel}`);
    return;
  }
  // Ensure channel is whitelisted for receiving in preload.ts
  // This check is implicitly handled by preload, but good to be aware.
  window.webContents.send(channel, payload);
}
