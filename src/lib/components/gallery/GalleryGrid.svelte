<script lang="ts">
    import { base } from '$app/paths';
    import { extractRedditId } from '../../../utils/extractRedditId';
    import type { Post } from '../../../types/data';

    interface Props {
        posts: Post[];
    }

    let { posts }: Props = $props();
</script>

<div class="grid">
    {#each posts as post}
        {@const id = extractRedditId(post.reddit)}
        {#if id}
            <a class="tile" href={`${base}/posts/${id}/`} aria-label={`View post ${id}`}>
                <img src={post.url[0]} alt="" loading="lazy" decoding="async" />
                {#if post.nsfw}<span>NSFW</span>{/if}
            </a>
        {/if}
    {/each}
</div>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(6, minmax(0, 1fr));
        gap: 0.9rem;
    }

    .tile {
        position: relative;
        display: block;
        overflow: hidden;
        aspect-ratio: 1;
        background: var(--color-bg-soft);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-sm);
    }

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.2s ease;
    }

    .tile:hover img {
        transform: scale(1.04);
    }

    span {
        position: absolute;
        right: 0.5rem;
        bottom: 0.5rem;
        padding: 0.2rem 0.45rem;
        color: white;
        font-size: 0.72rem;
        font-weight: 800;
        background: rgba(24, 33, 47, 0.78);
        border-radius: 999px;
    }

    @media (max-width: 1180px) {
        .grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }
    }

    @media (max-width: 700px) {
        .grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }
</style>
