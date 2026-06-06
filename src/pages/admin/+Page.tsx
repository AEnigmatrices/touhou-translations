import PostForm from './components/PostForm/PostForm';
import ArtistForm from './components/ArtistForm/ArtistForm';
import styles from './styles.module.css';

const Page = () => {
    return (
        <section className={styles.adminContainer}>
            <h2 className={styles.header}>Admin Dashboard</h2>

            <div className={styles.panel}>
                <h3 className={styles.contentTitle}>Content Submission</h3>

                <details className={styles.details} open>
                    <summary className={styles.summary}>Reddit Posts</summary>
                    <div className={styles.detailsBody}>
                        <PostForm />
                    </div>
                </details>

                <details className={styles.details}>
                    <summary className={styles.summary}>Artists</summary>
                    <div className={styles.detailsBody}>
                        <ArtistForm />
                    </div>
                </details>
            </div>
        </section>
    );
}

export default Page;
