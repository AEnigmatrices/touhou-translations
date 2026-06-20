<script lang="ts">
    import { resolve } from '$app/paths';
    import type { GalleryPost } from '../../../types/data';

    interface Props {
        posts: GalleryPost[];
    }

    let { posts }: Props = $props();
</script>

<div class="grid">
    {#each posts as post}
        <a class="tile" href={resolve('/posts/[id]', { id: post.id })} aria-label={`View post ${post.id}`}>
            <img class:nsfw={post.nsfw} src={post.img} alt="" loading="lazy" decoding="async" />
            {#if post.nsfw}<span>NSFW</span>{/if}
        </a>
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

    img.nsfw {
        filter: blur(10px);
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
