import { Img } from 'react-image';
import LoadingIndicator from '../../../../../components/LoadingIndicator/index.tsx';
import styles from './styles.module.css';
import type { FC } from 'react';

interface Props {
    artistId: string;
    artistName: string | null;
    artistPosts: { id: string; img: string; nsfw: boolean; }[];
}

const baseUrl = import.meta.env.BASE_URL;

const SeeMoreArtist: FC<Props> = ({ artistId, artistName, artistPosts }) => {
    if (artistPosts.length === 0) return null;

    return (
        <section className={styles.seeMoreContainer}>
            <h3 className={styles.seeMoreTitle}>
                See more by{' '}
                <a
                    href={`${baseUrl}gallery?artist=${artistId}`}
                    className={styles.seeMoreArtistName}
                    aria-label={`View gallery for ${artistName ?? 'this Artist'}`}
                >
                    {artistName ?? 'this Artist'}
                </a>
            </h3>

            <div className={styles.grid}>
                {artistPosts.slice(0, 4).map(({ id, img, nsfw }) => (
                    <div key={id}>
                        <a
                            href={`${baseUrl}posts/${id}/`}
                            className={styles.seeMoreImage}
                        >
                            <Img
                                src={[img]}
                                alt={`See more by ${artistName ?? 'this Artist'}`}
                                decode={false}
                                loader={<LoadingIndicator />}
                                unloader={<LoadingIndicator />}
                                className={styles.image}
                                style={{ filter: nsfw ? 'blur(10px)' : 'none' }}
                            />
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SeeMoreArtist;
