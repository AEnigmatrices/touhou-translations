import type { ImageDimensions, ResponsiveImageSource } from '../../types/data';

export interface ArtworkMediaMetadata {
    imageDimensions: ImageDimensions | null;
    imageSources: ResponsiveImageSource[];
}

export type ArtworkMediaMetadataMap = Record<string, ArtworkMediaMetadata>;

const mediaModules = import.meta.glob<{ default: ArtworkMediaMetadataMap }>(
    '../../../generated/media-metadata.json',
    { eager: true }
);

const mediaModule = Object.values(mediaModules)[0];

export const artworkMediaMetadata: ArtworkMediaMetadataMap = mediaModule?.default ?? {};
export const hasArtworkMediaMetadata = Boolean(mediaModule);
