/// <reference types="vitest/config" />
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [dts({ exclude: "src/**/*.spec.ts" })],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "index",
      fileName: "index",
      formats: ["es"],
    },
    sourcemap: true,
  },
  test: {
    name: "@brightsparklabs/utils",
  },
});
