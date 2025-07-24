import React, { useState } from 'react';
import { AppBar, Toolbar, Tabs, Tab, IconButton, Drawer, List, ListItemButton, ListItemText, Typography, useMediaQuery, Box, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { ElevationScroll, navLinks } from './Navbar.utils';
import { appBarSx, toolbarSx, titleSx, drawerBoxSx, tabContainerSx, tabSx } from './Navbar.styles';



const Navbar: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [drawerOpen, setDrawerOpen] = useState(false);

    const currentTab = -1;
    const postId = 1;

    const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);
    const isCurrent = (to: string) => false;

    const handleDrawerKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Tab' || event.key === 'Shift') return;
        setDrawerOpen(false);
    };

    const handleNavigation = (to: string) => {
        setDrawerOpen(false);
        window.location.href = to;
    };

    return (
        <ElevationScroll>
            <AppBar position="sticky" sx={appBarSx}>
                <Toolbar sx={toolbarSx}>
                    <Typography variant="h6" component="a" href={`/post/${postId}`} sx={titleSx(theme)}  >
                        Touhou Translations
                    </Typography>

                    {isMobile ? (
                        <>
                            <IconButton edge="end" color="inherit" aria-label="open navigation menu" onClick={toggleDrawer(true)} size="large"  >
                                <MenuIcon />
                            </IconButton>

                            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                                <Box sx={drawerBoxSx} role="presentation" onKeyDown={handleDrawerKeyDown}>
                                    <List>
                                        {navLinks.map(({ label, to }) => (
                                            <ListItemButton key={to} onClick={() => handleNavigation(to)} >
                                                <ListItemText primary={label} />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Box>
                            </Drawer>
                        </>
                    ) : (
                        <Tabs value={false} textColor="primary" indicatorColor="primary" aria-label="navigation tabs" sx={tabContainerSx}   >
                            {navLinks.map(({ label, to }) => (
                                <Tab key={to} label={label} component="a" href={to} sx={tabSx(false)} />
                            ))}
                        </Tabs>
                    )}
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    );
};

export default Navbar;