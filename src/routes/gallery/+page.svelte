<script lang="ts">
    import { onMount } from 'svelte';
    import GalleryGrid from '$lib/components/gallery/GalleryGrid.svelte';
    import GalleryPagination from '$lib/components/gallery/GalleryPagination.svelte';
    import GalleryToolbar from '$lib/components/gallery/GalleryToolbar.svelte';
    import type { Artist, Character, Post, SortOrder } from '../../types/data';

    interface Props {
        data: { posts: Post[]; artists: Artist[]; characters: Character[] };
    }

    let { data }: Props = $props();

    const postsPerPage = 12;
    let currentPage = $state(1);
    let dateSort = $state<SortOrder>('desc');
    let galleryOnly = $state(false);
    let characterQueries = $state<string[]>([]);
    let artistQueries = $state<string[]>([]);
    let mode = $state<'and' | 'or'>('and');
    let openJump = $state<'ellipsis-start' | 'ellipsis-end' | null>(null);
    let jumpPage = $state('');

    onMount(() => {
        const search = new URLSearchParams(window.location.search);
        characterQueries = (search.get('characters') || '').split(',').map(s => s.trim()).filter(Boolean);
        artistQueries = (search.get('artist') || search.get('artists') || '').split(',').map(s => s.trim()).filter(Boolean);
        mode = search.get('mode') === 'or' ? 'or' : 'and';
    });

    const filteredPosts = $derived(data.posts.filter(post => {
        if (galleryOnly && post.nsfw) return false;
        const characterMatch = characterQueries.length === 0
            || (mode === 'and'
                ? characterQueries.every(id => post.characterIds.includes(id))
                : characterQueries.some(id => post.characterIds.includes(id)));
        const artistMatch = artistQueries.length === 0 || artistQueries.includes(post.artistId);
        return characterMatch && artistMatch;
    }));
    const sortedPosts = $derived([...filteredPosts].sort((a, b) => dateSort === 'asc' ? a.date - b.date : b.date - a.date));
    const totalPages = $derived(Math.max(1, Math.ceil(sortedPosts.length / postsPerPage)));
    const visiblePosts = $derived(sortedPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage));
    const paginationItems = $derived(getPaginationItems(currentPage, totalPages));

    $effect(() => {
        if (currentPage > totalPages) currentPage = totalPages;
    });

    function toggleSort() {
        dateSort = dateSort === 'desc' ? 'asc' : 'desc';
    }

    function setCurrentPage(page: number) {
        currentPage = page;
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
    <GalleryToolbar
        postCount={filteredPosts.length}
        {galleryOnly}
        {dateSort}
        onToggleGalleryOnly={() => galleryOnly = !galleryOnly}
        onToggleSort={toggleSort}
    />

    <GalleryGrid posts={visiblePosts} />

    {#if totalPages > 1}
        <GalleryPagination
            {currentPage}
            {totalPages}
            {paginationItems}
            {openJump}
            {jumpPage}
            onPageChange={setCurrentPage}
            onOpenJumpInput={openJumpInput}
            onJumpPageInput={value => jumpPage = value}
            onJumpPageBlur={finalizeJumpPage}
            onJumpSubmit={submitJump}
            onCloseJump={() => openJump = null}
        />
    {/if}
</section>

<style>
    .container {
        width: min(1500px, 100%);
        margin: 0 auto;
    }

    @media (max-width: 700px) {
        .container {
            padding: 1rem;
        }
    }
</style>
