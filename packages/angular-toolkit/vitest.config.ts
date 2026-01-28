import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@brightsparklabs/utils": resolve(__dirname, "../../utils/src/index.ts"),
    }
  },
  test: {
    globals: true,
    projects: ["projects/*"],
  },
});
