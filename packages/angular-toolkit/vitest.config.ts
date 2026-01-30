import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@brightsparklabs/utils": resolve(__dirname, "../../utils/src/index.ts"),
    },
  },
  test: {
    globals: true,
    projects: ["projects/*"],
  },
});
