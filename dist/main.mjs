'use strict';
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/config.ts
import { app as app2 } from "electron";
import path from "path";
import { z } from "zod";
import fs from "fs-extra";
import merge from "lodash.merge";
function getDefaultConfig() {
  const defaults = {
    productName: "ElectronCoreApp",
    appId: "com.electroncore.app",
    appUrl: isDev ? `file://${path.join(app2.getAppPath(), "..", "out", "index.html")}` : `file://${path.join(process.resourcesPath, "app.asar", "out", "index.html")}`,
    windowOptions: {
      width: 1280,
      height: 720,
      minWidth: void 0,
      // Explicitly undefined if no Zod default and optional
      minHeight: void 0,
      maxWidth: void 0,
      maxHeight: void 0,
      x: void 0,
      y: void 0,
      center: true,
      resizable: true,
      movable: true,
      minimizable: true,
      maximizable: true,
      closable: true,
      focusable: true,
      alwaysOnTop: false,
      fullscreen: false,
      fullscreenable: true,
      skipTaskbar: false,
      kiosk: false,
      title: "My Electron App",
      icon: void 0,
      show: true,
      frame: true,
      parent: void 0,
      modal: false,
      acceptFirstMouse: false,
      disableAutoHideCursor: false,
      autoHideMenuBar: false,
      // Zod default
      enableLargerThanScreen: false,
      backgroundColor: "#FFF",
      // Zod default
      hasShadow: true,
      opacity: 1,
      darkTheme: false,
      transparent: false,
      type: void 0,
      titleBarStyle: "default",
      trafficLightPosition: void 0,
      roundedCorners: true,
      thickFrame: void 0,
      vibrancy: void 0,
      zoomToPageWidth: false,
      tabbingIdentifier: void 0,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        // Library controlled
        devTools: isDev,
        // Dynamically set
        nodeIntegration: false,
        nodeIntegrationInWorker: false,
        nodeIntegrationInSubFrames: false,
        sandbox: true,
        contextIsolation: true,
        webSecurity: true,
        allowRunningInsecureContent: false,
        images: true,
        imageAnimationPolicy: "animate",
        textAreasAreResizable: true,
        webgl: true,
        plugins: false,
        experimentalFeatures: false,
        scrollBounce: false,
        enableRemoteModule: false,
        worldSafeExecuteJavaScript: true
      }
    },
    security: {
      csp: "default-src 'self' file:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: file:; connect-src 'self';",
      enableNodeIntegrationInRenderers: false,
      disableContextIsolation: false,
      allowedNavigationHosts: []
    },
    enableWebGPU: false,
    webgpu: {
      forceSoftware: false,
      powerPreference: "default"
    },
    singleInstanceLock: true,
    logLevel: isDev ? "debug" : "info",
    openDevTools: isDev,
    // Dynamically set
    userDataPath: void 0,
    updater: {
      // Zod default
      autoDownload: true,
      autoInstallOnAppQuit: true,
      allowDowngrade: false
    }
  };
  return defaults;
}
function configureApp(userConfig) {
  const defaultConfig = getDefaultConfig();
  const mergedConfig = merge({}, defaultConfig, userConfig);
  mergedConfig.windowOptions.webPreferences.preload = path.join(__dirname, "preload.js");
  mergedConfig.windowOptions.webPreferences.contextIsolation = !mergedConfig.security.disableContextIsolation;
  mergedConfig.windowOptions.webPreferences.nodeIntegration = mergedConfig.security.enableNodeIntegrationInRenderers;
  if (userConfig?.windowOptions?.webPreferences?.devTools !== void 0) {
    mergedConfig.windowOptions.webPreferences.devTools = userConfig.windowOptions.webPreferences.devTools;
  } else {
    mergedConfig.windowOptions.webPreferences.devTools = isDev;
  }
  if (userConfig?.openDevTools !== void 0) {
    mergedConfig.openDevTools = userConfig.openDevTools;
  } else {
    mergedConfig.openDevTools = isDev;
  }
  try {
    const parsedConfig = ElectronConfigSchema.parse(mergedConfig);
    return parsedConfig;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Configuration validation error:", error.errors);
      throw new Error("Invalid application configuration.");
    }
    throw error;
  }
}
var WindowOptionsSchema, SecurityConfigSchema, WebGPUConfigSchema, ElectronConfigSchema, isDev;
var init_config = __esm({
  "src/config.ts"() {
    "use strict";
    WindowOptionsSchema = z.object({
      width: z.number().int().positive().default(1024),
      height: z.number().int().positive().default(768),
      minWidth: z.number().int().positive().optional(),
      minHeight: z.number().int().positive().optional(),
      maxWidth: z.number().int().positive().optional(),
      maxHeight: z.number().int().positive().optional(),
      x: z.number().int().optional(),
      y: z.number().int().optional(),
      center: z.boolean().default(true),
      resizable: z.boolean().default(true),
      movable: z.boolean().default(true),
      minimizable: z.boolean().default(true),
      maximizable: z.boolean().default(true),
      closable: z.boolean().default(true),
      focusable: z.boolean().default(true),
      alwaysOnTop: z.boolean().default(false),
      fullscreen: z.boolean().default(false),
      fullscreenable: z.boolean().default(true),
      skipTaskbar: z.boolean().default(false),
      kiosk: z.boolean().default(false),
      title: z.string().default("Electron App"),
      icon: z.string().optional(),
      // Path to icon
      show: z.boolean().default(true),
      frame: z.boolean().default(true),
      parent: z.any().optional(),
      // BrowserWindow
      modal: z.boolean().default(false),
      acceptFirstMouse: z.boolean().default(false),
      disableAutoHideCursor: z.boolean().default(false),
      autoHideMenuBar: z.boolean().default(false),
      enableLargerThanScreen: z.boolean().default(false),
      backgroundColor: z.string().default("#FFF"),
      hasShadow: z.boolean().default(true),
      opacity: z.number().min(0).max(1).default(1),
      darkTheme: z.boolean().default(false),
      transparent: z.boolean().default(false),
      type: z.string().optional(),
      titleBarStyle: z.enum(["default", "hidden", "hiddenInset", "customButtonsOnHover"]).default("default"),
      trafficLightPosition: z.object({ x: z.number(), y: z.number() }).optional(),
      roundedCorners: z.boolean().default(true),
      thickFrame: z.boolean().optional(),
      // Optional, no default by Zod, means it can be undefined
      vibrancy: z.enum(["appearance-based", "light", "dark", "titlebar", "selection", "menu", "popover", "sidebar", "medium-light", "ultra-dark", "header", "sheet", "window", "hud", "fullscreen-ui", "tooltip", "content", "under-window", "under-page"]).optional(),
      zoomToPageWidth: z.boolean().default(false),
      tabbingIdentifier: z.string().optional(),
      webPreferences: z.object({
        devTools: z.boolean().optional(),
        // Default determined by isDev
        nodeIntegration: z.boolean().default(false),
        nodeIntegrationInWorker: z.boolean().default(false),
        nodeIntegrationInSubFrames: z.boolean().default(false),
        preload: z.string().optional(),
        // Path to preload script, set by the library
        sandbox: z.boolean().default(true),
        // Recommended true for security
        contextIsolation: z.boolean().default(true),
        // Recommended true for security
        webSecurity: z.boolean().default(true),
        allowRunningInsecureContent: z.boolean().default(false),
        images: z.boolean().default(true),
        imageAnimationPolicy: z.enum(["animate", "animateOnce", "noAnimation"]).default("animate"),
        textAreasAreResizable: z.boolean().default(true),
        webgl: z.boolean().default(true),
        plugins: z.boolean().default(false),
        // Flash and other plugins
        experimentalFeatures: z.boolean().default(false),
        scrollBounce: z.boolean().default(false),
        enableRemoteModule: z.boolean().default(false),
        // Deprecated and insecure
        worldSafeExecuteJavaScript: z.boolean().default(true)
      }).default({})
    }).default({});
    SecurityConfigSchema = z.object({
      csp: z.string().optional().default("default-src 'self' file:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: file:; connect-src 'self';"),
      enableNodeIntegrationInRenderers: z.boolean().default(false),
      // Overrides webPreferences.nodeIntegration for all windows if true
      disableContextIsolation: z.boolean().default(false),
      // Overrides webPreferences.contextIsolation for all windows if true
      allowedNavigationHosts: z.array(z.string().url()).optional().default([])
    }).default({});
    WebGPUConfigSchema = z.object({
      forceSoftware: z.boolean().default(false),
      powerPreference: z.enum(["default", "low-power", "high-performance"]).default("default")
    }).default({});
    ElectronConfigSchema = z.object({
      productName: z.string().default(app2.getName()),
      appId: z.string().optional(),
      appUrl: z.string().optional(),
      windowOptions: WindowOptionsSchema,
      security: SecurityConfigSchema,
      enableWebGPU: z.boolean().default(false),
      webgpu: WebGPUConfigSchema,
      singleInstanceLock: z.boolean().default(true),
      logLevel: z.enum(["error", "warn", "info", "verbose", "debug", "silly"]).default("info"),
      openDevTools: z.boolean().optional(),
      userDataPath: z.string().optional(),
      updater: z.object({
        autoDownload: z.boolean().default(true),
        autoInstallOnAppQuit: z.boolean().default(true),
        allowDowngrade: z.boolean().default(false)
      }).optional().default({ autoDownload: true, autoInstallOnAppQuit: true, allowDowngrade: false })
    }).default({});
    isDev = !app2.isPackaged;
  }
});

// src/ipc.ts
import { ipcMain, shell } from "electron";
function initializeIPCHandlers(context) {
  const { config } = context;
  ipcMain.on("example-request-data", (event, args) => {
    console.log("Main process received [example-request-data]:", args);
    event.sender.send("example-data-response", {
      message: "Data received successfully by main process",
      originalData: args,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  });
  ipcMain.handle("get-app-version", async (_event) => {
    return config.productName ? `${config.productName} v${app.getVersion()}` : app.getVersion();
  });
  ipcMain.on("open-external-link", (_event, url) => {
    if (url && (url.startsWith("http:") || url.startsWith("https:") || url.startsWith("mailto:"))) {
      shell.openExternal(url);
    } else {
      console.warn(`Blocked attempt to open invalid external URL via IPC: ${url}`);
    }
  });
  ipcMain.handle("perform-background-task", async (event, params) => {
    event.sender.send("background-task-status", { status: "started", message: `Task started for ${params.duration}ms.` });
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = { success: true, data: `Task completed after ${params.duration}ms.` };
        event.sender.send("background-task-status", { status: "completed", result });
        resolve(result);
      }, params.duration || 2e3);
    });
  });
  console.log("IPC Handlers Initialized.");
}
var init_ipc = __esm({
  "src/ipc.ts"() {
    "use strict";
  }
});

// src/updater.ts
import { autoUpdater } from "electron-updater";
import log from "electron-log";
function initializeUpdater(mainWindow2, config, isDevOrDebug = false) {
  if (process.env.NODE_ENV === "development" && !isDevOrDebug) {
    log.info("Updater: Skipping auto-updater in development environment unless debug mode is enabled.");
    return;
  }
  log.info("Updater: Initializing auto-updater.");
  autoUpdater.logger = log;
  autoUpdater.logger.transports.file.level = isDevOrDebug ? "debug" : "info";
  autoUpdater.autoDownload = config.autoDownload;
  autoUpdater.autoInstallOnAppQuit = config.autoInstallOnAppQuit;
  autoUpdater.allowDowngrade = config.allowDowngrade;
  autoUpdater.on("checking-for-update", () => {
    log.info("Updater: Checking for update...");
    mainWindow2.webContents.send("updater-message", { event: "checking-for-update" });
  });
  autoUpdater.on("update-available", (info) => {
    log.info("Updater: Update available.", info);
    mainWindow2.webContents.send("updater-message", { event: "update-available", info });
    if (!config.autoDownload) {
      log.info("Updater: Auto-download disabled. User action required to download.");
    }
  });
  autoUpdater.on("update-not-available", (info) => {
    log.info("Updater: Update not available.", info);
    mainWindow2.webContents.send("updater-message", { event: "update-not-available", info });
  });
  autoUpdater.on("error", (err) => {
    log.error("Updater: Error in auto-updater.", err);
    mainWindow2.webContents.send("updater-message", { event: "error", error: err.message });
  });
  autoUpdater.on("download-progress", (progressObj) => {
    log.info(`Updater: Download progress: ${progressObj.percent}%`);
    mainWindow2.webContents.send("updater-message", { event: "download-progress", progress: progressObj });
  });
  autoUpdater.on("update-downloaded", (info) => {
    log.info("Updater: Update downloaded; will install on quit (if autoInstallOnAppQuit is true).", info);
    mainWindow2.webContents.send("updater-message", { event: "update-downloaded", info });
    if (config.autoInstallOnAppQuit) {
      log.info("Updater: Update will be installed when the application quits.");
    } else {
      log.info("Updater: Update downloaded. Manual restart and install required or call autoUpdater.quitAndInstall().");
    }
  });
  if (app.isPackaged || isDevOrDebug) {
    log.info("Updater: Checking for updates now.");
    autoUpdater.checkForUpdatesAndNotify().catch((err) => {
      log.error("Updater: checkForUpdatesAndNotify failed.", err);
    });
  } else {
    log.info("Updater: App is not packaged and not in debug mode, skipping update check.");
  }
}
var init_updater = __esm({
  "src/updater.ts"() {
    "use strict";
  }
});

// src/utils/logger.ts
import log2 from "electron-log";
import path2 from "path";
import { app as app3 } from "electron";
function initializeLogger(logLevel = "info") {
  log2.transports.file.resolvePathFn = () => path2.join(app3.getPath("userData"), "logs", "main.log");
  log2.transports.file.level = logLevel;
  log2.transports.console.level = logLevel;
  log2.transports.file.format = "[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] {text}";
  log2.transports.console.format = "[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] {text}";
  log2.variables.appName = app3.getName();
  log2.catchErrors({
    showDialog: !app3.isPackaged,
    // Show error dialog in development
    onError: (error, versions, submitIssue) => {
      log2.error("Unhandled error or promise rejection:", error);
    }
  });
  log2.info(`Logger initialized. Log level: ${logLevel}. Logs will be saved to: ${log2.transports.file.getFile().path}`);
}
var logger_default;
var init_logger = __esm({
  "src/utils/logger.ts"() {
    "use strict";
    logger_default = log2;
  }
});

// src/app-lifecycle.ts
import { app as app4, BrowserWindow, shell as shell2, session, Menu, dialog } from "electron";
import path3 from "path";
function createMainWindow(config) {
  const windowOptions = { ...config.windowOptions };
  windowOptions.webPreferences = {
    ...windowOptions.webPreferences,
    preload: path3.join(__dirname, "preload.js"),
    // Always use the library's preload
    contextIsolation: !config.security.disableContextIsolation,
    nodeIntegration: config.security.enableNodeIntegrationInRenderers,
    sandbox: windowOptions.webPreferences?.sandbox !== void 0 ? windowOptions.webPreferences.sandbox : true
    // Default to true if not specified by user
  };
  const win = new BrowserWindow(windowOptions);
  mainWindowInstance = win;
  if (config.appUrl) {
    win.loadURL(config.appUrl).catch((err) => {
      logger_default.error(`Failed to load URL ${config.appUrl}:`, err);
      dialog.showErrorBox("Load Error", `Failed to load the application content from ${config.appUrl}. Please check the path and ensure your Next.js app is exported correctly to the 'out' directory.`);
    });
  } else {
    logger_default.error("appUrl is not defined in the configuration. Cannot load application content.");
    dialog.showErrorBox("Configuration Error", "Application URL is not configured. Unable to load content.");
  }
  if (config.openDevTools ?? !app4.isPackaged) {
    win.webContents.openDevTools();
  }
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("http:") || url.startsWith("https:")) {
      shell2.openExternal(url);
      return { action: "deny" };
    }
    logger_default.warn(`Blocked new window for URL: ${url}`);
    return { action: "deny" };
  });
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [config.security.csp || "default-src 'self'"]
      }
    });
  });
  win.on("closed", () => {
    mainWindowInstance = null;
  });
  return win;
}
function setupMenu(config) {
  const template = [
    ...process.platform === "darwin" ? [{
      label: config.productName || app4.getName(),
      submenu: [
        { role: "about" },
        { type: "separator" },
        { role: "services" },
        { type: "separator" },
        { role: "hide" },
        { role: "hideOthers" },
        { role: "unhide" },
        { type: "separator" },
        { role: "quit" }
      ]
    }] : [],
    {
      label: "File",
      submenu: [
        process.platform === "darwin" ? { role: "close" } : { role: "quit" }
      ]
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        ...process.platform === "darwin" ? [
          { role: "pasteAndMatchStyle" },
          { role: "delete" },
          { role: "selectAll" },
          { type: "separator" },
          {
            label: "Speech",
            submenu: [
              { role: "startSpeaking" },
              { role: "stopSpeaking" }
            ]
          }
        ] : [
          { role: "delete" },
          { type: "separator" },
          { role: "selectAll" }
        ]
      ]
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" }
      ]
    },
    {
      label: "Window",
      submenu: [
        { role: "minimize" },
        { role: "zoom" },
        ...process.platform === "darwin" ? [
          { type: "separator" },
          { role: "front" },
          { type: "separator" },
          { role: "window" }
        ] : [
          { role: "close" }
        ]
      ]
    },
    {
      role: "help",
      submenu: [
        {
          label: "Learn More",
          click: async () => {
            await shell2.openExternal("https://electronjs.org");
          }
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
async function setupAppLifecycle(config) {
  logger_default.info(`Setting up app lifecycle for: ${config.productName}`);
  logger_default.debug("Using configuration:", config);
  if (mainWindowInstance && !mainWindowInstance.isDestroyed()) {
    logger_default.warn("Main window already exists. Focusing existing window.");
    mainWindowInstance.focus();
    return mainWindowInstance;
  }
  initializeIPCHandlers({ config });
  const mainWindow2 = createMainWindow(config);
  setupMenu(config);
  if (config.updater) {
    initializeUpdater(mainWindow2, config.updater, config.logLevel === "debug");
  }
  if (config.userDataPath) {
    try {
      const resolvedPath = path3.resolve(config.userDataPath);
      logger_default.info(`Setting user data path to: ${resolvedPath}`);
      app4.setPath("userData", resolvedPath);
    } catch (error) {
      logger_default.error(`Failed to set custom user data path '${config.userDataPath}':`, error);
    }
  }
  app4.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      logger_default.info("App activated with no windows open, creating new main window.");
      createMainWindow(config);
    } else if (mainWindowInstance && !mainWindowInstance.isDestroyed()) {
      logger_default.info("App activated, showing existing main window.");
      mainWindowInstance.show();
    }
  });
  logger_default.info("App lifecycle setup complete.");
  return mainWindow2;
}
var mainWindowInstance;
var init_app_lifecycle = __esm({
  "src/app-lifecycle.ts"() {
    "use strict";
    init_ipc();
    init_updater();
    init_logger();
    mainWindowInstance = null;
  }
});

// src/webgpu.ts
function enableWebGPU(app7, config) {
  if (!app7.isReady()) {
    app7.commandLine.appendSwitch("enable-features", "Vulkan,UseSkiaRenderer");
    app7.commandLine.appendSwitch("enable-unsafe-webgpu");
    if (config.forceSoftware) {
      app7.commandLine.appendSwitch("disable-gpu");
    }
    if (config.powerPreference && config.powerPreference !== "default") {
      console.info(`WebGPU powerPreference '${config.powerPreference}' is set. This is primarily handled by the WebGPU adapter request in renderer code.`);
    }
    console.log("WebGPU flags enabled. Note: Actual WebGPU availability depends on hardware, drivers, and OS.");
  } else {
    console.warn("enableWebGPU called after app is ready. WebGPU flags may not apply.");
  }
}
var init_webgpu = __esm({
  "src/webgpu.ts"() {
    "use strict";
  }
});

// src/index.ts
import { app as app5, BrowserWindow as BrowserWindow2 } from "electron";
async function launchApp(userConfig) {
  const config = configureApp(userConfig);
  initializeLogger(config.logLevel);
  if (config.enableWebGPU) {
    enableWebGPU(app5, config.webgpu);
  }
  const gotTheLock = app5.requestSingleInstanceLock({
    productName: config.productName
  });
  if (!gotTheLock) {
    app5.quit();
    return;
  }
  app5.on("second-instance", (_event, commandLine, _workingDirectory, additionalData) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
    console.log("Second instance started with:", commandLine, additionalData);
  });
  if (process.platform === "win32" && config.appId) {
    app5.setAppUserModelId(config.appId);
  }
  if (app5.isReady()) {
    console.warn("launchApp called after app.isReady(). This might lead to unexpected behavior if Electron's main entry point is not this library's main.js.");
    mainWindow = await setupAppLifecycle(config);
  } else {
    app5.on("ready", async () => {
      mainWindow = await setupAppLifecycle(config);
    });
  }
  app5.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app5.quit();
    }
  });
  app5.on("activate", async () => {
    if (BrowserWindow2.getAllWindows().length === 0) {
      if (app5.isReady()) {
        mainWindow = await setupAppLifecycle(config);
      }
    } else if (mainWindow) {
      mainWindow.show();
    }
  });
  process.on("SIGINT", () => app5.quit());
  process.on("SIGTERM", () => app5.quit());
  process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    app5.quit();
  });
}
var mainWindow;
var init_src = __esm({
  "src/index.ts"() {
    "use strict";
    init_config();
    init_app_lifecycle();
    init_webgpu();
    init_logger();
    mainWindow = null;
  }
});

// src/main.ts
import { app as app6 } from "electron";
import path4 from "path";
var require_main = __commonJS({
  "src/main.ts"() {
    init_src();
    async function startApplication() {
      let defaultAppUrl = "";
      try {
        const projectRootGuess = path4.join(__dirname, "..", "..", "..");
        defaultAppUrl = `file://${path4.join(projectRootGuess, "out", "index.html")}`;
      } catch (e) {
        console.error("Could not determine default app URL for development/testing. Please provide appUrl in config.", e);
      }
      const defaultConfigFromLibrary = getDefaultConfig();
      const appConfig = {
        // Override defaults if necessary for this direct execution context
        appUrl: defaultConfigFromLibrary.appUrl || defaultAppUrl,
        // Use library default if set, else calculated
        productName: "Next.js Electron (Dev)",
        // Placeholder
        appId: "com.example.nextjselectron.dev"
        // Placeholder
        // User configuration would override these if launchApp is called by user code
      };
      await launchApp(appConfig);
    }
    if (!app6.isReady()) {
      app6.on("ready", startApplication);
    } else {
      startApplication();
    }
  }
});
export default require_main();
//# sourceMappingURL=main.mjs.map