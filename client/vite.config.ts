import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react";
            if (id.includes("react-router")) return "router";
            if (id.includes("@tanstack/react-query")) return "query";
            if (id.includes("recharts")) return "charts";
            if (id.includes("lucide-react")) return "icons";
            if (id.includes("framer-motion")) return "animations";

            return "vendor";
          }
        },
      },
    },
  },
});
