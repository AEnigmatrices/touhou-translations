import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { validateContentData } from './validateContentData';

const roots: string[] = [];

const createRoot = (): string => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'touhou-content-'));
    roots.push(root);
    return root;
};

const writeJson = (root: string, relativePath: string, value: unknown): void => {
    const filePath = path.join(root, relativePath);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(value), 'utf8');
};

const writeValidContent = (root: string): void => {
    const portrait = path.join(root, 'src/assets/portraits/example.webp');
    fs.mkdirSync(path.dirname(portrait), { recursive: true });
    fs.writeFileSync(portrait, 'image');
    writeJson(root, 'src/data/artists/artist-a.json', {
        name: 'Artist A', portrait: 'portraits/example.webp', sortOrder: 0
    });
    writeJson(root, 'src/data/characters/reimu.json', {
        name: 'Hakurei Reimu', short_name: 'Reimu', work: ['eosd'],
        portrait: 'portraits/example.webp', sortOrder: 0
    });
    writeJson(root, 'src/data/posts/2026/01/abc123.json', {
        date: 1767225600000,
        reddit: 'https://www.reddit.com/r/touhou/comments/abc123/title/',
        url: ['https://i.redd.it/example.png'],
        src: 'https://example.com/source',
        desc: 'Description',
        artistId: 'artist-a',
        characterIds: ['reimu'],
        nsfw: false
    });
};

afterEach(() => {
    for (const root of roots.splice(0)) fs.rmSync(root, { recursive: true, force: true });
});

describe('validateContentData', () => {
    it('accepts a valid one-record-per-file archive', () => {
        const root = createRoot();
        writeValidContent(root);
        expect(validateContentData(root)).toEqual({
            errors: [], artistsCount: 1, charactersCount: 1, postsCount: 1
        });
    });

    it('reports filename, reference, date-folder, and portrait violations', () => {
        const root = createRoot();
        writeValidContent(root);
        const artistPath = path.join(root, 'src/data/artists/artist-a.json');
        writeJson(root, 'src/data/artists/artist-a.json', {
            name: 'Artist A', portrait: 'portraits/missing.webp', sortOrder: 0
        });
        fs.mkdirSync(path.join(root, 'src/data/posts/2025/12'), { recursive: true });
        fs.renameSync(
            path.join(root, 'src/data/posts/2026/01/abc123.json'),
            path.join(root, 'src/data/posts/2025/12/wrong.json')
        );

        const errors = validateContentData(root).errors;
        expect(errors.some(error => error.includes('missing portrait'))).toBe(true);
        expect(errors.some(error => error.includes('expected wrong'))).toBe(true);
        expect(errors.some(error => error.includes('outside its UTC month'))).toBe(true);
        expect(fs.existsSync(artistPath)).toBe(true);
    });

    it('reports missing collection references', () => {
        const root = createRoot();
        writeValidContent(root);
        writeJson(root, 'src/data/posts/2026/01/abc123.json', {
            date: 1767225600000,
            reddit: 'https://www.reddit.com/r/touhou/comments/abc123/title/',
            url: ['https://i.redd.it/example.png'],
            src: 'https://example.com/source',
            desc: 'Description',
            artistId: 'missing',
            characterIds: ['missing'],
            nsfw: false
        });
        const errors = validateContentData(root).errors;
        expect(errors.some(error => error.includes('missing artist missing'))).toBe(true);
        expect(errors.some(error => error.includes('missing character missing'))).toBe(true);
    });

    it('rejects mislabeled social profile URLs', () => {
        const root = createRoot();
        writeValidContent(root);
        writeJson(root, 'src/data/artists/artist-a.json', {
            name: 'Artist A',
            linkTwitter: 'https://example.com/not-an-x-profile',
            portrait: 'portraits/example.webp',
            sortOrder: 0
        });

        expect(validateContentData(root).errors.some(error => error.includes('X/Twitter profile URL'))).toBe(true);
    });
});
