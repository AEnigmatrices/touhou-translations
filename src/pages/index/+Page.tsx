import { Container, Grid, Paper, Typography } from '@mui/material';
import NoSsr from '@mui/material/NoSsr';
import DailyPost from './DailyPost';
import type { JSX } from 'react';


const Page = (): JSX.Element => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={{ xs: 3, md: 4 }}>
                <Grid size={{ xs: 12, md: 5 }}>
                    <NoSsr><DailyPost /></NoSsr>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }} container direction="column" spacing={3}>
                    <Paper sx={{ p: 3, height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h6" color="text.secondary">
                            Sidebar Block 1 (Placeholder)
                        </Typography>
                    </Paper>
                    <Paper sx={{ p: 3, height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h6" color="text.secondary">
                            Sidebar Block 2 (Placeholder)
                        </Typography>
                    </Paper>
                    <Paper sx={{ p: 3, height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h6" color="text.secondary">
                            Sidebar Block 3 (Placeholder)
                        </Typography>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }} container direction="column" spacing={3}>
                    <Paper sx={{ p: 3, height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h6" color="text.secondary">
                            Sidebar Block 4 (Placeholder)
                        </Typography>
                    </Paper>
                    <Paper sx={{ p: 3, height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h6" color="text.secondary">
                            Sidebar Block 5 (Placeholder)
                        </Typography>
                    </Paper>
                    <Paper sx={{ p: 3, height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h6" color="text.secondary">
                            Sidebar Block 6 (Placeholder)
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Page;