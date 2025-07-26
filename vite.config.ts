import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vike from "vike/plugin";

import postDataPlugin from './plugins/postDataPlugin';
import generateSitemapPlugin from './plugins/generateSitemapPlugin';



export default defineConfig({
    plugins: [react(), vike(), postDataPlugin, generateSitemapPlugin],
    base: '/touhou-translations/'
});