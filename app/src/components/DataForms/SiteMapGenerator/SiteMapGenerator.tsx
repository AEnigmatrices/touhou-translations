import { useGetPosts } from '../../../context/PostsContext';
import { useMemo, useState } from 'react';
import { Button, Box, Typography, Stack } from '@mui/material';
import styles from './SiteMapGenerator.styles';

const BASE_URL = 'https://aenigmatrices.github.io/touhou-translations/#';

const staticRoutes = ['', 'search', 'characters', 'artists', 'gallery'];

const SiteMapGenerator = () => {
    const posts = useGetPosts();
    const [sitemap, setSitemap] = useState('');

    const buildSitemap = useMemo(() => {
        const urls: string[] = [];

        staticRoutes.forEach(route => {
            urls.push(`${BASE_URL}/${route}`);
        });

        posts.forEach((post, index) => {
            if (post) urls.push(`${BASE_URL}/post/${index + 1}`);
        });

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
            `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
            urls.map(url => `  <url><loc>${url}</loc></url>`).join('\n') +
            `\n</urlset>`;

        return xml;
    }, [posts]);

    const handleGenerate = () => setSitemap(buildSitemap);

    const handleDownload = () => {
        const blob = new Blob([sitemap], { type: 'application/xml' });
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
                Generate Sitemap.xml
            </Typography>

            <Stack spacing={styles.stackSpacing}>
                <Button variant="contained" onClick={handleGenerate} sx={styles.generateButton}>
                    Generate Sitemap
                </Button>

                {sitemap && (<Button variant="outlined" onClick={handleDownload} sx={styles.downloadButton}>
                    Download sitemap.xml
                </Button>)}
            </Stack>
        </Box>
    );
};

export default SiteMapGenerator;