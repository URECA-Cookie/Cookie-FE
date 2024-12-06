import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { VitePWA } from "vite-plugin-pwa"; // PWA 플러그인 주석 처리

export default defineConfig({
  plugins: [
    react(),
    // VitePWA({ // PWA 설정 주석 처리
    //   registerType: "autoUpdate",
    //   strategies: "injectManifest",
    //   srcDir: "src",
    //   filename: "firebase-messaging-sw.js", // 사용자 정의 서비스 워커
    //   manifest: {
    //     name: "Cookie",
    //     short_name: "Cookie",
    //     description: "Movie",
    //     theme_color: "#ffffff",
    //     background_color: "#ffffff",
    //     display: "standalone",
    //     start_url: "/",
    //     scope: "/",
    //     icons: [
    //       {
    //         src: "/192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //     ],
    //     screenshots: [
    //       {
    //         src: "/screenshots/desktop-screenshot.png",
    //         sizes: "1920x1080",
    //         type: "image/png",
    //         form_factor: "wide",
    //       },
    //       {
    //         src: "/screenshots/mobile-screenshot.png",
    //         sizes: "720x1280",
    //         type: "image/png",
    //         form_factor: "narrow",
    //       },
    //     ],
    //   },
    //   workbox: {
    //     runtimeCaching: [
    //       {
    //         urlPattern: ({ request }) => request.destination === "image",
    //         handler: "CacheFirst",
    //         options: {
    //           cacheName: "images-cache",
    //           expiration: {
    //             maxEntries: 50,
    //             maxAgeSeconds: 30 * 24 * 60 * 60,
    //           },
    //         },
    //       },
    //       {
    //         urlPattern: ({ request }) =>
    //           request.destination === "document" ||
    //           request.destination === "script",
    //         handler: "StaleWhileRevalidate",
    //         options: {
    //           cacheName: "documents-cache",
    //         },
    //       },
    //     ],
    //   },
    // }),
  ],
  define: {
    global: "window",
  },
});
