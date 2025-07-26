import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import ExternalLink from "../ExternalLink/ExternalLink";
import styles from "./Footer.styles";

const Footer: React.FC = () => {
    return (
        <Box component="footer" role="contentinfo" aria-label="Site footer" sx={styles.footer}>
            <Container maxWidth="md">
                <Stack spacing={1.5}>
                    <Typography variant="body2" color="text.secondary">
                        This site adheres to the{" "}
                        <ExternalLink href="https://touhou-project.news/guidelines_en/" label="Touhou Project fan content guidelines">
                            Touhou Project fan content guidelines
                        </ExternalLink>.
                    </Typography>

                    <Typography component="address" variant="body2" color="text.secondary" sx={{ fontStyle: 'normal' }}>
                        Touhou Project character portraits by{" "}
                        <ExternalLink href="https://www.pixiv.net/en/users/4920496" label="dairi's Pixiv profile">
                            dairi
                        </ExternalLink>{" "}
                        (
                        <ExternalLink href="https://www.nicovideo.jp/user/3494232" label="haruka's NicoNico profile">
                            haruka
                        </ExternalLink>
                        ), used accordingly to the specified permissions.
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        All fan comics, illustrations, and translated content remain the intellectual property of their original creators.
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Site repository on{" "}
                        <ExternalLink href="https://github.com/AEnigmatrices/touhou-translations" label="GitHub repository">GitHub</ExternalLink>

                        <Box component="span" mx={1}>|</Box>

                        Licensed under{" "}
                        <ExternalLink href="https://github.com/AEnigmatrices/touhou-translations/blob/main/LICENSE" label="MIT License">MIT</ExternalLink>

                        <Box component="span" mx={1}>|</Box>

                        Removal requests:{" "}
                        <ExternalLink href="https://github.com/AEnigmatrices/touhou-translations/issues" label="Open an issue">Open an issue</ExternalLink>
                    </Typography>
                </Stack>

                <Typography component="p" sx={styles.copyright}>
                    © AEnigmatrices, 2025. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;