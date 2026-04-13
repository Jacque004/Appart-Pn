import { copyFileSync } from "node:fs"
import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

/** Dépôt GitHub Pages : https://jacque004.github.io/Appart-Pn/ */
const GITHUB_PAGES_BASE = "/Appart-Pn/"

function normalizeBase(raw: string | undefined): string {
  const t = raw?.trim()
  if (!t || t === "/") return "/"
  return t.endsWith("/") ? t : `${t}/`
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const explicit = env.VITE_BASE?.trim()
  const base =
    explicit && explicit !== "/"
      ? normalizeBase(explicit)
      : mode === "production"
        ? GITHUB_PAGES_BASE
        : "/"

  return {
  base,
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts"],
  },
  // Permet d’utiliser soit VITE_* soit les anciennes variables NEXT_PUBLIC_* (ex. projet migré depuis Next.js)
  envPrefix: ["VITE_", "NEXT_PUBLIC_"],
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "github-pages-spa-fallback",
      closeBundle() {
        const index = path.resolve(__dirname, "dist/index.html")
        const fallback = path.resolve(__dirname, "dist/404.html")
        try {
          copyFileSync(index, fallback)
        } catch {
          /* dist absent (ex. vitest) */
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  server: {
    port: 5173,
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Entrée à la racine de dist : sinon les imports dynamiques résolvent
        // `assets/x.js` depuis `.../assets/index.js` → .../assets/assets/x.js (404 sur GitHub Pages).
        entryFileNames: "[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
        manualChunks(id) {
          if (!id.includes("node_modules")) return
          if (id.includes("@supabase")) return "supabase"
          if (id.includes("@radix-ui")) return "radix-ui"
          if (id.includes("lucide-react")) return "icons"
          if (id.includes("recharts")) return "recharts"
          if (
            id.includes("react-dom") ||
            id.includes("react-router") ||
            id.includes("/react/") ||
            id.includes("\\react\\")
          ) {
            return "react-vendor"
          }
          // Laisse Rollup grouper automatiquement le reste pour eviter les cycles entre chunks manuels.
          return undefined
        },
      },
    },
  },
  }
})
