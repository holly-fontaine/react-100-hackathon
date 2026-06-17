import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api/football": {
          target: "https://v3.football.api-sports.io",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/football/, ""),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              proxyReq.setHeader("x-apisports-key", env.VITE_API_SPORTS_KEY);
            });
          },
        },
      },
    },
  };
});
