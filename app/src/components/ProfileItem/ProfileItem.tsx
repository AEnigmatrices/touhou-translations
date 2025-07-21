import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Avatar, Typography, Paper, Link as MuiLink } from "@mui/material";
import { avatarSx, contentSx, linkBoxSx, paperSx, placeholderSx, textContainerSx } from "./ProfileItem.styles";

interface Props { name: string; imageUrl?: string | null; description?: string; link?: string; }



const ProfileItem: React.FC<Props> = ({ name, imageUrl, description, link }) => {

    const ImageContent = imageUrl
        ? <Avatar src={imageUrl} alt={name} sx={avatarSx} variant="rounded" />
        : <Box sx={placeholderSx} aria-hidden />

    const Content = (
        <Box sx={contentSx}>
            {ImageContent}
            <Box sx={textContainerSx}>
                <Typography variant="subtitle1" fontWeight={600}>{name}</Typography>
                {description && <Typography variant="body2" color="text.secondary">{description}</Typography>}
            </Box>
        </Box>
    );

    return (
        <Paper component="li" elevation={1} role="listitem" aria-label={`Profile: ${name}`} tabIndex={link ? undefined : 0} sx={paperSx} >
            {link
                ? <MuiLink component={RouterLink} to={link} underline="none" color="inherit" sx={linkBoxSx} >{Content}</MuiLink>
                : <Box sx={linkBoxSx}>{Content}</Box>
            }
        </Paper>
    );
};

export default ProfileItem;