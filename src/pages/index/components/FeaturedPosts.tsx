import { Img } from 'react-image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Mousewheel } from 'swiper/modules';
import { extractRedditId } from '../../../utils/extractRedditId';
import LoadingIndicator from '../../../components/LoadingIndicator';
import styles from './styles.module.css';
import 'swiper/css';
import 'swiper/css/mousewheel';
import type { FC } from 'react';
import type { Post } from '../../../types/data';

const BASE_URL = import.meta.env.BASE_URL || '/';

const FeaturedPosts: FC<{ featuredPosts?: Post[] }> = ({ featuredPosts = [] }) => {
    if (featuredPosts.length === 0) return <p>No featured posts available.</p>;

    return (
        <section className={styles.card}>
            <div className={styles.cardContent}>
                <h2 className={styles.title}>
                    Featured Posts
                </h2>

                <Swiper
                    modules={[Autoplay, Mousewheel]}
                    slidesPerView="auto"
                    spaceBetween={16}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    loop={true}
                    breakpoints={{
                        600: { slidesPerView: 2, spaceBetween: 16 },
                        900: { slidesPerView: 3, spaceBetween: 20 },
                        1200: { slidesPerView: 4, spaceBetween: 24 },
                    }}
                    mousewheel={true}
                >
                    {featuredPosts.map((post) => {
                        const imageUrl = post.url?.[0];
                        const redditId = extractRedditId(post.reddit);
                        if (!imageUrl || !redditId) return null;

                        return (
                            <SwiperSlide key={redditId}>
                                <a
                                    href={`${BASE_URL}posts/${redditId}/`}
                                    aria-label={`View featured post ${redditId}`}
                                    rel="noopener noreferrer"
                                    className={styles.item}
                                >
                                    <div className={styles.imageWrapper}>
                                        <div className={styles.wrapper}>
                                            <Img
                                                src={[imageUrl]}
                                                loader={<LoadingIndicator />}
                                                unloader={<LoadingIndicator />}
                                                decode={false}
                                                alt={`Featured post ${redditId}`}
                                                className={styles.image}
                                                style={{ filter: post.nsfw ? 'blur(10px)' : 'none' }}
                                                onLoad={(e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.opacity = '1'; }}
                                            />
                                        </div>
                                    </div>
                                </a>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </section>
    );
};

export default FeaturedPosts;
