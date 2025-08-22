import { useData } from 'vike-react/useData'
import { Box } from '@mui/material'
import ImageSection from './ImageSection/ImageSection'
import InfoSection from './InfoSection/InfoSection'
import styles from './posts.styles'
import type { Data } from './+data'

const Page = () => {
    const data = useData<Data>()
    const { post, artist, characters, randomArtistPosts, prevPostId, nextPostId } = data

    return (
        <Box sx={styles.root}>
            <ImageSection urls={post.url} />
            <InfoSection
                post={post} artist={artist} characters={characters}
                artistPosts={randomArtistPosts} prevPostId={prevPostId} nextPostId={nextPostId}
            />
        </Box>
    )
}

export default Page;