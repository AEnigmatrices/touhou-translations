<script lang="ts">
    import { resolve } from '$app/paths';
    import type { SortOrder } from '../../../types/data';

    interface Props {
        title: string;
        mode: 'character' | 'artist';
        searchInput: string;
        isSelectMode: boolean;
        selectedCount: number;
        selectedItems: string[];
        sortOrder: SortOrder;
        onSearchInput: (value: string) => void;
        onToggleSelectMode: () => void;
        onToggleSortOrder: () => void;
    }

    let {
        title,
        mode,
        searchInput,
        isSelectMode,
        selectedCount,
        selectedItems,
        sortOrder,
        onSearchInput,
        onToggleSelectMode,
        onToggleSortOrder,
    }: Props = $props();
</script>

<div class="toolbar">
    <h1>{title}</h1>
    <label>
        <span class="visually-hidden">Search by ID or Name</span>
        <input
            value={searchInput}
            placeholder="Search by ID or Name"
            aria-label={`Search ${title}`}
            oninput={event => onSearchInput(event.currentTarget.value)}
        />
    </label>
    {#if mode === 'character'}
        <div class="select-tools">
            <button
                type="button"
                class:active={isSelectMode}
                aria-pressed={isSelectMode}
                onclick={onToggleSelectMode}
            >
                {isSelectMode ? `${selectedCount || 'Multi'} Selected` : 'Multi-Select OFF'}
            </button>
            {#if isSelectMode && selectedItems.length > 0}
                <a class="primary" href={`${resolve('/gallery')}?characters=${selectedItems.join(',')}`}>View Selected</a>
            {/if}
        </div>
    {/if}
    <button type="button" class="sort" onclick={onToggleSortOrder} aria-pressed={sortOrder !== 'none'}>
        {sortOrder === 'none' ? 'Sort' : sortOrder === 'desc' ? 'Count ↓' : 'Count ↑'}
    </button>
</div>

<style>
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

    @media (max-width: 640px) {
        .toolbar {
            align-items: stretch;
            justify-content: flex-start;
            padding: 0.85rem;
        }

        h1,
        label {
            flex-basis: 100%;
            max-width: none;
        }
    }
</style>
