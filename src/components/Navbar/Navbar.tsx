import { useEffect, useState } from 'react';
import { navigate } from 'vike/client/router';
import { usePageContext } from 'vike-react/usePageContext';
import { getRandomPostPath } from '../../utils/fetchData';
import { AppBar, Toolbar, Tabs, Tab, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ElevationScroll } from './Navbar.utils';
import { navLinks } from '../../utils/navLinks';
import styles from './Navbar.styles';
import type { JSX } from 'react';


const Navbar = (): JSX.Element => {
    const pageContext = usePageContext();
    const [currentTab, setCurrentTab] = useState<string | false>(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const tabPaths = navLinks.map(link => link.to);
    const url = pageContext.urlOriginal;


    const handleLogoClick = async () => {
        const path = await getRandomPostPath();
        navigate(path);
    };

    const isCurrent = (to: string) => currentTab === to;


    useEffect(() => { setCurrentTab(tabPaths.includes(url) ? url : false); }, [url, tabPaths]);


    return (
        <ElevationScroll>
            <AppBar position="sticky" sx={styles.appBar}>
                <Toolbar sx={styles.toolbar}>
                    <Typography
                        variant="h6" component="div" onClick={handleLogoClick} sx={styles.title(theme)}
                        tabIndex={0} role="link" aria-label="Random post"
                    >
                        Touhou Translations
                    </Typography>

                    {!isMobile && (
                        <Tabs
                            value={currentTab} textColor="primary" indicatorColor="primary"
                            aria-label="navigation tabs" sx={styles.tabContainer}
                        >
                            {navLinks.map(({ label, to }) => (
                                <Tab key={to} value={to} label={label} onClick={() => navigate(to)} sx={styles.tab(isCurrent(to))} />
                            ))}
                        </Tabs>
                    )}
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    );
};

export default Navbar;