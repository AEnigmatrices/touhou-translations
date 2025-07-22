import { Link } from '@mui/material';
import styles from './ExternalLink.styles';

interface Props {
    href: string;
    children: React.ReactNode;
    label: string;
}

const ExternalLink: React.FC<Props> = ({ href, children, label }) => (
    <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        sx={styles.link}
        aria-label={`${label} (opens in new tab)`}
    >
        {children}
    </Link>
);

export default ExternalLink;