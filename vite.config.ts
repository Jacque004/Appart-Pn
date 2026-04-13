import { writeFileSync } from "node:fs"
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

  /** Sans serveur : /Appart-Pn/logements → 404 GitHub ; on redirige puis on restaure l’URL (cf. spa-github-pages). */
  const basePathRoot = base !== "/" ? base.replace(/\/$/, "") : ""

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
      transformIndexHtml: {
        order: "pre",
        handler(html, ctx) {
          if (ctx.server || !basePathRoot) return html
          const restore = `<script>(function(){try{var k="appartpn-ghp-redirect";var r=sessionStorage.getItem(k);if(!r)return;sessionStorage.removeItem(k);history.replaceState(null,"",r)}catch(e){}})();</script>`
          return html.replace("<head>", `<head>${restore}`)
        },
      },
      closeBundle() {
        if (!basePathRoot) return
        const fallback = path.resolve(__dirname, "dist/404.html")
        const baseJson = JSON.stringify(basePathRoot)
        const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Redirection…</title>
  <script>
(function () {
  var base = ${baseJson};
  var path = location.pathname;
  if (path === base || path === base + "/") return;
  if (path.indexOf(base + "/") !== 0) return;
  try {
    sessionStorage.setItem("appartpn-ghp-redirect", path + location.search + location.hash);
  } catch (e) {}
  location.replace(base + "/");
})();
  </script>
</head>
<body></body>
</html>
`
        try {
          writeFileSync(fallback, html, "utf8")
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
