import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
import type { PortraitImage } from '../../types/data';

const PORTRAIT_WIDTHS = [88, 128, 160, 192];
export const PORTRAIT_SIZES = '(max-width: 640px) 88px, 160px';

const portraitModules = import.meta.glob<{ default: ImageMetadata }>(
    '/src/assets/portraits/**/*.webp',
    { eager: true }
);
const portraitRequests = new Map<string, Promise<PortraitImage>>();

const getPortraitSource = (portrait: string): ImageMetadata => {
    const source = portraitModules[`/src/assets/${portrait}`]?.default;
    if (!source) throw new Error(`Portrait asset is missing from src/assets: ${portrait}`);
    return source;
};

export const getPortraitImage = (portrait: string): Promise<PortraitImage> => {
    const cached = portraitRequests.get(portrait);
    if (cached) return cached;

    const source = getPortraitSource(portrait);
    const request = getImage({
        src: source,
        widths: PORTRAIT_WIDTHS,
        sizes: PORTRAIT_SIZES,
        format: 'webp',
        quality: 80
    }).then(result => ({
        src: result.src,
        srcset: result.srcSet.attribute,
        width: Number(result.attributes.width ?? source.width),
        height: Number(result.attributes.height ?? source.height)
    }));

    portraitRequests.set(portrait, request);
    return request;
};

export const getPortraitImages = async (portraits: string[]): Promise<Record<string, PortraitImage>> => {
    const uniquePortraits = [...new Set(portraits)];
    const entries = await Promise.all(uniquePortraits.map(async portrait => (
        [portrait, await getPortraitImage(portrait)] as const
    )));
    return Object.fromEntries(entries);
};
