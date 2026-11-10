import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import * as tw from "tailwindcss";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function extractCandidates(content) {
  const matches = content.match(/[\w\-/:#[\]%./@]+/g) || [];
  return Array.from(new Set(matches));
}

function scanDir(dir, candidates = new Set()) {
  if (!fs.existsSync(dir)) return candidates;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== "node_modules" && entry.name !== "dist") {
      scanDir(fullPath, candidates);
    } else if (/\.(jsx|js|html)$/.test(entry.name)) {
      const code = fs.readFileSync(fullPath, "utf-8");
      for (const c of extractCandidates(code)) {
        candidates.add(c);
      }
    }
  }
  return candidates;
}

function tailwindPureJsPlugin() {
  return {
    name: "tailwind-pure-js",
    enforce: "pre",
    async transform(code, id) {
      if (id.endsWith("src/index.css") || id.includes("src/index.css")) {
        const candidates = scanDir(path.resolve(__dirname, "src"));
        scanDir(__dirname, candidates);

        const compiler = await tw.compile(code, {
          base: path.resolve(__dirname, "src"),
          loadStylesheet: async (sheetId, base) => {
            if (sheetId === "tailwindcss") {
              const filePath = path.resolve(__dirname, "node_modules/tailwindcss/index.css");
              const content = fs.readFileSync(filePath, "utf-8");
              return { content, base: path.dirname(filePath) };
            }
            if (sheetId.startsWith("@fontsource-variable/")) {
              const filePath = path.resolve(__dirname, "node_modules", sheetId, "index.css");
              if (fs.existsSync(filePath)) {
                return { content: fs.readFileSync(filePath, "utf-8"), base: path.dirname(filePath) };
              }
            }
            return { content: "", base };
          },
        });

        const compiled = compiler.build(Array.from(candidates));
        return {
          code: compiled,
          map: null,
        };
      }
    },
  };
}

export default defineConfig({
  plugins: [
    tailwindPureJsPlugin(),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
