import path from 'node:path';
import type { Plugin } from 'vite';

const rootDir = path.resolve(import.meta.dirname, '../..');
const dataDir = path.join(rootDir, 'data');
const generatedDir = path.join(rootDir, 'generated');
let suppressDataHotUpdatesUntil = 0;

export const suppressDataHotUpdates = (): void => {
    suppressDataHotUpdatesUntil = Date.now() + 5_000;
};

const isWithinDirectory = (filePath: string, directory: string): boolean => {
    const relativePath = path.relative(directory, filePath);
    return relativePath !== '' && !relativePath.startsWith('..') && !path.isAbsolute(relativePath);
};

const postDataHotUpdatePlugin: Plugin = {
    name: 'post-data-hot-update-suppression',
    hotUpdate({ file }) {
        if (
            Date.now() <= suppressDataHotUpdatesUntil
            && (isWithinDirectory(file, dataDir) || isWithinDirectory(file, generatedDir))
        ) {
            return [];
        }
    }
};

export default postDataHotUpdatePlugin;
