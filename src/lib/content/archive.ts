import { getCollection, type CollectionEntry } from 'astro:content';
import type { ArtistRaw, CharacterRaw, Post } from '../../types/data';
import { buildDerivedData, type DerivedData } from '../../utils/fetchData';
import { extractRedditId } from '../../utils/extractRedditId';
import {
    artworkMediaMetadata,
    hasArtworkMediaMetadata,
    type ArtworkMediaMetadataMap
} from './mediaMetadata';

export interface Archive extends DerivedData {
    postIds: string[];
    mediaByArtworkUrl: ArtworkMediaMetadataMap;
    hasMediaMetadata: boolean;
}

const portraitModules = import.meta.glob('/src/assets/portraits/**/*.webp');
let archivePromise: Promise<Archive> | undefined;

const compareBySortOrder = <T extends { data: { sortOrder: number }; id: string }>(left: T, right: T): number =>
    left.data.sortOrder - right.data.sortOrder || left.id.localeCompare(right.id);

const assertCasePortableIds = (kind: string, ids: string[]): void => {
    const seen = new Map<string, string>();
    for (const id of ids) {
        const key = id.toLocaleLowerCase('en-US');
        const existing = seen.get(key);
        if (existing && existing !== id) throw new Error(`${kind} IDs differ only by case: ${existing} and ${id}.`);
        seen.set(key, id);
    }
};

const assertUniqueSortOrders = (
    kind: string,
    entries: Array<{ id: string; data: { sortOrder: number } }>
): void => {
    const orders = new Set(entries.map(entry => entry.data.sortOrder));
    if (orders.size !== entries.length) throw new Error(`${kind} sortOrder values must be unique.`);
};

const assertPortraitExists = (kind: string, id: string, portrait: string): void => {
    if (!portraitModules[`/src/assets/${portrait}`]) {
        throw new Error(`${kind} ${id} references a missing portrait: ${portrait}.`);
    }
};

const assertPostPath = (entry: CollectionEntry<'posts'>): void => {
    if (!entry.filePath) return;
    const date = new Date(entry.data.date);
    const expected = `/src/data/posts/${date.getUTCFullYear()}/${String(date.getUTCMonth() + 1).padStart(2, '0')}/${entry.id}.json`;
    const actual = `/${entry.filePath.replaceAll('\\', '/')}`;
    if (!actual.endsWith(expected)) {
        throw new Error(`Post ${entry.id} must be stored at ${expected.slice(1)}.`);
    }
};

const loadArchive = async (): Promise<Archive> => {
    const [postEntries, artistEntries, characterEntries] = await Promise.all([
        getCollection('posts'),
        getCollection('artists'),
        getCollection('characters')
    ]);

    assertCasePortableIds('Artist', artistEntries.map(entry => entry.id));
    assertCasePortableIds('Character', characterEntries.map(entry => entry.id));
    assertCasePortableIds('Post', postEntries.map(entry => entry.id));
    assertUniqueSortOrders('Artist', artistEntries);
    assertUniqueSortOrders('Character', characterEntries);

    const artistIds = new Set(artistEntries.map(entry => entry.id));
    const characterIds = new Set(characterEntries.map(entry => entry.id));

    const artistsRaw: ArtistRaw[] = artistEntries.sort(compareBySortOrder).map(({ id, data }) => {
        assertPortraitExists('Artist', id, data.portrait);
        const { sortOrder: _sortOrder, ...artist } = data;
        return { id, ...artist };
    });

    const charactersRaw: CharacterRaw[] = characterEntries.sort(compareBySortOrder).map(({ id, data }) => {
        assertPortraitExists('Character', id, data.portrait);
        const { sortOrder: _sortOrder, ...character } = data;
        return { id, ...character };
    });

    const posts: Post[] = postEntries.map(entry => {
        const redditId = extractRedditId(entry.data.reddit);
        if (redditId !== entry.id) {
            throw new Error(`Post filename ID ${entry.id} does not match Reddit ID ${redditId || '(missing)'}.`);
        }
        if (!artistIds.has(entry.data.artistId.id)) {
            throw new Error(`Post ${entry.id} references missing artist ${entry.data.artistId.id}.`);
        }
        for (const reference of entry.data.characterIds) {
            if (!characterIds.has(reference.id)) {
                throw new Error(`Post ${entry.id} references missing character ${reference.id}.`);
            }
        }
        assertPostPath(entry);
        return {
            date: entry.data.date,
            reddit: entry.data.reddit,
            url: entry.data.url,
            src: entry.data.src,
            desc: entry.data.desc,
            artistId: entry.data.artistId.id,
            characterIds: entry.data.characterIds.map(reference => reference.id),
            nsfw: entry.data.nsfw
        };
    }).sort((left, right) => {
        const dateDifference = left.date - right.date;
        if (dateDifference !== 0) return dateDifference;
        return extractRedditId(left.reddit).localeCompare(extractRedditId(right.reddit));
    });

    const derived = buildDerivedData(posts, artistsRaw, charactersRaw);
    return {
        ...derived,
        postIds: posts.map(post => extractRedditId(post.reddit)),
        mediaByArtworkUrl: artworkMediaMetadata,
        hasMediaMetadata: hasArtworkMediaMetadata
    };
};

export const getArchive = (): Promise<Archive> => archivePromise ??= loadArchive();
