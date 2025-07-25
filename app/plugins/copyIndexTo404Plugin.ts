import fs from 'fs';
import path from 'path';
import type { Plugin } from 'vite';

const copyIndexTo404Plugin: Plugin = {
    name: 'copy-index-to-404',
    async closeBundle() {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const clientDir = path.resolve('dist/client');
        const indexPath = path.join(clientDir, 'index.html');
        const notFoundPath = path.join(clientDir, '404.html');

        try {
            if (fs.existsSync(indexPath)) {
                fs.copyFileSync(indexPath, notFoundPath);
                console.log('✅ Created 404.html for SPA fallback');
            } else {
                console.warn('⚠️ dist/client/index.html not found. Cannot create 404.html.');
            }
        } catch (err) {
            console.error('❌ Failed to create 404.html:', err);
        }
    }
};

export default copyIndexTo404Plugin;