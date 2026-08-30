import { describe, expect, it } from 'vitest';
import { responsiveSrcset } from './responsiveImage';

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
