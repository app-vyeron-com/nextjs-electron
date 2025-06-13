
/**
 * @fileOverview Configuration management for the Electron application.
 * Defines the configuration schema, default values, and merging logic.
 */

import { app } from 'electron';
import path from 'path';
import { z } from 'zod';
import fs from 'fs-extra';
import merge from 'lodash.merge'; // Using lodash.merge for deep merging

// Define Zod schemas for different parts of the configuration

const WindowOptionsSchema = z.object({
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
  title: z.string().default('Electron App'),
  icon: z.string().optional(), // Path to icon
  show: z.boolean().default(true),
  frame: z.boolean().default(true),
  parent: z.any().optional(), // BrowserWindow
  modal: z.boolean().default(false),
  acceptFirstMouse: z.boolean().default(false),
  disableAutoHideCursor: z.boolean().default(false),
  autoHideMenuBar: z.boolean().default(false),
  enableLargerThanScreen: z.boolean().default(false),
  backgroundColor: z.string().default('#FFF'),
  hasShadow: z.boolean().default(true),
  opacity: z.number().min(0).max(1).default(1),
  darkTheme: z.boolean().default(false),
  transparent: z.boolean().default(false),
  type: z.string().optional(),
  titleBarStyle: z.enum(['default', 'hidden', 'hiddenInset', 'customButtonsOnHover']).default('default'),
  trafficLightPosition: z.object({ x: z.number(), y: z.number() }).optional(),
  roundedCorners: z.boolean().default(true),
  thickFrame: z.boolean().optional(), // Optional, no default by Zod, means it can be undefined
  vibrancy: z.enum(['appearance-based', 'light', 'dark', 'titlebar', 'selection', 'menu', 'popover', 'sidebar', 'medium-light', 'ultra-dark', 'header', 'sheet', 'window', 'hud', 'fullscreen-ui', 'tooltip', 'content', 'under-window', 'under-page']).optional(),
  zoomToPageWidth: z.boolean().default(false),
  tabbingIdentifier: z.string().optional(),
  webPreferences: z.object({
    devTools: z.boolean().optional(), // Default determined by isDev
    nodeIntegration: z.boolean().default(false),
    nodeIntegrationInWorker: z.boolean().default(false),
    nodeIntegrationInSubFrames: z.boolean().default(false),
    preload: z.string().optional(), // Path to preload script, set by the library
    sandbox: z.boolean().default(true), // Recommended true for security
    contextIsolation: z.boolean().default(true), // Recommended true for security
    webSecurity: z.boolean().default(true),
    allowRunningInsecureContent: z.boolean().default(false),
    images: z.boolean().default(true),
    imageAnimationPolicy: z.enum(['animate', 'animateOnce', 'noAnimation']).default('animate'),
    textAreasAreResizable: z.boolean().default(true),
    webgl: z.boolean().default(true),
    plugins: z.boolean().default(false), // Flash and other plugins
    experimentalFeatures: z.boolean().default(false),
    scrollBounce: z.boolean().default(false),
    enableRemoteModule: z.boolean().default(false), // Deprecated and insecure
    worldSafeExecuteJavaScript: z.boolean().default(true),
  }).default({}),
}).default({});
export type WindowOptions = z.infer<typeof WindowOptionsSchema>;


const SecurityConfigSchema = z.object({
  csp: z.string().optional().default("default-src 'self' file:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: file:; connect-src 'self';"),
  enableNodeIntegrationInRenderers: z.boolean().default(false), // Overrides webPreferences.nodeIntegration for all windows if true
  disableContextIsolation: z.boolean().default(false), // Overrides webPreferences.contextIsolation for all windows if true
  allowedNavigationHosts: z.array(z.string().url()).optional().default([]),
}).default({});
export type SecurityConfig = z.infer<typeof SecurityConfigSchema>;

const WebGPUConfigSchema = z.object({
  forceSoftware: z.boolean().default(false),
  powerPreference: z.enum(['default', 'low-power', 'high-performance']).default('default'),
}).default({});
export type WebGPUConfig = z.infer<typeof WebGPUConfigSchema>;

const ElectronConfigSchema = z.object({
  productName: z.string().default(app.getName()),
  appId: z.string().optional(),
  appUrl: z.string().optional(),
  windowOptions: WindowOptionsSchema,
  security: SecurityConfigSchema,
  enableWebGPU: z.boolean().default(false),
  webgpu: WebGPUConfigSchema,
  singleInstanceLock: z.boolean().default(true),
  logLevel: z.enum(['error', 'warn', 'info', 'verbose', 'debug', 'silly']).default('info'),
  openDevTools: z.boolean().optional(),
  userDataPath: z.string().optional(),
  updater: z.object({
    autoDownload: z.boolean().default(true),
    autoInstallOnAppQuit: z.boolean().default(true),
    allowDowngrade: z.boolean().default(false),
  }).optional().default({ autoDownload: true, autoInstallOnAppQuit: true, allowDowngrade: false }),
}).default({});

export type ElectronConfig = z.infer<typeof ElectronConfigSchema>;
export type MergedElectronConfig = Required<ElectronConfig>;


const isDev = !app.isPackaged;

export function getDefaultConfig(): ElectronConfig {
  const defaults: ElectronConfig = {
    productName: 'ElectronCoreApp',
    appId: 'com.electroncore.app',
    appUrl: isDev
      ? `file://${path.join(app.getAppPath(), '..', 'out', 'index.html')}`
      : `file://${path.join(process.resourcesPath, 'app.asar', 'out', 'index.html')}`,
    windowOptions: {
      width: 1280,
      height: 720,
      minWidth: undefined, // Explicitly undefined if no Zod default and optional
      minHeight: undefined,
      maxWidth: undefined,
      maxHeight: undefined,
      x: undefined,
      y: undefined,
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
      title: 'My Electron App',
      icon: undefined,
      show: true,
      frame: true,
      parent: undefined,
      modal: false,
      acceptFirstMouse: false,
      disableAutoHideCursor: false,
      autoHideMenuBar: false, // Zod default
      enableLargerThanScreen: false,
      backgroundColor: '#FFF', // Zod default
      hasShadow: true,
      opacity: 1,
      darkTheme: false,
      transparent: false,
      type: undefined,
      titleBarStyle: 'default',
      trafficLightPosition: undefined,
      roundedCorners: true,
      thickFrame: undefined,
      vibrancy: undefined,
      zoomToPageWidth: false,
      tabbingIdentifier: undefined,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'), // Library controlled
        devTools: isDev, // Dynamically set
        nodeIntegration: false,
        nodeIntegrationInWorker: false,
        nodeIntegrationInSubFrames: false,
        sandbox: true,
        contextIsolation: true,
        webSecurity: true,
        allowRunningInsecureContent: false,
        images: true,
        imageAnimationPolicy: 'animate',
        textAreasAreResizable: true,
        webgl: true,
        plugins: false,
        experimentalFeatures: false,
        scrollBounce: false,
        enableRemoteModule: false,
        worldSafeExecuteJavaScript: true,
      },
    },
    security: {
      csp: "default-src 'self' file:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: file:; connect-src 'self';",
      enableNodeIntegrationInRenderers: false,
      disableContextIsolation: false,
      allowedNavigationHosts: [],
    },
    enableWebGPU: false,
    webgpu: {
      forceSoftware: false,
      powerPreference: 'default',
    },
    singleInstanceLock: true,
    logLevel: isDev ? 'debug' : 'info',
    openDevTools: isDev, // Dynamically set
    userDataPath: undefined,
    updater: { // Zod default
      autoDownload: true,
      autoInstallOnAppQuit: true,
      allowDowngrade: false,
    }
  };
  return defaults;
}

export function configureApp(userConfig?: Partial<ElectronConfig>): MergedElectronConfig {
  const defaultConfig = getDefaultConfig();
  const mergedConfig = merge({}, defaultConfig, userConfig);

  mergedConfig.windowOptions.webPreferences.preload = path.join(__dirname, 'preload.js');
  mergedConfig.windowOptions.webPreferences.contextIsolation = !mergedConfig.security.disableContextIsolation;
  mergedConfig.windowOptions.webPreferences.nodeIntegration = mergedConfig.security.enableNodeIntegrationInRenderers;
  
  if (userConfig?.windowOptions?.webPreferences?.devTools !== undefined) {
    mergedConfig.windowOptions.webPreferences.devTools = userConfig.windowOptions.webPreferences.devTools;
  } else {
    mergedConfig.windowOptions.webPreferences.devTools = isDev;
  }

  if (userConfig?.openDevTools !== undefined) {
    mergedConfig.openDevTools = userConfig.openDevTools;
  } else {
    mergedConfig.openDevTools = isDev;
  }

  try {
    const parsedConfig = ElectronConfigSchema.parse(mergedConfig);
    return parsedConfig as MergedElectronConfig;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Configuration validation error:', error.errors);
      throw new Error('Invalid application configuration.');
    }
    throw error;
  }
}

export async function loadConfigFromFile(filePath: string = path.join(app.getAppPath(), '.electronrc.json')): Promise<Partial<ElectronConfig> | null> {
  try {
    if (await fs.pathExists(filePath)) {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const configFromFile = JSON.parse(fileContent);
      return configFromFile as Partial<ElectronConfig>;
    }
    return null;
  } catch (error) {
    console.warn(`Failed to load or parse config file from ${filePath}:`, error);
    return null;
  }
}
