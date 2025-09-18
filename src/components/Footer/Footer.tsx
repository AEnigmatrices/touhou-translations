import React from "react";
import { Box, Container, Grid, Stack, Typography, IconButton, Divider } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import BugReportIcon from "@mui/icons-material/BugReport";
import DescriptionIcon from "@mui/icons-material/Description";
import RedditIcon from "@mui/icons-material/Reddit";
import TwitterIcon from "@mui/icons-material/Twitter";
import ImageIcon from "@mui/icons-material/Image";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ExternalLink from "./components/ExternalLink/ExternalLink";
import styles from "./Footer.styles";


const Footer: React.FC = () => {
    return (
        <Box component="footer" sx={styles.footer}>
            <Container maxWidth="xl">
                <Grid container spacing={{ xs: 4, md: 6 }}>
                    <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: "left" }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                            Touhou Translations
                        </Typography>
                        <Typography variant="body2" sx={styles.bodyText}>
                            A fan-driven archive featuring English translations of Touhou illustrations and comics.
                        </Typography>
                        <Typography variant="body2" sx={{ ...styles.bodyText, mt: 1 }}>
                            Character portraits by{" "}
                            <ExternalLink href="https://www.pixiv.net/en/users/4920496" label="dairi's Pixiv profile">
                                dairi
                            </ExternalLink>{" "}
                            (
                            <ExternalLink href="https://www.nicovideo.jp/user/3494232" label="haruka's NicoNico profile">
                                haruka
                            </ExternalLink>
                            ), used under their stated permissions. All fan works remain the property of their original creators.
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: "right" }}>
                        <Stack spacing={3}>
                            <Box>
                                <Typography variant="h6" sx={styles.sectionTitle}>
                                    Project
                                </Typography>
                                <Stack spacing={0.75} alignItems="flex-end">
                                    <ExternalLink href="https://github.com/AEnigmatrices/touhou-translations" label="GitHub Repository" startIcon={<GitHubIcon fontSize="small" />}>
                                        GitHub Repository
                                    </ExternalLink>

                                    <ExternalLink href="https://github.com/AEnigmatrices/touhou-translations/issues" label="Submit an Issue" startIcon={<BugReportIcon fontSize="small" />}>
                                        Submit an Issue
                                    </ExternalLink>

                                    <ExternalLink href="https://touhou-project.news/guidelines_en/" label="Fan Content Guidelines" startIcon={<DescriptionIcon fontSize="small" />}>
                                        Fan Content Guidelines
                                    </ExternalLink>
                                </Stack>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>

                <Divider sx={styles.divider} />

                <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 2, sm: 3 }} justifyContent="space-between" alignItems="center" sx={styles.bottomBar} >
                    <Stack direction="row" spacing={2}>
                        <IconButton component="a" href="https://www.reddit.com/user/Aenigmatrix/" target="_blank" aria-label="Reddit" sx={styles.iconButton} >
                            <RedditIcon />
                        </IconButton>

                        <IconButton component="a" href="https://x.com/aenigmatrix" target="_blank" aria-label="X (formerly Twitter)" sx={styles.iconButton} >
                            <TwitterIcon />
                        </IconButton>

                        <IconButton component="a" href="https://www.pixiv.net/en/users/41327107" target="_blank" aria-label="Pixiv" sx={styles.iconButton} >
                            <ImageIcon />
                        </IconButton>

                        <IconButton component="a" href="https://www.youtube.com/channel/UC_IOLpymEy7P4dnkUzxpqng" target="_blank" aria-label="YouTube" sx={styles.iconButton} >
                            <YouTubeIcon />
                        </IconButton>
                    </Stack>

                    <Typography variant="caption" color="text.secondary">
                        © AEnigmatrices, 2025. All rights reserved.
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;