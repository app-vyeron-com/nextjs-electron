# nextjs-electron

[![NPM version](https://img.shields.io/npm/v/nextjs-electron.svg?style=flat-square)](https://www.npmjs.com/package/nextjs-electron)
[![NPM downloads](https://img.shields.io/npm/dm/nextjs-electron.svg?style=flat-square)](https://www.npmjs.com/package/nextjs-electron)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A clean, framework-agnostic, and highly modular Electron library to bootstrap your Next.js static exports (from the `/out` directory) into secure, production-ready desktop applications.

This module is lightweight, UI-agnostic, designed for Windows Store (MSIX) compatibility, and fully prepared for npm publishing. It offers both a powerful CLI for automatic project setup and core app generation, and a flexible library for manual integration.

## Features

- **🚀 Automatic Next.js Project Setup**: Use the `setup-project` CLI command to instantly integrate Electron into your existing Next.js project.
- **⚙️ Core Electron App Generator**: Scaffold a minimal, no-UI Electron app for background tasks or high-resource operations with the `generate-core` CLI command.
- **📦 Static Export Bootstrapping**: Seamlessly loads your Next.js static `/out` directory.
- **🛡️ Security by Default**: Enforces context isolation, disables Node.js integration in renderers by default, provides strict IPC, and configurable CSP.
- **🖥️ Cross-Platform Packaging**: Easily generate installers for Windows (MSIX), macOS, and Linux using `electron-builder`, guided by CLI configurations.
- **🧩 Modular & Extensible Library**: For manual control, offers a clean architecture: main process controller, secure preload script, and type-safe IPC.
- **☁️ Integrated Auto-Updates**: Keep your application current with built-in support for `electron-updater`.
- **⚡ WebGPU Support (Optional)**: Opt-in WebGPU capabilities for high-performance graphics or compute tasks.
- **⚖️ NPM Optimized & Lightweight**: Published to NPM with CJS/ESM support and TypeScript declarations.

## Installation

First, install `nextjs-electron` along with its peer dependencies `electron` and `electron-builder` (for packaging):

```bash
npm install nextjs-electron electron electron-builder
# or
yarn add nextjs-electron electron electron-builder
```

## Getting Started

Choose the path that best suits your needs:

### Option 1: Automatic Setup for Existing Next.js Project (Recommended for Quick Integration)

If you have an existing Next.js project (configured for static export to an `/out` directory), this is the fastest way to get started.

1.  **Navigate to your Next.js project root directory.**
2.  **Run the `setup-project` command:**

    ```bash
    npx nextjs-electron setup-project
    ```

    The CLI will prompt you for:

    - Your application name (e.g., "My Awesome App")
    - Your application ID (e.g., "com.mycompany.myawesomeapp")

    It will then automatically:

    - Add/update `electron`, `electron-builder`, and `nextjs-electron` in your `package.json`.
    - Set the `main` field in `package.json` to `electron-main.js`.
    - Add `start:electron` and `package:electron` scripts to your `package.json`.
    - Create a basic `electron-main.js` file in your project root, pre-configured with your app name and ID.

3.  **Install new dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
4.  **Build your Next.js app (if you haven't already):**
    Make sure your `next.config.js` has `output: 'export'`.
    ```bash
    npx next build
    ```
5.  **Launch your Electron app:**
    ```bash
    npm run start:electron
    ```
6.  **For packaging**, consider initializing a custom builder config:
    ```bash
    npx nextjs-electron init-config
    ```
    Then package using:
    ```bash
    npm run package:electron
    ```

### Option 2: Generate a Minimal Core Electron App (for Background Tasks)

If you need a new, standalone Electron application without a UI (e.g., for backend processing, automation tasks, or high-resource computations), use the `generate-core` command.

1.  **Navigate to the directory where you want to create the new app folder.**
2.  **Run the `generate-core` command:**

    ```bash
    npx nextjs-electron generate-core
    ```

    The CLI will guide you through prompts to configure:

    - Target platform(s) for packaging (Windows, macOS, Linux)
    - App name
    - Output folder path
    - Node.js runtime requirement for performance
    - GPU acceleration (WebGPU) enablement
    - Use of default secure Electron configuration
    - Optional additional notes for the README

    The generator will scaffold a complete, minimal Electron project in the specified output folder. It then automatically runs `npm install` and attempts to `npm start` the new application.

3.  **Follow the instructions in the generated `README.md`** within your new app's folder for customization and packaging.

### Option 3: Manual Setup (Full Control)

For maximum control over the integration process:

1.  **Prepare Your Next.js App**:
    Ensure your `next.config.js` (or `.ts`) has `output: 'export'` and run:

    ```bash
    npx next build
    ```

    This generates the static `/out` directory.

2.  **Create an Electron Entry Point (`electron-main.js`)**:
    In your project root, create `electron-main.js`:

    ```javascript
    // electron-main.js
    const path = require("path");

    async function start() {
      // Dynamically import launchApp to support both CJS and ESM projects
      const { launchApp } = await eval(
        'typeof module === "undefined" ? import("nextjs-electron") : Promise.resolve(require("nextjs-electron"))'
      );

      // For development, an absolute path to your Next.js 'out' directory is robust.
      const devAppUrl = `file://\${path.join(__dirname, 'out', 'index.html')}`;
      // For packaged apps, nextjs-electron's default appUrl is usually sufficient if your 'out' dir is standard.

      launchApp({
        // appUrl: devAppUrl, // Uncomment and adjust if needed for local dev.
        productName: "My Awesome Next.js App", // IMPORTANT: Change this!
        appId: "com.mycompany.myawesomenextjsapp", // IMPORTANT: Change this!
        // Add other configurations as needed, see documentation or src/config.ts in the library.
      });
    }

    start();
    ```

    _Important_: Customize `productName` and `appId`.

3.  **Update `package.json`**:
    Set the `main` field to your Electron entry file (e.g., `electron-main.js`). Add scripts:

    ```json
    {
      "name": "my-electron-nextjs-app",
      "version": "1.0.0",
      "main": "electron-main.js",
      "scripts": {
        "start:electron": "electron .",
        "package:electron": "nextjs-electron package"
        // Optional: "package:electron:user": "nextjs-electron package --config electron-builder.user.config.js"
      }
      // ... your existing dependencies and devDependencies
      // Ensure nextjs-electron, electron, and electron-builder are listed.
    }
    ```

4.  **Develop & Test**:

    ```bash
    npm run start:electron
    ```

5.  **Package for Distribution**:
    For advanced packaging options (icons, signing, etc.), initialize an `electron-builder` configuration:
    ```bash
    npx nextjs-electron init-config
    ```
    This creates `electron-builder.user.config.js`. Review and customize this file. If you rename it to `electron-builder.config.js`, the `package:electron` script will use it.
    Then, package your app:
    ```bash
    npm run package:electron
    # Or target specific platforms:
    # npx nextjs-electron package --win --mac
    ```

## CLI Commands

`nextjs-electron` provides a versatile CLI:

- `npx nextjs-electron --help`: Displays all available commands and options.

- **`setup-project`**:
  Automatically configures an existing Next.js project for `nextjs-electron`.

  - Prompts for `productName` and `appId`.
  - Modifies `package.json` (adds dependencies, main field, scripts).
  - Creates a template `electron-main.js`.

- **`generate-core`**:
  Generates a new, minimal standalone Electron application for core logic or background tasks.

  - Interactive prompts for app name, output folder, platforms, Node.js integration, GPU acceleration, etc.
  - Creates `package.json`, `electron-main.js`, `preload.js`, `index.html` (minimal), `.electronrc.json` (config template), and a detailed `README.md`.
  - Automatically runs `npm install` and `npm start` in the new project.

- **`package`**:
  Packages your Electron application using `electron-builder`.

  - `--config <path>`: Specify a custom `electron-builder` configuration file.
  - `--mac`, `--win`, `--linux`: Target specific platforms.
  - `--publish <mode>`: Set publish mode (e.g., "onTagOrDraft").
    The command will look for `electron-builder.config.js` or `electron-builder.user.config.js` in your project root. If not found, it uses the library's default (not recommended for production).

- **`init-config`**:
  Copies the default `electron-builder.config.js` from the library to your project root as `electron-builder.user.config.js`, allowing for easy customization.

- **`launch`**:
  Launches the Electron app using your project's `electron-main.js` (typically `electron .`). Useful for quick development launches.

## Library Usage (`launchApp` Configuration)

The `launchApp` function is the core of the library when used manually. It accepts a configuration object to customize various aspects of your Electron application.

```javascript
// Example: electron-main.js
const { launchApp } = require("nextjs-electron"); // Or import for ESM

launchApp({
  productName: "My Custom App Title",
  appId: "com.custom.app",
  windowOptions: {
    width: 1200,
    height: 800,
    // title: 'Overridden by productName, but can be set if productName is not used for window title'
  },
  appUrl: `file://\${require('path').join(__dirname, 'out', 'index.html')}`, // Adjust path as needed
  security: {
    csp: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';",
  },
  enableWebGPU: true, // Enable WebGPU related flags
  updater: {
    // Configure electron-updater
    autoDownload: true,
    autoInstallOnAppQuit: true,
  },
  logLevel: "debug", // Set log level for electron-log
  // See 'src/config.ts' in the library for all available options and their defaults.
});
```

For detailed configuration options, please refer to the `ElectronConfig` type and `getDefaultConfig` function within the library's `src/config.ts` file.

## Development of `nextjs-electron` (This Library)

To develop this library itself:

1.  Clone the repository: `git clone https://github.com/app-vyeron-com/nextjs-electron.git`
2.  `cd nextjs-electron`
3.  `npm install`
4.  `npm run dev` (to build in watch mode with tsup)
5.  To test the library's main process directly with Electron (you might need a sample `out` folder or use the `generate-core` command to create one):
    `npm run start:electron` (This will run `electron dist/main.js` which is the library's own main entry for testing)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/app-vyeron-com/nextjs-electron).
Ensure your code follows linting and formatting guidelines (`npm run lint`, `npm run typecheck`).

## License

[MIT](https://opensource.org/licenses/MIT)
