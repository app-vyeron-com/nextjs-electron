'use strict';
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/main.ts
var import_electron6 = require("electron");
var import_path4 = __toESM(require("path"));

// src/index.ts
var import_electron5 = require("electron");

// src/config.ts
var import_electron = require("electron");
var import_path = __toESM(require("path"));
var import_zod = require("zod");
var import_fs_extra = __toESM(require("fs-extra"));
var import_lodash = __toESM(require("lodash.merge"));
var WindowOptionsSchema = import_zod.z.object({
  width: import_zod.z.number().int().positive().default(1024),
  height: import_zod.z.number().int().positive().default(768),
  minWidth: import_zod.z.number().int().positive().optional(),
  minHeight: import_zod.z.number().int().positive().optional(),
  maxWidth: import_zod.z.number().int().positive().optional(),
  maxHeight: import_zod.z.number().int().positive().optional(),
  x: import_zod.z.number().int().optional(),
  y: import_zod.z.number().int().optional(),
  center: import_zod.z.boolean().default(true),
  resizable: import_zod.z.boolean().default(true),
  movable: import_zod.z.boolean().default(true),
  minimizable: import_zod.z.boolean().default(true),
  maximizable: import_zod.z.boolean().default(true),
  closable: import_zod.z.boolean().default(true),
  focusable: import_zod.z.boolean().default(true),
  alwaysOnTop: import_zod.z.boolean().default(false),
  fullscreen: import_zod.z.boolean().default(false),
  fullscreenable: import_zod.z.boolean().default(true),
  skipTaskbar: import_zod.z.boolean().default(false),
  kiosk: import_zod.z.boolean().default(false),
  title: import_zod.z.string().default("Electron App"),
  icon: import_zod.z.string().optional(),
  // Path to icon
  show: import_zod.z.boolean().default(true),
  frame: import_zod.z.boolean().default(true),
  parent: import_zod.z.any().optional(),
  // BrowserWindow
  modal: import_zod.z.boolean().default(false),
  acceptFirstMouse: import_zod.z.boolean().default(false),
  disableAutoHideCursor: import_zod.z.boolean().default(false),
  autoHideMenuBar: import_zod.z.boolean().default(false),
  enableLargerThanScreen: import_zod.z.boolean().default(false),
  backgroundColor: import_zod.z.string().default("#FFF"),
  hasShadow: import_zod.z.boolean().default(true),
  opacity: import_zod.z.number().min(0).max(1).default(1),
  darkTheme: import_zod.z.boolean().default(false),
  transparent: import_zod.z.boolean().default(false),
  type: import_zod.z.string().optional(),
  titleBarStyle: import_zod.z.enum(["default", "hidden", "hiddenInset", "customButtonsOnHover"]).default("default"),
  trafficLightPosition: import_zod.z.object({ x: import_zod.z.number(), y: import_zod.z.number() }).optional(),
  roundedCorners: import_zod.z.boolean().default(true),
  thickFrame: import_zod.z.boolean().optional(),
  // Optional, no default by Zod, means it can be undefined
  vibrancy: import_zod.z.enum(["appearance-based", "light", "dark", "titlebar", "selection", "menu", "popover", "sidebar", "medium-light", "ultra-dark", "header", "sheet", "window", "hud", "fullscreen-ui", "tooltip", "content", "under-window", "under-page"]).optional(),
  zoomToPageWidth: import_zod.z.boolean().default(false),
  tabbingIdentifier: import_zod.z.string().optional(),
  webPreferences: import_zod.z.object({
    devTools: import_zod.z.boolean().optional(),
    // Default determined by isDev
    nodeIntegration: import_zod.z.boolean().default(false),
    nodeIntegrationInWorker: import_zod.z.boolean().default(false),
    nodeIntegrationInSubFrames: import_zod.z.boolean().default(false),
    preload: import_zod.z.string().optional(),
    // Path to preload script, set by the library
    sandbox: import_zod.z.boolean().default(true),
    // Recommended true for security
    contextIsolation: import_zod.z.boolean().default(true),
    // Recommended true for security
    webSecurity: import_zod.z.boolean().default(true),
    allowRunningInsecureContent: import_zod.z.boolean().default(false),
    images: import_zod.z.boolean().default(true),
    imageAnimationPolicy: import_zod.z.enum(["animate", "animateOnce", "noAnimation"]).default("animate"),
    textAreasAreResizable: import_zod.z.boolean().default(true),
    webgl: import_zod.z.boolean().default(true),
    plugins: import_zod.z.boolean().default(false),
    // Flash and other plugins
    experimentalFeatures: import_zod.z.boolean().default(false),
    scrollBounce: import_zod.z.boolean().default(false),
    enableRemoteModule: import_zod.z.boolean().default(false),
    // Deprecated and insecure
    worldSafeExecuteJavaScript: import_zod.z.boolean().default(true)
  }).default({})
}).default({});
var SecurityConfigSchema = import_zod.z.object({
  csp: import_zod.z.string().optional().default("default-src 'self' file:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: file:; connect-src 'self';"),
  enableNodeIntegrationInRenderers: import_zod.z.boolean().default(false),
  // Overrides webPreferences.nodeIntegration for all windows if true
  disableContextIsolation: import_zod.z.boolean().default(false),
  // Overrides webPreferences.contextIsolation for all windows if true
  allowedNavigationHosts: import_zod.z.array(import_zod.z.string().url()).optional().default([])
}).default({});
var WebGPUConfigSchema = import_zod.z.object({
  forceSoftware: import_zod.z.boolean().default(false),
  powerPreference: import_zod.z.enum(["default", "low-power", "high-performance"]).default("default")
}).default({});
var ElectronConfigSchema = import_zod.z.object({
  productName: import_zod.z.string().default(import_electron.app.getName()),
  appId: import_zod.z.string().optional(),
  appUrl: import_zod.z.string().optional(),
  windowOptions: WindowOptionsSchema,
  security: SecurityConfigSchema,
  enableWebGPU: import_zod.z.boolean().default(false),
  webgpu: WebGPUConfigSchema,
  singleInstanceLock: import_zod.z.boolean().default(true),
  logLevel: import_zod.z.enum(["error", "warn", "info", "verbose", "debug", "silly"]).default("info"),
  openDevTools: import_zod.z.boolean().optional(),
  userDataPath: import_zod.z.string().optional(),
  updater: import_zod.z.object({
    autoDownload: import_zod.z.boolean().default(true),
    autoInstallOnAppQuit: import_zod.z.boolean().default(true),
    allowDowngrade: import_zod.z.boolean().default(false)
  }).optional().default({ autoDownload: true, autoInstallOnAppQuit: true, allowDowngrade: false })
}).default({});
var isDev = !import_electron.app.isPackaged;
function getDefaultConfig() {
  const defaults = {
    productName: "ElectronCoreApp",
    appId: "com.electroncore.app",
    appUrl: isDev ? `file://${import_path.default.join(import_electron.app.getAppPath(), "..", "out", "index.html")}` : `file://${import_path.default.join(process.resourcesPath, "app.asar", "out", "index.html")}`,
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
        preload: import_path.default.join(__dirname, "preload.js"),
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
  const mergedConfig = (0, import_lodash.default)({}, defaultConfig, userConfig);
  mergedConfig.windowOptions.webPreferences.preload = import_path.default.join(__dirname, "preload.js");
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
    if (error instanceof import_zod.z.ZodError) {
      console.error("Configuration validation error:", error.errors);
      throw new Error("Invalid application configuration.");
    }
    throw error;
  }
}

// src/app-lifecycle.ts
var import_electron4 = require("electron");
var import_path3 = __toESM(require("path"));

// src/ipc.ts
var import_electron2 = require("electron");
function initializeIPCHandlers(context) {
  const { config } = context;
  import_electron2.ipcMain.on("example-request-data", (event, args) => {
    console.log("Main process received [example-request-data]:", args);
    event.sender.send("example-data-response", {
      message: "Data received successfully by main process",
      originalData: args,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  });
  import_electron2.ipcMain.handle("get-app-version", async (_event) => {
    return config.productName ? `${config.productName} v${app.getVersion()}` : app.getVersion();
  });
  import_electron2.ipcMain.on("open-external-link", (_event, url) => {
    if (url && (url.startsWith("http:") || url.startsWith("https:") || url.startsWith("mailto:"))) {
      import_electron2.shell.openExternal(url);
    } else {
      console.warn(`Blocked attempt to open invalid external URL via IPC: ${url}`);
    }
  });
  import_electron2.ipcMain.handle("perform-background-task", async (event, params) => {
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

// src/updater.ts
var import_electron_updater = require("electron-updater");
var import_electron_log = __toESM(require("electron-log"));
function initializeUpdater(mainWindow2, config, isDevOrDebug = false) {
  if (process.env.NODE_ENV === "development" && !isDevOrDebug) {
    import_electron_log.default.info("Updater: Skipping auto-updater in development environment unless debug mode is enabled.");
    return;
  }
  import_electron_log.default.info("Updater: Initializing auto-updater.");
  import_electron_updater.autoUpdater.logger = import_electron_log.default;
  import_electron_updater.autoUpdater.logger.transports.file.level = isDevOrDebug ? "debug" : "info";
  import_electron_updater.autoUpdater.autoDownload = config.autoDownload;
  import_electron_updater.autoUpdater.autoInstallOnAppQuit = config.autoInstallOnAppQuit;
  import_electron_updater.autoUpdater.allowDowngrade = config.allowDowngrade;
  import_electron_updater.autoUpdater.on("checking-for-update", () => {
    import_electron_log.default.info("Updater: Checking for update...");
    mainWindow2.webContents.send("updater-message", { event: "checking-for-update" });
  });
  import_electron_updater.autoUpdater.on("update-available", (info) => {
    import_electron_log.default.info("Updater: Update available.", info);
    mainWindow2.webContents.send("updater-message", { event: "update-available", info });
    if (!config.autoDownload) {
      import_electron_log.default.info("Updater: Auto-download disabled. User action required to download.");
    }
  });
  import_electron_updater.autoUpdater.on("update-not-available", (info) => {
    import_electron_log.default.info("Updater: Update not available.", info);
    mainWindow2.webContents.send("updater-message", { event: "update-not-available", info });
  });
  import_electron_updater.autoUpdater.on("error", (err) => {
    import_electron_log.default.error("Updater: Error in auto-updater.", err);
    mainWindow2.webContents.send("updater-message", { event: "error", error: err.message });
  });
  import_electron_updater.autoUpdater.on("download-progress", (progressObj) => {
    import_electron_log.default.info(`Updater: Download progress: ${progressObj.percent}%`);
    mainWindow2.webContents.send("updater-message", { event: "download-progress", progress: progressObj });
  });
  import_electron_updater.autoUpdater.on("update-downloaded", (info) => {
    import_electron_log.default.info("Updater: Update downloaded; will install on quit (if autoInstallOnAppQuit is true).", info);
    mainWindow2.webContents.send("updater-message", { event: "update-downloaded", info });
    if (config.autoInstallOnAppQuit) {
      import_electron_log.default.info("Updater: Update will be installed when the application quits.");
    } else {
      import_electron_log.default.info("Updater: Update downloaded. Manual restart and install required or call autoUpdater.quitAndInstall().");
    }
  });
  if (app.isPackaged || isDevOrDebug) {
    import_electron_log.default.info("Updater: Checking for updates now.");
    import_electron_updater.autoUpdater.checkForUpdatesAndNotify().catch((err) => {
      import_electron_log.default.error("Updater: checkForUpdatesAndNotify failed.", err);
    });
  } else {
    import_electron_log.default.info("Updater: App is not packaged and not in debug mode, skipping update check.");
  }
}

// src/utils/logger.ts
var import_electron_log2 = __toESM(require("electron-log"));
var import_path2 = __toESM(require("path"));
var import_electron3 = require("electron");
function initializeLogger(logLevel = "info") {
  import_electron_log2.default.transports.file.resolvePathFn = () => import_path2.default.join(import_electron3.app.getPath("userData"), "logs", "main.log");
  import_electron_log2.default.transports.file.level = logLevel;
  import_electron_log2.default.transports.console.level = logLevel;
  import_electron_log2.default.transports.file.format = "[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] {text}";
  import_electron_log2.default.transports.console.format = "[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] {text}";
  import_electron_log2.default.variables.appName = import_electron3.app.getName();
  import_electron_log2.default.catchErrors({
    showDialog: !import_electron3.app.isPackaged,
    // Show error dialog in development
    onError: (error, versions, submitIssue) => {
      import_electron_log2.default.error("Unhandled error or promise rejection:", error);
    }
  });
  import_electron_log2.default.info(`Logger initialized. Log level: ${logLevel}. Logs will be saved to: ${import_electron_log2.default.transports.file.getFile().path}`);
}
var logger_default = import_electron_log2.default;

// src/app-lifecycle.ts
var mainWindowInstance = null;
function createMainWindow(config) {
  const windowOptions = { ...config.windowOptions };
  windowOptions.webPreferences = {
    ...windowOptions.webPreferences,
    preload: import_path3.default.join(__dirname, "preload.js"),
    // Always use the library's preload
    contextIsolation: !config.security.disableContextIsolation,
    nodeIntegration: config.security.enableNodeIntegrationInRenderers,
    sandbox: windowOptions.webPreferences?.sandbox !== void 0 ? windowOptions.webPreferences.sandbox : true
    // Default to true if not specified by user
  };
  const win = new import_electron4.BrowserWindow(windowOptions);
  mainWindowInstance = win;
  if (config.appUrl) {
    win.loadURL(config.appUrl).catch((err) => {
      logger_default.error(`Failed to load URL ${config.appUrl}:`, err);
      import_electron4.dialog.showErrorBox("Load Error", `Failed to load the application content from ${config.appUrl}. Please check the path and ensure your Next.js app is exported correctly to the 'out' directory.`);
    });
  } else {
    logger_default.error("appUrl is not defined in the configuration. Cannot load application content.");
    import_electron4.dialog.showErrorBox("Configuration Error", "Application URL is not configured. Unable to load content.");
  }
  if (config.openDevTools ?? !import_electron4.app.isPackaged) {
    win.webContents.openDevTools();
  }
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("http:") || url.startsWith("https:")) {
      import_electron4.shell.openExternal(url);
      return { action: "deny" };
    }
    logger_default.warn(`Blocked new window for URL: ${url}`);
    return { action: "deny" };
  });
  import_electron4.session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
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
      label: config.productName || import_electron4.app.getName(),
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
            await import_electron4.shell.openExternal("https://electronjs.org");
          }
        }
      ]
    }
  ];
  const menu = import_electron4.Menu.buildFromTemplate(template);
  import_electron4.Menu.setApplicationMenu(menu);
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
      const resolvedPath = import_path3.default.resolve(config.userDataPath);
      logger_default.info(`Setting user data path to: ${resolvedPath}`);
      import_electron4.app.setPath("userData", resolvedPath);
    } catch (error) {
      logger_default.error(`Failed to set custom user data path '${config.userDataPath}':`, error);
    }
  }
  import_electron4.app.on("activate", () => {
    if (import_electron4.BrowserWindow.getAllWindows().length === 0) {
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

// src/index.ts
var mainWindow = null;
async function launchApp(userConfig) {
  const config = configureApp(userConfig);
  initializeLogger(config.logLevel);
  if (config.enableWebGPU) {
    enableWebGPU(import_electron5.app, config.webgpu);
  }
  const gotTheLock = import_electron5.app.requestSingleInstanceLock({
    productName: config.productName
  });
  if (!gotTheLock) {
    import_electron5.app.quit();
    return;
  }
  import_electron5.app.on("second-instance", (_event, commandLine, _workingDirectory, additionalData) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
    console.log("Second instance started with:", commandLine, additionalData);
  });
  if (process.platform === "win32" && config.appId) {
    import_electron5.app.setAppUserModelId(config.appId);
  }
  if (import_electron5.app.isReady()) {
    console.warn("launchApp called after app.isReady(). This might lead to unexpected behavior if Electron's main entry point is not this library's main.js.");
    mainWindow = await setupAppLifecycle(config);
  } else {
    import_electron5.app.on("ready", async () => {
      mainWindow = await setupAppLifecycle(config);
    });
  }
  import_electron5.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      import_electron5.app.quit();
    }
  });
  import_electron5.app.on("activate", async () => {
    if (import_electron5.BrowserWindow.getAllWindows().length === 0) {
      if (import_electron5.app.isReady()) {
        mainWindow = await setupAppLifecycle(config);
      }
    } else if (mainWindow) {
      mainWindow.show();
    }
  });
  process.on("SIGINT", () => import_electron5.app.quit());
  process.on("SIGTERM", () => import_electron5.app.quit());
  process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    import_electron5.app.quit();
  });
}

// src/main.ts
async function startApplication() {
  let defaultAppUrl = "";
  try {
    const projectRootGuess = import_path4.default.join(__dirname, "..", "..", "..");
    defaultAppUrl = `file://${import_path4.default.join(projectRootGuess, "out", "index.html")}`;
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
if (!import_electron6.app.isReady()) {
  import_electron6.app.on("ready", startApplication);
} else {
  startApplication();
}
//# sourceMappingURL=main.js.map