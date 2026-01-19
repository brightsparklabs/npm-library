import analog from "@analogjs/platform";
import angular from "@analogjs/vite-plugin-angular";
import { playwright } from "@vitest/browser-playwright";
import { resolve } from "path";
import { defineConfig } from "vite";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineConfig(({ mode }) => ({
  root: __dirname,
  plugins: [
    analog({
      ssr: false,
      static: true,
      prerender: {
        routes: [],
      },
    }),
    angular({
      liveReload: true,
    }),
  ],
  build: {
    target: ["es2022"],
  },
  test: {
    name: "@brightsparklabs/angular-toolkit/dev",
    globals: true,
    setupFiles: [resolve(__dirname, "src/test-setup.ts")],
    reporters: ["default"],
    browser: {
      enabled: true,
      headless: true,
      screenshotFailures: false,
      provider: playwright(),
      instances: [{ browser: "chromium" }],
    },
  },
}));
