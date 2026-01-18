import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import analog from '@analogjs/platform';

export default defineConfig({
  test: {
    globals: true,
    projects: ["projects/*"],
  },
});
