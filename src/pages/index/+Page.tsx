import { useData } from 'vike-react/useData';
import { Container, Grid, Stack } from '@mui/material';
import About from './components/About';
import Video from './components/Video';
import DailyPost from './components/DailyPost';
import FeaturedPosts from './components/FeaturedPosts';
import styles from './styles/Page.styles';
import type { JSX } from 'react';
import type { Data } from './+data';

const Page = (): JSX.Element => {
    const { dailyPost, featuredPosts } = useData<Data>();
    return (
        <Container maxWidth="xl" sx={styles.container}>
            <Grid container spacing={{ xs: 2, md: 4 }}>
                <Grid size={{ xs: 12 }}>
                    <FeaturedPosts featuredPosts={featuredPosts} />
                </Grid>
                <Grid size={{ xs: 12, md: 7 }}>
                    <Stack spacing={{ xs: 1, md: 2 }}>
                        <About />
                        <Video />
                    </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 5 }}>
                    <DailyPost dailyPost={dailyPost} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Page;
