import { Button, Box } from '@mui/material';
import ArrowForward from "@mui/icons-material/ArrowForward";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { navigate } from 'vike/client/router';
import type { FC } from 'react';
import styles from './MenuButtons.styles';

interface Props {
    prevPostId: string | null;
    nextPostId: string | null;
    baseUrl?: string;
}

const MenuButtons: FC<Props> = ({ prevPostId, nextPostId, baseUrl = '/' }) => {
    const handleNavigate = (postId: string | null) => {
        if (postId) navigate(`${baseUrl}posts/${postId}`);
    };

    return (
        <Box sx={styles.container}>
            <Button
                variant="contained" disabled={!prevPostId} onClick={() => handleNavigate(prevPostId)}
                startIcon={<ArrowBack />} sx={styles.button}
            >
                Previous
            </Button>
            <Button
                variant="contained" disabled={!nextPostId} onClick={() => handleNavigate(nextPostId)}
                endIcon={<ArrowForward />} sx={styles.button}
            >
                Next
            </Button>
        </Box>
    );
};

export default MenuButtons;