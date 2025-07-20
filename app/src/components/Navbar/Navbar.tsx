import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

import { ElevationScroll, navLinks } from './Navbar.utils';
import { appBarSx, toolbarSx, titleSx, drawerBoxSx, tabContainerSx, tabSx } from './Navbar.styles';



const Navbar: React.FC = () => {
    const location = useLocation();
    const isMobile = useMediaQuery('(max-width:600px)');
    const [drawerOpen, setDrawerOpen] = useState(false);

    const currentTab = navLinks.findIndex(link => link.to === location.pathname);

    const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

    return (
        <ElevationScroll>
            <AppBar position="sticky" sx={appBarSx} >
                <Toolbar sx={toolbarSx}>
                    <Typography variant="h6" component={RouterLink} to="/" sx={titleSx} >
                        Touhou Translations
                    </Typography>

                    {isMobile ? (
                        <>
                            <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} size="large" sx={{ color: '#333' }} >
                                <MenuIcon />
                            </IconButton>

                            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)} >
                                <Box sx={drawerBoxSx} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} >
                                    <List>
                                        {navLinks.map(({ label, to }) => (
                                            <ListItemButton key={to} component={RouterLink} to={to} selected={location.pathname === to} >
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
                                <Tab key={to} label={label} component={RouterLink} to={to} sx={tabSx(currentTab === index)} />
                            ))}
                        </Tabs>
                    )}
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    );
};

export default Navbar;
