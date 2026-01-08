import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/VOV_Homapage_prototype/",
  plugins: [react(), tailwindcss()],
});
