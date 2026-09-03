import { z } from 'astro/zod';

const uniqueStrings = (values: string[]): boolean => new Set(values).size === values.length;

export const httpsUrlSchema = z.url().refine(value => new URL(value).protocol === 'https:', {
    message: 'Expected an HTTPS URL.'
});

export const twitterProfileUrlSchema = httpsUrlSchema.refine(value => {
    const url = new URL(value);
    return ['x.com', 'www.x.com', 'twitter.com', 'www.twitter.com'].includes(url.hostname)
        && /^\/[^/]+(?:\/media)?\/?$/.test(url.pathname);
}, { message: 'Expected an X/Twitter profile URL.' });

export const pixivUserUrlSchema = httpsUrlSchema.refine(value => {
    const url = new URL(value);
    return ['pixiv.net', 'www.pixiv.net'].includes(url.hostname)
        && /^\/(?:en\/)?users\/\d+\/?$/.test(url.pathname);
}, { message: 'Expected a Pixiv user URL.' });

export const portraitPathSchema = z.string()
    .min(1)
    .refine(value => {
        const segments = value.split('/');
        return value.startsWith('portraits/') && !segments.includes('..') && !value.includes('\\');
    }, {
        message: 'Expected a relative path below src/assets/portraits.'
    });

export const artistDataSchema = z.strictObject({
    name: z.string().trim().min(1),
    linkTwitter: twitterProfileUrlSchema.optional(),
    linkPixiv: pixivUserUrlSchema.optional(),
    portrait: portraitPathSchema,
    sortOrder: z.number().int().nonnegative()
});

export const characterDataSchema = z.strictObject({
    name: z.string().trim().min(1),
    short_name: z.string().trim().min(1),
    work: z.array(z.string().trim().min(1)).min(1).refine(uniqueStrings, {
        message: 'Character work codes must be unique.'
    }),
    portrait: portraitPathSchema,
    sortOrder: z.number().int().nonnegative()
});

export const postDataSchema = z.strictObject({
    date: z.number().int().positive().refine(value => !Number.isNaN(new Date(value).getTime()), {
        message: 'Expected a valid timestamp.'
    }),
    reddit: httpsUrlSchema.refine(value => /\/comments\/[a-zA-Z0-9]+(?:\/|$)/.test(new URL(value).pathname), {
        message: 'Expected a Reddit URL containing /comments/{id}.'
    }),
    url: z.array(httpsUrlSchema).min(1).refine(uniqueStrings, {
        message: 'Artwork URLs must be unique within a post.'
    }),
    src: httpsUrlSchema,
    desc: z.string(),
    artistId: z.string().min(1),
    characterIds: z.array(z.string().min(1)).min(1).refine(uniqueStrings, {
        message: 'Character IDs must be unique within a post.'
    }),
    nsfw: z.boolean()
});

export type ArtistDataInput = z.input<typeof artistDataSchema>;
export type CharacterDataInput = z.input<typeof characterDataSchema>;
export type PostDataInput = z.input<typeof postDataSchema>;
