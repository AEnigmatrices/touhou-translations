import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useGetPosts } from '../../context/PostsContext';
import { AppBar, Toolbar, Tabs, Tab, IconButton, Drawer, List, ListItemButton, ListItemText, Typography, useMediaQuery, Box, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { ElevationScroll, navLinks } from './Navbar.utils';
import { appBarSx, toolbarSx, titleSx, drawerBoxSx, tabContainerSx, tabSx } from './Navbar.styles';



const Navbar: React.FC = () => {
    const posts = useGetPosts();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [drawerOpen, setDrawerOpen] = useState(false);

    const currentTab = navLinks.findIndex((link) => link.to === location.pathname);
    const postId = posts.length > 0 ? Math.floor(Math.random() * posts.length) + 1 : 1;



    const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);
    const isCurrent = (to: string) => location.pathname === to;

    const handleDrawerKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Tab' || event.key === 'Shift') return;
        setDrawerOpen(false);
    };



    return (
        <ElevationScroll>
            <AppBar position="sticky" sx={appBarSx}>
                <Toolbar sx={toolbarSx}>
                    <Typography variant="h6" component={RouterLink} to={`/post/${postId}`} sx={titleSx(theme)}  >
                        Touhou Translations
                    </Typography>

                    {isMobile ? (
                        <>
                            <IconButton edge="end" color="inherit" aria-label="open navigation menu" onClick={toggleDrawer(true)} size="large" >
                                <MenuIcon />
                            </IconButton>

                            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                                <Box sx={drawerBoxSx} role="presentation" onKeyDown={handleDrawerKeyDown} >
                                    <List>
                                        {navLinks.map(({ label, to }) => (
                                            <ListItemButton key={to} component={RouterLink} to={to} selected={isCurrent(to)} aria-current={isCurrent(to) ? 'page' : undefined} onClick={() => setDrawerOpen(false)} >
                                                <ListItemText primary={label} />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Box>
                            </Drawer>
                        </>
                    ) : (
                        <Tabs value={currentTab !== -1 ? currentTab : false} textColor="primary" indicatorColor="primary" aria-label="navigation tabs" sx={tabContainerSx} >
                            {navLinks.map(({ label, to }, index) => (
                                <Tab key={to} label={label} component={RouterLink} to={to} sx={tabSx(currentTab === index)} aria-current={currentTab === index ? 'page' : undefined} />
                            ))}
                        </Tabs>
                    )}
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    );
};

export default Navbar;
