import type { ResponsiveImageSource } from '../types/data';

const serializeCandidates = (candidates: Map<number, string>): string | undefined => {
    if (candidates.size === 0) return undefined;
    return [...candidates.entries()]
        .sort(([left], [right]) => left - right)
        .map(([width, url]) => `${url} ${width}w`)
        .join(', ');
};

const collectCandidates = (
    sources: ResponsiveImageSource[] | undefined,
    fallbackUrl: string,
    fallbackWidth?: number,
    maxWidth?: number
): Map<number, string> => {
    const candidates = new Map<number, string>();
    for (const source of sources ?? []) {
        if (source.width <= 0 || !source.url) continue;
        if (maxWidth && source.width > maxWidth) continue;
        candidates.set(source.width, source.url);
    }

    if (
        fallbackWidth
        && fallbackWidth > 0
        && (!maxWidth || fallbackWidth <= maxWidth)
    ) {
        candidates.set(fallbackWidth, fallbackUrl);
    }

    return candidates;
};

export const responsiveSrcset = (
    sources: ResponsiveImageSource[] | undefined,
    fallbackUrl: string,
    fallbackWidth?: number
): string | undefined => {
    const candidates = collectCandidates(sources, fallbackUrl, fallbackWidth);
    if (candidates.size <= 1) return undefined;
    return serializeCandidates(candidates);
};

/**
 * Produces a responsive candidate list capped at a maximum intrinsic width.
 * Unlike responsiveSrcset(), a single bounded candidate remains useful for a
 * <source> element because it prevents a mobile browser from selecting a much
 * larger original image when Reddit already provides a suitable preview.
 */
export const boundedResponsiveSrcset = (
    sources: ResponsiveImageSource[] | undefined,
    fallbackUrl: string,
    fallbackWidth: number | undefined,
    maxWidth: number
): string | undefined => serializeCandidates(
    collectCandidates(sources, fallbackUrl, fallbackWidth, maxWidth)
);
