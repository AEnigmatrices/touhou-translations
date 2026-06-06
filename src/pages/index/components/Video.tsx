import type { JSX } from 'react';
import styles from './styles.module.css';

const Video = (): JSX.Element => {
    return (
        <section className={styles.videoContainer}>
            <h2 className={styles.title}>
                Featured Video
            </h2>

            <div className={styles.videoWrapper}>
                <iframe
                    src="https://www.youtube-nocookie.com/embed/Gfev_ZEBRNk"
                    title="Featured Video"
                    className={styles.iframe}
                    allowFullScreen
                />
            </div>
        </section>
    );
};

export default Video;
