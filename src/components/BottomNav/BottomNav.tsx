import React, { useState, useEffect } from 'react';
import { navLinks } from '../../utils/navLinks';
import styles from './styles.module.css';

const iconMap: Record<string, string> = {
    Home: '⌂',
    Characters: '人',
    Artists: '✎',
    Gallery: '▦',
    Admin: '⚙',
};

const BottomNav: React.FC = () => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        const currentIndex = navLinks.findIndex(link => window.location.pathname === new URL(link.to, window.location.origin).pathname);
        if (currentIndex !== -1) setValue(currentIndex);
    }, []);

    return (
        <footer className={styles.root} role="navigation" aria-label="Bottom navigation">
            {navLinks.map(({ label, to }, index) => (
                <a
                    key={label}
                    href={to}
                    className={`${styles.item} ${value === index ? styles.active : ''}`}
                    aria-current={value === index ? 'page' : undefined}
                    onClick={() => setValue(index)}
                >
                    <span className={styles.icon} aria-hidden="true">{iconMap[label] ?? '•'}</span>
                    <span className={styles.label}>{label}</span>
                </a>
            ))}
        </footer>
    );
};

export default BottomNav;
