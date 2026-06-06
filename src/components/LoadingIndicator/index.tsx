import styles from './styles.module.css';
import type { JSX } from 'react';

export const LoadingIndicator = (): JSX.Element => (
    <div className={styles.root} aria-label="Loading" role="status">
        <span className={styles.spinner} />
    </div>
);

export default LoadingIndicator
