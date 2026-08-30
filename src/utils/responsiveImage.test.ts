import { describe, expect, it } from 'vitest';
import { boundedResponsiveSrcset, responsiveSrcset } from './responsiveImage';

describe('responsiveSrcset', () => {
    it('sorts responsive candidates and includes the original fallback width', () => {
        expect(responsiveSrcset([
            { url: 'https://preview.redd.it/image.png?width=640', width: 640 },
            { url: 'https://preview.redd.it/image.png?width=320', width: 320 }
        ], 'https://i.redd.it/image.png', 1600)).toBe(
            'https://preview.redd.it/image.png?width=320 320w, '
            + 'https://preview.redd.it/image.png?width=640 640w, '
            + 'https://i.redd.it/image.png 1600w'
        );
    });

    it('omits srcset when only the fallback candidate is available', () => {
        expect(responsiveSrcset(undefined, 'https://i.redd.it/image.png', 1600)).toBeUndefined();
    });
});

describe('boundedResponsiveSrcset', () => {
    it('keeps existing Reddit candidates at or below the requested maximum width', () => {
        expect(boundedResponsiveSrcset([
            { url: 'https://preview.redd.it/image.png?width=320', width: 320 },
            { url: 'https://preview.redd.it/image.png?width=640', width: 640 },
            { url: 'https://preview.redd.it/image.png?width=1080', width: 1080 },
            { url: 'https://preview.redd.it/image.png?width=1440', width: 1440 }
        ], 'https://i.redd.it/image.png', 2000, 1080)).toBe(
            'https://preview.redd.it/image.png?width=320 320w, '
            + 'https://preview.redd.it/image.png?width=640 640w, '
            + 'https://preview.redd.it/image.png?width=1080 1080w'
        );
    });

    it('returns a single bounded candidate when that is all Reddit provides', () => {
        expect(boundedResponsiveSrcset([
            { url: 'https://preview.redd.it/image.png?width=960', width: 960 },
            { url: 'https://preview.redd.it/image.png?width=1440', width: 1440 }
        ], 'https://i.redd.it/image.png', 2000, 1080)).toBe(
            'https://preview.redd.it/image.png?width=960 960w'
        );
    });

    it('returns undefined when every available candidate exceeds the cap', () => {
        expect(boundedResponsiveSrcset([
            { url: 'https://preview.redd.it/image.png?width=1440', width: 1440 }
        ], 'https://i.redd.it/image.png', 2000, 1080)).toBeUndefined();
    });
});
