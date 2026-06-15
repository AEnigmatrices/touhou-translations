import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterEach, describe, expect, it } from 'vitest';
import { validateData } from './validateData';

const tempRoots: string[] = [];

const createTempRoot = (): string => {
    const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'touhou-validation-'));
    tempRoots.push(rootDir);
    fs.mkdirSync(path.join(rootDir, 'data', 'posts'), { recursive: true });
    fs.mkdirSync(path.join(rootDir, 'public', 'portraits'), { recursive: true });
    fs.writeFileSync(path.join(rootDir, 'public', 'portraits', 'artist.webp'), '');
    fs.writeFileSync(path.join(rootDir, 'public', 'portraits', 'character.webp'), '');
    return rootDir;
};

const writeJson = (rootDir: string, relativePath: string, value: unknown): void => {
    fs.writeFileSync(path.join(rootDir, relativePath), JSON.stringify(value, null, 2));
};

const writeValidDataset = (rootDir: string): void => {
    writeJson(rootDir, path.join('data', 'artists.json'), [
        {
            id: 'artist-a',
            name: 'Artist A',
            linkTwitter: 'https://example.com/artist-a',
            portrait: 'portraits/artist.webp'
        }
    ]);
    writeJson(rootDir, path.join('data', 'characters.json'), [
        {
            id: 'reimu',
            name: 'Reimu Hakurei',
            short_name: 'Reimu',
            work: ['Touhou'],
            portrait: 'portraits/character.webp'
        }
    ]);
    writeJson(rootDir, path.join('data', 'posts', 'posts-2026.json'), [
        {
            date: 1767225600000,
            reddit: 'https://www.reddit.com/r/touhou/comments/abc123/title/',
            url: ['https://example.com/image.jpg'],
            src: 'https://example.com/source',
            desc: '',
            artistId: 'artist-a',
            characterIds: ['reimu'],
            nsfw: false
        }
    ]);
};

afterEach(() => {
    for (const rootDir of tempRoots.splice(0)) {
        fs.rmSync(rootDir, { recursive: true, force: true });
    }
});

describe('validateData', () => {
    it('accepts a valid data tree and returns summary counts', () => {
        const rootDir = createTempRoot();
        writeValidDataset(rootDir);

        expect(validateData(rootDir)).toEqual({
            errors: [],
            warnings: [],
            artistsCount: 1,
            charactersCount: 1,
            postsCount: 1
        });
    });

    it('reports duplicate IDs, missing references, invalid URLs, and missing portraits', () => {
        const rootDir = createTempRoot();
        writeJson(rootDir, path.join('data', 'artists.json'), [
            { id: 'artist-a', name: 'Artist A', portrait: 'portraits/artist.webp' },
            { id: 'artist-a', name: '', linkPixiv: 'ftp://example.com/bad', portrait: 'portraits/missing.webp' }
        ]);
        writeJson(rootDir, path.join('data', 'characters.json'), [
            { id: 'reimu', name: 'Reimu Hakurei', short_name: 'Reimu', work: ['Touhou'], portrait: 'portraits/character.webp' }
        ]);
        writeJson(rootDir, path.join('data', 'posts', 'posts-2026.json'), [
            {
                date: 0,
                reddit: 'https://www.reddit.com/r/touhou/no-comments-here/',
                url: ['not-a-url'],
                src: 'not-a-url',
                desc: null,
                artistId: 'missing-artist',
                characterIds: ['missing-character'],
                nsfw: 'false'
            }
        ]);

        const result = validateData(rootDir);

        expect(result.errors).toEqual(expect.arrayContaining([
            'data/artists.json[1].id duplicates artist ID "artist-a" from data/artists.json[0].',
            'data/artists.json[1].name must be a non-empty string.',
            'data/artists.json[1].linkPixiv must be an http(s) URL when present.',
            'data/artists.json[1].portrait points to a missing file: portraits/missing.webp',
            'data/posts/posts-2026.json[0].date must be a positive numeric timestamp.',
            'data/posts/posts-2026.json[0].reddit must include a /comments/{id} path.',
            'data/posts/posts-2026.json[0].url must be a non-empty array of http(s) URLs.',
            'data/posts/posts-2026.json[0].src must be an http(s) URL.',
            'data/posts/posts-2026.json[0].desc must be a string.',
            'data/posts/posts-2026.json[0].artistId references missing artist "missing-artist".',
            'data/posts/posts-2026.json[0].characterIds references missing character "missing-character".',
            'data/posts/posts-2026.json[0].nsfw must be a boolean.'
        ]));
    });

    it('reports repeated character IDs in a post as warnings', () => {
        const rootDir = createTempRoot();
        writeValidDataset(rootDir);
        writeJson(rootDir, path.join('data', 'posts', 'posts-2026.json'), [
            {
                date: 1767225600000,
                reddit: 'https://www.reddit.com/r/touhou/comments/abc123/title/',
                url: ['https://example.com/image.jpg'],
                src: 'https://example.com/source',
                desc: '',
                artistId: 'artist-a',
                characterIds: ['reimu', 'reimu'],
                nsfw: false
            }
        ]);

        expect(validateData(rootDir).warnings).toEqual([
            'data/posts/posts-2026.json[0].characterIds repeats "reimu".'
        ]);
    });
});
