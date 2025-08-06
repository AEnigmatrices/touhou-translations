import { useState } from 'react';
import { useAppData } from '../../renderer/useAppData';
import useFilteredPosts from './useFilteredPosts';
import useQueryParams from './useQueryParams';
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
import Pagination from '@mui/material/Pagination';

import { useTheme } from '@mui/material/styles';
import styles from './styles';

interface Props { pathname: string; searchOriginal?: string }

const POSTS_PER_PAGE = 18;


const Page = ({ urlParsed }: { urlParsed: Props }) => {
    const theme = useTheme();

    const [currentPage, setCurrentPage] = useState(1);

    const { posts, artists, characters, loading, error } = useAppData();
    const { characterQueries, artistQueries, mode, galleryOnly, toggleGalleryOnly } = useQueryParams(urlParsed);
    const { shuffledPosts } = useFilteredPosts({ posts, characterQueries, artistQueries, mode, galleryOnly });

    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const visiblePosts = shuffledPosts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(shuffledPosts.length / POSTS_PER_PAGE);

    const characterId = characterQueries[0] ?? null;
    const character = characterId ? characters.find(c => c.id === characterId) ?? null : null;

    const artistId = artistQueries[0] ?? null;
    const artist = artistId ? artists.find(a => a.id === artistId) ?? null : null;



    if (loading) return <Box sx={styles.loaderBoxStyles(theme)}><CircularProgress /></Box>
    if (error) return <Box sx={styles.loaderBoxStyles(theme)}><Typography color="error">{error.message}</Typography></Box>
    return (
        <Container maxWidth="lg" sx={styles.containerStyles(theme)}>
            <Stack direction="row" sx={styles.headerWrapperStyles(theme)}>
                {character && (
                    <Box sx={styles.galleryHeaderBoxStyles(theme)}><GalleryHeaderCharacter character={character} /></Box>
                )}
                {artist && (
                    <Box sx={styles.galleryHeaderBoxStyles(theme)}><GalleryHeaderArtist artist={artist} /></Box>
                )}
                <FormControlLabel
                    control={<Switch checked={galleryOnly} onChange={toggleGalleryOnly} color="primary" slotProps={styles.switchSlotProps} />}
                    label={<Typography variant="body1">Gallery Only</Typography>} sx={styles.switchLabelStyles(theme)}
                />
            </Stack>

            <Gallery posts={visiblePosts} />

            {shuffledPosts.length > POSTS_PER_PAGE && (
                <Box sx={styles.paginationWrapperStyles(theme)}>
                    <Pagination
                        count={totalPages} page={currentPage} onChange={(_, value) => { setCurrentPage(value); window.scrollTo({ top: 0, behavior: 'auto' }); }}
                        color="primary" variant="outlined" shape="rounded" siblingCount={1} boundaryCount={1} sx={styles.paginationStyles(theme)}
                    />
                </Box>
            )}
        </Container>
    );
};

export default Page;