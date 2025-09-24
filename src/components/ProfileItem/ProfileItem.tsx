import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { Img } from "react-image";
import LoadingIndicator from "../../components/LoadingIndicator";
import styles from "./ProfileItem.styles";

interface Props {
    name: string;
    imageUrl: string;
    description1?: string;
    description2?: string;
    link?: string;
    isSelectMode?: boolean;
    isSelected?: boolean;
    onToggleSelect?: () => void;
}

const ProfileItem: React.FC<Props> = ({ name, imageUrl, description1, description2, link, isSelectMode, isSelected, onToggleSelect }) => {

    const observerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    const handleItemClick = () => {
        if (isSelectMode && onToggleSelect) {
            onToggleSelect();
        }
    };

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

    const ImageContent = isVisible
        ? (
            <Img
                src={[imageUrl]}
                alt={name}
                decode={false}
                loader={<Box sx={styles.placeholder}><LoadingIndicator /></Box>}
                unloader={<Box sx={styles.placeholder} aria-hidden><LoadingIndicator /></Box>}
                style={styles.avatar}
            />
        )
        : <Box sx={styles.placeholder} aria-hidden />;

    const Content = (
        <Box sx={styles.content} onClick={handleItemClick}>
            {ImageContent}
            <Box sx={styles.textContainer}>
                {isSelectMode && onToggleSelect && (
                    <input
                        type="checkbox"
                        checked={isSelected}
                        readOnly
                        style={{ marginRight: "8px" }}
                        aria-label={`Select ${name}`}
                    />
                )}
                <Typography variant="subtitle1" fontWeight={600}>{name}</Typography>
                {description1 && <Typography variant="body2" color="text.secondary">{description1}</Typography>}
                {description2 && <Typography variant="body2" color="text.secondary">{description2}</Typography>}
            </Box>
        </Box>
    );

    return (
        <Paper component="li" elevation={1} role="listitem" aria-label={`Profile: ${name}`} tabIndex={link ? undefined : 0} sx={styles.paper}>
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