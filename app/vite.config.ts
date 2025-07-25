import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vike from "vike/plugin";

import postDataPlugin from './plugins/postDataPlugin';
import copyIndexTo404Plugin from './plugins/copyIndexTo404Plugin';
import generateSitemapPlugin from './plugins/generateSitemapPlugin';



export default defineConfig({
    plugins: [react(), vike(), postDataPlugin, copyIndexTo404Plugin],
    base: '/touhou-translations/'
});