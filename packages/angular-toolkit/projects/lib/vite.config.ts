import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import { playwright } from '@vitest/browser-playwright';
import { resolve } from 'path';

export default defineConfig(({ mode }) => ({
  root: __dirname,
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
      fileName: () => `fesm2022/brightsparklabs-angular-toolkit.mjs`,

      // Publish as ESM package
      formats: ['es'],
    },
    emptyOutDir: true,
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
    name: '@brightsparklabs/angular-toolkit/lib',
    globals: true,
    setupFiles: [resolve(__dirname, '../test-setup.ts')],
    reporters: ['default'],
    browser: {
      enabled: true,
      headless: true,
      screenshotFailures: false,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
}));
