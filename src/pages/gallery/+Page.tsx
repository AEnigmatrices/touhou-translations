import { useAppData } from '../../renderer/useAppData';
import useFilteredPosts from './useFilteredPosts';
import useInfiniteScroll from './useInfiniteScroll';
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

import { useTheme } from '@mui/material/styles';
import { switchSlotProps, containerStyles, headerWrapperStyles, galleryHeaderBoxStyles, switchLabelStyles, loaderBoxStyles } from './styles';

interface Props { pathname: string; searchOriginal?: string }


const Page = ({ urlParsed }: { urlParsed: Props }) => {
    const theme = useTheme();
    const { posts, artists, characters, loading, error } = useAppData();

    const { characterQueries, artistQueries, mode, galleryOnly, toggleGalleryOnly } = useQueryParams(urlParsed);
    const { loaderRef, visibleCount } = useInfiniteScroll({ totalItems: posts.length });
    const { shuffledPosts, visiblePosts } = useFilteredPosts({ posts, characterQueries, artistQueries, mode, galleryOnly, visibleCount });

    const characterId = characterQueries[0] ?? null;
    const character = characterId ? characters.find(c => c.id === characterId) ?? null : null;

    const artistId = artistQueries[0] ?? null;
    const artist = artistId ? artists.find(a => a.id === artistId) ?? null : null;



    if (loading) return <Box sx={loaderBoxStyles(theme)}><CircularProgress /></Box>
    if (error) return <Box sx={loaderBoxStyles(theme)}><Typography color="error">{error.message}</Typography></Box>
    return (
        <Container maxWidth="lg" sx={containerStyles(theme)}>
            <Stack direction="row" sx={headerWrapperStyles(theme)}>
                {character && (
                    <Box sx={galleryHeaderBoxStyles(theme)}><GalleryHeaderCharacter character={character} /></Box>
                )}
                {artist && (
                    <Box sx={galleryHeaderBoxStyles(theme)}><GalleryHeaderArtist artist={artist} /></Box>
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
};

export default Page;