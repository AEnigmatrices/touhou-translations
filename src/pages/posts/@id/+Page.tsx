import { useEffect, useState } from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import { Box, Typography } from '@mui/material'
import ImageSection from './ImageSection/ImageSection'
import InfoSection from './InfoSection/InfoSection'
import styles from './posts.styles'
import LoadingIndicator from '../../../components/LoadingIndicator'
import { fetchDerivedData } from '../../../utils/fetchData'
import { extractRedditId } from '../../../utils/extractRedditId'
import type { Artist, Character, Post } from '../../../types/data'

interface ClientPostData {
    post: Post;
    artist: Artist | null;
    characters: Character[];
    randomArtistPosts: { id: string; img: string; nsfw: boolean; }[];
    prevPostId: string | null;
    nextPostId: string | null;
}

const RANDOM_ARTIST_POSTS_COUNT = 4;

const getRandomArtistPosts = <T,>(arr: T[]): T[] => {
    const result = [...arr];
    for (let i = 0; i < Math.min(RANDOM_ARTIST_POSTS_COUNT, result.length); i++) {
        const j = i + Math.floor(Math.random() * (result.length - i));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result.slice(0, RANDOM_ARTIST_POSTS_COUNT);
};

const getClientPostData = async (id: string): Promise<ClientPostData | null> => {
    const {
        artistById,
        characterByPostId,
        artistPostsByArtistId,
        adjacentPostIdsByPostId,
        postByRedditId
    } = await fetchDerivedData();

    const post = postByRedditId.get(id);
    if (!post || !post.url.length || !post.src) return null;

    const artist = artistById.get(post.artistId) || null;
    const characters = characterByPostId.get(id) ?? [];
    const artistPosts = (artistPostsByArtistId.get(post.artistId) ?? []).filter(p => p.reddit !== post.reddit);
    const randomArtistPosts = getRandomArtistPosts(artistPosts).map(p => ({ id: extractRedditId(p.reddit), img: p.url[0], nsfw: p.nsfw }));
    const { prevPostId, nextPostId } = adjacentPostIdsByPostId.get(id) ?? { prevPostId: null, nextPostId: null };

    return { post, artist, characters, randomArtistPosts, prevPostId, nextPostId };
};

const Page = () => {
    const { routeParams } = usePageContext();
    const id = routeParams.id;
    const [data, setData] = useState<ClientPostData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        setLoading(true);

        getClientPostData(id)
            .then(postData => {
                if (mounted) setData(postData);
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, [id]);

    if (loading) {
        return (
            <Box sx={styles.root}>
                <LoadingIndicator />
            </Box>
        );
    }

    if (!data) {
        return (
            <Box sx={styles.root}>
                <Typography variant="h6">Post not found.</Typography>
            </Box>
        );
    }

    const { post, artist, characters, randomArtistPosts, prevPostId, nextPostId } = data

    return (
        <Box sx={styles.root}>
            <ImageSection urls={post.url} nsfw={post.nsfw} />
            <InfoSection
                post={post} artist={artist} characters={characters}
                artistPosts={randomArtistPosts} prevPostId={prevPostId} nextPostId={nextPostId}
            />
        </Box>
    )
}

export default Page;
