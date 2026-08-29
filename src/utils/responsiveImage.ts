import type { ResponsiveImageSource } from '../types/data';

export const responsiveSrcset = (
    sources: ResponsiveImageSource[] | undefined,
    fallbackUrl: string,
    fallbackWidth?: number
): string | undefined => {
    const candidates = new Map<number, string>();
    for (const source of sources ?? []) {
        if (source.width > 0 && source.url) candidates.set(source.width, source.url);
    }
    if (fallbackWidth && fallbackWidth > 0) candidates.set(fallbackWidth, fallbackUrl);

    if (candidates.size <= 1) return undefined;
    return [...candidates.entries()]
        .sort(([left], [right]) => left - right)
        .map(([width, url]) => `${url} ${width}w`)
        .join(', ');
};
