import { cpSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

function copyStaticFiles() {
  return {
    name: "copy-static-files",
    apply: "build",
    closeBundle() {
      const assetsSource = resolve("assets");
      const assetsDestination = resolve("dist/assets");

      if (existsSync(assetsSource)) {
        cpSync(assetsSource, assetsDestination, { recursive: true });
      }

      ["blog.html", "contact.html", "galleries.html", "robots.txt", "sitemap.xml"].forEach((path) => {
        if (existsSync(path)) {
          cpSync(resolve(path), resolve("dist", path));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [copyStaticFiles()],
});
