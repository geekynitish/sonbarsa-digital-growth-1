import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function mockContactApiPlugin() {
  return {
    name: "mock-contact-api",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === "/api/contact" && req.method === "POST") {
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              success: true,
              message: "Thank you for reaching out (Local development mock).",
            })
          );
          return;
        }
        next();
      });
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: "https://sonbarsa.com",
  output: "static",
  integrations: [react()],
  server: {
    port: 8080,
  },
  vite: {
    plugins: [mockContactApiPlugin()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  },
});
