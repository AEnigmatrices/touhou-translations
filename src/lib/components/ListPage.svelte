<script lang="ts">
    import { resolve } from '$app/paths';
    import ListGrid from './list/ListGrid.svelte';
    import ListToolbar from './list/ListToolbar.svelte';
    import type { Artist, Character, SortOrder } from '../../types/data';

    interface Props {
        mode: 'character' | 'artist';
        characters?: Character[];
        artists?: Artist[];
    }

    let { mode, characters = [], artists = [] }: Props = $props();

    const pageSize = 50;
    let searchInput = $state('');
    let isSelectMode = $state(false);
    let selectedItems = $state<string[]>([]);
    let hasInitializedSortOrder = $state(false);
    let sortOrder = $state<SortOrder>('none');
    let visibleCount = $state(pageSize);

    const title = $derived(mode === 'character' ? 'Character List' : 'Artist List');
    const allItems = $derived(mode === 'character' ? characters : artists);
    const searchedItems = $derived(searchInput
        ? allItems.filter(({ id, name }) => [id, name].some(field => field.toLowerCase().includes(searchInput.toLowerCase())))
        : allItems);
    const sortedItems = $derived([...searchedItems].sort(compareItems));
    const visibleItems = $derived(sortedItems.slice(0, visibleCount));

    $effect(() => {
        if (hasInitializedSortOrder) return;

        sortOrder = mode === 'artist' ? 'desc' : 'none';
        hasInitializedSortOrder = true;
    });

    function compareItems(a: Character | Artist, b: Character | Artist) {
        if (sortOrder === 'none') return mode === 'artist' ? a.id.localeCompare(b.id) : 0;
        const primaryDiff = sortOrder === 'asc'
            ? a.artworkCount - b.artworkCount
            : b.artworkCount - a.artworkCount;
        if (primaryDiff !== 0) return primaryDiff;
        const aSecondary = mode === 'character' ? (a as Character).artistCount : (a as Artist).characterCount;
        const bSecondary = mode === 'character' ? (b as Character).artistCount : (b as Artist).characterCount;
        return sortOrder === 'asc' ? aSecondary - bSecondary : bSecondary - aSecondary;
    }

    function toggleSortOrder() {
        sortOrder = sortOrder === 'none' ? 'desc' : sortOrder === 'desc' ? 'asc' : 'none';
    }

    function toggleSelectMode() {
        if (isSelectMode && selectedItems.length === 0) isSelectMode = false;
        else isSelectMode = !isSelectMode;
    }

    function toggleItem(id: string) {
        selectedItems = selectedItems.includes(id)
            ? selectedItems.filter(item => item !== id)
            : [...selectedItems, id];
    }

    function selectedGalleryUrl(id: string) {
        const key = mode === 'character' ? 'characters' : 'artist';
        return `${resolve('/gallery')}?${key}=${selectedItems.join(',') || id}`;
    }
</script>

<svelte:head>
    <title>{title} | Touhou Translations</title>
</svelte:head>

<section class="container">
    <ListToolbar
        {title}
        {mode}
        {searchInput}
        {isSelectMode}
        selectedCount={selectedItems.length}
        {selectedItems}
        {sortOrder}
        onSearchInput={value => searchInput = value}
        onToggleSelectMode={toggleSelectMode}
        onToggleSortOrder={toggleSortOrder}
    />

    <ListGrid
        items={visibleItems}
        {mode}
        {isSelectMode}
        {selectedItems}
        onToggleItem={toggleItem}
        {selectedGalleryUrl}
    />

    {#if visibleCount < sortedItems.length}
        <button class="load-more" type="button" onclick={() => visibleCount += pageSize}>Load More</button>
    {/if}
</section>

<style>
    .container {
        width: min(1600px, 100%);
        padding: 0.5rem 0 1.5rem;
        margin: 0 auto;
    }

    button {
        display: inline-flex;
        min-height: 40px;
        align-items: center;
        gap: 0.45rem;
        padding: 0.5rem 0.8rem;
        color: var(--color-muted);
        text-decoration: none;
        cursor: pointer;
        background: transparent;
        border: 1px solid var(--color-border);
        border-radius: 8px;
    }

    .load-more {
        margin: 1.25rem auto 0;
    }

    @media (max-width: 640px) {
        .container {
            padding: 1rem;
        }
    }
</style>
