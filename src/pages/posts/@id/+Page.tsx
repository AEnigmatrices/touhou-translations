import { render } from 'vike/abort';
import { useAppData } from '../../../renderer/useAppData';
import { extractRedditId } from '../../../utils/extractRedditId';
import { usePageContext } from '../../../renderer/usePageContext';
import { Box } from '@mui/material';
import ImageSection from './ImageSection/ImageSection';
import InfoSection from './InfoSection/InfoSection';
import styles from './posts.styles';
import type { JSX } from 'react';


const Page = (): JSX.Element => {
    const { posts, loading, error, artists, characters: allCharacters } = useAppData();
    const { id } = usePageContext().routeParams;

    if (loading) return <div>Loading...</div>;
    if (error) throw render(500, error.message);

    const post = posts.find(p => extractRedditId(p.reddit) === id);
    if (!post || !post.url.length || !post.src) throw render(404, `Post not found for ID: ${id}`);

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


    const dateSortedPosts = [...posts].sort((a, b) => a.date - b.date);
    const currentIndex = dateSortedPosts.findIndex(p => p.reddit === post.reddit);

    const prevPost = dateSortedPosts[currentIndex - 1] || null;
    const nextPost = dateSortedPosts[currentIndex + 1] || null;

    const prevPostId = prevPost ? extractRedditId(prevPost.reddit) : null;
    const nextPostId = nextPost ? extractRedditId(nextPost.reddit) : null;



    return (
        <Box sx={styles.root}>
            <ImageSection urls={post.url} />
            <InfoSection
                post={post} artist={artist} characters={characters}
                artistPosts={randomArtistPosts} prevPostId={prevPostId} nextPostId={nextPostId}
            />
        </Box>
    );
};

export default Page;