import { VitePWA } from "vite-plugin-pwa";

export default VitePWA({
    registerType: 'autoUpdate',
    devOptions: {
        enabled: false
    },
    manifest: {
        name: "Touhou Translations",
        short_name: "Touhou EN",
        start_url: "/touhou-translations/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        description: "An archive of fan-translated Touhou Project comics and illustrations.",
        icons: [
            {
                src: "icons/icon-192x192.png",
                sizes: "192x192",
                type: "image/png"
            },
            {
                src: "icons/icon-512x512.png",
                sizes: "512x512",
                type: "image/png"
            }
        ],
        lang: "en"
    },
    workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        cleanupOutdatedCaches: true,
    },
    includeAssets: ['favicon.ico', 'robots.txt']
});