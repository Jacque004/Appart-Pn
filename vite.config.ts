import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts"],
  },
  // Permet d’utiliser soit VITE_* soit les anciennes variables NEXT_PUBLIC_* (ex. projet migré depuis Next.js)
  envPrefix: ["VITE_", "NEXT_PUBLIC_"],
  plugins: [react(), tailwindcss()],
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
})
