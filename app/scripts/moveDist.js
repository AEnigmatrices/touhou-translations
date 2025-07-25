import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');
const clientDir = path.join(distDir, 'client');

if (!fs.existsSync(clientDir)) {
    console.error('Client directory does not exist:', clientDir);
    process.exit(1);
}

fs.readdirSync(clientDir).forEach(file => {
    const src = path.join(clientDir, file);
    const dest = path.join(distDir, file);
    fs.renameSync(src, dest);
});

fs.rmdirSync(clientDir);

console.log('Moved files from dist/client to dist/');