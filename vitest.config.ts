import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    projects: [
      // Include all packages, except for the `angular-toolkit` as only want the projects
      // `subfolder` from it.
      "packages/!(angular-toolkit)",
      "packages/angular-toolkit/projects/*",
    ],
  },
});
