import { Img } from 'react-image';
import { extractRedditId } from '../../../../utils/extractRedditId';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import styles from './styles.module.css';
import type { FC } from 'react';
import type { Post } from '../../../../types/data';

interface Props { posts: Post[]; }

const BASE_URL = import.meta.env.BASE_URL || '/';


const Gallery: FC<Props> = ({ posts }) => {

    if (!posts.length) return <p>No posts available.</p>;

    return (
        <div className={styles.grid}>
            {posts.map((post) => {
                if (!post.url?.length) return null;

                const redditId = extractRedditId(post.reddit);
                if (!redditId) return null;
                const postUrl = `${BASE_URL}posts/${redditId}/`;

                return (
                    <div className={styles.gridItem} key={redditId}>
                        <a
                            href={postUrl}
                            className={styles.item}
                            aria-label={`Gallery post from ${new Date(post.date).toLocaleDateString()}`}
                        >
                            <div className={styles.imageWrapper}>
                                <div className={styles.wrapper}>
                                    <Img
                                        src={[post.url[0]]}
                                        loader={<LoadingIndicator />}
                                        unloader={<LoadingIndicator />}
                                        decode={false}
                                        alt={`Gallery post from ${new Date(post.date).toLocaleDateString()}`}
                                        className={styles.image}
                                        style={{ filter: post.nsfw ? 'blur(10px)' : 'none' }}
                                    />
                                </div>
                            </div>
                        </a>
                    </div>
                );
            })}
        </div>
    );
};

export default Gallery;
