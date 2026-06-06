import styles from './styles.module.css';
import type { FC, ReactNode } from 'react';

interface Props {
    href: string;
    children: ReactNode;
    label: string;
    startIcon?: ReactNode;
}

const ExternalLink: FC<Props> = ({ href, children, label, startIcon }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
        aria-label={`${label} (opens in new tab)`}
    >
        {children}
        {startIcon && <span className={styles.icon} aria-hidden="true">{startIcon}</span>}
    </a>
);

export default ExternalLink;
