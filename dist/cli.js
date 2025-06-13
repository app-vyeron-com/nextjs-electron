'use strict';
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// package.json
var require_package = __commonJS({
  "package.json"(exports2, module2) {
    module2.exports = {
      name: "nextjs-electron",
      version: "0.1.0",
      description: "A modular Electron library to bootstrap Next.js static exports into secure, production-ready desktop apps.",
      keywords: [
        "electron",
        "nextjs",
        "desktop",
        "builder",
        "boilerplate",
        "typescript"
      ],
      homepage: "https://github.com/app-vyeron-com/nextjs-electron#readme",
      bugs: {
        url: "https://github.com/app-vyeron-com/nextjs-electron/issues"
      },
      repository: {
        type: "git",
        url: "git+https://github.com/app-vyeron-com/nextjs-electron.git"
      },
      license: "MIT",
      author: "Your Name/Org",
      type: "commonjs",
      main: "dist/main.js",
      types: "dist/index.d.ts",
      bin: {
        "nextjs-electron": "dist/cli.js"
      },
      files: [
        "dist",
        "electron-builder.config.js",
        "README.md"
      ],
      scripts: {
        build: "tsup",
        dev: "tsup --watch",
        "start:electron": "electron dist/main.js",
        package: "npm run build && electron-builder --config electron-builder.config.js",
        lint: "eslint . --ext .ts",
        typecheck: "tsc --noEmit"
      },
      dependencies: {
        "electron-log": "^5.1.5",
        "electron-updater": "^6.3.0",
        "fs-extra": "^11.2.0",
        zod: "^3.23.8",
        "lodash.merge": "^4.6.2",
        commander: "^12.0.0",
        inquirer: "^9.2.20"
      },
      devDependencies: {
        "@types/fs-extra": "^11.0.4",
        "@types/node": "^20.11.19",
        "@types/lodash.merge": "^4.6.9",
        "@types/inquirer": "^9.0.7",
        electron: "^31.0.2",
        "electron-builder": "^25.0.0-alpha.14",
        eslint: "^8.56.0",
        tsup: "^8.5.0",
        typescript: "^5.3.3"
      },
      peerDependencies: {
        electron: ">=28.0.0"
      },
      engines: {
        node: ">=18.0.0"
      },
      module: "dist/index.mjs"
    };
  }
});

// src/cli.ts
var cli_exports = {};
__export(cli_exports, {
  nextjsElectronCLI: () => program
});
module.exports = __toCommonJS(cli_exports);
var import_commander = require("commander");
var import_child_process = require("child_process");
var import_path = __toESM(require("path"));
var import_fs_extra = __toESM(require("fs-extra"));
var import_inquirer = __toESM(require("inquirer"));
var packageJson = require_package();
var libraryPackageJson = require_package();
var program = new import_commander.Command();
program.version(packageJson.version).description(packageJson.description);
program.command("launch").description("Launch the Electron application (development mode, uses project electron main).").option("--app-path <path>", "Path to the Next.js /out directory or URL to load (experimental)").action(async (_options) => {
  console.log("Launching Electron app from current project...");
  try {
    console.log(`Attempting to run "electron ." in ${process.cwd()}`);
    console.log("Ensure your project's package.json 'main' field points to an Electron entry script (e.g., one that uses nextjs-electron's launchApp).");
    (0, import_child_process.execSync)("electron .", { stdio: "inherit", cwd: process.cwd() });
  } catch (error) {
    console.error("Failed to launch Electron app:", error);
    console.error("Please ensure Electron is installed and your project is configured correctly.");
    process.exit(1);
  }
});
program.command("package").description("Package the Electron application using electron-builder.").option("--config <path>", "Path to electron-builder configuration file (e.g., electron-builder.config.js in your project or node_modules/nextjs-electron/electron-builder.config.js)").option("--mac", "Build for macOS").option("--win", "Build for Windows").option("--linux", "Build for Linux").option("--publish <mode>", 'Publish mode (e.g., "onTagOrDraft", "always", "never")').action(async (options) => {
  console.log("Packaging Electron app with electron-builder...");
  let builderConfigPath = options.config;
  if (!builderConfigPath) {
    const userProjectConfig = import_path.default.resolve(process.cwd(), "electron-builder.config.js");
    const userProjectUserConfig = import_path.default.resolve(process.cwd(), "electron-builder.user.config.js");
    const libraryDefaultConfig = import_path.default.resolve(__dirname, "..", "electron-builder.config.js");
    if (await import_fs_extra.default.pathExists(userProjectConfig)) {
      builderConfigPath = userProjectConfig;
    } else if (await import_fs_extra.default.pathExists(userProjectUserConfig)) {
      builderConfigPath = userProjectUserConfig;
    } else {
      builderConfigPath = libraryDefaultConfig;
      console.log(`No custom electron-builder config found in project root. Using library default: ${builderConfigPath}`);
    }
  }
  console.log(`Using electron-builder configuration: ${builderConfigPath}`);
  let cmd = `electron-builder --config "${builderConfigPath}"`;
  const targets = [];
  if (options.mac) targets.push("--mac");
  if (options.win) targets.push("--win");
  if (options.linux) targets.push("--linux");
  if (targets.length > 0) cmd += ` ${targets.join(" ")}`;
  if (options.publish) {
    cmd += ` --publish ${options.publish}`;
  }
  console.log(`Executing: ${cmd}`);
  try {
    (0, import_child_process.execSync)(cmd, { stdio: "inherit", cwd: process.cwd() });
    console.log("Application packaged successfully.");
  } catch (error) {
    console.error("Failed to package application:", error);
    process.exit(1);
  }
});
program.command("init-config").description("Initialize a default electron-builder.config.js in the current project (as electron-builder.user.config.js).").action(async () => {
  const defaultConfigPath = import_path.default.resolve(__dirname, "..", "electron-builder.config.js");
  const targetConfigPath = import_path.default.resolve(process.cwd(), "electron-builder.user.config.js");
  try {
    if (await import_fs_extra.default.pathExists(targetConfigPath)) {
      const { overwrite } = await import_inquirer.default.prompt([{
        type: "confirm",
        name: "overwrite",
        message: `Configuration file already exists at ${targetConfigPath}. Overwrite?`,
        default: false
      }]);
      if (!overwrite) {
        console.log("Initialization cancelled.");
        return;
      }
    }
    await import_fs_extra.default.copyFile(defaultConfigPath, targetConfigPath);
    console.log(`Default electron-builder configuration copied to ${targetConfigPath}`);
    console.log("Please review and customize this file, especially 'appId', 'productName', icons, and signing information.");
  } catch (error) {
    console.error("Failed to initialize configuration:", error);
    process.exit(1);
  }
});
program.command("setup-project").description("Automatically sets up the current Next.js project for Electron integration.").action(async () => {
  console.log("\u{1F680} Starting automatic project setup for nextjs-electron...");
  const answers = await import_inquirer.default.prompt([
    {
      type: "input",
      name: "productName",
      message: "Enter your application name (for window title, etc.):",
      default: "My Next.js Electron App"
    },
    {
      type: "input",
      name: "appId",
      message: "Enter your application ID (e.g., com.mycompany.myapp):",
      default: "com.example.myapp",
      validate: (input) => input.includes(".") ? true : "App ID should be in reverse domain style (e.g., com.example.app)"
    }
  ]);
  const { productName, appId } = answers;
  const projectRoot = process.cwd();
  const packageJsonPath = import_path.default.join(projectRoot, "package.json");
  const electronMainPath = import_path.default.join(projectRoot, "electron-main.js");
  try {
    console.log(`
\u{1F4C4} Reading and updating ${packageJsonPath}...`);
    if (!await import_fs_extra.default.pathExists(packageJsonPath)) {
      console.error(`Error: package.json not found in ${projectRoot}. Please run this command from your Next.js project root.`);
      process.exit(1);
    }
    const projectPkg = await import_fs_extra.default.readJson(packageJsonPath);
    projectPkg.main = "electron-main.js";
    projectPkg.scripts = projectPkg.scripts || {};
    projectPkg.scripts["start:electron"] = "electron .";
    projectPkg.scripts["package:electron"] = "nextjs-electron package";
    projectPkg.scripts["package:electron:user"] = "nextjs-electron package --config electron-builder.user.config.js";
    projectPkg.dependencies = projectPkg.dependencies || {};
    const nextjsElectronVersion = libraryPackageJson.version ? `^${libraryPackageJson.version}` : "latest";
    if (!projectPkg.dependencies["nextjs-electron"]) {
      projectPkg.dependencies["nextjs-electron"] = nextjsElectronVersion;
      console.log(`   Added 'nextjs-electron' version ${nextjsElectronVersion} to dependencies.`);
    } else {
      console.log(`   'nextjs-electron' already in dependencies. Version: ${projectPkg.dependencies["nextjs-electron"]}`);
    }
    projectPkg.devDependencies = projectPkg.devDependencies || {};
    const electronVersion = libraryPackageJson.devDependencies.electron || "^31.0.0";
    if (!projectPkg.devDependencies.electron) {
      projectPkg.devDependencies.electron = electronVersion;
      console.log(`   Added 'electron' version ${electronVersion} to devDependencies.`);
    } else {
      console.log(`   'electron' already in devDependencies. Version: ${projectPkg.devDependencies.electron}`);
    }
    const electronBuilderVersion = libraryPackageJson.devDependencies["electron-builder"] || "^25.0.0";
    if (!projectPkg.devDependencies["electron-builder"]) {
      projectPkg.devDependencies["electron-builder"] = electronBuilderVersion;
      console.log(`   Added 'electron-builder' version ${electronBuilderVersion} to devDependencies.`);
    }
    await import_fs_extra.default.writeJson(packageJsonPath, projectPkg, { spaces: 2 });
    console.log(`   \u2705 Successfully updated ${packageJsonPath}`);
    console.log(`
\u{1F4C4} Creating ${electronMainPath}...`);
    const electronMainContent = `// electron-main.js
const path = require('path');

// Dynamically import launchApp to support both CJS and ESM projects
async function start() {
  const { launchApp } = await (
    eval('typeof module === "undefined" ? import("nextjs-electron") : Promise.resolve(require("nextjs-electron"))')
  );

  // Default appUrl assumes Next.js output is in '/out' at the project root.
  // For packaged apps, this path needs to be relative from where nextjs-electron's main.js runs.
  // The library's default config handles the packaged app path well.
  // For development, an absolute path is more robust.
  const devAppUrl = \`file://\${path.join(__dirname, 'out', 'index.html')}\`;
  // The library's internal default for appUrl will be used if this is not set,
  // which is generally \`file://\${process.resourcesPath}/app.asar/out/index.html\` for packaged app
  // and \`file://\${app.getAppPath()}/../out/index.html\` for dev with nextjs-electron's main.

  launchApp({
    productName: '${productName}',
    appId: '${appId}',
    // appUrl: devAppUrl, // Uncomment and adjust if needed for local dev, or let library default handle it.
                          // The library's default appUrl for dev is usually good.
  });
}

start();
`;
    await import_fs_extra.default.writeFile(electronMainPath, electronMainContent.trim());
    console.log(`   \u2705 Successfully created ${electronMainPath}`);
    console.log(`      Please ensure your Next.js app exports to the 'out' directory (e.g., 'output: "export"' in next.config.js and run 'next build').`);
    console.log("\n\u2728 Automatic setup complete!");
    console.log("\nNext Steps:");
    console.log("  1. Run `npm install` (or `yarn install`) to install new dependencies.");
    console.log('  2. Ensure your Next.js app builds to the `/out` directory (`output: "export"` in `next.config.js`, then `npm run build` for Next.js).');
    console.log("  3. Run `npm run start:electron` to launch your Electron app.");
    console.log("  4. For packaging, consider running `npx nextjs-electron init-config` to customize builder options, then use `npm run package:electron`.");
  } catch (error) {
    console.error("\n\u274C Error during automatic setup:", error);
    console.error("   Please check the error message above. You may need to manually complete the setup or revert changes.");
    process.exit(1);
  }
});
program.command("generate-core").description("Generate a minimal Electron core application for high-resource tasks.").action(async () => {
  console.log("\u{1F527} Electron Core App Generator\n");
  const answers = await import_inquirer.default.prompt([
    {
      type: "input",
      name: "appName",
      message: "App name:",
      validate: (input) => input ? true : "App name cannot be empty."
    },
    {
      type: "input",
      name: "outputFolder",
      message: "Output folder (relative to current directory):",
      default: (ans) => ans.appName.toLowerCase().replace(/\s+/g, "-")
    },
    {
      type: "checkbox",
      name: "platforms",
      message: "Target platform(s) for packaging (select with spacebar):",
      choices: [
        { name: "Windows", value: "win", checked: process.platform === "win32" },
        { name: "macOS", value: "mac", checked: process.platform === "darwin" },
        { name: "Linux", value: "linux", checked: process.platform === "linux" }
      ],
      default: [process.platform === "win32" ? "win" : process.platform === "darwin" ? "mac" : "linux"],
      validate: (input) => input.length > 0 ? true : "Please select at least one platform."
    },
    {
      type: "confirm",
      name: "requireNode",
      message: "Does your app require Node.js runtime for performance optimization?",
      default: false
    },
    {
      type: "confirm",
      name: "enableGpu",
      message: "Enable high-resource execution mode with GPU acceleration (e.g., WebGPU)?",
      default: true
    },
    {
      type: "confirm",
      name: "useSecureConfig",
      message: "Use default secure Electron config (recommended)?",
      default: true
    },
    {
      type: "input",
      name: "additionalNotes",
      message: "Additional info or notes for README (optional):"
    }
  ]);
  const { appName, outputFolder, platforms, requireNode, enableGpu, useSecureConfig, additionalNotes } = answers;
  const appNameKebab = appName.toLowerCase().replace(/\s+/g, "-");
  const projectPath = import_path.default.resolve(process.cwd(), outputFolder);
  if (await import_fs_extra.default.pathExists(projectPath)) {
    const { overwrite } = await import_inquirer.default.prompt([{
      type: "confirm",
      name: "overwrite",
      message: `Folder "${outputFolder}" already exists. Overwrite?`,
      default: false
    }]);
    if (!overwrite) {
      console.log("Generation cancelled.");
      return;
    }
    await import_fs_extra.default.emptyDir(projectPath);
  } else {
    await import_fs_extra.default.ensureDir(projectPath);
  }
  console.log(`
Generating Electron core app '${appName}' in '${projectPath}'...`);
  const generatedPackageJson = {
    name: appNameKebab,
    version: "0.1.0",
    main: "electron-main.js",
    scripts: {
      start: "electron .",
      package: "electron-builder"
    },
    devDependencies: {
      electron: libraryPackageJson.devDependencies.electron || "^31.0.0",
      "electron-builder": libraryPackageJson.devDependencies["electron-builder"] || "^25.0.0"
    },
    dependencies: {
      "fs-extra": "^11.2.0"
    }
  };
  await import_fs_extra.default.writeJson(import_path.default.join(projectPath, "package.json"), generatedPackageJson, { spaces: 2 });
  const mainJsComments = !useSecureConfig ? `
// WARNING: You opted not to use the default secure Electron configuration during generation.
// The current configuration IS still secure by default based on your Node.js choice.
// If you intend to alter settings like contextIsolation, nodeIntegration, or sandbox manually,
// please ensure you fully understand the security implications.
// - contextIsolation: ${!requireNode} (true is more secure)
// - nodeIntegration: ${requireNode} (false is more secure in renderers)
// - sandbox: ${!requireNode} (true is more secure for renderers without Node.js integration)
` : "";
  const webPreferencesPreloadValue = `\\\`\${path.join(__dirname, 'preload.js')}\\\``;
  const cspScriptSrcExtra = requireNode ? "'unsafe-eval'" : "";
  let ipcNodeTaskHandlerString = "";
  if (requireNode) {
    ipcNodeTaskHandlerString = `
ipcMain.handle('perform-node-task', async (event, data) => {
  console.log('Node.js task invoked from renderer with:', data);
  // Example: perform a file system operation or some CPU-intensive task
  // const fs = require('fs').promises;
  // await fs.writeFile(path.join(app.getPath('userData'), 'node_task_output.txt'), JSON.stringify(data));
  return { result: 'Node.js task completed successfully at ' + new Date().toISOString(), received: data };
});
`;
  }
  const mainJsContent = `
const { app, BrowserWindow, ipcMain, shell, session } = require('electron');
const path = require('path');
const fs = require('fs-extra'); // For loading .electronrc.json
${mainJsComments}
let mainWindow;

// Default configuration, can be overridden by .electronrc.json
const defaultConfig = {
  appName: '${appName}',
  appId: 'com.example.${appNameKebab}',
  enableGpu: ${enableGpu},
  windowOptions: {
    width: 800,
    height: 600,
    show: process.env.NODE_ENV !== 'production',
    webPreferences: {
      preload: ${webPreferencesPreloadValue},
      contextIsolation: ${!requireNode},
      nodeIntegration: ${requireNode},
      sandbox: ${!requireNode},
    }
  },
  csp: "default-src 'self'; script-src 'self' ${cspScriptSrcExtra}; style-src 'self' 'unsafe-inline'; img-src 'self' data:;",
};

async function loadUserConfig() {
  try {
    const userConfigPath = path.join(__dirname, '.electronrc.json');
    if (await fs.pathExists(userConfigPath)) {
      const userConfig = await fs.readJson(userConfigPath);
      const merge = (target, source) => {
        for (const key of Object.keys(source)) {
          if (source[key] instanceof Object && key in target && target[key] instanceof Object) {
            Object.assign(source[key], merge(target[key], source[key]));
          }
        }
        Object.assign(target || {}, source);
        return target;
      }
      return merge(JSON.parse(JSON.stringify(defaultConfig)), userConfig);
    }
  } catch (err) {
    console.warn('Warning: Error loading .electronrc.json, using defaults:', err.message);
  }
  return defaultConfig;
}

async function createWindow() {
  const config = await loadUserConfig();

  if (config.enableGpu) {
    app.commandLine.appendSwitch('enable-unsafe-webgpu');
    app.commandLine.appendSwitch('enable-features', 'Vulkan,UseSkiaRenderer');
    console.log('GPU acceleration flags enabled (WebGPU related).');
  }

  if (config.appId && process.platform === 'win32') {
    app.setAppUserModelId(config.appId);
  }

  mainWindow = new BrowserWindow(config.windowOptions);
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  if (process.env.NODE_ENV !== 'production' && config.windowOptions.show) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [config.csp],
      },
    });
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http:') || url.startsWith('https:')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });
}
${ipcNodeTaskHandlerString}
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
    `;
  await import_fs_extra.default.writeFile(import_path.default.join(projectPath, "electron-main.js"), mainJsContent.trim());
  let preloadNodeTaskChannelString = "";
  if (requireNode) {
    preloadNodeTaskChannelString = ", 'perform-node-task'";
  }
  const preloadJsContent = `
const { contextBridge, ipcRenderer } = require('electron');

const validInvokeChannels = ['get-app-name'${preloadNodeTaskChannelString}];

contextBridge.exposeInMainWorld('electronAPI', {
  invoke: (channel, ...args) => {
    if (validInvokeChannels.includes(channel)) {
      return ipcRenderer.invoke(channel, ...args);
    }
    console.warn(\\\`Blocked invoke on invalid channel: \${channel}\\\`);
    return Promise.reject(new Error(\\\`Invalid invoke channel: \${channel}\\\`));
  }
});
console.log('Preload script for "${appName}" loaded. electronAPI exposed to window.');
    `;
  await import_fs_extra.default.writeFile(import_path.default.join(projectPath, "preload.js"), preloadJsContent.trim());
  let indexHtmlNodeButtonString = "";
  if (requireNode) {
    indexHtmlNodeButtonString = `<button id="test-ipc-node-task">Test Node.js IPC</button>`;
  }
  let indexHtmlNodeScriptString = "";
  if (requireNode) {
    indexHtmlNodeScriptString = `
          const testNodeButton = document.getElementById('test-ipc-node-task');
          if (testNodeButton) {
            testNodeButton.addEventListener('click', async () => {
              try {
                const result = await window.electronAPI.invoke('perform-node-task', { data: 'Sample data from renderer at ' + new Date().toLocaleTimeString() });
                statusDiv.textContent = \\\`Node.js Task Result: \${JSON.stringify(result)}\\\`;
              } catch (e) {
                statusDiv.textContent = \\\`Error invoking perform-node-task: \${e.message}\\\`;
                console.error('IPC Error (perform-node-task):', e);
              }
            });
          }
          `;
  }
  const indexHtmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${appName} - Core Logic</title>
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #1e1e1e; color: #e0e0e0; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; margin: 0; text-align: center; padding: 20px; box-sizing: border-box; }
        .container { padding: 30px; border-radius: 10px; background-color: #2a2a2a; box-shadow: 0 5px 15px rgba(0,0,0,0.3); max-width: 600px; }
        h1 { color: #76d7c4; margin-top: 0; }
        p { font-size: 1em; line-height: 1.6; }
        #status { margin-top: 20px; font-style: italic; color: #aaa; font-size: 0.9em; }
        .controls { margin-top: 20px; display: flex; gap: 10px; justify-content: center;}
        button { background-color: #76d7c4; color: #121212; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; font-size: 0.9em; transition: background-color 0.2s; }
        button:hover { background-color: #5facaa; }
        code { background-color: #333; padding: 2px 5px; border-radius: 3px; font-family: 'Courier New', Courier, monospace; }
    </style>
</head>
<body>
    <div class="container">
        <h1>${appName} - Core</h1>
        <p>This Electron application is running its core logic. The window is primarily for status display or development debugging, and can be hidden in production (set \\\`show: false\\\` in \\\`.electronrc.json\\\` or \\\`electron-main.js\\\`).</p>
        <div id="status">Initializing Electron core...</div>
        <div class="controls">
          <button id="test-ipc-app-name">Test IPC (Get App Name)</button>
          ${indexHtmlNodeButtonString}
        </div>
    </div>
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        const statusDiv = document.getElementById('status');
        if (window.electronAPI && window.electronAPI.invoke) {
          statusDiv.textContent = 'Electron API available via window.electronAPI.';
          
          document.getElementById('test-ipc-app-name').addEventListener('click', async () => {
            try {
              const name = await window.electronAPI.invoke('get-app-name'); // 'get-app-name' is not handled by default in generated main.js
                                                                          // but can be added by the user. This is a placeholder.
              statusDiv.textContent = \\\`App Name from Main (example): \${name || '${appName}'}\\\`;
            } catch (e) {
              statusDiv.textContent = \\\`Error invoking get-app-name: \${e.message}. (Note: 'get-app-name' IPC handler is an example to be implemented by user if needed.)\\\`;
              console.error('IPC Error (get-app-name):', e);
            }
          });
          ${indexHtmlNodeScriptString}
        } else {
          statusDiv.textContent = 'Error: window.electronAPI not found. Check preload script, contextIsolation, and console for errors.';
          console.error('window.electronAPI is not available.');
        }
      });
    </script>
</body>
</html>
    `;
  await import_fs_extra.default.writeFile(import_path.default.join(projectPath, "index.html"), indexHtmlContent.trim());
  let securityConfigNote = "";
  if (!useSecureConfig) {
    securityConfigNote = `
### Security Configuration Note
You indicated during generation that you might not want the "default secure Electron configuration".
While this generator prioritizes security, the key settings in \\\`electron-main.js\\\`'s \\\`webPreferences\\\` are:
- \\\`contextIsolation: ${!requireNode}\\\` (true is more secure)
- \\\`nodeIntegration: ${requireNode}\\\` (false is more secure in renderers)
- \\\`sandbox: ${!requireNode}\\\` (true is more secure for renderers without Node.js integration)

These are set based on your choice for Node.js runtime access. If you need to change these for specific advanced use cases, please ensure you understand the security implications. Refer to the official Electron security documentation.
`;
  }
  let platformPackagingInstructions = "npm run package";
  if (platforms && platforms.length > 0) {
    const platformFlags = platforms.map((p) => ` --${p}`).join("");
    platformPackagingInstructions = `npm run package --${platformFlags}`;
  }
  const nodeIntegrationDetails = requireNode ? `This application is configured with Node.js integration enabled in the renderer process (\\\`nodeIntegration: true\\\`, \\\`contextIsolation: false\\\`, \\\`sandbox: false\\\`).
    - This allows direct use of Node.js APIs in your renderer-side scripts (if any loaded by \\\`index.html\\\`) for performance-critical tasks.
    - **Security Note**: This configuration carries security risks if you load remote or untrusted content. Ensure you understand these implications. For pure core logic or trusted local content, this can be acceptable.
    - APIs from the main process can be exposed securely via \\\`preload.js\\\` using \\\`contextBridge\\\` and \\\`ipcRenderer.invoke\\\`. The example 'perform-node-task' demonstrates this.` : `Node.js integration in the renderer process is disabled by default for enhanced security (\\\`nodeIntegration: false\\\`, \\\`contextIsolation: true\\\`, \\\`sandbox: true\\\`).
    - For any Node.js-dependent tasks, use IPC (Inter-Process Communication) like \\\`ipcRenderer.invoke\\\` to request the main process to perform those operations. The \\\`preload.js\\\` script is where you define the secure bridge (\\\`window.electronAPI\\\`) for this communication.`;
  const gpuAccelerationDetails = enableGpu ? `GPU acceleration flags (e.g., for WebGPU) have been enabled in \\\`electron-main.js\\\` via \\\`app.commandLine.appendSwitch\\\`.
    - You can leverage WebGPU in your renderer process scripts for GPU compute tasks if the minimal \\\`index.html\\\` loads such scripts.
    - Ensure your target system's drivers support WebGPU.
    - Consult WebGPU API documentation and Electron/Chromium documentation for details on specific flags and usage.` : `GPU acceleration (e.g., WebGPU) is not explicitly enabled by default in the generated config. You can enable it by:
    1. Setting \\\`enableGpu: true\\\` in your \\\`.electronrc.json\\\` or modifying \\\`defaultConfig\\\` in \\\`electron-main.js\\\`.
    2. Ensuring appropriate command line switches (e.g., \\\`enable-unsafe-webgpu\\\`) are appended in \\\`electron-main.js\\\` if you modify it directly.`;
  const readmeContent = `
# ${appName} - Electron Core Application

Generated by \\\`nextjs-electron generate-core\\\` CLI.
This is a minimal Electron application designed for core logic, background tasks, and high-resource operations, potentially leveraging Node.js and GPU acceleration. It includes no specific UI framework.

## Selected Configuration
- **Target Platforms for Packaging**: ${platforms.join(", ") || "Not specified, defaults to current OS"}
- **Node.js Runtime Required**: ${requireNode ? "Yes" : "No"}
- **GPU Acceleration Enabled**: ${enableGpu ? "Yes" : "No"}
${additionalNotes ? `
## Additional Notes from Generator
${additionalNotes}
` : ""}
## Getting Started

1.  Dependencies were installed automatically by the generator. If you encounter issues, navigate to this directory (\\\`${outputFolder}\\\`) and run:
    \\\`\\\`\\\`bash
    npm install
    \\\`\\\`\\\`

2.  The application attempted to start automatically after generation. To run it manually:
    \\\`\\\`\\\`bash
    npm start
    \\\`\\\`\\\`
    This command executes \\\`electron .\\\`.

## Configuration

The application's primary configuration is in \\\`electron-main.js\\\`. You can create a \\\`.electronrc.json\\\` file in this project's root directory to override specific settings (like window size, or whether the window is shown) without modifying \\\`electron-main.js\\\` directly.

Example \\\`.electronrc.json\\\`:
\\\`\\\`\\\`json
{
  "appName": "My Custom Core App Name",
  "windowOptions": {
    "width": 1024,
    "height": 768,
    "show": true
  },
  "csp": "default-src 'self'; script-src 'self' https://trusted.cdn.com; object-src 'none';"
}
\\\`\\\`\\\`
Review \\\`electron-main.js\\\` to see how \\\`defaultConfig\\\` and \\\`.electronrc.json\\\` are merged.
${securityConfigNote}
## Packaging for Distribution

To package this application for distribution:
1.  **Set up \\\`electron-builder\\\` configuration**:
    *   A basic \\\`electron-builder.config.js\\\` is NOT generated by default to keep this core app minimal.
    *   You will need to create one. You can start by running \\\`npx nextjs-electron init-config\\\` inside this project directory (\\\`${outputFolder}\\\`). This will create an \\\`electron-builder.user.config.js\\\`. Rename or copy it to \\\`electron-builder.config.js\\\`.
    *   **Crucially, customize** fields like \\\`appId\\\`, \\\`productName\\\`, icons, copyright, and signing details specific to *this core application*.
2.  **Run the package script**:
    To build for your selected target platforms (${platforms.join(", ") || "current OS"} if specified, otherwise current OS):
    \\\`\\\`\\\`bash
    ${platformPackagingInstructions}
    \\\`\\\`\\\`

    To build for specific platforms individually (recommended if not on macOS for multi-target builds, or to override selection):
    ${platforms.map((p) => `- For ${p}: \\\`npm run package -- --${p}\\\``).join("\n    ")}
    (Example for Windows: \\\`npm run package -- --win\\\`)

    For more advanced packaging options, consult the \\\`electron-builder\\\` documentation.

## Node.js Integration
${nodeIntegrationDetails}

## GPU Acceleration ${enableGpu ? "(WebGPU Flags Enabled)" : ""}
${gpuAccelerationDetails}

## Best Practices for High-Resource Core Apps
-   **Headless Operation**: If no UI is needed, configure \\\`windowOptions: { show: false }\\\` in \\\`.electronrc.json\\\` or \\\`electron-main.js\\\`.
-   **Web Workers**: For CPU-intensive JavaScript tasks in the renderer (if used), offload to Web Workers.
-   **Electron's \\\`utilityProcess\\\`**: For Node.js tasks that need a completely separate process without browser overhead, consider Electron's \\\`utilityProcess\\\`.
-   **Efficient IPC**: Use \\\`ipcRenderer.invoke\\\` for request-response. For very large data, explore shared memory or temporary files.
-   **Resource Management**: Monitor CPU/memory usage. Be mindful of cleanup for long-running processes.
-   **Security**: Regularly review Electron security best practices. Keep Electron and its dependencies updated.
    `;
  await import_fs_extra.default.writeFile(import_path.default.join(projectPath, "README.md"), readmeContent.trim());
  const electronRcJsonContent = {
    note: `This is an example .electronrc.json for ${appName}. It overrides defaults in electron-main.js.`,
    appName,
    windowOptions: {
      width: 900,
      height: 700,
      show: true
    }
  };
  await import_fs_extra.default.writeJson(import_path.default.join(projectPath, ".electronrc.json"), electronRcJsonContent, { spaces: 2 });
  console.log(`
\u2705 Core Electron app '${appName}' generated successfully in '${projectPath}'.`);
  try {
    console.log("\n\u{1F4E6} Installing dependencies... (This might take a moment)");
    (0, import_child_process.execSync)("npm install", { cwd: projectPath, stdio: "inherit" });
    console.log("\u2705 Dependencies installed.");
    console.log(`
\u{1F680} Attempting to start the generated Electron app ('npm start')...`);
    (0, import_child_process.execSync)("npm start", { cwd: projectPath, stdio: "inherit" });
    console.log(`\u2705 Electron app '${appName}' launched (or an attempt was made).`);
    console.log(`   If it didn't start as expected, check the output above or run 'npm start' manually in the '${outputFolder}' directory.`);
  } catch (error) {
    console.error(`
\u274C Error during post-generation steps (npm install or npm start):`, error);
    console.log(`   Please try running 'npm install' and then 'npm start' manually in the '${projectPath}' directory.`);
  }
  console.log("\nNext steps for packaging:");
  console.log(`  1. Navigate to the project: cd ${outputFolder}`);
  console.log(`  2. Create and customize an 'electron-builder.config.js'. You can start with:`);
  console.log(`     npx nextjs-electron init-config`);
  console.log(`     (Then rename/move electron-builder.user.config.js to electron-builder.config.js and customize it for *this core app*)`);
  console.log(`  3. To package for your selected platforms (${platforms.join(", ") || "current OS"}):`);
  console.log(`     Run '${platformPackagingInstructions}'`);
  console.log(`     Or for individual platforms, e.g., 'npm run package -- --win'`);
  console.log("\nHappy building!");
});
async function run() {
  try {
    await program.parseAsync(process.argv);
  } catch (error) {
    console.error("CLI Error:", error);
    process.exit(1);
  }
}
if (require.main === module) {
  run();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  nextjsElectronCLI
});
//# sourceMappingURL=cli.js.map