import { cpSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

function copyRootAssets() {
  return {
    name: "copy-root-assets",
    apply: "build",
    closeBundle() {
      const source = resolve("assets");
      const destination = resolve("dist/assets");

      if (existsSync(source)) {
        cpSync(source, destination, { recursive: true });
      }
    },
  };
}

export default defineConfig({
  plugins: [copyRootAssets()],
});
