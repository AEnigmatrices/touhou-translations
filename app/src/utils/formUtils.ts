import { useCallback, useRef } from 'react';
import type { Artist } from '../types/data';
import artists from '../../../data/artists.json';

const headers = { 'Content-Type': 'application/json' };

export const TWITTER_URL_PATTERN = /^(https?:\/\/)?(www\.)?x\.com\/.+$/i;
export const PIXIV_URL_PATTERN = /^https?:\/\/(www\.)?pixiv\.net\/.+$/i;



export const validateArtistId = (id: string): true | string => {
    const trimmed = id.trim();
    const exists = artists.some(artist => artist.id === trimmed);
    return exists || 'Artist ID does not exist.';
}



export const validateNewArtistId = async (id: string): Promise<true | string> => {
    const trimmed = id.trim();
    const exists = await new Promise<boolean>((resolve) => {
        setTimeout(() => { resolve(artists.some(artist => artist.id === trimmed)); }, 200);
    });
    return exists ? 'Artist ID already exists.' : true;
};



export const useDebouncedValidation = (
    validateFn: (value: string) => Promise<string | void>, onError: (message: string) => void,
    onClear: () => void, delay = 500
) => {
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    return useCallback((value: string) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
            const errorMsg = await validateFn(value.trim());
            if (typeof errorMsg === 'string' && errorMsg.length > 0) {
                onError(errorMsg);
            } else {
                onClear();
            }
        }, delay);
    }, [validateFn, onError, onClear, delay]);
};



export const submitNewArtist = async (artist: Artist): Promise<void> => {
    const response = await fetch('/api/artists', { method: 'POST', headers, body: JSON.stringify(artist) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Failed to add artist');
};