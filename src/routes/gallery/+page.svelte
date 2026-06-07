<script lang="ts">
    import { base } from '$app/paths';
    import { onMount } from 'svelte';
    import { extractRedditId } from '../../utils/extractRedditId';
    import type { Artist, Character, Post, SortOrder } from '../../types/data';

    export let data: { posts: Post[]; artists: Artist[]; characters: Character[] };

    const postsPerPage = 12;
    let currentPage = 1;
    let dateSort: SortOrder = 'desc';
    let galleryOnly = false;
    let characterQueries: string[] = [];
    let artistQueries: string[] = [];
    let mode: 'and' | 'or' = 'and';
    let openJump: 'ellipsis-start' | 'ellipsis-end' | null = null;
    let jumpPage = '';

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
    $: if (currentPage > totalPages) currentPage = totalPages;
    $: visiblePosts = sortedPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);
    $: paginationItems = getPaginationItems(currentPage, totalPages);

    function toggleSort() {
        dateSort = dateSort === 'desc' ? 'asc' : 'desc';
    }

    function openJumpInput(item: 'ellipsis-start' | 'ellipsis-end') {
        openJump = item;
        jumpPage = String(currentPage);
    }

    function submitJump() {
        const page = clampPage(jumpPage);
        jumpPage = String(page);
        currentPage = page;
        openJump = null;
    }

    function clampPage(value: string) {
        const page = Number(value);
        if (!Number.isInteger(page)) return currentPage;

        return Math.min(totalPages, Math.max(1, page));
    }

    function syncJumpPage() {
        const digitsOnly = jumpPage.replace(/\D/g, '');
        if (!digitsOnly) {
            jumpPage = '';
            return;
        }

        jumpPage = String(Math.min(totalPages, Math.max(1, Number(digitsOnly))));
    }

    function finalizeJumpPage() {
        jumpPage = String(clampPage(jumpPage));
    }

    function getPaginationItems(page: number, pageCount: number): Array<number | 'ellipsis-start' | 'ellipsis-end'> {
        if (pageCount <= 7) return Array.from({ length: pageCount }, (_, index) => index + 1);

        const pages = new Set([1, pageCount, page - 1, page, page + 1]);
        const validPages = [...pages]
            .filter(pageNumber => pageNumber >= 1 && pageNumber <= pageCount)
            .sort((a, b) => a - b);

        const items: Array<number | 'ellipsis-start' | 'ellipsis-end'> = [];

        validPages.forEach((pageNumber, index) => {
            const previous = validPages[index - 1];
            if (previous && pageNumber - previous > 1) {
                items.push(previous === 1 ? 'ellipsis-start' : 'ellipsis-end');
            }
            items.push(pageNumber);
        });

        return items;
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
            <button type="button" disabled={currentPage === 1} on:click={() => currentPage -= 1}>Previous</button>
            {#each paginationItems as item}
                {#if typeof item === 'number'}
                    <button
                        type="button"
                        class:active={item === currentPage}
                        aria-current={item === currentPage ? 'page' : undefined}
                        on:click={() => currentPage = item}
                    >
                        {item}
                    </button>
                {:else}
                    {#if openJump === item}
                        <form class="jump-form" on:submit|preventDefault={submitJump}>
                            <input
                                type="number"
                                min="1"
                                max={totalPages}
                                bind:value={jumpPage}
                                aria-label={`Jump to page between 1 and ${totalPages}`}
                                on:input={syncJumpPage}
                                on:blur={finalizeJumpPage}
                                on:keydown={event => {
                                    if (event.key === 'Escape') openJump = null;
                                }}
                            />
                            <button type="submit">Go</button>
                        </form>
                    {:else}
                        <button class="ellipsis" type="button" on:click={() => openJumpInput(item)} aria-label={`Jump to page between 1 and ${totalPages}`}>
                            ...
                        </button>
                    {/if}
                {/if}
            {/each}
            <button type="button" disabled={currentPage === totalPages} on:click={() => currentPage += 1}>Next</button>
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

    button:disabled {
        color: var(--color-faint);
        cursor: not-allowed;
        background: var(--color-bg-soft);
    }

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

    .pagination {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 0.35rem;
        margin-top: 1.25rem;
    }

    .pagination button {
        min-width: 42px;
    }

    .ellipsis {
        display: inline-flex;
        min-width: 28px;
        height: 38px;
        align-items: center;
        justify-content: center;
        color: var(--color-muted);
        font-weight: 700;
    }

    .jump-form {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
    }

    .jump-form input {
        width: 84px;
        height: 38px;
        padding: 0 0.55rem;
        color: var(--color-ink);
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
    }

    .jump-form button {
        min-width: 42px;
    }

    @media (max-width: 1180px) {
        .grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }
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
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }
</style>
