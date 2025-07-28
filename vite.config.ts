import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vike from "vike/plugin";

import postDataPlugin from './plugins/postDataPlugin';
import generateSitemapPlugin from './plugins/generateSitemapPlugin';



export default defineConfig({
    plugins: [react(), vike(), postDataPlugin, generateSitemapPlugin],
    base: '/touhou-translations/',

    build: {
        assetsInlineLimit: 4096,

        cssMinify: true,
        cssCodeSplit: true,

        minify: 'esbuild',
        rollupOptions: {
            output: {
                chunkFileNames: 'assets/js/[name].[hash].js'
            }
        }
    },

    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.webp'],

    optimizeDeps: {
        include: ['react', 'react-dom'],
        exclude: []
    }
});