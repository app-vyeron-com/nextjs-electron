import type { Options } from 'tsup';

export const tsup: Options = {
  entry: {
    index: 'src/index.ts', // Library exports
    main: 'src/main.ts',   // Electron main process entry
    preload: 'src/preload.ts', // Preload script
    cli: 'src/cli.ts',     // CLI tool
  },
  format: ['cjs', 'esm'],
  dts: true, // Generate .d.ts files
  splitting: false, // Keep a single file per entry point for CJS/ESM if possible
  sourcemap: true,
  clean: true, // Clean output directory before build
  minify: false, // Minification can be enabled for production builds
  target: 'es2022', // Match tsconfig target
  outDir: 'dist',
  banner: {
    js: "'use strict';", // Add 'use strict' for CJS
  },
  // onSuccess: async () => {
  //   console.log('Build successful!');
  // },
};
