import { useEffect } from 'react';
import { navigate, prefetch } from 'vike/client/router';
import { usePageContext } from 'vike-react/usePageContext';
import { getRandomPostPath } from '../../utils/fetchData';
import { navLinks } from '../../utils/navLinks';
import styles from './styles.module.css';
import type { JSX } from 'react';


const Navbar = (): JSX.Element => {
    const pageContext = usePageContext();
    const tabPaths = navLinks.map(link => link.to);
    const url = pageContext.urlOriginal;
    const currentTab = tabPaths.includes(url) ? url : false;


    const handleLogoClick = async () => {
        const path = await getRandomPostPath();
        navigate(path);
    };

    const isCurrent = (to: string) => currentTab === to;


    useEffect(() => { navLinks.forEach(({ to }) => prefetch(to)); }, []);


    return (
        <header className={styles.appBar}>
            <nav className={styles.toolbar} aria-label="Primary navigation">
                <button type="button" onClick={handleLogoClick} className={styles.title} aria-label="Random post">
                    Touhou Translations
                </button>

                <div className={styles.tabContainer} role="tablist" aria-label="Navigation tabs">
                    {navLinks.map(({ label, to }) => (
                        <a
                            key={to}
                            href={to}
                            className={`${styles.tab} ${isCurrent(to) ? styles.tabActive : ''}`}
                            aria-current={isCurrent(to) ? 'page' : undefined}
                        >
                            {label}
                        </a>
                    ))}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
