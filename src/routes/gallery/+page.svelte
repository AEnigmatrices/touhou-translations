<script lang="ts">
    import { base } from '$app/paths';
    import { onMount } from 'svelte';
    import { extractRedditId } from '../../utils/extractRedditId';
    import type { Artist, Character, Post, SortOrder } from '../../types/data';

    export let data: { posts: Post[]; artists: Artist[]; characters: Character[] };

    const postsPerPage = 60;
    let currentPage = 1;
    let dateSort: SortOrder = 'desc';
    let galleryOnly = false;
    let characterQueries: string[] = [];
    let artistQueries: string[] = [];
    let mode: 'and' | 'or' = 'and';

    onMount(() => {
        const search = new URLSearchParams(window.location.search);
        characterQueries = (search.get('characters') || '').split(',').map(s => s.trim()).filter(Boolean);
        artistQueries = (search.get('artist') || search.get('artists') || '').split(',').map(s => s.trim()).filter(Boolean);
        mode = search.get('mode') === 'or' ? 'or' : 'and';
    });

    $: filteredPosts = data.posts.filter(post => {
        if (galleryOnly && post.nsfw) return false;
        const characterMatch = characterQueries.length === 0
            || (mode === 'and'
                ? characterQueries.every(id => post.characterIds.includes(id))
                : characterQueries.some(id => post.characterIds.includes(id)));
        const artistMatch = artistQueries.length === 0 || artistQueries.includes(post.artistId);
        return characterMatch && artistMatch;
    });
    $: sortedPosts = [...filteredPosts].sort((a, b) => dateSort === 'asc' ? a.date - b.date : b.date - a.date);
    $: totalPages = Math.max(1, Math.ceil(sortedPosts.length / postsPerPage));
    $: visiblePosts = sortedPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

    function toggleSort() {
        dateSort = dateSort === 'desc' ? 'asc' : 'desc';
    }
</script>

<svelte:head>
    <title>Gallery | Touhou Translations</title>
</svelte:head>

<section class="container">
    <div class="toolbar">
        <div>
            <h1>Gallery</h1>
            <p>{filteredPosts.length} post{filteredPosts.length === 1 ? '' : 's'}</p>
        </div>
        <div class="controls">
            <button type="button" on:click={() => galleryOnly = !galleryOnly} aria-pressed={galleryOnly}>
                {galleryOnly ? 'SFW Only' : 'All Posts'}
            </button>
            <button type="button" on:click={toggleSort}>{dateSort === 'desc' ? 'Newest First' : 'Oldest First'}</button>
        </div>
    </div>

    <div class="grid">
        {#each visiblePosts as post}
            {@const id = extractRedditId(post.reddit)}
            {#if id}
                <a class="tile" href={`${base}/posts/${id}/`} aria-label={`View post ${id}`}>
                    <img src={post.url[0]} alt="" loading="lazy" decoding="async" />
                    {#if post.nsfw}<span>NSFW</span>{/if}
                </a>
            {/if}
        {/each}
    </div>

    {#if totalPages > 1}
        <nav class="pagination" aria-label="Gallery pages">
            {#each Array.from({ length: totalPages }, (_, index) => index + 1) as pageNumber}
                <button
                    type="button"
                    class:active={pageNumber === currentPage}
                    aria-current={pageNumber === currentPage ? 'page' : undefined}
                    on:click={() => currentPage = pageNumber}
                >
                    {pageNumber}
                </button>
            {/each}
        </nav>
    {/if}
</section>

<style>
    .container {
        width: min(1500px, 100%);
        margin: 0 auto;
    }

    .toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 1rem;
        margin-bottom: 1rem;
        text-align: left;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
    }

    h1,
    p {
        margin: 0;
    }

    h1 {
        color: var(--color-ink);
    }

    p {
        color: var(--color-muted);
    }

    .controls {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
    }

    button {
        min-height: 38px;
        padding: 0 0.8rem;
        color: var(--color-muted);
        cursor: pointer;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
    }

    button[aria-pressed="true"],
    button.active {
        color: var(--color-primary);
        background: var(--color-primary-soft);
        border-color: rgba(180, 35, 59, 0.24);
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
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

    .pagination {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.35rem;
        margin-top: 1.25rem;
    }

    @media (max-width: 700px) {
        .container {
            padding: 1rem;
        }

        .toolbar {
            align-items: stretch;
            flex-direction: column;
        }

        .grid {
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        }
    }
</style>
