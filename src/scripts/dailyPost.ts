import type { HomePost } from '../types/data';
import { assetPath, pagePath } from '../utils/paths';
import { responsiveSrcset } from '../utils/responsiveImage';

const millisecondsPerDay = 86_400_000;

const isHomePost = (value: unknown): value is HomePost => {
    if (!value || typeof value !== 'object') return false;
    const post = value as Partial<HomePost>;
    return typeof post.id === 'string'
        && typeof post.img === 'string'
        && typeof post.nsfw === 'boolean'
        && typeof post.date === 'number';
};

const initializeDailyPost = (): void => {
    const root = document.querySelector<HTMLElement>('[data-daily-post]');
    if (!root || root.dataset.initialized === 'true') return;
    root.dataset.initialized = 'true';

    const link = root.querySelector<HTMLAnchorElement>('[data-daily-link]');
    const image = root.querySelector<HTMLImageElement>('[data-daily-image]');
    const postCount = Number(root.dataset.dailyCount ?? 0);
    if (postCount <= 0 || !link || !image) return;

    const day = Math.floor(Date.now() / millisecondsPerDay);
    const index = ((day % postCount) + postCount) % postCount;

    void fetch(assetPath(`runtime-data/daily-posts/${index}.json`))
        .then(async response => {
            if (!response.ok) throw new Error(`Daily post request failed with ${response.status}.`);
            const value: unknown = await response.json();
            if (!isHomePost(value)) throw new TypeError('Daily post response was invalid.');
            return value;
        })
        .then(post => {
            link.href = pagePath(`posts/${post.id}`);
            image.src = post.img;
            const srcset = responsiveSrcset(post.imgSources, post.img);
            if (srcset) image.srcset = srcset;
            else image.removeAttribute('srcset');
            image.classList.toggle('nsfw', post.nsfw);
        })
        .catch(error => {
            // Keep the server-rendered build-time daily post as a resilient fallback.
            console.error('Unable to refresh the post of the day.', error);
        });
};

document.addEventListener('astro:page-load', initializeDailyPost);
initializeDailyPost();
