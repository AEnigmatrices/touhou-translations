<script lang="ts">
    import { base } from '$app/paths';
    import ProfileItem from './ProfileItem.svelte';
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

    function toggleItem(id: string) {
        selectedItems = selectedItems.includes(id)
            ? selectedItems.filter(item => item !== id)
            : [...selectedItems, id];
    }

    function selectedGalleryUrl(id: string) {
        const key = mode === 'character' ? 'characters' : 'artist';
        return `${base}/gallery/?${key}=${selectedItems.join(',') || id}`;
    }
</script>

<svelte:head>
    <title>{title} | Touhou Translations</title>
</svelte:head>

<section class="container">
    <div class="toolbar">
        <h1>{title}</h1>
        <label>
            <span class="visually-hidden">Search by ID or Name</span>
            <input bind:value={searchInput} placeholder="Search by ID or Name" aria-label={`Search ${title}`} />
        </label>
        {#if mode === 'character'}
            <div class="select-tools">
                <button
                    type="button"
                    class:active={isSelectMode}
                    aria-pressed={isSelectMode}
                    onclick={() => {
                        if (isSelectMode && selectedItems.length === 0) isSelectMode = false;
                        else isSelectMode = !isSelectMode;
                    }}
                >
                    {isSelectMode ? `${selectedItems.length || 'Multi'} Selected` : 'Multi-Select OFF'}
                </button>
                {#if isSelectMode && selectedItems.length > 0}
                    <a class="primary" href={`${base}/gallery/?characters=${selectedItems.join(',')}`}>View Selected</a>
                {/if}
            </div>
        {/if}
        <button type="button" class="sort" onclick={toggleSortOrder} aria-pressed={sortOrder !== 'none'}>
            {sortOrder === 'none' ? 'Sort' : sortOrder === 'desc' ? 'Count ↓' : 'Count ↑'}
        </button>
    </div>

    <ul class="grid">
        {#each visibleItems as item (item.id)}
            <ProfileItem
                name={item.name}
                imageUrl={`${base}/${item.portrait}`}
                description1={`${item.artworkCount} artwork${item.artworkCount === 1 ? '' : 's'}`}
                description2={mode === 'character'
                    ? `${(item as Character).artistCount} artist${(item as Character).artistCount === 1 ? '' : 's'}`
                    : `${(item as Artist).characterCount} character${(item as Artist).characterCount === 1 ? '' : 's'}`}
                link={isSelectMode ? undefined : selectedGalleryUrl(item.id)}
                isSelectMode={isSelectMode}
                isSelected={selectedItems.includes(item.id)}
                onToggleSelect={() => toggleItem(item.id)}
                size="large"
            />
        {/each}
    </ul>

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

    .toolbar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 0.85rem;
        padding: 1rem;
        margin-bottom: 1.25rem;
        background: rgba(255, 255, 255, 0.78);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-sm);
        backdrop-filter: blur(10px);
    }

    h1 {
        margin: 0;
        color: var(--color-ink);
        font-size: clamp(1.45rem, 2.8vw, 2rem);
        line-height: 1.15;
    }

    label {
        flex: 1 1 260px;
        max-width: 440px;
    }

    input {
        width: 100%;
        min-height: 44px;
        padding: 0.65rem 0.85rem;
        color: var(--color-ink);
        background: var(--color-surface);
        border: 1px solid var(--color-border-strong);
        border-radius: var(--radius-md);
    }

    button,
    .primary {
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

    button.active,
    .primary {
        color: var(--color-primary);
        background: var(--color-primary-soft);
        border-color: rgba(180, 35, 59, 0.24);
    }

    .select-tools {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 1.4rem;
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .load-more {
        margin: 1.25rem auto 0;
    }

    .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }

    @media (min-width: 1280px) {
        .grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }
    }

    @media (max-width: 640px) {
        .container {
            padding: 1rem;
        }

        .toolbar {
            align-items: stretch;
            justify-content: flex-start;
            padding: 0.85rem;
        }

        .grid {
            grid-template-columns: 1fr;
            gap: 0.85rem;
        }

        h1,
        label {
            flex-basis: 100%;
            max-width: none;
        }
    }
</style>
