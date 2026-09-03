import { extractRedditId } from '../src/utils/extractRedditId.ts';
import type {
    ImageDimensions,
    Post,
    ResponsiveImageSource
} from '../src/types/data.ts';

interface RedditPreviewSource {
    url?: string;
    u?: string;
    width?: number;
    x?: number;
}

interface RedditMediaMetadata {
    p?: RedditPreviewSource[];
    s?: RedditPreviewSource;
}

interface RedditPostMetadata {
    id?: string;
    media_metadata?: Record<string, RedditMediaMetadata>;
    preview?: {
        images?: Array<{
            source?: RedditPreviewSource;
            resolutions?: RedditPreviewSource[];
        }>;
    };
}

interface RedditInfoResponse {
    data?: {
        children?: Array<{
            data?: RedditPostMetadata;
        }>;
    };
}

const imageMetadataConcurrency = 16;
const imageHeaderBytes = 64 * 1024;
const imageRequestTimeoutMs = 8_000;
const redditBatchSize = 50;
const redditMetadataConcurrency = 2;
const redditRequestTimeoutMs = 10_000;

const readUint24LittleEndian = (buffer: Uint8Array, offset: number): number =>
    buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16);

const readPngDimensions = (buffer: Uint8Array): ImageDimensions | null => {
    if (buffer.length < 24) return null;
    const signature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    if (!signature.every((byte, index) => buffer[index] === byte)) return null;

    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    return { width: view.getUint32(16), height: view.getUint32(20) };
};

const readGifDimensions = (buffer: Uint8Array): ImageDimensions | null => {
    if (buffer.length < 10) return null;
    const header = String.fromCharCode(...buffer.subarray(0, 6));
    if (header !== 'GIF87a' && header !== 'GIF89a') return null;

    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    return { width: view.getUint16(6, true), height: view.getUint16(8, true) };
};

const readWebpDimensions = (buffer: Uint8Array): ImageDimensions | null => {
    if (buffer.length < 30) return null;
    const riff = String.fromCharCode(...buffer.subarray(0, 4));
    const webp = String.fromCharCode(...buffer.subarray(8, 12));
    if (riff !== 'RIFF' || webp !== 'WEBP') return null;

    const chunkType = String.fromCharCode(...buffer.subarray(12, 16));
    if (chunkType === 'VP8X') {
        return {
            width: readUint24LittleEndian(buffer, 24) + 1,
            height: readUint24LittleEndian(buffer, 27) + 1
        };
    }

    if (chunkType === 'VP8 ' && buffer.length >= 30) {
        const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
        return {
            width: view.getUint16(26, true) & 0x3fff,
            height: view.getUint16(28, true) & 0x3fff
        };
    }

    if (chunkType === 'VP8L' && buffer.length >= 25 && buffer[20] === 0x2f) {
        const bits = buffer[21] | (buffer[22] << 8) | (buffer[23] << 16) | (buffer[24] << 24);
        return {
            width: (bits & 0x3fff) + 1,
            height: ((bits >> 14) & 0x3fff) + 1
        };
    }

    return null;
};

const jpegStartOfFrameMarkers = new Set([
    0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7,
    0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf
]);

const readJpegDimensions = (buffer: Uint8Array): ImageDimensions | null => {
    if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;

    let offset = 2;
    while (offset + 8 < buffer.length) {
        while (offset < buffer.length && buffer[offset] !== 0xff) offset += 1;
        while (offset < buffer.length && buffer[offset] === 0xff) offset += 1;
        if (offset >= buffer.length) break;

        const marker = buffer[offset];
        offset += 1;
        if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
        if (marker === 0xd9 || marker === 0xda || offset + 1 >= buffer.length) break;

        const segmentLength = (buffer[offset] << 8) | buffer[offset + 1];
        if (segmentLength < 2 || offset + segmentLength > buffer.length) break;

        if (jpegStartOfFrameMarkers.has(marker) && segmentLength >= 7) {
            return {
                width: (buffer[offset + 5] << 8) | buffer[offset + 6],
                height: (buffer[offset + 3] << 8) | buffer[offset + 4]
            };
        }

        offset += segmentLength;
    }

    return null;
};

const readImageDimensions = (buffer: Uint8Array): ImageDimensions | null =>
    readPngDimensions(buffer)
    ?? readGifDimensions(buffer)
    ?? readWebpDimensions(buffer)
    ?? readJpegDimensions(buffer);

const fetchImagePrefix = async (url: string): Promise<Uint8Array> => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), imageRequestTimeoutMs);

    try {
        const response = await fetch(url, {
            headers: {
                Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
                Range: `bytes=0-${imageHeaderBytes - 1}`,
                'User-Agent': 'touhou-translations-build/1.0'
            },
            signal: controller.signal
        });
        if (!response.ok || !response.body) throw new Error(`HTTP ${response.status}`);

        const reader = response.body.getReader();
        const chunks: Uint8Array[] = [];
        let totalBytes = 0;

        while (totalBytes < imageHeaderBytes) {
            const { done, value } = await reader.read();
            if (done) break;

            const remaining = imageHeaderBytes - totalBytes;
            const chunk = value.byteLength <= remaining ? value : value.subarray(0, remaining);
            chunks.push(chunk);
            totalBytes += chunk.byteLength;
            if (value.byteLength > remaining) break;
        }

        await reader.cancel().catch(() => undefined);
        const prefix = new Uint8Array(totalBytes);
        let writeOffset = 0;
        for (const chunk of chunks) {
            prefix.set(chunk, writeOffset);
            writeOffset += chunk.byteLength;
        }
        return prefix;
    } finally {
        clearTimeout(timeout);
    }
};

const mapConcurrent = async <T, R>(
    values: T[],
    concurrency: number,
    mapper: (value: T, index: number) => Promise<R>
): Promise<R[]> => {
    const results = new Array<R>(values.length);
    let nextIndex = 0;

    const worker = async (): Promise<void> => {
        while (nextIndex < values.length) {
            const index = nextIndex;
            nextIndex += 1;
            results[index] = await mapper(values[index], index);
        }
    };

    await Promise.all(Array.from(
        { length: Math.min(concurrency, values.length) },
        () => worker()
    ));
    return results;
};

export const resolveImageDimensions = async (posts: Post[]): Promise<Map<string, ImageDimensions>> => {
    const urls = [...new Set(posts.flatMap(post => post.url))];
    let failures = 0;

    const dimensions = await mapConcurrent(urls, imageMetadataConcurrency, async url => {
        try {
            const prefix = await fetchImagePrefix(url);
            const result = readImageDimensions(prefix);
            if (!result || result.width <= 0 || result.height <= 0) throw new Error('Unsupported or incomplete image header');
            return result;
        } catch (error) {
            failures += 1;
            const message = error instanceof Error ? error.message : String(error);
            console.warn(`Could not resolve image dimensions for ${url}: ${message}`);
            return null;
        }
    });

    const result = new Map<string, ImageDimensions>();
    urls.forEach((url, index) => {
        const imageDimensions = dimensions[index];
        if (imageDimensions) result.set(url, imageDimensions);
    });

    console.log(`Resolved dimensions for ${result.size}/${urls.length} artwork images${failures ? ` (${failures} unavailable)` : ''}.`);
    return result;
};

const decodeRedditUrl = (value: string): string => value.replaceAll('&amp;', '&');

const imageStem = (value: string): string => {
    try {
        const filename = new URL(value).pathname.split('/').at(-1) ?? '';
        return filename.replace(/\.[^.]+$/, '');
    } catch {
        return '';
    }
};

const normalizeResponsiveSource = (source: RedditPreviewSource | undefined): ResponsiveImageSource | null => {
    const rawUrl = source?.url ?? source?.u;
    const width = source?.width ?? source?.x;
    if (!rawUrl || !width || width <= 0) return null;

    const url = decodeRedditUrl(rawUrl);
    try {
        const parsed = new URL(url);
        if (parsed.protocol !== 'https:' || !['preview.redd.it', 'i.redd.it'].includes(parsed.hostname)) return null;
        return { url: parsed.toString(), width };
    } catch {
        return null;
    }
};

const normalizeResponsiveSources = (sources: Array<RedditPreviewSource | undefined>): ResponsiveImageSource[] => {
    const byWidth = new Map<number, ResponsiveImageSource>();
    for (const source of sources) {
        const normalized = normalizeResponsiveSource(source);
        if (normalized) byWidth.set(normalized.width, normalized);
    }
    return [...byWidth.values()].sort((a, b) => a.width - b.width);
};

const fetchRedditMetadataBatch = async (postIds: string[]): Promise<RedditPostMetadata[]> => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), redditRequestTimeoutMs);
    const fullnames = postIds.map(id => `t3_${id}`).join(',');

    try {
        const response = await fetch(`https://www.reddit.com/api/info.json?id=${encodeURIComponent(fullnames)}&raw_json=1`, {
            headers: {
                Accept: 'application/json',
                'User-Agent': 'touhou-translations-build/1.0'
            },
            signal: controller.signal
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const payload = await response.json() as RedditInfoResponse;
        return payload.data?.children?.map(child => child.data).filter((post): post is RedditPostMetadata => Boolean(post)) ?? [];
    } finally {
        clearTimeout(timeout);
    }
};

export const resolveResponsiveImageSources = async (posts: Post[]): Promise<Map<string, ResponsiveImageSource[]>> => {
    const postsById = new Map<string, Post>();
    for (const post of posts) {
        const id = extractRedditId(post.reddit);
        if (id) postsById.set(id, post);
    }

    const ids = [...postsById.keys()];
    const batches = Array.from(
        { length: Math.ceil(ids.length / redditBatchSize) },
        (_, index) => ids.slice(index * redditBatchSize, (index + 1) * redditBatchSize)
    );

    let failedBatches = 0;
    const failureCounts = new Map<string, number>();
    const metadataBatches = await mapConcurrent(batches, redditMetadataConcurrency, async batch => {
        try {
            return await fetchRedditMetadataBatch(batch);
        } catch (error) {
            failedBatches += 1;
            const message = error instanceof Error ? error.message : String(error);
            failureCounts.set(message, (failureCounts.get(message) ?? 0) + 1);
            return [];
        }
    });

    if (failedBatches > 0) {
        const failures = [...failureCounts]
            .map(([message, count]) => `${message} for ${count} batch${count === 1 ? '' : 'es'}`)
            .join(', ');
        console.warn(
            `Reddit responsive metadata was unavailable for ${failedBatches}/${batches.length} batches`
            + ` (${failures}); continuing with original image URLs.`
        );
    }

    const result = new Map<string, ResponsiveImageSource[]>();
    for (const metadata of metadataBatches.flat()) {
        if (!metadata.id) continue;
        const post = postsById.get(metadata.id);
        if (!post) continue;

        const mediaByStem = new Map<string, RedditMediaMetadata>();
        for (const [mediaId, media] of Object.entries(metadata.media_metadata ?? {})) {
            mediaByStem.set(mediaId, media);
        }

        post.url.forEach((url, index) => {
            const media = mediaByStem.get(imageStem(url));
            const previewImage = metadata.preview?.images?.[index] ?? (index === 0 ? metadata.preview?.images?.[0] : undefined);
            const sources = media
                ? normalizeResponsiveSources([...(media.p ?? []), media.s])
                : normalizeResponsiveSources([...(previewImage?.resolutions ?? []), previewImage?.source]);
            if (sources.length > 0) result.set(url, sources);
        });
    }

    console.log(
        `Resolved responsive sources for ${result.size}/${new Set(posts.flatMap(post => post.url)).size} artwork images`
        + `${failedBatches ? ` (${failedBatches} Reddit metadata batches unavailable)` : ''}.`
    );
    return result;
};
