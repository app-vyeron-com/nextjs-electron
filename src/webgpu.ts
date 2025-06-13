/**
 * @fileOverview WebGPU helper functions.
 * Manages enabling WebGPU features in Electron.
 */

import type { App } from 'electron';
import type { WebGPUConfig } from './config'; // Assuming WebGPUConfig is defined

/**
 * Enables WebGPU related Chromium flags.
 * This function should be called before the 'ready' event of the app.
 *
 * @param app - The Electron App instance.
 * @param config - WebGPU configuration options.
 */
export function enableWebGPU(app: App, config: WebGPUConfig): void {
  if (!app.isReady()) {
    // Required for WebGPU
    app.commandLine.appendSwitch('enable-features', 'Vulkan,UseSkiaRenderer'); // Skia is often default, Vulkan might be needed on Linux/Windows
    app.commandLine.appendSwitch('enable-unsafe-webgpu'); // This flag is essential

    if (config.forceSoftware) {
      app.commandLine.appendSwitch('disable-gpu'); // Forces software rendering, implies no WebGPU hardware acceleration
    }
    
    // Set ANGLE graphics backend (useful on Windows, can try 'd3d11', 'd3d9', 'opengl', 'metal')
    // app.commandLine.appendSwitch('use-angle', 'default'); 

    // For WebGPU power preference
    if (config.powerPreference && config.powerPreference !== 'default') {
         // There isn't a direct command-line switch for powerPreference for WebGPU adapter options.
         // This is typically handled at the WebGPU API level when requesting an adapter.
         // However, some GPU driver settings or general Chromium flags might influence this.
         // For example, on systems with multiple GPUs:
         // app.commandLine.appendSwitch('gpu-startup-dialog'); // For debugging GPU selection
         console.info(`WebGPU powerPreference '${config.powerPreference}' is set. This is primarily handled by the WebGPU adapter request in renderer code.`);
    }
    
    console.log('WebGPU flags enabled. Note: Actual WebGPU availability depends on hardware, drivers, and OS.');

  } else {
    console.warn('enableWebGPU called after app is ready. WebGPU flags may not apply.');
  }
}

/**
 * Checks if WebGPU is likely to be available.
 * This is a heuristic check, true availability is confirmed in the renderer.
 * @param app - The Electron App instance.
 * @returns True if WebGPU flags are set, false otherwise.
 */
export function isWebGPUEnabled(app: App): boolean {
  return app.commandLine.hasSwitch('enable-unsafe-webgpu');
}
