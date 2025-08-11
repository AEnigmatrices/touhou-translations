import React, { useState, useEffect } from 'react';
import { useTheme, useMediaQuery, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { navLinks } from '../../utils/navLinks';
import styles from './BottomNav.styles';

import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import BrushIcon from '@mui/icons-material/Brush';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const iconMap: Record<string, React.ReactNode> = {
    Home: <HomeIcon />,
    Characters: <PeopleIcon />,
    Artists: <BrushIcon />,
    Gallery: <PhotoLibraryIcon />,
    Admin: <AdminPanelSettingsIcon />,
};

const BottomNav: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [value, setValue] = useState(0);

    useEffect(() => {
        const currentIndex = navLinks.findIndex(link => window.location.pathname === new URL(link.to, window.location.origin).pathname);
        if (currentIndex !== -1) setValue(currentIndex);
    }, []);

    if (!isMobile) return null;
    return (
        <Paper elevation={8} sx={styles.root} component="footer" role="navigation" aria-label="Bottom navigation"   >
            <BottomNavigation showLabels value={value} onChange={(_event, newValue) => setValue(newValue)}>
                {navLinks.map(({ label, to }) => (
                    <BottomNavigationAction key={label} label={label} icon={iconMap[label] ?? <BrushIcon />} component="a" href={to} />
                ))}
            </BottomNavigation>
        </Paper>
    );
};

export default BottomNav;