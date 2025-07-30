import { useEffect, useMemo, useRef, useState } from 'react';
import { useAppData } from '../../renderer/useAppData';
import { filterPosts } from '../../utils/filterPosts';
import Gallery from '../../components/Gallery/Gallery';
import GalleryHeaderCharacter from '../../components/GalleryHeader/GalleryHeaderCharacter';
import GalleryHeaderArtist from '../../components/GalleryHeader/GalleryHeaderArtist';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { useTheme } from '@mui/material/styles';
import { switchSlotProps, containerStyles, headerWrapperStyles, galleryHeaderBoxStyles, switchLabelStyles, loaderBoxStyles } from './styles';

const PAGE_CHUNK_SIZE = 12;

const Page = ({ urlParsed }: { urlParsed: { pathname: string, searchOriginal?: string } }) => {
    const theme = useTheme();
    const { posts, artists, characters, loading, error } = useAppData();

    const searchParams = new URLSearchParams(urlParsed.searchOriginal || '');

    const characterQueries = searchParams.getAll('character');
    const artistQueries = searchParams.getAll('artist');
    const mode = searchParams.get('mode') === 'or' ? 'or' : 'and';
    const galleryOnlyParam = searchParams.get('galleryOnly') === 'true';

    const [galleryOnly, setGalleryOnly] = useState(galleryOnlyParam);
    const [visibleCount, setVisibleCount] = useState(PAGE_CHUNK_SIZE);

    const loaderRef = useRef<HTMLDivElement | null>(null);
    const isLoadingRef = useRef(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const characterId = characterQueries[0] ?? null;
    const character = characterId ? characters.find(c => c.id === characterId) ?? null : null;

    const artistId = artistQueries[0] ?? null;
    const artist = artistId ? artists.find(a => a.id === artistId) ?? null : null;



    const filteredPosts = useMemo(() => {
        const baseFiltered = filterPosts(posts, characterQueries, artistQueries, mode);
        return galleryOnly ? baseFiltered.filter(post => post.url.length > 1) : baseFiltered;
    }, [posts, characterQueries, artistQueries, mode, galleryOnly]);

    const filterKey = useMemo(() => {
        const chars = characterQueries.slice().sort().join(',');
        const artists = artistQueries.slice().sort().join(',');
        return `${chars}|${artists}|${mode}|${galleryOnly}|${filteredPosts.length}`;
    }, [characterQueries, artistQueries, mode, galleryOnly, filteredPosts.length]);

    const shuffledPosts = useMemo(() => filteredPosts.slice().sort(() => Math.random() - 0.5), [filterKey]);
    const visiblePosts = useMemo(() => shuffledPosts.slice(0, visibleCount), [shuffledPosts, visibleCount]);



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



    useEffect(() => {
        if (!loaderRef.current) return;
        observerRef.current = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !isLoadingRef.current && visiblePosts.length < shuffledPosts.length) {
                    isLoadingRef.current = true;
                    setVisibleCount(prev => prev + PAGE_CHUNK_SIZE);
                }
            },
            { rootMargin: '200px' }
        );
        const currentObserver = observerRef.current;
        currentObserver.observe(loaderRef.current);
        return () => currentObserver.disconnect();
    }, [visiblePosts.length, shuffledPosts.length]);

    useEffect(() => { isLoadingRef.current = false; }, [visiblePosts.length]);



    if (loading) {
        return (
            <Box sx={loaderBoxStyles(theme)}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={loaderBoxStyles(theme)}>
                <Typography color="error">{error.message}</Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={containerStyles(theme)}>
            <Stack direction="row" sx={headerWrapperStyles(theme)}>
                {character && (
                    <Box sx={galleryHeaderBoxStyles(theme)}>
                        <GalleryHeaderCharacter character={character} />
                    </Box>
                )}
                {artist && (
                    <Box sx={galleryHeaderBoxStyles(theme)}>
                        <GalleryHeaderArtist artist={artist} />
                    </Box>
                )}
                <FormControlLabel
                    control={<Switch checked={galleryOnly} onChange={toggleGalleryOnly} color="primary" slotProps={switchSlotProps} />}
                    label={<Typography variant="body1">Gallery Only</Typography>} sx={switchLabelStyles(theme)}
                />
            </Stack>
            <Gallery posts={visiblePosts} />
            {visiblePosts.length < shuffledPosts.length && (
                <Box ref={loaderRef} sx={loaderBoxStyles(theme)} aria-busy="true">
                    <CircularProgress />
                </Box>
            )}
        </Container>
    );
}

export default Page;