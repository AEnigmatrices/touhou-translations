import { VitePWA } from "vite-plugin-pwa";

export default VitePWA({
    registerType: 'autoUpdate',
    devOptions: {
        enabled: false
    },
    manifest: {
        name: "Touhou Translations",
        short_name: "Touhou TL",
        start_url: "/touhou-translations/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        description: "An archive of English-translated Touhou Project fan comics and illustrations.",
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
        globPatterns: ['**/*.{js,css,html,ico,json,webmanifest}'],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
            {
                urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/i,
                handler: 'StaleWhileRevalidate',
                options: {
                    cacheName: 'images',
                    expiration: {
                        maxEntries: 150,
                        maxAgeSeconds: 60 * 24 * 60 * 60,
                    },
                },
            },
            {
                urlPattern: /\/posts\/.+\/index\.pageContext\.json$/i,
                handler: 'NetworkFirst',
                options: {
                    cacheName: 'page-data',
                    expiration: {
                        maxEntries: 100,
                        maxAgeSeconds: 15 * 60,
                    },
                    networkTimeoutSeconds: 5,
                },
            },
        ],
    },
    includeAssets: ['icons/favicon.ico', 'robots.txt']
});