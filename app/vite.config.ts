import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vike from "vike/plugin";

import postDataPlugin from './plugins/postDataPlugin';
import copyIndexTo404Plugin from './plugins/copyIndexTo404Plugin';
import generateSitemapPlugin from './plugins/generateSitemapPlugin';



export default defineConfig({
    plugins: [react(), vike({ prerender: true }), postDataPlugin, copyIndexTo404Plugin, generateSitemapPlugin],
    base: '/touhou-translations/'
});