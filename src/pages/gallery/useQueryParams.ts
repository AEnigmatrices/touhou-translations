import { useState } from 'react';

interface Props { pathname: string; searchOriginal?: string }

const useQueryParams = (urlParsed: Props) => {
    const searchParams = new URLSearchParams(urlParsed.searchOriginal || '');

    const characterQueries = searchParams.getAll('character');
    const artistQueries = searchParams.getAll('artist');
    const mode: 'and' | 'or' = searchParams.get('mode') === 'or' ? 'or' : 'and';
    const galleryOnlyParam = searchParams.get('galleryOnly') === 'true';

    const [galleryOnly, setGalleryOnly] = useState(galleryOnlyParam);

    const toggleGalleryOnly = () => {
        const newGalleryOnly = !galleryOnly;
        setGalleryOnly(newGalleryOnly);

        const newParams = new URLSearchParams(urlParsed.searchOriginal || '');
        if (newGalleryOnly) {
            newParams.set('galleryOnly', 'true');
        } else {
            newParams.delete('galleryOnly');
        }
        window.history.replaceState(null, '', `${urlParsed.pathname}?${newParams.toString()}`);
    };

    return { characterQueries, artistQueries, mode, galleryOnly, toggleGalleryOnly };
};

export default useQueryParams;