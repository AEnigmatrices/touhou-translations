import { useData } from 'vike-react/useData';
import About from './components/About';
import Video from './components/Video';
import DailyPost from './components/DailyPost';
import FeaturedPosts from './components/FeaturedPosts';
import styles from './styles.module.css';
import type { JSX } from 'react';
import type { Data } from './+data';

const Page = (): JSX.Element => {
    const { dailyPostCandidates, featuredPosts } = useData<Data>();
    return (
        <section className={styles.container}>
            <div className={styles.grid}>
                <div className={styles.featured}>
                    <FeaturedPosts featuredPosts={featuredPosts} />
                </div>
                <div className={styles.mainStack}>
                        <About />
                        <Video />
                </div>
                <div className={styles.side}>
                    <DailyPost posts={dailyPostCandidates} />
                </div>
            </div>
        </section>
    );
};

export default Page;
