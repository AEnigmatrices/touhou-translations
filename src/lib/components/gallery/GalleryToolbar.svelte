<script lang="ts">
    import type { SortOrder } from '../../../types/data';

    interface Props {
        postCount: number;
        galleryOnly: boolean;
        dateSort: SortOrder;
        onToggleGalleryOnly: () => void;
        onToggleSort: () => void;
    }

    let { postCount, galleryOnly, dateSort, onToggleGalleryOnly, onToggleSort }: Props = $props();
</script>

<div class="toolbar">
    <div>
        <h1>Gallery</h1>
        <p>{postCount} post{postCount === 1 ? '' : 's'}</p>
    </div>
    <div class="controls">
        <button type="button" onclick={onToggleGalleryOnly} aria-pressed={galleryOnly}>
            {galleryOnly ? 'SFW Only' : 'All Posts'}
        </button>
        <button type="button" onclick={onToggleSort}>{dateSort === 'desc' ? 'Newest First' : 'Oldest First'}</button>
    </div>
</div>

<style>
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

    button[aria-pressed="true"] {
        color: var(--color-primary);
        background: var(--color-primary-soft);
        border-color: rgba(180, 35, 59, 0.24);
    }

    @media (max-width: 700px) {
        .toolbar {
            align-items: stretch;
            flex-direction: column;
        }
    }
</style>
