import { useData } from 'vike-react/useData';
import { Container, Grid, Stack } from '@mui/material';
import About from './components/About';
import Video from './components/Video';
import DailyPost from './components/DailyPost';
import type { JSX } from 'react';
import type { Data } from './+data';

const Page = (): JSX.Element => {
    const { dailyPost } = useData<Data>();
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={{ xs: 3, md: 4 }}>
                <Grid size={{ xs: 12, md: 7 }}>
                    <Stack spacing={2}>
                        <About />
                        <Video />
                    </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 5 }}><DailyPost dailyPost={dailyPost} /></Grid>
            </Grid>
        </Container>
    );
};

export default Page;