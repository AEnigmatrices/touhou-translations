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
        "icons": [
            { "src": "icons/pwa/pwa-icon-48x48.png", "sizes": "48x48", "type": "image/png", "purpose": "any" },
            { "src": "icons/pwa/pwa-icon-192x192.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable" },
            { "src": "icons/pwa/pwa-icon-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
        ],
        lang: "en"
    },
    workbox: {
        globPatterns: ['**/*.{js,css,ico,png,svg,woff2}'],
        cleanupOutdatedCaches: true,
        navigateFallback: '/touhou-translations/index.html',
        navigateFallbackDenylist: [
            new RegExp('^/icons/'),
            new RegExp('^/portraits/'),
            new RegExp('^/robots\\.txt')
        ]
    },
    includeAssets: ['icons/favicon.ico', 'robots.txt']
});