/**
 * @fileOverview Electron preload script.
 * This script runs in a privileged environment before the renderer process is loaded.
 * It uses `contextBridge` to securely expose specific APIs from the main process
 * to the renderer process.
 */

import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import type { IPCChannel, IPCMessagePayload } from './ipc'; // Assuming IPC types are defined

// Whitelisted channels for IPC communication
const validSendChannels: IPCChannel[] = ['example-request-data', 'open-external-link'];
const validReceiveChannels: IPCChannel[] = ['example-data-response', 'main-process-message'];

contextBridge.exposeInMainWorld('electronAPI', {
  // Send messages from renderer to main
  send: (channel: IPCChannel, data: IPCMessagePayload) => {
    if (validSendChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    } else {
      console.warn(`Blocked attempt to send to invalid IPC channel: ${channel}`);
    }
  },
  // Receive messages from main to renderer (one-way)
  on: (channel: IPCChannel, func: (...args: any[]) => void) => {
    if (validReceiveChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      const subscription = (_event: IpcRendererEvent, ...args: any[]) => func(...args);
      ipcRenderer.on(channel, subscription);
      // Return a cleanup function
      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    } else {
      console.warn(`Blocked attempt to listen on invalid IPC channel: ${channel}`);
      return () => {}; // Return a no-op cleanup function
    }
  },
  // Invoke messages (renderer to main and back with a response)
  invoke: async (channel: IPCChannel, data: IPCMessagePayload): Promise<any> => {
    if (validSendChannels.includes(channel)) { // Often invoke uses same send channels
      return ipcRenderer.invoke(channel, data);
    } else {
      console.warn(`Blocked attempt to invoke invalid IPC channel: ${channel}`);
      return Promise.reject(new Error(`Invalid IPC channel: ${channel}`));
    }
  },
  // Example: Expose a specific utility
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),

  // Example: Expose a function to open external links safely
  openExternal: (url: string) => {
    // Basic validation, more robust validation might be needed
    if (url && (url.startsWith('http:') || url.startsWith('https:') || url.startsWith('mailto:'))) {
      ipcRenderer.send('open-external-link', url);
    } else {
      console.warn(`Blocked attempt to open invalid external URL: ${url}`);
    }
  }
});

// Optional: Log that preload script has loaded
console.log('Electron Preload Script Loaded.');

// It's good practice to clean up listeners when the window is unloaded,
// though ipcRenderer listeners are often managed per-component in React/Vue.
// window.addEventListener('unload', () => {
//   // ipcRenderer.removeAllListeners(); // Use with caution, might remove other listeners
// });
