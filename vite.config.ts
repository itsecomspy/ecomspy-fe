import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets/"),
      "@modules": path.resolve(__dirname, "./src/modules/"),
      "@shared": path.resolve(__dirname, "./src/shared/"),
      "@": path.resolve(__dirname, "./src/"),
      "@root": path.resolve(__dirname, "./"),
      "@dbtypes": path.resolve(__dirname, "./src/shared/db/supabase.ts"),
    },
  },
});
