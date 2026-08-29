<script lang="ts">
    import { resolve } from '$app/paths';
    import type { ResponsiveImageSource } from '../../../types/data';
    import { responsiveSrcset } from '../../../utils/responsiveImage';

    interface DailyPost {
        id: string;
        img: string;
        imgSources?: ResponsiveImageSource[];
        nsfw: boolean;
    }

    interface Props {
        post: DailyPost | null;
    }

    let { post }: Props = $props();
</script>

<section class="card daily">
    <h2>Post of the Day</h2>
    {#if post}
        <a class="daily-link" href={resolve('/posts/[id]', { id: post.id })}>
            <img
                class:nsfw={post.nsfw}
                src={post.img}
                srcset={responsiveSrcset(post.imgSources, post.img)}
                sizes="(max-width: 900px) calc(100vw - 2rem), min(40vw, 500px)"
                alt="Post of the day"
                loading="lazy"
                decoding="async"
            />
        </a>
    {/if}
</section>

<style>
    .card {
        overflow: hidden;
        padding: 1.1rem;
        text-align: left;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-sm);
    }

    h2 {
        margin: 0 0 0.85rem;
        color: var(--color-ink);
        font-size: 1.1rem;
    }

    .daily-link {
        display: block;
        overflow: hidden;
        aspect-ratio: 4 / 5;
        background: var(--color-bg-soft);
        border-radius: var(--radius-md);
    }

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    img.nsfw {
        filter: blur(10px);
    }
</style>
