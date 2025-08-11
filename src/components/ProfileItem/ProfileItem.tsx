import React, { useEffect, useRef, useState } from "react";
import { Box, Avatar, Typography, Paper } from "@mui/material";
import styles from "./ProfileItem.styles";

interface Props {
    name: string;
    imageUrl: string;
    description?: string;
    link?: string;
}

const ProfileItem: React.FC<Props> = ({ name, imageUrl, description, link }) => {

    const observerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [imgSrc, setImgSrc] = useState<string | null>(null);



    useEffect(() => {
        const node = observerRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isVisible) setImgSrc(imageUrl);
    }, [isVisible, imageUrl]);



    const ImageContent = imgSrc
        ? <Avatar src={imgSrc} alt={name} sx={styles.avatar} variant="rounded" slotProps={{ img: { loading: "lazy" } }} />
        : <Box sx={styles.placeholder} aria-hidden />;

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
                {link
                    ? <Box component="a" href={link} sx={styles.linkBox}>{Content}</Box>
                    : <Box sx={styles.linkBox}>{Content}</Box>
                }
            </Box>
        </Paper>
    );
};

export default ProfileItem;