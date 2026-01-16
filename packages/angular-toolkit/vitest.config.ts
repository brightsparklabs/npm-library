import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import analog from '@analogjs/platform';

export default defineConfig({
  plugins: [
    analog({
      vite: {
        inlineStylesExtension: 'scss',
      },
    }),
  ],
  test: {
    name: '@brightsparklabs/angular-toolkit',
    globals: true,
    setupFiles: [__dirname + '/projects/test-setup.ts'],
    reporters: ['default'],
    browser: {
      enabled: true,
      headless: true,
      screenshotFailures: false,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
});
