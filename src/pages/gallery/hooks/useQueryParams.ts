import { useState } from 'react';

const useQueryParams = (urlParsed: any) => {
    const searchParams = new URLSearchParams(urlParsed.searchOriginal || '');

    const charactersParam = searchParams.get('characters') || '';
    const characterQueries = charactersParam
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

    const artistParam = searchParams.get('artist') || '';
    const artistQueries = artistParam
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

    const mode: 'and' | 'or' = searchParams.get('mode') === 'or' ? 'or' : 'and';

    const [galleryOnly, setGalleryOnly] = useState(false);
    const toggleGalleryOnly = () => setGalleryOnly(prev => !prev);

    return { characterQueries, artistQueries, mode, galleryOnly, toggleGalleryOnly };
};

export default useQueryParams;