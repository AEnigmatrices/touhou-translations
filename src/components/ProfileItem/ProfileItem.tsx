import React, { useEffect, useRef, useState } from "react";
import { navigate } from "vike/client/router";
import { getRandomPlaceholder } from "../../utils/galleryUtils";
import { Box, Avatar, Typography, Paper } from "@mui/material";
import styles from "./ProfileItem.styles";

interface Props {
    name: string;
    imageUrl?: string | null;
    description?: string;
    link?: string;
}

const ProfileItem: React.FC<Props> = ({ name, imageUrl, description, link }) => {

    const observerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [imgSrc, setImgSrc] = useState<string | null>(null);

    const handleClick = () => {
        if (link) navigate(link);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if ((event.key === 'Enter' || event.key === ' ') && link) {
            event.preventDefault();
            navigate(link);
        }
    };

    const handleImageError = () => {
        setImgSrc(getRandomPlaceholder());
    };



    useEffect(() => {
        const node = observerRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isVisible) {
            setImgSrc(imageUrl ?? getRandomPlaceholder());
        }
    }, [isVisible, imageUrl]);



    const ImageContent = imgSrc
        ? (
            <Avatar
                src={imgSrc}
                alt={name}
                sx={styles.avatar}
                variant="rounded"
                onError={handleImageError}
                slotProps={{ img: { loading: "lazy" } }}
            />
        ) : (
            <Box sx={styles.placeholder} aria-hidden />
        );

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
        <Paper component="li" elevation={1} role="listitem" aria-label={`Profile: ${name}`} tabIndex={link ? undefined : 0} sx={styles.paper}  >
            <Box ref={observerRef}>
                {link ? (
                    <Box onClick={handleClick} onKeyDown={handleKeyDown} sx={{ ...styles.linkBox, cursor: 'pointer' }} role="button" tabIndex={0}  >
                        {Content}
                    </Box>
                ) : (
                    <Box sx={styles.linkBox}>{Content}</Box>
                )}
            </Box>
        </Paper>
    );
};

export default ProfileItem;