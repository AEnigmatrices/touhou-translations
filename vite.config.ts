import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vike from "vike/plugin";

import pwaPlugin from "./plugins/pwaPlugin";
import postDataPlugin from './plugins/postDataPlugin';
import generateSitemapPlugin from './plugins/generateSitemapPlugin';



const productionPlugins = [
    ...(process.env.NODE_ENV === 'production' ? [pwaPlugin, generateSitemapPlugin] : [])
];



export default defineConfig({
    plugins: [react(), vike(), postDataPlugin, ...productionPlugins],
    base: '/touhou-translations/',
    server: { open: '/touhou-translations/' }
});