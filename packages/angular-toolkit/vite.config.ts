/// <reference types="vitest" />

import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig(({ mode }) => ({
  root: __dirname,
  cacheDir: './node_modules/.vite/libs/angular-toolkit',
  plugins: [angular()],
  resolve: {
    mainFields: ['module'],
  },
  build: {
    target: ['esnext'],
    sourcemap: true,
    lib: {
      // Library entry point
      entry: 'src/public-api.ts',

      // Package output path, must contain fesm2022
      fileName: `fesm2022/angular-toolkit`,

      // Publish as ESM package
      formats: ['es'],
    },
    rollupOptions: {
      // Add external libraries that should be excluded from the bundle
      external: [/^@angular\/.*/, 'rxjs', 'rxjs/operators'],
      output: {
        // Produce a single file bundle
        preserveModules: false,
      },
    },
    minify: false,
  },
  test: {
    name: '@brightsparklabs/angular-toolkit',
    globals: true,
    setupFiles: ['src/test-setup.ts'],
    reporters: ['default'],
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
}));
