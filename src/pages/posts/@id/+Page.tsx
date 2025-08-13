import { render } from 'vike/abort';
import { useAppData } from '../../../renderer/useAppData';
import { extractRedditId } from '../../../utils/extractRedditId';
import { usePageContext } from '../../../renderer/usePageContext';
import { Box } from '@mui/material';
import ImageSection from './ImageSection/ImageSection';
import InfoSection from './InfoSection/InfoSection';
import styles from './posts.styles';
import type { JSX } from 'react';


const Page = (): JSX.Element | null => {
    const { posts, loading, error, artists, characters: allCharacters } = useAppData();
    const { id } = usePageContext().routeParams;

    if (loading) return <div>Loading...</div>;
    if (error) throw render(500, error.message);

    const post = posts.find(p => extractRedditId(p.reddit) === id);
    if (!post) throw render(404, `Post not found for ID: ${id}`);
    if (!post.url.length || !post.src) return null;

    const artist = artists.find(a => a.id === post.artistId) || null;
    const characters = allCharacters.filter(c => post.characterIds.includes(c.id));

    const artistPosts = posts.filter(p => p.artistId === post.artistId && p.reddit !== post.reddit);
    const randomArtistPosts = artistPosts
        .sort(() => 0.5 - Math.random())
        .slice(0, 4)
        .map(p => ({
            id: extractRedditId(p.reddit),
            img: p.url[0]
        }));

    return (
        <Box sx={{ position: 'relative', ...styles.root }}>
            <ImageSection urls={post.url} />
            <InfoSection
                post={post}
                artist={artist}
                characters={characters}
                artistPosts={randomArtistPosts}
            />
        </Box>
    );
};

export default Page;