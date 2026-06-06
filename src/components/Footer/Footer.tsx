import React from "react";
import ExternalLink from "./components/ExternalLink/ExternalLink";
import styles from "./styles.module.css";


const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <section className={styles.about}>
                        <h2 className={styles.title}>Touhou Translations</h2>
                        <p className={styles.bodyText}>
                            A fan-driven archive featuring English translations of Touhou illustrations and comics.
                        </p>
                        <p className={styles.bodyText}>
                            Character portraits by{" "}
                            <ExternalLink href="https://www.pixiv.net/en/users/4920496" label="dairi's Pixiv profile">
                                dairi
                            </ExternalLink>{" "}
                            (
                            <ExternalLink href="https://www.nicovideo.jp/user/3494232" label="haruka's NicoNico profile">
                                haruka
                            </ExternalLink>
                            ), used under their stated permissions. All fan works remain the property of their original creators.
                        </p>
                    </section>

                    <section className={styles.project}>
                        <h2 className={styles.sectionTitle}>Project</h2>
                        <div className={styles.linkStack}>
                                    <ExternalLink href="https://github.com/AEnigmatrices/touhou-translations" label="GitHub Repository" startIcon="GH">
                                        GitHub Repository
                                    </ExternalLink>

                                    <ExternalLink href="https://github.com/AEnigmatrices/touhou-translations/issues" label="Submit an Issue" startIcon="Bug">
                                        Submit an Issue
                                    </ExternalLink>

                                    <ExternalLink href="https://touhou-project.news/guidelines_en/" label="Fan Content Guidelines" startIcon="Doc">
                                        Fan Content Guidelines
                                    </ExternalLink>
                        </div>
                    </section>
                </div>

                <hr className={styles.divider} />

                <div className={styles.bottomBar}>
                    <div className={styles.socials}>
                        <a className={styles.iconButton} href="https://www.reddit.com/user/Aenigmatrix/" target="_blank" rel="noopener noreferrer" aria-label="Reddit">R</a>

                        <a className={styles.iconButton} href="https://x.com/aenigmatrix" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)">X</a>

                        <a className={styles.iconButton} href="https://www.pixiv.net/en/users/41327107" target="_blank" rel="noopener noreferrer" aria-label="Pixiv">P</a>

                        <a className={styles.iconButton} href="https://www.youtube.com/channel/UC_IOLpymEy7P4dnkUzxpqng" target="_blank" rel="noopener noreferrer" aria-label="YouTube">YT</a>
                    </div>

                    <small className={styles.copyright}>
                        © AEnigmatrices, 2025. All rights reserved.
                    </small>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
