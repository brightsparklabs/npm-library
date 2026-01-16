import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import angular from '@analogjs/vite-plugin-angular';
import { playwright } from '@vitest/browser-playwright';
import { resolve } from 'path';

export default defineConfig(({ mode }) => ({
  root: __dirname,
  plugins: [
    analog({
      ssr: false,
      static: true,
      liveReload: true,
      prerender: {
        routes: [],
      },
    }),
    angular(),
  ],
  build: {
    target: ['es2022'],
  },
  test: {
    name: '@brightsparklabs/angular-toolkit/dev',
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
