'use strict';
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/preload.ts
import { contextBridge, ipcRenderer } from "electron";
var require_preload = __commonJS({
  "src/preload.ts"() {
    var validSendChannels = ["example-request-data", "open-external-link"];
    var validReceiveChannels = ["example-data-response", "main-process-message"];
    contextBridge.exposeInMainWorld("electronAPI", {
      // Send messages from renderer to main
      send: (channel, data) => {
        if (validSendChannels.includes(channel)) {
          ipcRenderer.send(channel, data);
        } else {
          console.warn(`Blocked attempt to send to invalid IPC channel: ${channel}`);
        }
      },
      // Receive messages from main to renderer (one-way)
      on: (channel, func) => {
        if (validReceiveChannels.includes(channel)) {
          const subscription = (_event, ...args) => func(...args);
          ipcRenderer.on(channel, subscription);
          return () => {
            ipcRenderer.removeListener(channel, subscription);
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
          return ipcRenderer.invoke(channel, data);
        } else {
          console.warn(`Blocked attempt to invoke invalid IPC channel: ${channel}`);
          return Promise.reject(new Error(`Invalid IPC channel: ${channel}`));
        }
      },
      // Example: Expose a specific utility
      getAppVersion: () => ipcRenderer.invoke("get-app-version"),
      // Example: Expose a function to open external links safely
      openExternal: (url) => {
        if (url && (url.startsWith("http:") || url.startsWith("https:") || url.startsWith("mailto:"))) {
          ipcRenderer.send("open-external-link", url);
        } else {
          console.warn(`Blocked attempt to open invalid external URL: ${url}`);
        }
      }
    });
    console.log("Electron Preload Script Loaded.");
  }
});
export default require_preload();
//# sourceMappingURL=preload.mjs.map