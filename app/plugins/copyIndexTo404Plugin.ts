import fs from 'fs';
import type { Plugin } from 'vite';

const copyIndexTo404Plugin: Plugin = {
    name: 'copy-index-to-404',
    closeBundle() {
        fs.copyFileSync('dist/index.html', 'dist/404.html');
    }
};

export default copyIndexTo404Plugin;