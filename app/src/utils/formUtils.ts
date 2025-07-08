import { useCallback, useRef } from 'react';
import type { Artist } from '../types/data';

const headers = { 'Content-Type': 'application/json' };


export const useDebouncedValidation = (
    validateFn: (value: string) => Promise<string | void>, onError: (message: string) => void, onClear: () => void, delay = 500
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