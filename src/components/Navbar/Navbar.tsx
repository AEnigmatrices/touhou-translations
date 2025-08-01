import React, { useState } from 'react';
import { navigate } from 'vike/client/router';
import { useAppData } from '../../renderer/useAppData';
import { usePageContext } from '../../renderer/usePageContext';
import { AppBar, Toolbar, Tabs, Tab, IconButton, Drawer, List, ListItemButton, ListItemText, Typography, useMediaQuery, Box, useTheme, NoSsr } from '@mui/material';
import { ElevationScroll, navLinks, getRandomPostPath } from './Navbar.utils';
import styles from './Navbar.styles';
import MenuIcon from '@mui/icons-material/Menu';



const Navbar: React.FC = () => {
    const theme = useTheme();
    const pageContext = usePageContext();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [drawerOpen, setDrawerOpen] = useState(false);

    const { posts } = useAppData();
    const tabPaths = navLinks.map(link => link.to);
    const currentTab = tabPaths.includes(pageContext.urlOriginal) ? pageContext.urlOriginal : false;

    const handleLogoClick = () => navigate(getRandomPostPath(posts));

    const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);
    const isCurrent = (to: string) => pageContext.urlOriginal === to;

    const handleDrawerKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Tab' || event.key === 'Shift') return;
        setDrawerOpen(false);
    };

    const handleNavigation = (to: string) => {
        if (pageContext.urlOriginal === to) {
            setDrawerOpen(false)
            return;
        }
        setDrawerOpen(false);
        navigate(to);
    };

    return (
        <ElevationScroll>
            <AppBar position="sticky" sx={styles.appBar}>
                <Toolbar sx={styles.toolbar}>
                    <Typography variant="h6" component="div" onClick={handleLogoClick} sx={styles.title(theme)} tabIndex={0} role="link" aria-label="Random post" >
                        Touhou Translations
                    </Typography>
                    <NoSsr>
                        {isMobile ? (
                            <>
                                <IconButton edge="end" color="inherit" aria-label="open navigation menu" onClick={toggleDrawer(true)} size="large"   >
                                    <MenuIcon />
                                </IconButton>

                                <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}   >
                                    <Box sx={styles.drawerBox} role="presentation" onKeyDown={handleDrawerKeyDown}   >
                                        <List>
                                            {navLinks.map(({ label, to }) => (
                                                <ListItemButton key={to} onClick={() => handleNavigation(to)}   >
                                                    <ListItemText primary={label} />
                                                </ListItemButton>
                                            ))}
                                        </List>
                                    </Box>
                                </Drawer>
                            </>
                        ) : (
                            <Tabs value={currentTab} textColor="primary" indicatorColor="primary" aria-label="navigation tabs" sx={styles.tabContainer}  >
                                {navLinks.map(({ label, to }) => (
                                    <Tab key={to} value={to} label={label} onClick={() => handleNavigation(to)} sx={styles.tab(isCurrent(to))} />
                                ))}
                            </Tabs>
                        )}
                    </NoSsr>
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    );
};

export default Navbar;