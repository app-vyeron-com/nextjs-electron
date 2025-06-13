'use strict';
"use strict";

// src/preload.ts
var import_electron = require("electron");
var validSendChannels = ["example-request-data", "open-external-link"];
var validReceiveChannels = ["example-data-response", "main-process-message"];
import_electron.contextBridge.exposeInMainWorld("electronAPI", {
  // Send messages from renderer to main
  send: (channel, data) => {
    if (validSendChannels.includes(channel)) {
      import_electron.ipcRenderer.send(channel, data);
    } else {
      console.warn(`Blocked attempt to send to invalid IPC channel: ${channel}`);
    }
  },
  // Receive messages from main to renderer (one-way)
  on: (channel, func) => {
    if (validReceiveChannels.includes(channel)) {
      const subscription = (_event, ...args) => func(...args);
      import_electron.ipcRenderer.on(channel, subscription);
      return () => {
        import_electron.ipcRenderer.removeListener(channel, subscription);
      };
    } else {
      console.warn(`Blocked attempt to listen on invalid IPC channel: ${channel}`);
      return () => {
      };
    }
  },
  // Invoke messages (renderer to main and back with a response)
  invoke: async (channel, data) => {
    if (validSendChannels.includes(channel)) {
      return import_electron.ipcRenderer.invoke(channel, data);
    } else {
      console.warn(`Blocked attempt to invoke invalid IPC channel: ${channel}`);
      return Promise.reject(new Error(`Invalid IPC channel: ${channel}`));
    }
  },
  // Example: Expose a specific utility
  getAppVersion: () => import_electron.ipcRenderer.invoke("get-app-version"),
  // Example: Expose a function to open external links safely
  openExternal: (url) => {
    if (url && (url.startsWith("http:") || url.startsWith("https:") || url.startsWith("mailto:"))) {
      import_electron.ipcRenderer.send("open-external-link", url);
    } else {
      console.warn(`Blocked attempt to open invalid external URL: ${url}`);
    }
  }
});
console.log("Electron Preload Script Loaded.");
//# sourceMappingURL=preload.js.map