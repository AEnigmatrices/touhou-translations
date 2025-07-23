import React from 'react';
import { Navigate } from 'react-router-dom';
import { Typography, Paper, Accordion, AccordionSummary, AccordionDetails, Stack, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PostForm from '../../components/DataForms/PostForm/PostForm';
import ArtistForm from '../../components/DataForms/ArtistForm/ArtistForm';
import styles from './AdminPage.styles';



const AdminPage: React.FC = () => {
    const theme = useTheme();

    if (import.meta.env.VITE_ENABLE_ADMIN !== "true") return <Navigate to="/" replace />;

    return (
        <Stack sx={styles.adminContainer} direction="column" spacing={3}>
            <Typography variant="h4" component="h2" sx={styles.header}>Admin Dashboard</Typography>

            <Paper elevation={3} sx={styles.paperFullHeight}>
                <Typography variant="h6" component="h3" sx={styles.contentTitle(theme)}>Content Submission</Typography>

                <Accordion sx={styles.accordionMargin}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="subtitle1">Reddit Posts</Typography></AccordionSummary>
                    <AccordionDetails><PostForm /></AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="subtitle1">Artists</Typography></AccordionSummary>
                    <AccordionDetails><ArtistForm /></AccordionDetails>
                </Accordion>
            </Paper>
        </Stack>
    );
};

export default AdminPage;