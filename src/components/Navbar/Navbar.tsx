import React from 'react';
import { navigate } from 'vike/client/router';
import { useAppData } from '../../renderer/useAppData';
import { usePageContext } from '../../renderer/usePageContext';
import { AppBar, Toolbar, Tabs, Tab, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ElevationScroll, getRandomPostPath } from './Navbar.utils';
import { navLinks } from '../../utils/navLinks';
import styles from './Navbar.styles';



const Navbar: React.FC = () => {

    const pageContext = usePageContext();
    const { posts } = useAppData();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });

    const tabPaths = navLinks.map(link => link.to);
    const currentTab = tabPaths.includes(pageContext.urlOriginal) ? pageContext.urlOriginal : false;

    const handleLogoClick = () => navigate(getRandomPostPath(posts));

    const isCurrent = (to: string) => pageContext.urlOriginal === to;

    return (
        <ElevationScroll>
            <AppBar position="sticky" sx={styles.appBar}>
                <Toolbar sx={styles.toolbar}>
                    <Typography variant="h6" component="div" onClick={handleLogoClick} sx={styles.title(theme)} tabIndex={0} role="link" aria-label="Random post" >
                        Touhou Translations
                    </Typography>
                    {!isMobile && (
                        <Tabs
                            value={currentTab} textColor="primary" indicatorColor="primary" aria-label="navigation tabs" sx={styles.tabContainer}
                        >
                            {navLinks.map(({ label, to }) => (
                                <Tab
                                    key={to} value={to} label={label} component="a" href={to} sx={styles.tab(isCurrent(to))}
                                />
                            ))}
                        </Tabs>
                    )}
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    );
};

export default Navbar;