<script lang="ts">
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import { marked } from 'marked';
    import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
    import { fetchDerivedData } from '../../../utils/fetchData';
    import { extractRedditId } from '../../../utils/extractRedditId';
    import type { Artist, Character, Post } from '../../../types/data';

    interface ClientPostData {
        post: Post;
        artist: Artist | null;
        characters: Character[];
        randomArtistPosts: { id: string; img: string; nsfw: boolean }[];
        prevPostId: string | null;
        nextPostId: string | null;
    }

    let loading = $state(true);
    let postData = $state<ClientPostData | null>(null);
    let imageBackgrounds = $state<Record<string, string>>({});
    let loadedId = $state('');

    const id = $derived(page.params.id);
    const htmlDescription = $derived(postData ? marked.parse(postData.post.desc) : '');

    function galleryArtistUrl(artistId: string) {
        return `${resolve('/gallery')}?artist=${encodeURIComponent(artistId)}`;
    }

    const getRandomArtistPosts = <T,>(arr: T[]): T[] => {
        const result = [...arr];
        for (let i = 0; i < Math.min(4, result.length); i += 1) {
            const j = i + Math.floor(Math.random() * (result.length - i));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result.slice(0, 4);
    };

    function getDominantColor(image: HTMLImageElement): string | null {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d', { willReadFrequently: true });
        if (!context || image.naturalWidth === 0 || image.naturalHeight === 0) return null;

        const sampleSize = 32;
        const scale = Math.min(sampleSize / image.naturalWidth, sampleSize / image.naturalHeight, 1);
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
        const buckets = new Map<string, { count: number; r: number; g: number; b: number }>();

        for (let index = 0; index < pixels.length; index += 4) {
            const alpha = pixels[index + 3];
            if (alpha < 128) continue;

            const r = pixels[index];
            const g = pixels[index + 1];
            const b = pixels[index + 2];
            const key = `${r >> 4},${g >> 4},${b >> 4}`;
            const bucket = buckets.get(key) ?? { count: 0, r: 0, g: 0, b: 0 };
            bucket.count += 1;
            bucket.r += r;
            bucket.g += g;
            bucket.b += b;
            buckets.set(key, bucket);
        }

        const dominant = [...buckets.values()].sort((a, b) => b.count - a.count)[0];
        if (!dominant) return null;

        return `rgb(${Math.round(dominant.r / dominant.count)} ${Math.round(dominant.g / dominant.count)} ${Math.round(dominant.b / dominant.count)})`;
    }

    function setImageBackground(url: string) {
        if (imageBackgrounds[url]) return;

        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.onload = () => {
            try {
                const color = getDominantColor(image);
                if (!color) return;
                imageBackgrounds = { ...imageBackgrounds, [url]: color };
            } catch {
                imageBackgrounds = { ...imageBackgrounds, [url]: 'var(--color-surface)' };
            }
        };
        image.onerror = () => {
            imageBackgrounds = { ...imageBackgrounds, [url]: 'var(--color-surface)' };
        };
        image.src = url;
    }

    async function loadPost(postId: string) {
        loadedId = postId;
        loading = true;
        const {
            artistById,
            characterByPostId,
            artistPostsByArtistId,
            adjacentPostIdsByPostId,
            postByRedditId
        } = await fetchDerivedData();

        const post = postByRedditId.get(postId);
        if (!post || !post.url.length || !post.src) {
            postData = null;
            loading = false;
            return;
        }

        const artist = artistById.get(post.artistId) || null;
        const characters = characterByPostId.get(postId) ?? [];
        const artistPosts = (artistPostsByArtistId.get(post.artistId) ?? []).filter(item => item.reddit !== post.reddit);
        const randomArtistPosts = getRandomArtistPosts(artistPosts)
            .map(item => ({ id: extractRedditId(item.reddit), img: item.url[0], nsfw: item.nsfw }))
            .filter(item => item.id);
        const { prevPostId, nextPostId } = adjacentPostIdsByPostId.get(postId) ?? { prevPostId: null, nextPostId: null };

        postData = { post, artist, characters, randomArtistPosts, prevPostId, nextPostId };
        loading = false;
    }

    $effect(() => {
        if (typeof window !== 'undefined' && id && id !== loadedId) {
            void loadPost(id);
        }
    });
</script>

<svelte:head>
    <title>{postData?.artist?.name ?? 'Post'} | Touhou Translations</title>
</svelte:head>

<section class="root">
    {#if loading}
        <div class="loading"><LoadingIndicator /></div>
    {:else if !postData}
        <h1 class="not-found">Post not found.</h1>
    {:else}
        <div class="images">
            {#each postData.post.url as url, index}
                <figure style:background-color={imageBackgrounds[url] ?? undefined}>
                    <img
                        src={url}
                        alt={`Translated artwork page ${index + 1}`}
                        onload={() => setImageBackground(url)}
                    />
                </figure>
            {/each}
        </div>

        <aside class="info">
            <div class="panel">
                <p class="eyebrow">Artist</p>
                <h1>
                    <a class="artist-pill" href={galleryArtistUrl(postData.post.artistId)}>
                        {postData.artist?.name ?? postData.post.artistId}
                    </a>
                </h1>
                <div class="links">
                    <a href={postData.post.reddit} target="_blank" rel="noopener noreferrer">Reddit</a>
                    <a href={postData.post.src} target="_blank" rel="noopener noreferrer">Source</a>
                    {#if postData.prevPostId}<a href={resolve('/posts/[id]', { id: postData.prevPostId })}>Previous</a>{/if}
                    {#if postData.nextPostId}<a href={resolve('/posts/[id]', { id: postData.nextPostId })}>Next</a>{/if}
                </div>
            </div>

            {#if postData.characters.length}
                <div class="panel">
                    <p class="eyebrow">Characters</p>
                    <div class="chips">
                        {#each postData.characters as character}
                            <a href={`${resolve('/gallery')}?characters=${character.id}`}>{character.name}</a>
                        {/each}
                    </div>
                </div>
            {/if}

            <div class="panel prose">
                {@html htmlDescription}
            </div>

            {#if postData.randomArtistPosts.length}
                <div class="panel">
                    <p class="eyebrow">More by this artist</p>
                    <div class="more-grid">
                        {#each postData.randomArtistPosts as item}
                            <a href={resolve('/posts/[id]', { id: item.id })}>
                                <img src={item.img} alt="" loading="lazy" decoding="async" />
                            </a>
                        {/each}
                    </div>
                </div>
            {/if}
        </aside>
    {/if}
</section>

<style>
    .root {
        display: grid;
        width: min(1500px, 100%);
        grid-template-columns: minmax(0, 1fr) minmax(320px, 420px);
        gap: 1.5rem;
        margin: 0 auto;
    }

    .loading,
    .not-found {
        grid-column: 1 / -1;
    }

    .images {
        display: grid;
        gap: 1rem;
    }

    figure {
        overflow: hidden;
        padding: 0;
        margin: 0;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-sm);
    }

    figure img {
        display: block;
        width: auto;
        max-width: 100%;
        height: auto;
        margin-inline: auto;
    }

    .info {
        position: sticky;
        top: 88px;
        display: grid;
        align-self: start;
        gap: 1rem;
    }

    .panel {
        padding: 1rem;
        text-align: left;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-sm);
    }

    .eyebrow {
        margin: 0 0 0.35rem;
        color: var(--color-muted);
        font-size: 0.78rem;
        font-weight: 800;
        text-transform: uppercase;
    }

    h1 {
        margin: 0;
        color: var(--color-ink);
        font-size: 1.35rem;
    }

    .artist-pill {
        display: inline-flex;
        max-width: 100%;
        align-items: center;
        padding: 0.45rem 0.8rem;
        color: var(--color-primary);
        line-height: 1.2;
        text-decoration: none;
        overflow-wrap: anywhere;
        background: var(--color-primary-soft);
        border: 1px solid color-mix(in srgb, var(--color-primary) 24%, transparent);
        border-radius: 999px;
    }

    .artist-pill:hover {
        color: var(--color-surface);
        background: var(--color-primary);
    }

    .links,
    .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.85rem;
    }

    .links a,
    .chips a {
        padding: 0.4rem 0.65rem;
        color: var(--color-primary);
        font-size: 0.86rem;
        font-weight: 800;
        text-decoration: none;
        background: var(--color-primary-soft);
        border-radius: 999px;
    }

    .prose :global(p:first-child) {
        margin-top: 0;
    }

    .prose :global(p:last-child) {
        margin-bottom: 0;
    }

    .more-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.55rem;
    }

    .more-grid a {
        overflow: hidden;
        aspect-ratio: 1;
        border-radius: var(--radius-md);
    }

    .more-grid img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media (max-width: 900px) {
        .root {
            grid-template-columns: 1fr;
            padding: 1rem;
        }

        .info {
            position: static;
        }
    }
</style>
