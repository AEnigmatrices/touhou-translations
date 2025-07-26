import React, { useState } from 'react';
import { navigate } from 'vike/client/router';
import { useGetPosts } from '../../context/PostsContext';
import { extractRedditId } from '../../utils/extractRedditId';
import { AppBar, Toolbar, Tabs, Tab, IconButton, Drawer, List, ListItemButton, ListItemText, Typography, useMediaQuery, Box, useTheme } from '@mui/material';
import { ElevationScroll, navLinks } from './Navbar.utils';
import { appBarSx, toolbarSx, titleSx, drawerBoxSx, tabContainerSx, tabSx } from './Navbar.styles';
import MenuIcon from '@mui/icons-material/Menu';
import type { PageContext } from 'vike/types';



const Navbar: React.FC<{ pageContext: PageContext }> = ({ pageContext }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [drawerOpen, setDrawerOpen] = useState(false);

    const posts = useGetPosts();

    const getRandomPostPath = () => {
        if (posts.length === 0) return '/';
        const randomPost = posts[Math.floor(Math.random() * posts.length)];
        const redditId = extractRedditId(randomPost.reddit);
        return redditId ? `/posts/${redditId}` : '/';
    };

    const handleLogoClick = () => navigate(getRandomPostPath());

    const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);
    const isCurrent = (to: string) => pageContext.urlOriginal === to;

    const handleDrawerKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Tab' || event.key === 'Shift') return;
        setDrawerOpen(false);
    };

    const handleNavigation = (to: string) => {
        setDrawerOpen(false);
        navigate(to);
    };

    return (
        <ElevationScroll>
            <AppBar position="sticky" sx={appBarSx}>
                <Toolbar sx={toolbarSx}>
                    <Typography variant="h6" component="div" onClick={handleLogoClick} sx={titleSx(theme)} tabIndex={0} role="link" aria-label="Random post" >
                        Touhou Translations
                    </Typography>

                    {isMobile ? (
                        <>
                            <IconButton edge="end" color="inherit" aria-label="open navigation menu" onClick={toggleDrawer(true)} size="large"   >
                                <MenuIcon />
                            </IconButton>

                            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}   >
                                <Box sx={drawerBoxSx} role="presentation" onKeyDown={handleDrawerKeyDown}   >
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
                        <Tabs value={pageContext.urlOriginal} textColor="primary" indicatorColor="primary" aria-label="navigation tabs" sx={tabContainerSx}  >
                            {navLinks.map(({ label, to }) => (
                                <Tab key={to} value={to} label={label} onClick={() => handleNavigation(to)} sx={tabSx(isCurrent(to))} />
                            ))}
                        </Tabs>
                    )}
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    );
};

export default Navbar;