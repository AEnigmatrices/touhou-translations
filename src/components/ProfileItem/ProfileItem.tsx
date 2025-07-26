import React from "react";
import { navigate } from "vike/client/router";
import { Box, Avatar, Typography, Paper } from "@mui/material";
import styles from "./ProfileItem.styles";

interface Props {
    name: string;
    imageUrl?: string | null;
    description?: string;
    link?: string;
}

const ProfileItem: React.FC<Props> = ({ name, imageUrl, description, link }) => {
    const ImageContent = imageUrl
        ? <Avatar src={imageUrl} alt={name} sx={styles.avatar} variant="rounded" />
        : <Box sx={styles.placeholder} aria-hidden />;

    const handleClick = () => {
        if (link) navigate(link);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if ((event.key === 'Enter' || event.key === ' ') && link) {
            event.preventDefault();
            navigate(link);
        }
    };

    const Content = (
        <Box sx={styles.content}>
            {ImageContent}
            <Box sx={styles.textContainer}>
                <Typography variant="subtitle1" fontWeight={600}>{name}</Typography>
                {description && (
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                )}
            </Box>
        </Box>
    );

    return (
        <Paper component="li" elevation={1} role="listitem" aria-label={`Profile: ${name}`} tabIndex={link ? undefined : 0} sx={styles.paper}   >
            {link ? (
                <Box onClick={handleClick} onKeyDown={handleKeyDown} sx={{ ...styles.linkBox, cursor: 'pointer' }} role="button" tabIndex={0} >
                    {Content}
                </Box>
            ) : (
                <Box sx={styles.linkBox}>{Content}</Box>
            )}
        </Paper>
    );
};

export default ProfileItem;