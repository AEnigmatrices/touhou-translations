import React, { useState, useEffect } from 'react';
import { GearIcon } from '@phosphor-icons/react/Gear';
import { HouseIcon } from '@phosphor-icons/react/House';
import { ImagesIcon } from '@phosphor-icons/react/Images';
import { PaintBrushIcon } from '@phosphor-icons/react/PaintBrush';
import { UsersIcon } from '@phosphor-icons/react/Users';
import { navLinks } from '../../utils/navLinks';
import styles from './styles.module.css';

const iconMap: Record<string, React.ReactNode> = {
    Home: <HouseIcon size={20} weight="bold" />,
    Characters: <UsersIcon size={20} weight="bold" />,
    Artists: <PaintBrushIcon size={20} weight="bold" />,
    Gallery: <ImagesIcon size={20} weight="bold" />,
    Admin: <GearIcon size={20} weight="bold" />,
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
                    <span className={styles.icon} aria-hidden="true">{iconMap[label] ?? <PaintBrushIcon size={20} weight="bold" />}</span>
                    <span className={styles.label}>{label}</span>
                </a>
            ))}
        </footer>
    );
};

export default BottomNav;
