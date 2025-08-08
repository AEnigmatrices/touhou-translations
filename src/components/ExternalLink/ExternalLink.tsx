import { Link } from '@mui/material';
import styles from './ExternalLink.styles';
import type { FC, ReactNode } from 'react';

interface Props {
    href: string;
    children: ReactNode;
    label: string;
    startIcon?: ReactNode;
}

const ExternalLink: FC<Props> = ({ href, children, label, startIcon }) => (
    <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        sx={styles.link}
        aria-label={`${label} (opens in new tab)`}
    >
        {children}
        {startIcon}
    </Link>
);

export default ExternalLink;