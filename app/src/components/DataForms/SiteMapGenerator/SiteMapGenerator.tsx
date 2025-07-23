import { useGetPosts } from '../../../context/PostsContext';
import { Button, Box, Typography, Stack } from '@mui/material';
import styles from './SiteMapGenerator.styles';

const BASE_URL = 'https://aenigmatrices.github.io/touhou-translations';

const staticRoutes = ['', 'search', 'characters', 'artists', 'gallery'];



const SiteMapGenerator = () => {
    const posts = useGetPosts();

    const handleDownload = () => {
        const urls: string[] = [];

        staticRoutes.forEach(route => {
            const path = route ? `/${route}` : '';
            urls.push(`${BASE_URL}${path}`);
        });

        posts.forEach((post, index) => {
            if (post) urls.push(`${BASE_URL}/post/${index + 1}`);
        });

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
            `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
            urls.map(url => `  <url><loc>${url}</loc></url>`).join('\n') +
            `\n</urlset>`;

        const blob = new Blob([xml], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'sitemap.xml';
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Box sx={styles.containerBox}>
            <Typography variant="h5" sx={styles.titleTypography}>
                Download Sitemap.xml
            </Typography>

            <Stack spacing={styles.stackSpacing}>
                <Button variant="contained" onClick={handleDownload} sx={styles.generateButton}>
                    Download Sitemap
                </Button>
            </Stack>
        </Box>
    );
};

export default SiteMapGenerator;