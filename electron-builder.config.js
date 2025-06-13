/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  appId: "com.example.nextjselectronapp", // CHANGE THIS: Your app's unique ID
  productName: "My Next.js Electron App", // CHANGE THIS: Your app's name
  directories: {
    output: "dist-electron", // Output directory for packaged app
    buildResources: "buildResources", // Optional: for icons, etc.
    app: ".", // Points to the root of the project where package.json is
  },
  files: [
    "dist/main.js", // Bundled Electron main process
    "dist/preload.js", // Bundled preload script
    "package.json", // Crucial for electron-builder
    "out/**/*" // Include the Next.js static export
  ],
  // Main entry for electron-builder MUST point to the library's bundled main.js
  // This assumes the user's package.json's "main" field points here,
  // or this config is used via the library's CLI.
  // When packaging from the library itself for testing, it would be 'dist/main.js'.
  // When a user packages their app, they might set their project's package.json "main" to "node_modules/nextjs-electron/dist/main.js"
  // or the library provides a CLI.
  // For simplicity, we assume this config is used in a project that has nextjs-electron as a dependency.
  // The effective 'main' for electron-builder will be determined by the package.json it finds in `directories.app`.
  // If this file is used by a consuming project, that project's package.json "main" should be "node_modules/nextjs-electron/dist/main.js"
  // main: "node_modules/nextjs-electron/dist/main.js", // This is usually set in the consuming project's package.json
  
  win: {
    target: ["nsis", "msix"],
    icon: "buildResources/icon.ico", // Provide your icon
    publisherName: "Your Publisher Name", // Required for MSIX
  },
  mac: {
    target: ["dmg", "zip"],
    icon: "buildResources/icon.icns", // Provide your icon
  },
  linux: {
    target: ["AppImage", "deb"],
    icon: "buildResources/icon.png", // Provide your icon
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
  },
  msix: {
    identityName: "YourCompany.YourAppName", // CHANGE THIS
    publisherDisplayName: "Your Publisher Display Name", // CHANGE THIS
    publisher: "CN=YOUR_MS_PUBLISHER_ID", // CHANGE THIS: e.g., CN=12345678-ABCD-1234-ABCD-1234567890AB
    // Ensure you have a valid code signing certificate for MSIX
  },
  asar: true, // Package app into an asar archive
  extraMetadata: {
    // This 'main' field in extraMetadata will be written into the packaged app's package.json
    // It should point to the library's main process entry point *within the asar archive*.
    main: "dist/main.js",
  }
};

module.exports = config;
