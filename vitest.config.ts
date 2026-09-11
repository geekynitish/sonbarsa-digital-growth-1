import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/tests/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      exclude: [
        "node_modules/**",
        "dist/**",
        ".astro/**",
        "src/components/ui/**",
        "**/*.config.*",
        "src/tests/**",
      ],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      // Map Astro virtual modules to stub implementations for Vitest
      "astro:content": resolve(__dirname, "./src/tests/__mocks__/astro-content-stub.ts"),
    },
  },
});
