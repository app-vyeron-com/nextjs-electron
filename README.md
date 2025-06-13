# nextjs-electron

A clean, framework-agnostic, and highly modular Electron library to bootstrap your Next.js static exports (from the `/out` directory) into secure, production-ready desktop applications.

This module is lightweight, UI-agnostic, designed for Windows Store (MSIX) compatibility, and fully prepared for npm publishing.

## Features

-   **Static Export Bootstrapping**: Automatically loads Next.js static `/out` directory.
-   **Security by Default**: Enforces context isolation, disables Node integration in renderers, strict IPC, and configurable CSP.
-   **Windows Store Ready**: Generates MSIX-compatible builds.
-   **Modular Architecture**: Main process controller, preload script, IPC router, config loader.
-   **WebGPU Support (Optional)**: Opt-in WebGPU capabilities.
-   **Production Ready**: Optimized for npm distribution.

## Installation

```bash
npm install nextjs-electron
# or
yarn add nextjs-electron
```

You will also need `electron` as a peer dependency in your project:
```bash
npm install --save-dev electron
# or
yarn add --dev electron
```

## Quick Start

1.  **Export your Next.js app**:
    Ensure your `next.config.js` has `output: 'export'` and run:
    ```bash
    npx next build
    ```
    This will generate an `/out` directory.

2.  **Create an Electron main file (e.g., `electron-main.js`) in your project root**:

    ```javascript
    // electron-main.js
    // This file will be the entry point for Electron in your project.
    // It will use the nextjs-electron library.

    // For CJS environment:
    // const { launchApp } = require('nextjs-electron');
    // For ESM environment (if your project package.json has "type": "module"):
    // import { launchApp } from 'nextjs-electron';

    // Dynamically import based on environment to support both
    async function start() {
      const { launchApp } = await (eval('typeof module === "undefined" ? import("nextjs-electron") : Promise.resolve(require("nextjs-electron"))'));
      
      launchApp({
        appUrl: '../out/index.html', // Relative path from dist/main.js to your Next.js out/index.html
        // Or provide an absolute path:
        // appUrl: require('path').join(__dirname, 'out', 'index.html'), 
        productName: 'My Awesome App',
        appId: 'com.myawesomeapp.app',
        // Add other configurations as needed
      });
    }

    start();
    ```
    *Note on `appUrl`*: The path should be relative to where `nextjs-electron`'s `main.js` will eventually run from within the packaged app (usually `dist/main.js` inside the ASAR archive, relative to the project root). Or, provide an absolute path derived at runtime.

3.  **Update your project's `package.json`**:

    ```json
    {
      "name": "my-electron-app",
      "version": "1.0.0",
      "main": "electron-main.js", // Electron entry point for development
      "scripts": {
        "start:electron": "electron .",
        // For packaging, use the library's electron-builder config or your own
        "package": "electron-builder --config node_modules/nextjs-electron/electron-builder.config.js"
        // OR set up your own electron-builder.js and customize fully
      },
      "devDependencies": {
        "electron": "^28.0.0", // Or your desired version
        "electron-builder": "^24.0.0" // Or your desired version
      },
      "dependencies": {
        "nextjs-electron": "file:./nextjs-electron" // Or from npm once published
      }
    }
    ```
    *Important for packaging*: The `electron-builder.config.js` provided by `nextjs-electron` is a template. You might need to copy and customize it in your project, especially for `appId`, `productName`, icons, and signing information. The `main` field used by `electron-builder` (defined in `extraMetadata.main` in the builder config, or your project's `package.json` `main` field if not using `extraMetadata`) should point to `node_modules/nextjs-electron/dist/main.js`.

4.  **Run your Electron app**:
    ```bash
    npm run start:electron # or yarn start:electron
    ```

5.  **Package your app**:
    ```bash
    npm run package # or yarn package
    ```

## Configuration

The `launchApp` function accepts a configuration object. See `src/config.ts` for available options and their defaults. You can customize:
- Window options (width, height, title, etc.)
- Security settings (CSP)
- WebGPU enablement
- Path to your Next.js `/out/index.html`

Example:
```javascript
launchApp({
  windowOptions: {
    width: 1200,
    height: 800,
    title: 'My Custom App Title',
  },
  appUrl: `file://${require('path').join(__dirname, '..', 'out', 'index.html')}`, // Adjust path as needed
  security: {
    csp: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';"
  },
  enableWebGPU: true,
});
```

## Development of `nextjs-electron` library

To develop this library itself:
1. Clone the repository.
2. `cd nextjs-electron`
3. `npm install`
4. `npm run dev` (to build in watch mode with tsup)
5. To test the library directly with Electron (you might need a sample `out` folder):
   `npm run start:electron`
   (This will run `electron dist/main.js`)

## CLI

This library also provides a basic CLI tool.
(To be detailed once CLI functionality is fully implemented)

```bash
npx nextjs-electron --help
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
Ensure your code follows linting and formatting guidelines.

## License

MIT
"# nextjs-electron" 
