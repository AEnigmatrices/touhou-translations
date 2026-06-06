import styles from './styles.module.css';
import profileIcon from '/icons/touhou-translations-profile-icon.png';
import type { JSX } from 'react';

const About = (): JSX.Element => {
    return (
        <section className={styles.aboutContainer}>
            <div className={styles.header}>
                <img
                    src={profileIcon}
                    alt="Touhou Project translations archive site profile icon"
                    className={styles.profileImage}
                />
                <h2 className={styles.title}>
                    About This Site
                </h2>
            </div>
            <p className={styles.aboutText}>
                This website is a personal archive and viewer for Touhou Project fan comics
                and illustrations that I have translated into English and posted on{' '}
                <a href="https://www.reddit.com/r/touhou/" target="_blank" rel="noopener noreferrer" className={styles.redditLink}>
                    r/touhou
                </a>.
            </p>
            <p className={styles.aboutText}>
                Honestly, I just want to have a convenient way to browse the artworks that I
                have already translated.
            </p>
        </section>
    );
};

export default About;
