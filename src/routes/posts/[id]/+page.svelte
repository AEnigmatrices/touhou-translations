<script lang="ts">
    import { asset, resolve } from '$app/paths';
    import { responsiveSrcset } from '../../../utils/responsiveImage';
    import { absoluteSiteUrl } from '../../../utils/siteMetadata';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
    let imageBackgrounds = $state<Record<string, string>>({});
    let showNsfw = $state(false);

    const artistName = $derived(data.artist?.name ?? data.post.artistId);
    const metadataDescription = $derived(
        data.post.metadataDescription || `A translated Touhou Project work by ${artistName}.`
    );
    const metadataTitle = $derived(`${artistName} | Touhou Translations`);
    const canonicalUrl = $derived(absoluteSiteUrl(`posts/${data.id}`));
    const socialImage = $derived(!data.post.nsfw
        ? data.post.url[0]
        : absoluteSiteUrl('icons/touhou-translations-profile-icon.png'));

    function galleryArtistUrl(artistId: string) {
        return `${resolve('/gallery')}?artist=${encodeURIComponent(artistId)}`;
    }

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

    $effect(() => {
        if (!data.id) return;

        showNsfw = false;
        imageBackgrounds = {};
    });
</script>

<svelte:head>
    <title>{metadataTitle}</title>
    <meta name="description" content={metadataDescription} />
    <link rel="canonical" href={canonicalUrl} />
    <meta property="og:title" content={metadataTitle} />
    <meta property="og:description" content={metadataDescription} />
    <meta property="og:type" content="article" />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:image" content={socialImage} />
</svelte:head>

<section class="root">
    <div class="images">
        {#each data.post.url as url, index (url)}
            {@const dimensions = data.post.imageDimensions?.[index]}
            {@const sources = data.post.imageSources?.[index]}
            <figure style:background-color={imageBackgrounds[url] ?? undefined}>
                <img
                    class:nsfw={data.post.nsfw && !showNsfw}
                    src={url}
                    srcset={responsiveSrcset(sources, url, dimensions?.width)}
                    sizes="(max-width: 900px) calc(100vw - 2rem), min(1050px, calc(100vw - 490px))"
                    alt={`Translated artwork page ${index + 1}`}
                    width={dimensions?.width}
                    height={dimensions?.height}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchpriority={index === 0 ? 'high' : 'auto'}
                    decoding="async"
                    onload={() => setImageBackground(url)}
                />
            </figure>
        {/each}
    </div>

    <aside class="info">
        <div class="panel">
            <p class="eyebrow">Artist</p>
            <h1>
                <a class="artist-pill" href={galleryArtistUrl(data.post.artistId)}>
                    {artistName}
                </a>
            </h1>
            <div class="links">
                <a href={data.post.reddit} target="_blank" rel="noopener noreferrer">Reddit</a>
                <a href={data.post.src} target="_blank" rel="noopener noreferrer">Source</a>
                {#if data.prevPostId}<a href={resolve('/posts/[id]', { id: data.prevPostId })}>Previous</a>{/if}
                {#if data.nextPostId}<a href={resolve('/posts/[id]', { id: data.nextPostId })}>Next</a>{/if}
            </div>
            {#if data.post.nsfw}
                <button
                    class="uncensor-button"
                    type="button"
                    aria-pressed={showNsfw}
                    onclick={() => showNsfw = !showNsfw}
                >
                    {showNsfw ? 'Censor images' : 'Uncensor images'}
                </button>
            {/if}
        </div>

        {#if data.characters.length}
            <div class="panel">
                <p class="eyebrow">Characters</p>
                <div class="chips">
                    {#each data.characters as character (character.id)}
                        <a href={`${resolve('/gallery')}?characters=${character.id}`}>
                            <img
                                class="character-avatar"
                                src={asset(`/${character.portrait}`)}
                                alt=""
                                loading="lazy"
                                decoding="async"
                            />
                            <span>{character.name}</span>
                        </a>
                    {/each}
                </div>
            </div>
        {/if}

        <div class="panel prose">
            <!-- The HTML is generated and allowlist-sanitized by renderMarkdown. -->
            {@html data.post.htmlDescription}
        </div>

        {#if data.relatedPosts.length}
            <div class="panel">
                <p class="eyebrow">More by this artist</p>
                <div class="more-grid">
                    {#each data.relatedPosts as item (item.id)}
                        <a
                            href={resolve('/posts/[id]', { id: item.id })}
                            aria-label={`View another translated work by ${artistName}`}
                        >
                            <img
                                class:nsfw={item.nsfw && !showNsfw}
                                src={item.img}
                                srcset={responsiveSrcset(item.imgSources, item.img)}
                                sizes="210px"
                                alt=""
                                loading="lazy"
                                decoding="async"
                            />
                        </a>
                    {/each}
                </div>
            </div>
        {/if}
    </aside>
</section>

<style>
    .root {
        display: grid;
        width: min(1500px, 100%);
        grid-template-columns: minmax(0, 1fr) minmax(320px, 420px);
        gap: 1.5rem;
        margin: 0 auto;
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

    figure img.nsfw {
        filter: blur(10px);
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

    .chips a {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
    }

    .character-avatar {
        width: 26px;
        height: 26px;
        object-fit: cover;
        border-radius: var(--radius-sm);
    }

    .uncensor-button {
        width: 100%;
        padding: 0.65rem 0.8rem;
        margin-top: 0.85rem;
        color: var(--color-surface);
        font: inherit;
        font-size: 0.9rem;
        font-weight: 800;
        cursor: pointer;
        background: var(--color-primary);
        border: 0;
        border-radius: 999px;
    }

    .uncensor-button:hover {
        background: var(--color-primary-hover);
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

    .more-grid img.nsfw {
        filter: blur(10px);
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
