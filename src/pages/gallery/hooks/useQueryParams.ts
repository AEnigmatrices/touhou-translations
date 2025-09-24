import { useState } from 'react';

const useQueryParams = (urlParsed: any) => {
    const searchParams = new URLSearchParams(urlParsed.searchOriginal || '');

    const charactersParam = searchParams.get('characters') || '';
    const characterQueries = charactersParam
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

    const artistsParam = searchParams.get('artists') || '';
    const artistQueries = artistsParam
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

    const mode: 'and' | 'or' = searchParams.get('mode') === 'or' ? 'or' : 'and';

    const [galleryOnly, setGalleryOnly] = useState(false);
    const toggleGalleryOnly = () => setGalleryOnly(prev => !prev);

    return { characterQueries, artistQueries, mode, galleryOnly, toggleGalleryOnly };
};

export default useQueryParams;