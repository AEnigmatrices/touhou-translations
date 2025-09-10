import { useState } from 'react';

const useQueryParams = (urlParsed: any) => {

    const searchParams = new URLSearchParams(urlParsed.searchOriginal || '');

    const characterQueries = searchParams.getAll('character');
    const artistQueries = searchParams.getAll('artist');
    const mode: 'and' | 'or' = searchParams.get('mode') === 'or' ? 'or' : 'and';

    const [galleryOnly, setGalleryOnly] = useState(false);

    const toggleGalleryOnly = () => setGalleryOnly(prev => !prev);

    return { characterQueries, artistQueries, mode, galleryOnly, toggleGalleryOnly };
};

export default useQueryParams;