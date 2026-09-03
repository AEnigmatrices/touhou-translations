import path from 'node:path';
import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import {
    artistDataSchema,
    characterDataSchema,
    postDataSchema
} from './lib/content/schemas';

const exactJsonStem = ({ entry }: { entry: string }): string =>
    path.posix.basename(entry.replaceAll('\\', '/'), '.json');

const artists = defineCollection({
    loader: glob({
        base: './src/data/artists',
        pattern: '**/*.json',
        generateId: exactJsonStem
    }),
    schema: artistDataSchema
});

const characters = defineCollection({
    loader: glob({
        base: './src/data/characters',
        pattern: '**/*.json',
        generateId: exactJsonStem
    }),
    schema: characterDataSchema
});

const posts = defineCollection({
    loader: glob({
        base: './src/data/posts',
        pattern: '**/*.json',
        generateId: exactJsonStem
    }),
    schema: postDataSchema.extend({
        artistId: reference('artists'),
        characterIds: z.array(reference('characters')).min(1).refine(
            values => new Set(values.map(value => value.id)).size === values.length,
            { message: 'Character IDs must be unique within a post.' }
        )
    })
});

export const collections = { artists, characters, posts };
