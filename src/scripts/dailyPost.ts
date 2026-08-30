import homePostsData from '../../generated/home-posts.json';
import type { HomePost } from '../types/data';
import { selectDailyPost } from '../utils/dailyPost';
import { pagePath } from '../utils/paths';
import { responsiveSrcset } from '../utils/responsiveImage';

const root = document.querySelector<HTMLElement>('[data-daily-post]');
const link = root?.querySelector<HTMLAnchorElement>('[data-daily-link]');
const image = root?.querySelector<HTMLImageElement>('[data-daily-image]');
const post = selectDailyPost(homePostsData as HomePost[]);

if (post && link && image) {
    link.href = pagePath(`posts/${post.id}`);
    image.src = post.img;
    const srcset = responsiveSrcset(post.imgSources, post.img);
    if (srcset) image.srcset = srcset;
    else image.removeAttribute('srcset');
    image.classList.toggle('nsfw', post.nsfw);
}
